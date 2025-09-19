# Shortest Path Finder - Frontend

Aplikasi web untuk mencari jalur terpendek menggunakan berbagai algoritma pathfinding dengan integrasi OpenStreetMap.

## Fitur

### 🗺️ Map Features
- **OpenStreetMap Integration**: Menggunakan Leaflet.js untuk menampilkan peta interaktif
- **Marker Placement**: Klik pada peta untuk menambahkan marker
- **Route Visualization**: Menampilkan jalur terpendek dengan garis biru
- **Custom Markers**: Marker hijau untuk start, merah untuk end, biru untuk waypoints

### 🔍 Location Search
- **Real-time Search**: Pencarian lokasi menggunakan Nominatim API
- **Auto-complete**: Dropdown dengan hasil pencarian
- **Quick Add**: Tombol untuk langsung menambahkan lokasi ke peta
- **Coordinate Display**: Menampilkan koordinat latitude dan longitude

### 🎛️ Controls
- **Algorithm Selection**: Pilih antara Dijkstra, A*, atau Custom Algorithm
- **Marker Management**: Tambah, hapus, atau clear semua marker
- **Path Calculation**: Hitung jalur terpendek dengan algoritma yang dipilih

### 📊 Path Information
- **Distance**: Jarak total dalam meter/kilometer
- **Duration**: Estimasi waktu tempuh
- **Nodes Visited**: Jumlah node yang dikunjungi algoritma
- **Execution Time**: Waktu eksekusi algoritma dalam milidetik
- **Path Points**: Jumlah titik dalam jalur

## Teknologi yang Digunakan

- **React 19**: Framework frontend modern
- **TypeScript**: Type safety dan developer experience
- **Leaflet.js**: Library untuk peta interaktif
- **React-Leaflet**: React wrapper untuk Leaflet
- **OpenStreetMap**: Data peta open source
- **Nominatim API**: Geocoding service untuk pencarian lokasi
- **Vite**: Build tool yang cepat

## Instalasi dan Menjalankan

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Setup
```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

### Development Server
Aplikasi akan berjalan di `http://localhost:5173`

## Cara Penggunaan

### 1. Menambahkan Marker
- **Klik "Add Marker"** lalu klik pada peta
- **Search Location** untuk mencari lokasi spesifik
- **Klik hasil pencarian** untuk menambahkan ke peta

### 2. Memilih Algoritma
- Pilih algoritma yang diinginkan:
  - **Dijkstra**: Algoritma klasik untuk shortest path
  - **A***: Algoritma heuristic yang lebih efisien
  - **Custom**: Algoritma kustom dari backend

### 3. Menghitung Jalur
- Pastikan minimal ada 2 marker
- Klik **"Find Shortest Path"**
- Lihat hasil di panel informasi

### 4. Mengelola Marker
- **Hover marker** untuk melihat informasi
- **Klik marker** untuk menghapus
- **Clear All** untuk menghapus semua marker

## Struktur Komponen

```
src/
├── components/
│   ├── Map.tsx              # Komponen peta utama
│   ├── MapControls.tsx      # Kontrol peta dan algoritma
│   ├── LocationSearch.tsx   # Pencarian lokasi
│   ├── PathInfo.tsx         # Informasi jalur
│   └── ShortestPathApp.tsx  # Komponen utama
├── App.tsx                  # Entry point aplikasi
├── App.css                  # Styling utama
└── main.tsx                 # React root
```

## API Integration

Aplikasi terintegrasi dengan backend Rust untuk perhitungan jalur:

```typescript
// Request format
{
  start: { lat: number, lng: number },
  end: { lat: number, lng: number },
  algorithm: 'dijkstra' | 'astar' | 'custom',
  waypoints: Array<{ lat: number, lng: number }>
}

// Response format
{
  path: Array<[number, number]>,
  distance?: number,
  duration?: number,
  nodes_visited?: number,
  execution_time?: number
}
```

## Responsive Design

- **Desktop**: Sidebar di kiri, peta di kanan
- **Mobile**: Peta di atas, sidebar di bawah
- **Touch-friendly**: Optimized untuk perangkat mobile

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development Notes

### Leaflet Configuration
- Menggunakan OpenStreetMap tiles
- Custom marker icons dengan warna berbeda
- Polyline untuk visualisasi jalur

### State Management
- Menggunakan React hooks untuk state management
- Optimized re-renders dengan useCallback
- Proper cleanup untuk event listeners

### Error Handling
- Graceful error handling untuk API calls
- User-friendly error messages
- Fallback untuk network issues

## Troubleshooting

### Marker tidak muncul
- Pastikan Leaflet CSS sudah diimport
- Check console untuk error JavaScript

### Search tidak bekerja
- Pastikan koneksi internet stabil
- Nominatim API mungkin rate limited

### Path tidak terhitung
- Pastikan backend server berjalan di port 8080
- Check CORS configuration di backend

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

MIT License - lihat file LICENSE untuk detail.