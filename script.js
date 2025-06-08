// Global variables
let umkmData = [];
let map;
let markers = [];
let userLocation = null;
let routingControl = null; // Routing control instance

// Sample data for demonstration
const sampleUMKM = [
    // 15 UMKM Kuliner
    {
        id: 1,
        nama: "Warung Bu Sari",
        pemilik: "Sari Wijayanti",
        kategori: "kuliner",
        deskripsi: "Warung makan tradisional dengan masakan khas Jawa",
        rt: "01",
        rw: "02",
        alamat: "Jl. Sarirejo No. 15, RT 01/RW 02",
        telepon: "081234567890",
        produk: "Nasi Gudeg, Soto Ayam, Es Dawet",
        jamBuka: "06:00",
        jamTutup: "21:00",
        latitude: -6.966667,
        longitude: 110.416667,
        foto: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        menuPhotos: [
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=150&fit=crop",
            "https://images.unsplash.com/photo-1555939594-58d7cb6cca65?w=200&h=150&fit=crop"
        ]
    },
    {
        id: 2,
        nama: "Bakso Mas Agus",
        pemilik: "Agus Setiawan",
        kategori: "kuliner",
        deskripsi: "Bakso daging sapi asli dengan kuah kaldu yang gurih",
        rt: "02",
        rw: "01",
        alamat: "Jl. Sarirejo No. 23, RT 02/RW 01",
        telepon: "081345678901",
        produk: "Bakso Daging, Bakso Urat, Mie Ayam",
        jamBuka: "07:00",
        jamTutup: "22:00",
        latitude: -6.967200,
        longitude: 110.417200,
        foto: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop",
        menuPhotos: [
            "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=200&h=150&fit=crop"
        ]
    },
    {
        id: 3,
        nama: "Nasi Pecel Ibu Tini",
        pemilik: "Tini Rahayu",
        kategori: "kuliner",
        deskripsi: "Nasi pecel dengan bumbu kacang khas Jawa Timur",
        rt: "01",
        rw: "01",
        alamat: "Jl. Sarirejo No. 8, RT 01/RW 01",
        telepon: "082456789012",
        produk: "Nasi Pecel, Gado-gado, Ketoprak",
        jamBuka: "05:30",
        jamTutup: "14:00",
        latitude: -6.966000,
        longitude: 110.416000,
        foto: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
        menuPhotos: [
            "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=150&fit=crop"
        ]
    },
    {
        id: 4,
        nama: "Es Campur Segar Pak Bambang",
        pemilik: "Bambang Suryono",
        kategori: "kuliner",
        deskripsi: "Es campur dan minuman segar untuk menghilangkan dahaga",
        rt: "03",
        rw: "02",
        alamat: "Jl. Sarirejo No. 56, RT 03/RW 02",
        telepon: "083567890123",
        produk: "Es Campur, Es Cendol, Es Dawet, Jus Buah",
        jamBuka: "10:00",
        jamTutup: "23:00",
        latitude: -6.968000,
        longitude: 110.418000,
        foto: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=400&h=300&fit=crop",
        menuPhotos: [
            "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=200&h=150&fit=crop"
        ]
    },
    {
        id: 5,
        nama: "Ayam Goreng Bu Wati",
        pemilik: "Wati Susanti",
        kategori: "kuliner",
        deskripsi: "Ayam goreng crispy dengan bumbu rahasia keluarga",
        rt: "04",
        rw: "01",
        alamat: "Jl. Sarirejo No. 34, RT 04/RW 01",
        telepon: "084678901234",
        produk: "Ayam Goreng, Ayam Bakar, Nasi Rawon",
        jamBuka: "11:00",
        jamTutup: "21:30",
        latitude: -6.969000,
        longitude: 110.419000,
        foto: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop",
        menuPhotos: [
            "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&h=150&fit=crop"
        ]
    },
    {
        id: 6,
        nama: "Kopi Klotok Mas Joko",
        pemilik: "Joko Widodo",
        kategori: "kuliner",
        deskripsi: "Warung kopi tradisional dengan kopi robusta pilihan",
        rt: "05",
        rw: "02",
        alamat: "Jl. Sarirejo No. 67, RT 05/RW 02",
        telepon: "085789012345",
        produk: "Kopi Klotok, Kopi Tubruk, Gorengan, Pisang Goreng",
        jamBuka: "06:00",
        jamTutup: "22:00",
        latitude: -6.970000,
        longitude: 110.420000,
        foto: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
        menuPhotos: [
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=150&fit=crop"
        ]
    },
    {
        id: 7,
        nama: "Sate Kambing Pak Umar",
        pemilik: "Umar Fauzi",
        kategori: "kuliner",
        deskripsi: "Sate kambing muda dengan bumbu kacang yang nikmat",
        rt: "02",
        rw: "03",
        alamat: "Jl. Sarirejo No. 89, RT 02/RW 03",
        telepon: "086890123456",
        produk: "Sate Kambing, Gule Kambing, Tongseng",
        jamBuka: "17:00",
        jamTutup: "24:00",
        latitude: -6.967500,
        longitude: 110.417500,
        foto: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop",
        menuPhotos: [
            "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=200&h=150&fit=crop"
        ]
    },
    {
        id: 8,
        nama: "Tahu Tek Bu Ningsih",
        pemilik: "Ningsih Astuti",
        kategori: "kuliner",
        deskripsi: "Tahu tek dan jajanan pasar tradisional",
        rt: "01",
        rw: "03",
        alamat: "Jl. Sarirejo No. 12, RT 01/RW 03",
        telepon: "087901234567",
        produk: "Tahu Tek, Kupat Tahu, Lontong Sayur",
        jamBuka: "06:30",
        jamTutup: "15:00",
        latitude: -6.966300,
        longitude: 110.416300,
        foto: "https://images.unsplash.com/photo-1563379091329-ec5beaa96c3f?w=400&h=300&fit=crop",
        menuPhotos: [
            "https://images.unsplash.com/photo-1563379091329-ec5beaa96c3f?w=200&h=150&fit=crop"
        ]
    },
    {
        id: 9,
        nama: "Mie Ayam Pangsit Pak Rudi",
        pemilik: "Rudi Hartono",
        kategori: "kuliner",
        deskripsi: "Mie ayam dengan pangsit buatan sendiri",
        rt: "03",
        rw: "01",
        alamat: "Jl. Sarirejo No. 45, RT 03/RW 01",
        telepon: "088012345678",
        produk: "Mie Ayam, Pangsit Rebus, Bakso Tahu",
        jamBuka: "08:00",
        jamTutup: "20:00",
        latitude: -6.968300,
        longitude: 110.418300,
        foto: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
        menuPhotos: [
            "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=150&fit=crop"
        ]
    },
    {
        id: 10,
        nama: "Martabak Manis Bu Yuni",
        pemilik: "Yuni Setiowati",
        kategori: "kuliner",
        deskripsi: "Martabak manis dan telur dengan berbagai topping",
        rt: "04",
        rw: "03",
        alamat: "Jl. Sarirejo No. 78, RT 04/RW 03",
        telepon: "089123456789",
        produk: "Martabak Manis, Martabak Telur, Terang Bulan",
        jamBuka: "16:00",
        jamTutup: "01:00",
        latitude: -6.969300,
        longitude: 110.419300,
        foto: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop",
        menuPhotos: [
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=150&fit=crop"
        ]
    },
    {
        id: 11,
        nama: "Rujak Cingur Pak Hadi",
        pemilik: "Hadi Pranoto",
        kategori: "kuliner",
        deskripsi: "Rujak cingur khas Surabaya dengan bumbu petis",
        rt: "05",
        rw: "01",
        alamat: "Jl. Sarirejo No. 23, RT 05/RW 01",
        telepon: "090234567890",
        produk: "Rujak Cingur, Rujak Buah, Gado-gado",
        jamBuka: "07:00",
        jamTutup: "18:00",
        latitude: -6.970300,
        longitude: 110.420300,
        foto: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        menuPhotos: [
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=150&fit=crop"
        ]
    },
    {
        id: 12,
        nama: "Bebek Goreng Bu Ani",
        pemilik: "Ani Ratnasari",
        kategori: "kuliner",
        deskripsi: "Bebek goreng dan bebek bakar dengan sambal khas",
        rt: "01",
        rw: "02",
        alamat: "Jl. Sarirejo No. 56, RT 01/RW 02",
        telepon: "091345678901",
        produk: "Bebek Goreng, Bebek Bakar, Sambal Ijo",
        jamBuka: "11:00",
        jamTutup: "22:00",
        latitude: -6.966800,
        longitude: 110.416800,
        foto: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
        menuPhotos: [
            "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=150&fit=crop"
        ]
    },
    {
        id: 13,
        nama: "Nasi Liwet Bu Endang",
        pemilik: "Endang Susilowati",
        kategori: "kuliner",
        deskripsi: "Nasi liwet Solo dengan lauk pauk tradisional",
        rt: "02",
        rw: "02",
        alamat: "Jl. Sarirejo No. 34, RT 02/RW 02",
        telepon: "092456789012",
        produk: "Nasi Liwet, Opor Ayam, Areh, Krecek",
        jamBuka: "10:00",
        jamTutup: "20:00",
        latitude: -6.967800,
        longitude: 110.417800,
        foto: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=300&fit=crop",
        menuPhotos: [
            "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=150&fit=crop"
        ]
    },
    {
        id: 14,
        nama: "Soto Lamongan Pak Eko",
        pemilik: "Eko Prasetyo",
        kategori: "kuliner",
        deskripsi: "Soto Lamongan dengan koya dan kerupuk udang",
        rt: "03",
        rw: "03",
        alamat: "Jl. Sarirejo No. 67, RT 03/RW 03",
        telepon: "093567890123",
        produk: "Soto Lamongan, Soto Ayam, Kerupuk Udang",
        jamBuka: "06:00",
        jamTutup: "16:00",
        latitude: -6.968800,
        longitude: 110.418800,
        foto: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        menuPhotos: [
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=200&h=150&fit=crop"
        ]
    },
    {
        id: 15,
        nama: "Cendol Dawet Bu Maya",
        pemilik: "Maya Kusumawati",
        kategori: "kuliner",
        deskripsi: "Cendol dan dawet dengan santan kelapa murni",
        rt: "04",
        rw: "02",
        alamat: "Jl. Sarirejo No. 89, RT 04/RW 02",
        telepon: "094678901234",
        produk: "Cendol, Dawet, Es Kelapa Muda, Kolak",
        jamBuka: "09:00",
        jamTutup: "21:00",
        latitude: -6.969800,
        longitude: 110.419800,
        foto: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=400&h=300&fit=crop",
        menuPhotos: [
            "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=200&h=150&fit=crop"
        ]
    },
    // 10 UMKM Jasa
    {
        id: 16,
        nama: "Jahit Pak Budi",
        pemilik: "Budi Santoso",
        kategori: "jasa",
        deskripsi: "Jasa jahit dan reparasi pakaian",
        rt: "02",
        rw: "01",
        alamat: "Jl. Sarirejo No. 45, RT 02/RW 01",
        telepon: "082345678901",
        produk: "Jahit Baju, Reparasi Pakaian, Bordiran",
        jamBuka: "08:00",
        jamTutup: "17:00",
        latitude: -6.967667,
        longitude: 110.417667,
        foto: "https://images.unsplash.com/photo-1558618666-fcd25ba4cd64?w=400&h=300&fit=crop"
    },
    {
        id: 17,
        nama: "Service Motor Pak Andi",
        pemilik: "Andi Setiawan",
        kategori: "jasa",
        deskripsi: "Service dan reparasi motor semua jenis",
        rt: "01",
        rw: "01",
        alamat: "Jl. Sarirejo No. 12, RT 01/RW 01",
        telepon: "081456789012",
        produk: "Service Motor, Ganti Oli, Tune Up",
        jamBuka: "07:00",
        jamTutup: "18:00",
        latitude: -6.966200,
        longitude: 110.416200,
        foto: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?w=400&h=300&fit=crop"
    },
    {
        id: 18,
        nama: "Salon Cantik Bu Rita",
        pemilik: "Rita Anggraini",
        kategori: "jasa",
        deskripsi: "Salon kecantikan untuk wanita dan anak-anak",
        rt: "03",
        rw: "02",
        alamat: "Jl. Sarirejo No. 78, RT 03/RW 02",
        telepon: "082567890123",
        produk: "Potong Rambut, Creambath, Facial, Manicure",
        jamBuka: "09:00",
        jamTutup: "20:00",
        latitude: -6.968200,
        longitude: 110.418200,
        foto: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop"
    },
    {
        id: 19,
        nama: "Cuci Motor Bu Sinta",
        pemilik: "Sinta Dewi",
        kategori: "jasa",
        deskripsi: "Jasa cuci motor dan mobil dengan steam",
        rt: "04",
        rw: "01",
        alamat: "Jl. Sarirejo No. 23, RT 04/RW 01",
        telepon: "083678901234",
        produk: "Cuci Motor, Cuci Mobil, Steam Cleaning",
        jamBuka: "06:00",
        jamTutup: "19:00",
        latitude: -6.969200,
        longitude: 110.419200,
        foto: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop"
    },
    {
        id: 20,
        nama: "Fotocopy Pak Dedi",
        pemilik: "Dedi Kurniawan",
        kategori: "jasa",
        deskripsi: "Jasa fotocopy, print, dan scan dokumen",
        rt: "05",
        rw: "03",
        alamat: "Jl. Sarirejo No. 56, RT 05/RW 03",
        telepon: "084789012345",
        produk: "Fotocopy, Print, Scan, Jilid, Laminating",
        jamBuka: "07:30",
        jamTutup: "21:00",
        latitude: -6.970200,
        longitude: 110.420200,
        foto: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop"
    },
    {
        id: 21,
        nama: "Tukang Las Pak Agung",
        pemilik: "Agung Prasetyo",
        kategori: "jasa",
        deskripsi: "Jasa pengelasan dan reparasi besi",
        rt: "02",
        rw: "03",
        alamat: "Jl. Sarirejo No. 34, RT 02/RW 03",
        telepon: "085890123456",
        produk: "Las Listrik, Las Karbit, Pagar Besi, Teralis",
        jamBuka: "08:00",
        jamTutup: "17:00",
        latitude: -6.967400,
        longitude: 110.417400,
        foto: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop"
    },
    {
        id: 22,
        nama: "Katering Bu Lestari",
        pemilik: "Lestari Wulandari",
        kategori: "jasa",
        deskripsi: "Jasa katering untuk acara dan harian",
        rt: "01",
        rw: "02",
        alamat: "Jl. Sarirejo No. 67, RT 01/RW 02",
        telepon: "086901234567",
        produk: "Katering Harian, Nasi Box, Snack Box",
        jamBuka: "05:00",
        jamTutup: "20:00",
        latitude: -6.966400,
        longitude: 110.416400,
        foto: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop"
    },
    {
        id: 23,
        nama: "Laundry Express Pak Hendro",
        pemilik: "Hendro Susilo",
        kategori: "jasa",
        deskripsi: "Jasa laundry kiloan dan satuan express",
        rt: "03",
        rw: "01",
        alamat: "Jl. Sarirejo No. 89, RT 03/RW 01",
        telepon: "087012345678",
        produk: "Laundry Kiloan, Cuci Setrika, Dry Cleaning",
        jamBuka: "07:00",
        jamTutup: "21:00",
        latitude: -6.968400,
        longitude: 110.418400,
        foto: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400&h=300&fit=crop"
    },
    {
        id: 24,
        nama: "Tukang Bangunan Pak Wawan",
        pemilik: "Wawan Setiadi",
        kategori: "jasa",
        deskripsi: "Jasa renovasi dan pembangunan rumah",
        rt: "04",
        rw: "03",
        alamat: "Jl. Sarirejo No. 12, RT 04/RW 03",
        telepon: "088123456789",
        produk: "Renovasi Rumah, Cat Dinding, Keramik, Plester",
        jamBuka: "06:00",
        jamTutup: "17:00",
        latitude: -6.969400,
        longitude: 110.419400,
        foto: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
    },
    {
        id: 25,
        nama: "Service Elektronik Pak Bowo",
        pemilik: "Bowo Santoso",
        kategori: "jasa",
        deskripsi: "Service TV, radio, dan elektronik rumah tangga",
        rt: "05",
        rw: "02",
        alamat: "Jl. Sarirejo No. 45, RT 05/RW 02",
        telepon: "089234567890",
        produk: "Service TV, Radio, Kulkas, Mesin Cuci",
        jamBuka: "08:00",
        jamTutup: "18:00",
        latitude: -6.970400,
        longitude: 110.420400,
        foto: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop"
    }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Load sample data
    umkmData = [...sampleUMKM];

    // Initialize navigation
    initNavigation();

    // Initialize map
    initMap();

    // Initialize filters
    initFilters();

    

    // Initialize modal
    initModal();

    // Load initial data
    displayUMKM(umkmData);
    updateStats();
    updateMapMarkers();
});

