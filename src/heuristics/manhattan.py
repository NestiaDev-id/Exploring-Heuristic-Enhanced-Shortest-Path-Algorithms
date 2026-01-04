import math
from typing import Tuple


def manhattan_distance(
    point1: Tuple[float, float],
    point2: Tuple[float, float]
) -> float:
   
    lat1, lng1 = point1
    lat2, lng2 = point2
    
    # Konversi perbedaan lat/lng ke meter
    # 1 derajat lat ≈ 111 km
    # 1 derajat lng ≈ 111 km * cos(lat) (bervariasi berdasarkan latitude)
    lat_diff_meters = abs(lat2 - lat1) * 111000
    lng_diff_meters = abs(lng2 - lng1) * 111000 * math.cos(math.radians((lat1 + lat2) / 2))
    
    return lat_diff_meters + lng_diff_meters

