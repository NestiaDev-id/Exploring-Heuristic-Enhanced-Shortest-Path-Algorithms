import time
from typing import List
from fastapi import APIRouter, HTTPException
from .models import PathRequest, PathResponse, HealthResponse
from ..algorithms.astar import astar
from ..algorithms.dijkstra import dijkstra
from ..utils.parser import create_graph_from_coordinates
from ..graph.graph import Graph
from  .osrm import get_osrm_route 

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
  
    return HealthResponse(
        status="healthy",
        message="API is running"
    )


@router.post("/path", response_model=PathResponse)
async def find_path(request: PathRequest):
   
    start_time = time.time()
    
    try:
        if request.mode == "osrm":
            path_coordinates = get_osrm_route(
                request.start,
                request.end
            )

            execution_time = (time.time() - start_time) * 1000

            return PathResponse(
                path=path_coordinates,
                distance=len(path_coordinates) * 10,   # estimasi
                duration=len(path_coordinates) * 0.5,
                nodes_visited=len(path_coordinates),
                execution_time=execution_time
            )

        # Validasi algoritma
        if request.algorithm not in ["dijkstra", "astar"]:
            raise HTTPException(
                status_code=400,
                detail=f"Algoritma '{request.algorithm}' tidak didukung. Gunakan 'dijkstra' atau 'astar'"
            )
        
        # Kumpulkan semua koordinat (start, waypoints, end)
        all_coordinates = [{"lat": request.start.lat, "lng": request.start.lng}]
        
        if request.waypoints:
            for waypoint in request.waypoints:
                all_coordinates.append({"lat": waypoint.lat, "lng": waypoint.lng})
        
        all_coordinates.append({"lat": request.end.lat, "lng": request.end.lng})
        
        # Buat graf dari koordinat
        graph, index_to_node = create_graph_from_coordinates(all_coordinates, connect_all=True)
        
        # Temukan jalur untuk setiap segmen
        total_path = []
        total_distance = 0
        total_nodes_visited = 0
        
        # Tentukan segmen-segmen yang perlu dicari jalurnya
        segments = []
        if request.waypoints:
            # Jika ada waypoints, cari jalur melalui semua waypoints
            # start -> waypoint1 -> waypoint2 -> ... -> end
            for i in range(len(all_coordinates) - 1):
                segments.append((i, i + 1))
        else:
            # Jika tidak ada waypoints, langsung dari start ke end
            segments.append((0, len(all_coordinates) - 1))
        
        # Jalankan algoritma untuk setiap segmen
        graph_dict = graph.get_graph_dict()
        positions = graph.get_positions()
        
        for start_idx, end_idx in segments:
            start_node = index_to_node[start_idx]
            end_node = index_to_node[end_idx]
            
            if request.algorithm == "astar":
                # Validasi heuristic untuk A*
                heuristic_type = request.heuristic or "euclidean"
                if heuristic_type not in ["euclidean", "manhattan"]:
                    heuristic_type = "euclidean"
                
                result = astar(graph_dict, start_node, end_node, positions, heuristic_type)
            else:
                result = dijkstra(graph_dict, start_node, end_node)
            
            if result is None:
                raise HTTPException(
                    status_code=404,
                    detail=f"Jalur tidak ditemukan dari segmen {start_idx} ke {end_idx}"
                )
            
            segment_path, segment_distance = result
            total_nodes_visited += len(segment_path)
            
            # Gabungkan jalur (hindari duplikasi node)
            if total_path:
                # Hapus node pertama dari segment_path karena sudah ada di total_path
                segment_path = segment_path[1:]
            
            
            total_path.extend(segment_path)
            total_distance += segment_distance
        
        # Konversi path ke format koordinat
        path_coordinates = []
        for node_id in total_path:
            lat, lng = positions[node_id]
            path_coordinates.append({"lat": lat, "lng": lng})
        
        execution_time = (time.time() - start_time) * 1000  # dalam milidetik
        
        # Estimasi durasi (asumsi kecepatan rata-rata 30 km/jam)
        average_speed_kmh = 30
        duration_seconds = (total_distance / 1000) / average_speed_kmh * 3600
        
        return PathResponse(
            path=[{"lat": p["lat"], "lng": p["lng"]} for p in path_coordinates],
            distance=total_distance,
            duration=duration_seconds,
            nodes_visited=total_nodes_visited,
            execution_time=execution_time
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error saat mencari jalur: {str(e)}"
        )