// Navigation
function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetView = btn.dataset.view;

            // Update active nav button
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update active view
            views.forEach(v => v.classList.remove('active'));
            document.getElementById(`${targetView}View`).classList.add('active');

            // Refresh map if switching to map view
            if (targetView === 'map') {
                setTimeout(() => {
                    map.invalidateSize();
                }, 100);
            }
        });
    });
}

// Map initialization
function initMap() {
    // Center of Sarirejo, Semarang Timur (approximate coordinates)
    const sarirejoCenterLat = -6.967;
    const sarirejoCenterLng = 110.417;

    map = L.map('map').setView([sarirejoCenterLat, sarirejoCenterLng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add Sarirejo boundary marker
    L.marker([sarirejoCenterLat, sarirejoCenterLng])
        .addTo(map)
        .bindPopup('<strong>Kelurahan Sarirejo</strong><br>Kecamatan Semarang Timur')
        .openPopup();

    // Map controls
    const mapControls = `
        <div class="map-controls">
            <button id="locateBtn" class="map-control-btn">
                <i class="fas fa-crosshairs"></i> Lokasi Saya
            </button>
            <button id="resetMapBtn" class="map-control-btn">
                <i class="fas fa-home"></i> Reset Peta
            </button>
            <button id="clearRouteBtn" class="map-control-btn" style="display:none;">
                <i class="fas fa-times"></i> Hapus Rute
            </button>
        </div>
    `;

    const mapContainer = document.getElementById('map');
    mapContainer.insertAdjacentHTML('beforeend', mapControls);
    document.getElementById('locateBtn').addEventListener('click', getCurrentLocation);
    document.getElementById('resetMapBtn').addEventListener('click', resetMap);
    document.getElementById('clearRouteBtn').addEventListener('click', clearRoute);

}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                userLocation = [lat, lng];
                map.setView([lat, lng], 16);

                L.marker([lat, lng])
                    .addTo(map)
                    .bindPopup('📍 Lokasi Anda')
                    .openPopup();
            },
            error => {
                alert('Tidak dapat mengakses lokasi Anda. Pastikan GPS aktif dan izinkan akses lokasi.');
            }
        );
    } else {
        alert('Browser Anda tidak mendukung Geolocation API.');
    }
}

