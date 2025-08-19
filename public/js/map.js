// coords passed from show.ejs are [lon, lat]
const rawCoords = listing.geometry.coordinates;

// ensure it's an array and convert to numbers
const coords = Array.isArray(rawCoords) ? [Number(rawCoords[1]), Number(rawCoords[0])] : [28.6139, 77.2090]; // fallback = Delhi

// console.log("DB coords [lon, lat]:", rawCoords, " → Leaflet coords [lat, lon]:", coords);

// init map with DB coords (lat, lng)
let map = L.map("map").setView(coords, 9);

// OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
}).addTo(map);

const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Add marker with popup
L.marker(coords, { icon: redIcon }).addTo(map)
    .bindPopup(`
        <h4>${listing.title}</h4>
        <p>Exact Location Provided after booking</p>
    `);
    // .openPopup();
