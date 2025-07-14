// Global variables
let umkmData = [];
let map;
let markers = [];
let userLocation = null;
let routingControl = null; // Routing control instance
let userMarker = null; // Marker dedicated for user's live location
let isWatchingLocation = false; // To track if watchPosition is active

// Sample data for demonstration
const sampleUMKM = [
    // 15 UMKM Kuliner
    {
        id: 1,
        nama: "Geprek Nemen Sarirejo",
        pemilik: "Geprek Nemen",
        kategori: "kuliner",
        deskripsi: "Ayam Geprek dengan sambel yang sangat pedan dan nikmat",
        rt: "03",
        rw: "05",
        alamat: "Jl. Tiber no.9, Sarirejo,Semarang Timur,Semarang,50124",
        telepon: "081234537390",
        produk: "Nasi Ayam Geprek Jumbo,Nasi Ayam Geprek bakar ",
        jamBuka: "06:00",
        jamTutup: "23:00",
        latitude: -6.984804129731262,
        longitude:  110.43295339058004,
        foto: "https://i.pinimg.com/736x/dc/6e/fe/dc6efee4c1db1f0983bac146206f055b.jpg",
        menuPhotos: [
            "https://i.pinimg.com/736x/0c/d4/f1/0cd4f1b2cf29aee6d3e5ca0346107a34.jpg",
            "https://i.pinimg.com/736x/40/23/49/40234994e616c2042e9a8d2fc2bb19cc.jpg"
        ]
    },
    {
        id: 2,
        nama: "Nasi Goreng Bu Ninik",
        pemilik: "Bu Ninik",
        kategori: "kuliner",
        deskripsi: "Nasi Goreng Bu Ninik Yang Enakk dan Lezat",
        rt: "06",
        rw: "02",
        alamat: "Jl. Leduwi Selatan No. 144,",
        telepon: "081355618901",
        produk: "Nasi goreng,Nasi goreng sosis,Nasi goreng ayam",
        jamBuka: "00:00",
        jamTutup: "23:59",
        latitude: -6.978943250891293,
        longitude:  110.43264106729852,
        foto: "https://i.pinimg.com/1200x/f8/47/3f/f8473f75e368eee2c7c8cdbf4b0af969.jpg",
        menuPhotos: [
            "https://i.pinimg.com/736x/b4/0a/0d/b40a0db184e034d0b7e900527b3e57ef.jpg"
        ]
    },
    {
        id: 3,
        nama: "Soto Ayam Dargo",
        pemilik: "Pak Tanto",
        kategori: "kuliner",
        deskripsi: "Soto Ayam Dargo",
        rt: "01",
        rw: "01",
        alamat: "Jl. Dargo No.60",
        telepon: "082135295881",
        produk: "Soto Ayam",
        jamBuka: "05:00",
        jamTutup: "14:00",
        latitude: -6.975892071352934, 
        longitude: 110.43322361215793,
        foto: "https://i.pinimg.com/736x/60/45/87/6045870dbe22e2ec93ac6905317dc92e.jpg",
        menuPhotos: [
            "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=150&fit=crop"
        ]
    },
    {
        id: 4,
        nama: "Durian Adek Abang",
        pemilik: "Durian Adek Abang",
        kategori: "kuliner",
        deskripsi: "Durian yang enak dan lezat",
        rt: "03",
        rw: "08",
        alamat: "Jl. Petelan Utara",
        telepon: "082134538357",
        produk: "Es Campur, Es Cendol, Es Dawet, Jus Buah",
        jamBuka: "24 jam",
        jamTutup: "24 jam",
        latitude: -6.978306707182357, 
        longitude: 110.43385616652515,
        foto: "https://i.pinimg.com/736x/cd/22/fc/cd22fcd1684852133ba360d20d59bbdf.jpg",
        menuPhotos: [
            "https://i.pinimg.com/1200x/30/38/22/3038225ec44ffba361c8aae5b00cb7db.jpg"
        ]
    },
    {
        id: 5,
        nama: "Samiroso Sea Food",
        pemilik: "Samiroso",
        kategori: "kuliner",
        deskripsi: "Sea food ikan,kepiting,kerang dengan saus yang khas dan enak",
        rt: "04",
        rw: "01",
        alamat: "Jl. RA.Kartini",
        telepon: "081390990981",
        produk: "Ikan air tawar air asin,Kepiting,Kerang,Cumi-cumi",
        jamBuka: "16:00",
        jamTutup: "23:00",
        latitude: -6.9852232886397925, 
        longitude: 110.43255454751294,
        foto: "https://i.pinimg.com/736x/b4/86/75/b486756fbbf0d4617cdd37d9a36688a5.jpg",
        menuPhotos: [
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrEeNvfT2aYsawNWwTBlA0RTcmcBIQSLERT-9u7Vtua3j3Kvr8pmo39vxnGCAD7lOxe4fjgkKnwfVbw6mQLboyOd7OVuesS-uqoaI6EqQYsT7Fxw7u7G-Wzxib7NdWdfJ-Gn1cX5g=w140-h140-p-k-no"
        ]
    },
    {
        id: 6,
        nama: "Wedang Ronde Mahkota",
        pemilik: "Wedang Ronde Mahkota",
        kategori: "kuliner",
        deskripsi: "Wedang Ronde Segerrr",
        rt: "06",
        rw: "04",
        alamat: "Jl. Ligu Tengah No. 1062B",
        telepon: "085789012345",
        produk: "Wedang Ronde",
        jamBuka: "10:30",
        jamTutup: "21:00",
        latitude: -6.982953887019357, 
        longitude: 110.4339317411032,
        foto: "https://i.pinimg.com/736x/01/41/00/014100b1f6df58cea280ce72f5bd90cd.jpg",
        menuPhotos: [
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4noE9goTQlmHFe2f661thbGRPz3RwpFchEh8zbkKJl2-WLssSopRvv_Ljm6NEeZgL7Y05hyYLyUnzeUAl9V8uvNVrR4kP8wF5yrCWC5Vnw8fp6Bp49n9qaAZlCucSfiuK7YP2yAevw=w140-h140-p-k-no"
        ]
    },
    {
        id: 7,
        nama: "Omah Babi Ninik",
        pemilik: "Ninik",
        kategori: "kuliner",
        deskripsi: "Olahan B2 yang lezat dan nikmat",
        rt: "02",
        rw: "03",
        alamat: "Jl. Karang Kojo No. 443",
        telepon: "082288488005",
        produk: "Nasi campur omah babi Ninik, Babi Carsio,Babi Cabe garam",
        jamBuka: "10:00",
        jamTutup: "17:00",
        latitude: -6.981405682002962,
        longitude: 110.43267988120432,
        foto: "https://i.pinimg.com/736x/d5/ab/a5/d5aba5aef1cf0e3c06709a3e848bd6b6.jpg",
        menuPhotos: [
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4np27evWVEEqY-QRqu8CmID1DB_J6M9YEgZHFtwcrmpLwVIWSiuEuevp4l5JbVTk7ceJoImYayXBTUkUilBAsD7G7-rieAIoe0yUw5Sia1arb6U1X5BWCw6Bs9i4cn6FI2kuvCtY=w140-h140-p-k-no"
        ]
    },
    {
        id: 8,
        nama: "Penguin Ice Cream",
        pemilik: "Toko Es Krim",
        kategori: "kuliner",
        deskripsi: "Ice Cream Enakkk",
        rt: "01",
        rw: "03",
        alamat: "Jl. Ligu Tengah No. 1085",
        telepon: "0895384010177",
        produk: "Ice Cream berbagai rasa",
        jamBuka: "08:00",
        jamTutup: "18:00",
        latitude: -6.983033053771253,
        longitude:  110.43339907918535,
        foto: "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrmQ6vwxzCyPq_vYnUEdsVPyY5UdI2KSCGY0P7TzeawLHm7L8NEsEk_0rqqnyTUzHhdCDNrk7pNxn6sxcY02NzluED9oQYgg0gAeLdsiMuBt9M_3aC46QcNk1ozSkyyULU9y7v7NA=w215-h280-p-k-no",
        menuPhotos: [
            "https://lh3.googleusercontent.com/gps-cs-s/AC9h4np4qhXPZGEoiS1YM8o48bMp52xKgmw7-CzBPDJ_msuxOk0RBdsj8EiPn8zXVMWrN2-TFeSL9BsluBXKt9crCs0yQ8DTkZqSXkGLL54FaaKOOSBXr8v_BTV3ukOojcn8FA68hUx4vQ=w215-h280-p-k-no"
        ]
    },
    {
        id: 9,
        nama: "Pedass pedass",
        pemilik: "toko makanan",
        kategori: "kuliner",
        deskripsi: "pangsit buatan sendiri",
        rt: "02",
        rw: "08",
        alamat: "Jl. Petelan Utara No. 904e",
        telepon: "089675897796",
        produk: "Pangsit Rebus",
        jamBuka: "09:30",
        jamTutup: "22:00",
        latitude: -6.9786099888146875, 
        longitude: 110.43347595151536,
        foto: "https://i.pinimg.com/736x/08/fa/c2/08fac2c47394bd0296e44183a1f1ba49.jpg",
        menuPhotos: [
            "https://i.pinimg.com/736x/ae/fe/0d/aefe0dee61fdadebe60e40da25a61816.jpg"
        ]
    },
    {
        id: 10,
        nama: "Omah Pawon 88 & Marcello Brownies",
        pemilik: "Pawon 88",
        kategori: "kuliner",
        deskripsi: "Brownies",
        rt: "04",
        rw: "03",
        alamat: "Jl. Gebang Anom No. 61",
        telepon: "082122987388",
        produk: "Brownies",
        jamBuka: "11:00",
        jamTutup: "08:00",
        latitude: -6.976565806312878, 
        longitude: 110.43325919721192,
        foto: "https://i.pinimg.com/736x/20/39/30/2039304eb3922eaf939588bbdccdd874.jpg",
        menuPhotos: [
            "https://i.pinimg.com/736x/0a/ee/62/0aee62f97500118c47d85d8710cf5cf8.jpg"
        ]
    },
    {
        id: 11,
        nama: "Warung Makan Bu Tiah",
        pemilik: "Tiah",
        kategori: "kuliner",
        deskripsi: "Masakan Rumah",
        rt: "05",
        rw: "01",
        alamat: "Jl. Gebang Anom No. 77",
        telepon: "",
        produk: "Masakan Ayam Goreng,sayur sop,sayur mangut",
        jamBuka: "12:00",
        jamTutup: "21:00",
        latitude: -6.98350,
        longitude: 110.43100,
        foto: "https://i.pinimg.com/736x/c6/b7/c3/c6b7c33982e3094e55706806d58a7cab.jpg",
        menuPhotos: [
            "https://i.pinimg.com/736x/c6/b7/c3/c6b7c33982e3094e55706806d58a7cab.jpg"
        ]
    },
    {
        id: 12,
        nama: "Swike Pak Tubi",
        pemilik: "Pak Tubi",
        kategori: "kuliner",
        deskripsi: "Swike Goreng,Swike Kuah",
        rt: "01",
        rw: "02",
        alamat: "Jl. Karang Kb.Utara ",
        telepon: "091345678901",
        produk: "Swike Goreng,Swike Kuaho",
        jamBuka: "09:00",
        jamTutup: "21:00",
        latitude: -6.979407102382801, 
        longitude: 110.43290301510612,
        foto: "https://i.pinimg.com/1200x/ab/8f/7d/ab8f7d1faae5cbc298604616d2c7e53e.jpg ",
        menuPhotos: [
            "https://lh3.googleusercontent.com/p/AF1QipOKXYa40qeiSnV1wIX31pJ5IVbXOfdMcCi4kEnh=w140-h140-p-k-no"
        ]
    },
    {
        id: 13,
        nama: "Leker Paimo",
        pemilik: "Paimo",
        kategori: "kuliner",
        deskripsi: "Leker coklat,leker keju",
        rt: "02",
        rw: "04",
        alamat: "Jl. Karang Kojo No.37",
        telepon: "08156595412",
        produk: "Leker coklat,leker keju",
        jamBuka: "09:00",
        jamTutup: "17:00",
        latitude: -6.982081452214873, 
        longitude: 110.42916401695828,
        foto: "https://i.pinimg.com/1200x/3d/31/49/3d3149f137418f1b749342fb33501f9e.jpg",
        menuPhotos: [
            "https://i.pinimg.com/736x/04/ce/51/04ce51e063c3b511809e39759b8c2046.jpg"
        ]
    },
    {
        id: 14,
        nama: "Kedai Teras Ny.Wiing",
        pemilik: "Ny.Wiling",
        kategori: "kuliner",
        deskripsi: "Nasi Ayam Goreng,Galantin,Mendoan",
        rt: "04",
        rw: "04",
        alamat: "Jl. Ligu Tengah No. 1083",
        telepon: "093567890123",
        produk: "Nasi Ayam Goreng,Galantin,Mendoan",
        jamBuka: "11:00",
        jamTutup: "20:00",
        latitude: -6.982857376613472,
        longitude: 110.43365957325264,
        foto: "https://i.pinimg.com/1200x/ab/fb/ae/abfbaed7a3e24d86f054ac256fe52b19.jpg",
        menuPhotos: [
            "https://i.pinimg.com/736x/ee/d6/06/eed606cad5f6195b8e4c695874fc4259.jpg"
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
        alamat: "Jl. Leduwi Utara No. 89",
        telepon: "094678901234",
        produk: "Cendol, Dawet, Es Kelapa Muda, Kolak",
        jamBuka: "09:00",
        jamTutup: "21:00",
        latitude: -6.9788989626230205, 
        longitude: 110.43200602913592,
        foto: "https://i.pinimg.com/736x/33/c6/3d/33c63db30d1f536519251c4510117472.jpg",
        menuPhotos: [
            "https://i.pinimg.com/736x/d8/b5/f7/d8b5f7687880b2761a99d770189267a8.jpg"
        ]
    },
    // 10 UMKM Jasa
    {
        id: 16,
        nama: "Bengkel Tegal Motor",
        pemilik: "Bengkel Tegar Montor",
        kategori: "jasa",
        deskripsi: "Jasa Servis Montor dan reparasi montor",
        rt: "07",
        rw: "07",
        alamat: "Jl. Petelan Tengah No. 843",
        telepon: "085740550417",
        produk: "Servis Montor",
        jamBuka: "08:00",
        jamTutup: "17:00",
        latitude: -6.920012413296986, 
        longitude: 110.43230,
        foto: "https://i.pinimg.com/736x/2b/50/27/2b5027b5acaa186e841b28c3fd1d3da5.jpg"
    },
    {
        id: 17,
        nama: "Jantan Jasa Antar Muatan Roda 3",
        pemilik: "Jantan",
        kategori: "jasa",
        deskripsi: "Jasa Antar kemana saja",
        rt: "01",
        rw: "01",
        alamat: "Jl. Gendong Saluran No. 1227",
        telepon: "081227360336",
        produk: "Jasa Kurir",
        jamBuka: "06:00",
        jamTutup: "22:00",
        latitude: -6.983979711568649, 
        longitude: 110.4335008358384,
        foto: "https://i.pinimg.com/1200x/1f/d0/03/1fd003afa11df79f2e2ea2a9eb7f4a6d.jpg"
    },
    {
        id: 18,
        nama: "Aziz Klise",
        pemilik: "Aziz Klise",
        kategori: "jasa",
        deskripsi: "Toko Percetakan",
        rt: "03",
        rw: "06",
        alamat: "Jl. Gendong Utara No. 668A",
        telepon: "081315431979",
        produk: "Percetakan",
        jamBuka: "08:00",
        jamTutup: "20:30",
        latitude: -6.98170240743236, 
        longitude: 110.43353566652512,
        foto: "https://i.pinimg.com/1200x/f4/0e/14/f40e142a5296876d73804cce89b86c7e.jpg"
    },
    {
        id: 19,
        nama: "LA College",
        pemilik: "Bimble",
        kategori: "jasa",
        deskripsi: "Pusat Pembelajaran",
        rt: "01",
        rw: "08",
        alamat: "Jl. Petelan Utara No. 904",
        telepon: "085329596684",
        produk: "Bimble inovasi terbaru adanya kombinasi dimble offline & online",
        jamBuka: "16:00",
        jamTutup: "19:00",
        latitude: -6.9786023112525335, 
        longitude: 110.43379481070431,
        foto: "https://i.pinimg.com/736x/a5/a6/80/a5a680c70f04b8e85042912eb25b00fd.jpg"
    },
    {
        id: 20,
        nama: "Servis Tv Pak Di",
        pemilik: "Di",
        kategori: "jasa",
        deskripsi: "Servis segala merk Tv",
        rt: "01",
        rw: "01",
        alamat: "Jl. Dargo Dalam No. 52",
        telepon: "(024) 3561120",
        produk: "Servis Tv",
        jamBuka: "07:30",
        jamTutup: "21:00",
        latitude: -6.975750903555167, 
        longitude: 110.43288789536076,
        foto: "https://i.pinimg.com/1200x/2e/18/de/2e18de3d59de41f4161255e2f967d1c2.jpg"
    },
    {
        id: 21,
        nama: "Disa Salon",
        pemilik: "Disa",
        kategori: "jasa",
        deskripsi: "Jasa Salon",
        rt: "02",
        rw: "06",
        alamat: "Jl. Gebang Anom No. 57",
        telepon: "085890123456",
        produk: "Salon",
        jamBuka: "09:00",
        jamTutup: "18:00",
        latitude: -6.976458587064341, 
        longitude: 110.43307432466634,
        foto: "https://i.pinimg.com/1200x/4a/9e/33/4a9e33ee287b40f7deceb8e2cccb4ae2.jpg"
    },
    {
        id: 22,
        nama: "MRK nailart and eyelashes",
        pemilik: "MRK nailart and eyelashes",
        kategori: "jasa",
        deskripsi: "jasa MRK nailart and eyelashes",
        rt: "01",
        rw: "01",
        alamat: "Jl. Gebang Anom No. 83",
        telepon: "08112678288",
        produk: "MRK nailart and eyelashes",
        jamBuka: "09:00",
        jamTutup: "17:00",
        latitude: -6.976441707459083, 
        longitude: 110.43335530885341,
        foto: "https://i.pinimg.com/736x/89/b6/4c/89b64c6d7ace13645150d8ca782c3aa2.jpg"
    },
    {
        id: 23,
        nama: "Bengkel cat Sutikno",
        pemilik: "Sutikno",
        kategori: "jasa",
        deskripsi: "Jasa Bengkel cat Mobil dll",
        rt: "04",
        rw: "04",
        alamat: "Jl. Karang Kojo Utara",
        telepon: "081326770201",
        produk: "repair cat mobil dll",
        jamBuka: "07:00",
        jamTutup: "21:00",
        latitude: -6.982672155577574, 
        longitude: 110.43183372923848,
        foto: "https://i.pinimg.com/736x/1a/3f/52/1a3f526fe29f3e595278753c68952b84.jpg"
    },
    {
        id: 24,
        nama: "Toko Usaha Baru",
        pemilik: "Toko Usaha Baru",
        kategori: "jasa",
        deskripsi: "Jasa renovasi dan pembangunan rumah",
        rt: "04",
        rw: "04",
        alamat: "Jl. Karang Kojo Utara No. 393",
        telepon: "088123456789",
        produk: "Renovasi Rumah, Cat Dinding, Keramik, Plester",
        jamBuka: "08:00",
        jamTutup: "17:00",
        latitude: -6.9812345033121215, 
        longitude: 110.43215559431387,
        foto: "https://i.pinimg.com/736x/d1/59/22/d15922640ecd3e4a79eb11ef62bdc428.jpg"
    },
    {
        id: 25,
        nama: "Berkah Laundry",
        pemilik: "Berkah Laundry",
        kategori: "jasa",
        deskripsi: "Laundry",
        rt: "05",
        rw: "04",
        alamat: "Jl. Ligu Tengah No. 45",
        telepon: "087728739385",
        produk: "Laundry",
        jamBuka: "24 jam",
        jamTutup: "24 jam",
        latitude: -6.982128924336124, 
        longitude: 110.43225208464636,
        foto: "https://i.pinimg.com/1200x/e1/e0/01/e1e00197e22cc000b3102b3b5fd92afb.jpg"
    }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    umkmData = [...sampleUMKM];
    initNavigation();
    initMap();
    initFilters();
    initModal();
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
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            views.forEach(v => v.classList.remove('active'));
            document.getElementById(`${targetView}View`).classList.add('active');
            if (targetView === 'map') {
                setTimeout(() => map.invalidateSize(), 100);
            }
        });
    });
}

