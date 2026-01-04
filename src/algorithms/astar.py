import heapq
from typing import Dict, List, Tuple, Optional
from ..heuristics.euclidean import euclidean_distance
from ..heuristics.manhattan import manhattan_distance


def astar(
    graph: Dict[int, List[Tuple[int, int]]],
    start: int,
    end: int,
    positions: Dict[int, Tuple[float, float]],
    heuristic_type: str = "euclidean"
) -> Optional[Tuple[List[int], int]]:
    # Pilih fungsi heuristik
    if heuristic_type == "manhattan":
        heuristic = manhattan_distance
    else:
        heuristic = euclidean_distance
    
    # Inisialisasi
    dist: Dict[int, int] = {}
    pq = []  # Priority queue: (f_cost, g_cost, node_id)
    prev: Dict[int, int] = {}
    visited = set()
    
    # Inisialisasi node awal
    dist[start] = 0
    h_start = heuristic(positions[start], positions[end])
    heapq.heappush(pq, (h_start, 0, start))
    
    while pq:
        f_cost, g_cost, node_id = heapq.heappop(pq)
        
        # Skip jika sudah dikunjungi dengan cost lebih baik
        if node_id in visited:
            continue
        
        visited.add(node_id)
        
        # Jika mencapai tujuan
        if node_id == end:
            # Rekonstruksi jalur
            path = []
            curr = end
            while curr is not None:
                path.append(curr)
                curr = prev.get(curr)
            path.reverse()
            return (path, dist[end])
        
        # Periksa semua tetangga
        if node_id in graph:
            for neighbor, weight in graph[node_id]:
                if neighbor in visited:
                    continue
                
                new_g_cost = dist[node_id] + weight
                
                # Jika menemukan jalur yang lebih baik
                if neighbor not in dist or new_g_cost < dist[neighbor]:
                    dist[neighbor] = new_g_cost
                    prev[neighbor] = node_id
                    h_cost = heuristic(positions[neighbor], positions[end])
                    f_cost = new_g_cost + h_cost
                    heapq.heappush(pq, (f_cost, new_g_cost, neighbor))
    
    return None

