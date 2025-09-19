// Demo data untuk testing aplikasi
export const demoLocations = [
  {
    name: "Monas (Monumen Nasional)",
    lat: -6.1751,
    lng: 106.8650,
    description: "Landmark ikonik Jakarta"
  },
  {
    name: "Bundaran HI (Hotel Indonesia)",
    lat: -6.1944,
    lng: 106.8229,
    description: "Simpang empat terkenal di Jakarta"
  },
  {
    name: "Kota Tua Jakarta",
    lat: -6.1352,
    lng: 106.8133,
    description: "Kawasan bersejarah Jakarta"
  },
  {
    name: "Ancol Dreamland",
    lat: -6.1256,
    lng: 106.8381,
    description: "Taman hiburan tepi pantai"
  },
  {
    name: "Mall Kelapa Gading",
    lat: -6.1574,
    lng: 106.9083,
    description: "Shopping mall besar di Jakarta Utara"
  },
  {
    name: "Bandara Soekarno-Hatta",
    lat: -6.1256,
    lng: 106.6558,
    description: "Bandara internasional Jakarta"
  }
];

export const sampleRoutes = {
  dijkstra: {
    name: "Dijkstra Algorithm",
    description: "Algoritma klasik untuk mencari jalur terpendek",
    complexity: "O(V²) atau O(E log V)",
    useCase: "Cocok untuk graf dengan edge weight yang bervariasi"
  },
  astar: {
    name: "A* Algorithm", 
    description: "Algoritma heuristic yang lebih efisien",
    complexity: "O(b^d) dimana b adalah branching factor",
    useCase: "Optimal untuk pathfinding dengan heuristic yang baik"
  },
  custom: {
    name: "Custom Algorithm",
    description: "Algoritma kustom yang dioptimalkan untuk kasus spesifik",
    complexity: "Tergantung implementasi",
    useCase: "Untuk kasus khusus atau optimasi tertentu"
  }
};

export const algorithmInfo = {
  dijkstra: {
    pros: [
      "Menjamin jalur terpendek",
      "Tidak memerlukan heuristic",
      "Cocok untuk graf umum"
    ],
    cons: [
      "Lebih lambat untuk graf besar",
      "Mengeksplorasi banyak node"
    ]
  },
  astar: {
    pros: [
      "Lebih cepat dari Dijkstra",
      "Menggunakan heuristic untuk optimasi",
      "Efisien untuk pathfinding"
    ],
    cons: [
      "Memerlukan heuristic yang baik",
      "Tidak selalu optimal jika heuristic buruk"
    ]
  },
  custom: {
    pros: [
      "Dapat dioptimalkan untuk kasus spesifik",
      "Fleksibilitas tinggi",
      "Dapat menggabungkan multiple algoritma"
    ],
    cons: [
      "Kompleksitas implementasi tinggi",
      "Memerlukan testing ekstensif"
    ]
  }
};

// Helper function untuk generate demo markers
export const generateDemoMarkers = (count: number = 3) => {
  const shuffled = [...demoLocations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((location, index) => ({
    lat: location.lat,
    lng: location.lng,
    label: `${index === 0 ? 'Start' : index === count - 1 ? 'End' : 'Waypoint'}: ${location.name}`
  }));
};

// Helper function untuk calculate distance antara dua titik
export const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lng2-lng1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c; // Distance in meters
};

// Helper function untuk format distance
export const formatDistance = (distance: number): string => {
  if (distance < 1000) {
    return `${Math.round(distance)} m`;
  }
  return `${(distance / 1000).toFixed(2)} km`;
};

// Helper function untuk format duration
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${Math.round(seconds)} detik`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  if (minutes < 60) {
    return `${minutes} menit ${remainingSeconds} detik`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} jam ${remainingMinutes} menit`;
};
