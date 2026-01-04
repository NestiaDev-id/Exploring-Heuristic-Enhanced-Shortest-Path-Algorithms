import heapq
from typing import Dict, List, Tuple, Optional


def dijkstra(
    graph: Dict[int, List[Tuple[int, int]]],
    start: int,
    end: int
) -> Optional[Tuple[List[int], int]]:

    # Inisialisasi
    dist: Dict[int, int] = {}
    pq = []  # Priority queue: (cost, node_id)
    prev: Dict[int, int] = {}
    visited = set()
    
    # Inisialisasi node awal
    dist[start] = 0
    heapq.heappush(pq, (0, start))
    
    while pq:
        cost, node_id = heapq.heappop(pq)
        
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
                
                new_cost = dist[node_id] + weight
                
                # Jika menemukan jalur yang lebih baik
                if neighbor not in dist or new_cost < dist[neighbor]:
                    dist[neighbor] = new_cost
                    prev[neighbor] = node_id
                    heapq.heappush(pq, (new_cost, neighbor))
    
    return None

