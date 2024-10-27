var map = L.map('map').setView([51.20603921691239, 4.252800555085014], 11);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var Icon = L.icon({
    iconUrl: 'assets/RodeLogo.png',
    iconSize: [50, 50], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
});

L.marker([51.17509732545995, 4.132945684054579], { icon: Icon }).addTo(map);
L.marker([51.22996995326738, 4.41619900183746], { icon: Icon }).addTo(map);

// PRODUCTPAGINA FILTER //

function applyFilter() {
    const vermogenFilter = document.getElementById("vermogenFilter").checked;
    const carrosserieFilter = document.getElementById("carrosserieFilter").checked;
    const ecuFilter = document.getElementById("ecuFilter").checked;
    const maxPrice = parseInt(document.getElementById("priceRange").value, 10);
  
    // Haal alle producten op
    const products = document.querySelectorAll(".productContainer .product");
  
    // Filter elk product
    products.forEach((product) => {
      const productPrice = parseInt(product.querySelector(".price").textContent.replace('$', ''), 10);
      const matchesPrice = productPrice <= maxPrice;
  
      // Controleer categorieën
      const matchesVermogen = vermogenFilter && product.classList.contains("vermogen");
      const matchesCarrosserie = carrosserieFilter && product.classList.contains("carrosserie");
      const matchesEcu = ecuFilter && product.classList.contains("ecu");
  
      // Product tonen of verbergen
      if ((matchesVermogen || matchesCarrosserie || matchesEcu || (!vermogenFilter && !carrosserieFilter && !ecuFilter)) && matchesPrice) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }
  