function resetMap() {
    map.setView([-6.967, 110.417], 15);
}

function clearRoute() {
    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
        document.getElementById('clearRouteBtn').style.display = 'none';
    }
}

function showRoute(destinationLat, destinationLng) {
    clearRoute(); // Clear existing route if any

    if (!userLocation) {
        // Try to get user location if not available
        getCurrentLocation();
        setTimeout(() => {
            if (userLocation) {
                createRoute(destinationLat, destinationLng);
            } else {
                alert('Aktifkan lokasi anda terlebih dahulu.');
            }
        }, 2000);
        return;
    }

    createRoute(destinationLat, destinationLng);
}

function createRoute(destinationLat, destinationLng) {
    // Switch to map view immediately
    document.querySelector('.nav-btn[data-view="map"]').click();
    
    setTimeout(() => {
        routingControl = L.Routing.control({
            waypoints: [
                L.latLng(userLocation[0], userLocation[1]), // User's location
                L.latLng(destinationLat, destinationLng)  // UMKM location
            ],
            routeWhileDragging: false,
            showAlternatives: false,
            addWaypoints: false,
            draggableWaypoints: false,
            createMarker: function() { return null; } // Don't create default markers
        }).addTo(map);

        // Fit map to show both points
        const group = new L.featureGroup([
            L.marker([userLocation[0], userLocation[1]]),
            L.marker([destinationLat, destinationLng])
        ]);
        map.fitBounds(group.getBounds().pad(0.1));

        document.getElementById('clearRouteBtn').style.display = 'block';
    }, 300);
}


