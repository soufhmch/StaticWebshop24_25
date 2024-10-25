var map = L.map('map').setView([51.20603921691239, 4.252800555085014], 12);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var Icon = L.icon({
    iconUrl: 'assets/RodeLogo.png',
    shadowUrl: 'assets/RodeLogo.png',

    iconSize: [38, 95], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
});

L.marker([51.17509732545995, 4.132945684054579], { icon: Icon }).addTo(map);