// Map initialization
function initMap() {
    const newCenterLat = -6.981652;
    const newCenterLng = 110.433190;
    map = L.map('map').setView([newCenterLat, newCenterLng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    L.marker([newCenterLat, newCenterLng])
        .addTo(map)
        .bindPopup('<strong>Pusat Area UMKM</strong>')
        .openPopup();
    document.getElementById('locateBtn').addEventListener('click', startWatchingLocation);
    document.getElementById('resetMapBtn').addEventListener('click', resetMap);
    document.getElementById('clearRouteBtn').addEventListener('click', clearRoute);
}

// --- LOCATION & ROUTING FUNCTIONS IMPROVED ---

function startWatchingLocation() {
    if (isWatchingLocation) {
        alert('Pelacakan lokasi sudah aktif.');
        if (userLocation) map.setView(userLocation, 17);
        return;
    }

    if (!navigator.geolocation) {
        alert('Browser Anda tidak mendukung Geolocation API.');
        return;
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    alert('Mengaktifkan pelacakan lokasi presisi tinggi...');

    navigator.geolocation.watchPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const newLatLng = L.latLng(lat, lng);
            userLocation = [lat, lng];

            if (!userMarker) {
                const blueIcon = L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                    shadowSize: [41, 41]
                });
                userMarker = L.marker(newLatLng, { icon: blueIcon }).addTo(map)
                    .bindPopup('<b>Ini Lokasi Anda</b>')
                    .openPopup();
                map.setView(newLatLng, 17);
            } else {
                userMarker.setLatLng(newLatLng);
            }

            if (routingControl) {
                const waypoints = routingControl.getWaypoints();
                waypoints[0].latLng = newLatLng;
                routingControl.setWaypoints(waypoints);
            }

            isWatchingLocation = true;
        },
        (error) => {
            alert(`ERROR(${error.code}): ${error.message}. Pastikan GPS dan izin lokasi aktif.`);
            isWatchingLocation = false;
        },
        options
    );
}