function updateMapMarkers() {
    // Clear existing markers
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];

    // Add UMKM markers
    umkmData.forEach(umkm => {
        if (umkm.latitude && umkm.longitude) {
            const markerColor = getCategoryColor(umkm.kategori);

            const marker = L.circleMarker([umkm.latitude, umkm.longitude], {
                radius: 8,
                fillColor: markerColor,
                color: '#fff',
                weight: 2,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map);

            let popupContent = `
                <div class="popup-content">
                    <h4>${umkm.nama}</h4>
                    <p><strong>Kategori:</strong> ${umkm.kategori}</p>
                    <p><strong>Pemilik:</strong> ${umkm.pemilik}</p>
                    <p><strong>Alamat:</strong> ${umkm.alamat}</p>
                    <p><strong>Telepon:</strong> ${umkm.telepon || 'Tidak tersedia'}</p>
                    <p><strong>Produk:</strong> ${umkm.produk || 'Tidak tersedia'}</p>
                    <button onclick="showRoute(${umkm.latitude}, ${umkm.longitude})">Rute</button>
                </div>
            `;

            marker.bindPopup(popupContent);
            markers.push(marker);
        }
    });
}

function getCategoryColor(category) {
    const colors = {
        kuliner: '#ff6b6b',
        fashion: '#4ecdc4',
        kerajinan: '#ffe66d',
        jasa: '#95e1d3',
        pertanian: '#a8e6cf',
        teknologi: '#ffd93d'
    };
    return colors[category] || '#999';
}

