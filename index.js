let map;
let marker;

async function initMap() {
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");

let center = { lat: -6.89031, lng: -38.55390 };

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
        marker.setPosition(pos);
      }
    );
}

const url = "https://cdn-icons-png.flaticon.com/512/10/10925.png"

  map = new Map(document.getElementById("map"), {
    center,
    zoom: 15,
    fullscreenControl: false,
    zoomControl: false,
    minZoom: 14,
    maxZoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

marker = new google.maps.Marker({
    position: center,
    map,
    title: "Hello World!",
    draggable: true,
    animation: google.maps.Animation.DROP,
    icon: {
        url,
        scaledSize:{width:50, height:50}
    }
  });

  map.addListener('click', (evt)=>{
    console.log(`${evt.latLng.lat()}, ${evt.latLng.lng()}`);
    map.panTo(evt.latLng);
    marker.setPosition(evt.latLng);
  });

  marker.addListener('dblclick', ()=>{
    const infowindow = new google.maps.InfoWindow({
        content: marker.title
    });

    infowindow.open({
        anchor: marker,
        map,
    });
  });

}

initMap();