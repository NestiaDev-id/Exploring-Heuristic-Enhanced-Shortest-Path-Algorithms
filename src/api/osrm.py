import requests

OSRM_BASE_URL = "https://router.project-osrm.org"

def get_osrm_route(start, end):
    url = (
        f"{OSRM_BASE_URL}/route/v1/driving/"
        f"{start.lng},{start.lat};{end.lng},{end.lat}"
        "?overview=full&geometries=geojson"
    )

    response = requests.get(url, timeout=10)
    response.raise_for_status()

    data = response.json()

    if not data.get("routes"):
        raise ValueError("No route found from OSRM")

    coordinates = data["routes"][0]["geometry"]["coordinates"]

    # OSRM pakai [lng, lat] → kita ubah ke {lat, lng}
    return [{"lat": lat, "lng": lng} for lng, lat in coordinates]