// Filters
function initFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const rtFilter = document.getElementById('rtFilter');

    searchInput.addEventListener('input', filterUMKM);
    categoryFilter.addEventListener('change', filterUMKM);
    rtFilter.addEventListener('change', filterUMKM);
}

function filterUMKM() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    const selectedRT = document.getElementById('rtFilter').value;

    let filteredData = umkmData.filter(umkm => {
        const matchesSearch = umkm.nama.toLowerCase().includes(searchTerm) ||
            umkm.pemilik.toLowerCase().includes(searchTerm) ||
            umkm.produk.toLowerCase().includes(searchTerm) ||
            umkm.deskripsi.toLowerCase().includes(searchTerm);

        const matchesCategory = !selectedCategory || umkm.kategori === selectedCategory;
        const matchesRT = !selectedRT || umkm.rt === selectedRT;

        return matchesSearch && matchesCategory && matchesRT;
    });

    displayUMKM(filteredData);
}

// Display UMKM
function displayUMKM(data) {
    const grid = document.getElementById('umkmGrid');

    if (data.length === 0) {
        grid.innerHTML = '<div class="no-results">Tidak ada UMKM yang ditemukan.</div>';
        return;
    }

    grid.innerHTML = data.map(umkm => `
        <div class="umkm-card" onclick="showUMKMDetail(${umkm.id})">
            <div class="umkm-card-image">
                <img src="${umkm.foto || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'}" alt="${umkm.nama}" />
                <div class="category-badge">${capitalizeFirst(umkm.kategori)}</div>
            </div>
            <div class="umkm-card-header">
                <h3>${umkm.nama}</h3>
                <p>Pemilik: ${umkm.pemilik}</p>
            </div>
            <div class="umkm-card-body">
                <p>${umkm.deskripsi}</p>
                <div class="info">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>RT ${umkm.rt}/RW ${umkm.rw}</span>
                </div>
                <div class="info">
                    <i class="fas fa-phone"></i>
                    <span>${umkm.telepon || 'Tidak tersedia'}</span>
                </div>
                <div class="info">
                    <i class="fas fa-shopping-bag"></i>
                    <span>${umkm.produk || 'Tidak tersedia'}</span>
                </div>
                <div class="info">
                    <i class="fas fa-clock"></i>
                    <span>${formatJamOperasional(umkm.jamBuka, umkm.jamTutup)}</span>
                </div>
                <div class="card-actions">
                    <button onclick="event.stopPropagation(); showOnMap(${umkm.id})" class="map-btn">
                        <i class="fas fa-map-marker-alt"></i> Lihat di Peta
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function showOnMap(id) {
    const umkm = umkmData.find(u => u.id === id);
    if (!umkm || !umkm.latitude || !umkm.longitude) {
        alert('Lokasi UMKM tidak tersedia');
        return;
    }

    // Switch to map view
    document.querySelector('.nav-btn[data-view="map"]').click();

    // Wait for map to be ready then center on UMKM
    setTimeout(() => {
        map.setView([umkm.latitude, umkm.longitude], 18);

        // Find and open the popup for this UMKM
        markers.forEach(marker => {
            const popupContent = marker.getPopup().getContent();
            if (popupContent.includes(umkm.nama)) {
                marker.openPopup();
            }
        });
    }, 200);
}

function showUMKMDetail(id) {
    const umkm = umkmData.find(u => u.id === id);
    if (!umkm) return;

    const modalContent = document.getElementById('modalContent');
    let menuPhotosHTML = '';
    if (umkm.kategori === 'kuliner' && umkm.menuPhotos && umkm.menuPhotos.length > 0) {
        menuPhotosHTML = `
            <div class="detail-section">
                <h3>Menu Photos</h3>
                <div class="menu-photos-gallery">
                    ${umkm.menuPhotos.map(photo => `<img src="${photo}" alt="Menu" class="menu-photo">`).join('')}
                </div>
            </div>
        `;
    }

    modalContent.innerHTML = `
        <div class="modal-image">
            <img src="${umkm.foto || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'}" alt="${umkm.nama}" />
        </div>
        <h2>${umkm.nama}</h2>
        <div class="umkm-detail">
            <div class="detail-section">
                <h3>Informasi Dasar</h3>
                <p><strong>Pemilik:</strong> ${umkm.pemilik}</p>
                <p><strong>Kategori:</strong> ${capitalizeFirst(umkm.kategori)}</p>
                <p><strong>Deskripsi:</strong> ${umkm.deskripsi}</p>
            </div>

            <div class="detail-section">
                <h3>Lokasi</h3>
                <p><strong>Alamat:</strong> ${umkm.alamat}</p>
                <p><strong>RT/RW:</strong> ${umkm.rt}/${umkm.rw}</p>
            </div>

            <div class="detail-section">
                <h3>Kontak</h3>
                <p><strong>Telepon:</strong> ${umkm.telepon || 'Tidak tersedia'}</p>
            </div>

            <div class="detail-section">
                <h3>Produk/Layanan</h3>
                <p>${umkm.produk || 'Tidak tersedia'}</p>
            </div>

            <div class="detail-section">
                <h3>Jam Operasional</h3>
                <p>${formatJamOperasional(umkm.jamBuka, umkm.jamTutup)}</p>
            </div>

            ${menuPhotosHTML}

            <div class="action-buttons">
                <button onclick="closeModal(); showOnMap(${umkm.id})" class="map-btn">
                    <i class="fas fa-map-marker-alt"></i> Lihat di Peta
                </button>
                <button onclick="closeModal(); showRoute(${umkm.latitude}, ${umkm.longitude})" class="map-btn">
                    <i class="fas fa-route"></i> Rute
                </button>
            </div>
        </div>
    `;

    document.getElementById('umkmModal').style.display = 'block';
}

// Statistics
function updateStats() {
    const total = umkmData.length;
    const kuliner = umkmData.filter(u => u.kategori === 'kuliner').length;
    const fashion = umkmData.filter(u => u.kategori === 'fashion').length;
    const jasa = umkmData.filter(u => u.kategori === 'jasa').length;

    document.getElementById('totalUMKM').textContent = total;
    document.getElementById('kulinerCount').textContent = kuliner;
    document.getElementById('fashionCount').textContent = fashion;
    document.getElementById('jasaCount').textContent = jasa;
}

function closeModal() {
    document.getElementById('umkmModal').style.display = 'none';
}

// Modal
function initModal() {
    const modal = document.getElementById('umkmModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Utility functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatJamOperasional(jamBuka, jamTutup) {
    if (!jamBuka || !jamTutup) return 'Tidak tersedia';
    return `${jamBuka} - ${jamTutup}`;
}

// Add CSS for additional modal styles
const additionalCSS = `
.detail-section {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
}

.detail-section:last-child {
    border-bottom: none;
}

.detail-section h3 {
    color: #667eea;
    margin-bottom: 0.5rem;
}

.detail-section p {
    margin-bottom: 0.5rem;
}

.action-buttons {
    text-align: center;
    margin-top: 1.5rem;
}

.whatsapp-btn {
    display: inline-block;
    background: #25d366;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    text-decoration: none;
    transition: background 0.3s ease;
}

.whatsapp-btn:hover {
    background: #20b858;
}

.no-results {
    text-align: center;
    padding: 2rem;
    color: #666;
    font-size: 1.1rem;
}

.menu-photos-gallery {
    display: flex;
    overflow-x: auto;
    padding: 0.5rem 0;
}

.menu-photo {
    width: 100px;
    height: 100px;
    margin-right: 0.5rem;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

#addMenuPhoto {
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);