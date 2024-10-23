var map = L.map('map').setView([51.17509732545995, 4.132945684054579], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([51.17509732545995, 4.132945684054579]).addTo(map);