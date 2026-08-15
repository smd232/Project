mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

console.log(listing.geometry.coordinates);

// create a marker at a coordinate
const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl
    .Popup({ offset: 25, })
    .setHTML(`<p>Where you'll be living!</p>`))
    .addTo(map);
