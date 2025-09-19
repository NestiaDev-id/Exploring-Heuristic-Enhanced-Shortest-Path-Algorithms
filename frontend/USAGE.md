# 🗺️ Shortest Path Finder - Panduan Penggunaan

## Gambaran Umum

Aplikasi **Shortest Path Finder** adalah aplikasi web interaktif yang memungkinkan Anda mencari jalur terpendek menggunakan berbagai algoritma pathfinding dengan integrasi OpenStreetMap. Aplikasi ini dirancang untuk memberikan pengalaman seperti Google Maps dengan fitur-fitur khusus untuk analisis algoritma.

## 🚀 Memulai

### 1. Menjalankan Aplikasi

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build
```

Aplikasi akan berjalan di `http://localhost:5173`

### 2. Prerequisites

- **Backend Server**: Pastikan backend Rust server berjalan di `http://localhost:8080`
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, atau Edge 90+
- **Internet**: Diperlukan untuk mengakses OpenStreetMap tiles dan Nominatim API

## 🎯 Fitur Utama

### 1. Peta Interaktif
- **OpenStreetMap Integration**: Menggunakan tiles dari OpenStreetMap
- **Zoom & Pan**: Navigasi peta dengan mouse atau touch
- **Responsive Design**: Optimal di desktop dan mobile

### 2. Penempatan Marker
- **Klik untuk Menambah**: Klik "Add Marker" lalu klik pada peta
- **Search Location**: Gunakan search box untuk mencari lokasi spesifik
- **Quick Demo**: Gunakan tombol demo untuk menambah marker dengan cepat

### 3. Pencarian Lokasi
- **Real-time Search**: Ketik untuk mencari lokasi secara real-time
- **Nominatim API**: Menggunakan OpenStreetMap Nominatim untuk geocoding
- **Auto-complete**: Dropdown dengan hasil pencarian
- **Quick Add**: Tombol untuk langsung menambahkan ke peta

### 4. Algoritma Pathfinding
- **Dijkstra**: Algoritma klasik untuk shortest path
- **A***: Algoritma heuristic yang lebih efisien
- **Custom**: Algoritma kustom dari backend

### 5. Visualisasi Jalur
- **Route Drawing**: Jalur ditampilkan dengan garis biru
- **Custom Markers**: 
  - 🟢 Hijau: Start point
  - 🔴 Merah: End point
  - 🔵 Biru: Waypoints

## 📋 Cara Penggunaan

### Langkah 1: Menambahkan Marker

#### Metode 1: Klik pada Peta
1. Klik tombol **"📍 Add Marker"**
2. Klik pada peta di lokasi yang diinginkan
3. Marker akan muncul dengan label otomatis

#### Metode 2: Search Location
1. Ketik nama lokasi di search box
2. Pilih dari hasil pencarian
3. Klik **"📍"** untuk menambahkan ke peta

#### Metode 3: Quick Demo
1. Gunakan tombol demo:
   - **🏁 Start → End**: 2 marker untuk jalur sederhana
   - **🛣️ With Waypoint**: 3 marker dengan waypoint
   - **🔄 Complex Route**: 4 marker untuk jalur kompleks

### Langkah 2: Memilih Algoritma

Pilih algoritma yang ingin digunakan:

- **Dijkstra**: 
  - ✅ Menjamin jalur terpendek
  - ✅ Tidak memerlukan heuristic
  - ❌ Lebih lambat untuk graf besar

- **A***:
  - ✅ Lebih cepat dari Dijkstra
  - ✅ Menggunakan heuristic untuk optimasi
  - ❌ Memerlukan heuristic yang baik

- **Custom**:
  - ✅ Dapat dioptimalkan untuk kasus spesifik
  - ✅ Fleksibilitas tinggi
  - ❌ Kompleksitas implementasi tinggi

### Langkah 3: Menghitung Jalur

1. Pastikan minimal ada **2 marker**
2. Pilih algoritma yang diinginkan
3. Klik **"🛣️ Find Shortest Path"**
4. Tunggu hasil perhitungan

### Langkah 4: Melihat Hasil

Panel **Path Information** akan menampilkan:
- **Distance**: Jarak total dalam meter/kilometer
- **Duration**: Estimasi waktu tempuh
- **Nodes Visited**: Jumlah node yang dikunjungi
- **Execution Time**: Waktu eksekusi algoritma
- **Path Points**: Jumlah titik dalam jalur

