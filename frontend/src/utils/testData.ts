// Test data untuk development dan testing

export const testMarkers = [
  {
    lat: -6.1751,
    lng: 106.8650,
    label: "Start: Monas"
  },
  {
    lat: -6.1944,
    lng: 106.8229,
    label: "End: Bundaran HI"
  }
];

export const testRoute = [
  [-6.1751, 106.8650],
  [-6.1850, 106.8400],
  [-6.1944, 106.8229]
];

export const testPathResult = {
  path: testRoute,
  distance: 12500,
  duration: 1800,
  nodesVisited: 45,
  executionTime: 12.5
};

export const mockSearchResults = [
  {
    lat: "-6.1751",
    lng: "106.8650",
    display_name: "Monumen Nasional, Gambir, Central Jakarta City, Jakarta, Indonesia",
    place_id: "123456789"
  },
  {
    lat: "-6.1944",
    lng: "106.8229",
    display_name: "Hotel Indonesia Roundabout, Menteng, Central Jakarta City, Jakarta, Indonesia",
    place_id: "987654321"
  }
];

// Helper function untuk generate test markers
export const generateTestMarkers = (count: number) => {
  const locations = [
    { lat: -6.1751, lng: 106.8650, name: "Monas" },
    { lat: -6.1944, lng: 106.8229, name: "Bundaran HI" },
    { lat: -6.1352, lng: 106.8133, name: "Kota Tua" },
    { lat: -6.1256, lng: 106.8381, name: "Ancol" },
    { lat: -6.1574, lng: 106.9083, name: "Kelapa Gading" }
  ];

  return locations.slice(0, count).map((loc, index) => ({
    lat: loc.lat,
    lng: loc.lng,
    label: `${index === 0 ? 'Start' : index === count - 1 ? 'End' : 'Waypoint'}: ${loc.name}`
  }));
};

// Mock API response untuk testing
export const mockApiResponse = {
  path: [
    [-6.1751, 106.8650],
    [-6.1850, 106.8400],
    [-6.1944, 106.8229]
  ],
  distance: 12500,
  duration: 1800,
  nodes_visited: 45,
  execution_time: 12.5
};

// Test coordinates untuk berbagai kota di Indonesia
export const cityCoordinates = {
  jakarta: { lat: -6.2088, lng: 106.8456 },
  bandung: { lat: -6.9175, lng: 107.6191 },
  surabaya: { lat: -7.2575, lng: 112.7521 },
  medan: { lat: 3.5952, lng: 98.6722 },
  makassar: { lat: -5.1477, lng: 119.4327 },
  palembang: { lat: -2.9888, lng: 104.7619 },
  semarang: { lat: -6.9667, lng: 110.4167 },
  denpasar: { lat: -8.6500, lng: 115.2167 }
};

// Test scenarios untuk berbagai algoritma
export const testScenarios = {
  simple: {
    name: "Simple Route",
    markers: generateTestMarkers(2),
    expectedAlgorithm: "dijkstra",
    description: "Jalur sederhana dari A ke B"
  },
  withWaypoint: {
    name: "Route with Waypoint",
    markers: generateTestMarkers(3),
    expectedAlgorithm: "astar",
    description: "Jalur dengan satu waypoint"
  },
  complex: {
    name: "Complex Route",
    markers: generateTestMarkers(4),
    expectedAlgorithm: "custom",
    description: "Jalur kompleks dengan multiple waypoints"
  }
};
