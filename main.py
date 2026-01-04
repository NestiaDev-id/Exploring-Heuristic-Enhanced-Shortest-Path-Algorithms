from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.routes import router

app = FastAPI(
    title="Heuristic Shortest Path API",
    description="API untuk mencari jalur terpendek menggunakan algoritma Dijkstra dan A*",
    version="1.0.0"
)

# CORS middleware untuk mengizinkan request dari frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Dalam production, ganti dengan domain frontend yang spesifik
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include router
app.include_router(router, prefix="/api", tags=["api"])


@app.get("/")
async def root():
    """
    Root endpoint.
    """
    return {
        "message": "Heuristic Shortest Path API",
        "version": "1.0.0",
        "docs": "/docs"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)

