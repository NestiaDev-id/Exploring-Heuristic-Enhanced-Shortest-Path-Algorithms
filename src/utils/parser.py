from typing import List, Dict, Tuple
from ..graph.graph import Graph


def create_graph_from_coordinates(
    coordinates: List[Dict[str, float]],
    connect_all: bool = True
) -> Tuple[Graph, Dict[int, int]]:

    graph = Graph()
    index_to_node: Dict[int, int] = {}
    
    # Tambahkan semua node
    for idx, coord in enumerate(coordinates):
        node_id = graph.add_node(coord["lat"], coord["lng"])
        index_to_node[idx] = node_id
    
    # Hubungkan semua node jika connect_all = True
    if connect_all:
        for i in range(len(coordinates)):
            for j in range(i + 1, len(coordinates)):
                node1 = index_to_node[i]
                node2 = index_to_node[j]
                graph.add_bidirectional_edge(node1, node2)
    
    return graph, index_to_node