function resetMap() {
    const newCenterLat = -6.981652;
    const newCenterLng = 110.433190;
    map.setView([newCenterLat, newCenterLng], 16);
}

function clearRoute() {
    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
        document.getElementById('clearRouteBtn').style.display = 'none';
    }
}

function showRoute(destinationLat, destinationLng) {
    if (!userLocation) {
        alert('Mohon aktifkan lokasi Anda terlebih dahulu dengan menekan tombol "Lokasi Saya".');
        startWatchingLocation();
        return;
    }
    clearRoute();
    createRoute(destinationLat, destinationLng);
}

function createRoute(destinationLat, destinationLng) {
    document.querySelector('.nav-btn[data-view="map"]').click();

    setTimeout(() => {
        routingControl = L.Routing.control({
            waypoints: [
                L.latLng(userLocation[0], userLocation[1]),
                L.latLng(destinationLat, destinationLng)
            ],
            routeWhileDragging: false,
            showAlternatives: false,
            addWaypoints: false,
            draggableWaypoints: false,
            createMarker: function() { return null; },
            lineOptions: {
                styles: [{ color: '#2563eb', opacity: 0.8, weight: 6 }]
            }
        }).addTo(map);

        document.getElementById('clearRouteBtn').style.display = 'flex';
    }, 300);
}


