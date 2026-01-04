from pydantic import BaseModel
from typing import List, Optional


class Coordinate(BaseModel):
    lat: float
    lng: float


class PathRequest(BaseModel):
    start: Coordinate
    end: Coordinate
    algorithm: str = "dijkstra"  # "dijkstra" atau "astar"
    waypoints: Optional[List[Coordinate]] = None
    heuristic: Optional[str] = "euclidean"  # "euclidean" atau "manhattan" (untuk A*)


class PathPoint(BaseModel):
    lat: float
    lng: float


class PathResponse(BaseModel):
    path: List[PathPoint]
    distance: float
    duration: Optional[float] = None
    nodes_visited: int
    execution_time: float


class HealthResponse(BaseModel):
    status: str
    message: str

