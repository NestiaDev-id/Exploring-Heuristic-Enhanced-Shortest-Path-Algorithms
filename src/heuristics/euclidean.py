import math
from typing import Tuple


def euclidean_distance(
    point1: Tuple[float, float],
    point2: Tuple[float, float]
) -> float:
   
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
    
    # Formula Haversine untuk jarak lingkaran besar
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlng / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    distance = R * c
    
    return distance