function updateMapMarkers() {
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    const currentlyDisplayed = filterUMKMData();
    currentlyDisplayed.forEach(umkm => {
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
                    <p><strong>Kategori:</strong> ${capitalizeFirst(umkm.kategori)}</p>
                    <button class="map-btn" style="width:100%; margin-top: 5px;" onclick="showRoute(${umkm.latitude}, ${umkm.longitude})">
                        <i class="fas fa-route"></i> Rute ke Sini
                    </button>
                </div>`;
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

function initFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const rtFilter = document.getElementById('rtFilter');
    const rwFilter = document.getElementById('rwFilter');
    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    rtFilter.addEventListener('change', applyFilters);
    rwFilter.addEventListener('change', applyFilters);
}

function filterUMKMData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    const selectedRT = document.getElementById('rtFilter').value;
    const selectedRW = document.getElementById('rwFilter').value;
    return umkmData.filter(umkm => {
        const matchesSearch = umkm.nama.toLowerCase().includes(searchTerm) ||
            umkm.pemilik.toLowerCase().includes(searchTerm) ||
            (umkm.produk && umkm.produk.toLowerCase().includes(searchTerm)) ||
            umkm.deskripsi.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || umkm.kategori === selectedCategory;
        const matchesRT = !selectedRT || umkm.rt === selectedRT;
        const matchesRW = !selectedRW || umkm.rw === selectedRW;
        return matchesSearch && matchesCategory && matchesRT && matchesRW;
    });
}

function applyFilters() {
    const filteredData = filterUMKMData();
    displayUMKM(filteredData);
    updateMapMarkers();
}

function displayUMKM(data) {
    const grid = document.getElementById('umkmGrid');
    if (data.length === 0) {
        grid.innerHTML = '<div class="no-results">Tidak ada UMKM yang ditemukan.</div>';
        return;
    }
    grid.innerHTML = data.map(umkm => `
        <div class="umkm-card" onclick="showUMKMDetail(${umkm.id})">
            <div class="umkm-card-image">
                <img src="${umkm.foto || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'}" alt="${umkm.nama}" loading="lazy" />
                <div class="category-badge">${capitalizeFirst(umkm.kategori)}</div>
            </div>
            <div class="umkm-card-header">
                <h3>${umkm.nama}</h3>
                <p>Oleh: ${umkm.pemilik}</p>
            </div>
            <div class="umkm-card-body">
                <div class="umkm-card-content">
                    <p class="description">${umkm.deskripsi}</p>
                    <div class="umkm-info-list">
                        <div class="info">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>RT ${umkm.rt}/RW ${umkm.rw}, ${umkm.alamat || 'Sarirejo'}</span>
                        </div>
                        <div class="info">
                            <i class="fas fa-shopping-bag"></i>
                            <span>${umkm.produk || 'Layanan utama'}</span>
                        </div>
                        <div class="info">
                            <i class="fas fa-clock"></i>
                            <span>${formatJamOperasional(umkm.jamBuka, umkm.jamTutup)}</span>
                        </div>
                        ${umkm.telepon ? `
                        <div class="info">
                            <i class="fas fa-phone"></i>
                            <span>${umkm.telepon}</span>
                        </div>` : ''}
                    </div>
                </div>
                <div class="card-actions">
                    <button onclick="event.stopPropagation(); showOnMap(${umkm.id})" class="map-btn">
                        <i class="fas fa-map-marker-alt"></i> Lihat Peta
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
    document.querySelector('.nav-btn[data-view="map"]').click();
    setTimeout(() => {
        map.setView([umkm.latitude, umkm.longitude], 18);
        const targetLatLng = L.latLng(umkm.latitude, umkm.longitude);
        markers.forEach(marker => {
            if (marker.getLatLng().equals(targetLatLng)) {
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
                <h3>Galeri Menu</h3>
                <div class="menu-photos-gallery">
                    ${umkm.menuPhotos.map(photo => `<img src="${photo}" alt="Menu" class="menu-photo" loading="lazy">`).join('')}
                </div>
            </div>`;
    }
    const whatsappLink = umkm.telepon ? `https://wa.me/${formatPhoneNumberForWhatsApp(umkm.telepon)}` : '#';
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
                <h3>Lokasi & Kontak</h3>
                <p><strong>Alamat:</strong> ${umkm.alamat}</p>
                <p><strong>Telepon:</strong> ${umkm.telepon || 'Tidak tersedia'}</p>
            </div>
            <div class="detail-section">
                <h3>Produk/Layanan Utama</h3>
                <p>${umkm.produk || 'Tidak tersedia'}</p>
            </div>
            <div class="detail-section">
                <h3>Jam Operasional</h3>
                <p>${formatJamOperasional(umkm.jamBuka, umkm.jamTutup)}</p>
            </div>
            ${menuPhotosHTML}
            <div class="action-buttons">
                <button onclick="closeModal(); showOnMap(${umkm.id})" class="map-btn">
                    <i class="fas fa-map-marker-alt"></i> Lihat Peta
                </button>
                <button onclick="closeModal(); showRoute(${umkm.latitude || 0}, ${umkm.longitude || 0})" class="map-btn route-btn">
                    <i class="fas fa-route"></i> Tunjuk Arah
                </button>
                <a href="${whatsappLink}" target="_blank" class="whatsapp-btn" ${!umkm.telepon ? 'style="display:none;"' : ''}>
                    <i class="fab fa-whatsapp"></i> Hubungi
                </a>
            </div>
        </div>`;
    document.getElementById('umkmModal').style.display = 'block';
}

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

function initModal() {
    const modal = document.getElementById('umkmModal');
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatJamOperasional(jamBuka, jamTutup) {
    if (!jamBuka || !jamTutup) return 'Tidak tersedia';
    return `${jamBuka} - ${jamTutup}`;
}

function formatPhoneNumberForWhatsApp(phone) {
    if (!phone) return '';
    let cleaned = ('' + phone).replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
        cleaned = '62' + cleaned.substring(1);
    }
    return cleaned;
}
