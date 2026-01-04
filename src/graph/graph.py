from typing import Dict, List, Tuple, Optional
import math


class Graph:

    
    def __init__(self):
        self.nodes: Dict[int, Tuple[float, float]] = {}
        self.edges: Dict[int, List[Tuple[int, int]]] = {}
        self.node_counter = 0
    
    def add_node(self, lat: float, lng: float) -> int:
     
        node_id = self.node_counter
        self.nodes[node_id] = (lat, lng)
        self.edges[node_id] = []
        self.node_counter += 1
        return node_id
    
    def add_edge(self, from_node: int, to_node: int, weight: Optional[int] = None):
   
        if from_node not in self.nodes or to_node not in self.nodes:
            raise ValueError("Node tidak ditemukan")
        
        if weight is None:
            # Hitung jarak Euclidean sebagai weight
            point1 = self.nodes[from_node]
            point2 = self.nodes[to_node]
            weight = self._calculate_distance(point1, point2)
        
        # Tambahkan edge (bisa bidirectional atau unidirectional)
        if to_node not in [n for n, _ in self.edges[from_node]]:
            self.edges[from_node].append((to_node, int(weight)))
    
    def add_bidirectional_edge(self, node1: int, node2: int, weight: Optional[int] = None):
       
        self.add_edge(node1, node2, weight)
        self.add_edge(node2, node1, weight)
    
    def _calculate_distance(self, point1: Tuple[float, float], point2: Tuple[float, float]) -> float:
       
        lat1, lng1 = point1
        lat2, lng2 = point2
        
        # Konversi ke radian
        lat1_rad = math.radians(lat1)
        lng1_rad = math.radians(lng1)
        lat2_rad = math.radians(lat2)
        lng2_rad = math.radians(lng2)
        
        # Radius bumi dalam meter
        R = 6371000
        
        # Perbedaan koordinat
        dlat = lat2_rad - lat1_rad
        dlng = lng2_rad - lng1_rad
        
        # Formula Haversine
        a = math.sin(dlat / 2) ** 2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlng / 2) ** 2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        
        distance = R * c
        return distance
    
    def get_graph_dict(self) -> Dict[int, List[Tuple[int, int]]]:
      
        return self.edges
    
    def get_positions(self) -> Dict[int, Tuple[float, float]]:
      
        return self.nodes
    
    def find_nearest_node(self, lat: float, lng: float) -> Optional[int]:
   
        if not self.nodes:
            return None
        
        min_distance = float('inf')
        nearest_node = None
        
        target = (lat, lng)
        for node_id, position in self.nodes.items():
            distance = self._calculate_distance(target, position)
            if distance < min_distance:
                min_distance = distance
                nearest_node = node_id
        
        return nearest_node

