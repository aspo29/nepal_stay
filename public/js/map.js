maptilersdk.config.apiKey = mapKey;
const map = new maptilersdk.Map({
container: 'map', // container's id or the HTML element in which the SDK will render the map
style: maptilersdk.MapStyle.STREETS,
    center: JSON.parse(coordinates), // starting position [lng, lat]
zoom: 10 // starting zoom
  });
var marker = new maptilersdk.Marker({ color: "red" })
    .setLngLat(JSON.parse(coordinates))
    .addTo(map)

// Create a new popup
var popup = new maptilersdk.Popup({ offset: 25 })
    .setHTML(`<h4>${title}</h4><p>Exact location will be provided after booking</p>`);

// Attach the popup to the marker
marker.setPopup(popup);

document.getElementById('mapstyles').addEventListener('change', (e) => {
    const style_code = e.target.value.split(".");
    style_code.length === 2 ? map.setStyle(maptilersdk.MapStyle[style_code[0]][style_code[1]]) : map.setStyle(maptilersdk.MapStyle[style_code[0]]);
});