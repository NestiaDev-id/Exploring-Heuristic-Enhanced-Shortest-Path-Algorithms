# Heuristic Shortest Path API

API untuk mencari jalur terpendek menggunakan algoritma Dijkstra dan A* dengan FastAPI.

## Fitur

- **Algoritma Pathfinding**: Dijkstra dan A*
- **Heuristics**: Euclidean dan Manhattan distance
- **RESTful API**: Endpoint untuk mencari jalur terpendek
- **CORS Support**: Mendukung request dari frontend

## Instalasi

1. Install dependencies:
```bash
pip install -r requirements.txt
```

## Menjalankan Server

```bash
python main.py
```

Atau menggunakan uvicorn langsung:
```bash
uvicorn main:app --host 0.0.0.0 --port 8080 --reload
```

Server akan berjalan di `http://localhost:8080`

## API Documentation

Setelah server berjalan, dokumentasi API dapat diakses di:
- Swagger UI: `http://localhost:8080/docs`
- ReDoc: `http://localhost:8080/redoc`

## Endpoints

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "message": "API is running"
}
```

### POST `/api/path`
Mencari jalur terpendek antara dua titik.

**Request Body:**
```json
{
  "start": {
    "lat": -6.1751,
    "lng": 106.8650
  },
  "end": {
    "lat": -6.1944,
    "lng": 106.8229
  },
  "algorithm": "dijkstra",
  "waypoints": [
    {
      "lat": -6.1352,
      "lng": 106.8133
    }
  ],
  "heuristic": "euclidean"
}
```

**Response:**
```json
{
  "path": [
    {"lat": -6.1751, "lng": 106.8650},
    {"lat": -6.1944, "lng": 106.8229}
  ],
  "distance": 12500.0,
  "duration": 1800.0,
  "nodes_visited": 45,
  "execution_time": 12.5
}
```

## Parameter

- `algorithm`: `"dijkstra"` atau `"astar"` (default: `"dijkstra"`)
- `heuristic`: `"euclidean"` atau `"manhattan"` (hanya untuk A*, default: `"euclidean"`)
- `waypoints`: Array koordinat waypoint (opsional)

## Struktur Proyek

```
.
├── main.py                 # Entry point FastAPI
├── requirements.txt        # Dependencies
├── src/
│   ├── algorithms/        # Algoritma pathfinding
│   │   ├── astar.py
│   │   └── dijkstra.py
│   ├── heuristics/        # Fungsi heuristik
│   │   ├── euclidean.py
│   │   └── manhattan.py
│   ├── graph/             # Graph data structure
│   │   └── graph.py
│   ├── api/               # API routes dan models
│   │   ├── models.py
│   │   └── routes.py
│   └── utils/             # Utility functions
│       └── parser.py
└── frontend/              # Frontend React application
```

## Development

Untuk development dengan auto-reload:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8080
```