## 🎮 Demo Data

### Quick Routes
- **🏁 Start → End**: Jalur sederhana dari Monas ke Bundaran HI
- **🛣️ With Waypoint**: Jalur dengan waypoint melalui Kota Tua
- **🔄 Complex Route**: Jalur kompleks dengan multiple waypoints

### Popular Locations
- **Monas**: Monumen Nasional Jakarta
- **Bundaran HI**: Hotel Indonesia Roundabout
- **Kota Tua**: Kawasan bersejarah Jakarta
- **Ancol Dreamland**: Taman hiburan tepi pantai
- **Mall Kelapa Gading**: Shopping mall besar
- **Bandara Soekarno-Hatta**: Bandara internasional

## 🔧 Konfigurasi

### Environment Variables
```bash
# Backend API
VITE_API_BASE_URL=http://localhost:8080
VITE_API_TIMEOUT=10000

# Map Configuration
VITE_DEFAULT_LAT=-6.2088
VITE_DEFAULT_LNG=106.8456
VITE_DEFAULT_ZOOM=13

# Search Configuration
VITE_NOMINATIM_URL=https://nominatim.openstreetmap.org
VITE_SEARCH_DEBOUNCE_MS=300
VITE_MAX_SEARCH_RESULTS=5
```

### Customization
- **Default Center**: Ubah koordinat default peta
- **Search Debounce**: Sesuaikan delay pencarian
- **Max Results**: Batasi jumlah hasil pencarian

## 🐛 Troubleshooting

### Marker Tidak Muncul
- ✅ Pastikan Leaflet CSS sudah diimport
- ✅ Check console untuk error JavaScript
- ✅ Pastikan koneksi internet stabil

### Search Tidak Bekerja
- ✅ Pastikan koneksi internet stabil
- ✅ Nominatim API mungkin rate limited
- ✅ Coba refresh halaman

### Path Tidak Terhitung
- ✅ Pastikan backend server berjalan di port 8080
- ✅ Check CORS configuration di backend
- ✅ Pastikan minimal ada 2 marker
- ✅ Check network tab di browser developer tools

### Error "Failed to fetch"
- ✅ Pastikan backend server aktif
- ✅ Check URL API di konfigurasi
- ✅ Pastikan tidak ada firewall yang memblokir

## 📱 Responsive Design

### Desktop (≥768px)
- Sidebar di kiri dengan kontrol dan informasi
- Peta di kanan dengan ukuran penuh
- Layout horizontal optimal

### Mobile (<768px)
- Peta di atas dengan tinggi 60%
- Sidebar di bawah dengan tinggi 40%
- Touch-friendly controls
- Optimized untuk landscape dan portrait

## 🔗 API Integration

### Request Format
```json
{
  "start": { "lat": -6.1751, "lng": 106.8650 },
  "end": { "lat": -6.1944, "lng": 106.8229 },
  "algorithm": "dijkstra",
  "waypoints": [
    { "lat": -6.1352, "lng": 106.8133 }
  ]
}
```

### Response Format
```json
{
  "path": [
    [-6.1751, 106.8650],
    [-6.1352, 106.8133],
    [-6.1944, 106.8229]
  ],
  "distance": 12500,
  "duration": 1800,
  "nodes_visited": 45,
  "execution_time": 12.5
}
```

## 🎨 Customization

### Styling
- File CSS utama: `src/App.css`
- Komponen styling terpisah per komponen
- CSS Variables untuk konsistensi warna
- Responsive breakpoints

### Komponen
- Modular component structure
- TypeScript untuk type safety
- Reusable components
- Props-based configuration

## 📊 Performance

### Optimizations
- **React.memo**: Mencegah re-render yang tidak perlu
- **useCallback**: Optimize function references
- **Debounced Search**: Reduce API calls
- **Lazy Loading**: Load komponen saat diperlukan

### Monitoring
- Console logging untuk debugging
- Error boundaries untuk error handling
- Performance metrics di Path Information

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - lihat file LICENSE untuk detail.

## 🆘 Support

Jika mengalami masalah:
1. Check troubleshooting section di atas
2. Check console untuk error messages
3. Pastikan backend server berjalan
4. Check network connectivity
5. Create issue di repository

---

**Selamat menggunakan Shortest Path Finder! 🎉**
