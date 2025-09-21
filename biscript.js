let map;
let geocoder;
let marker;

function initMap() {
  // Default location (centered in India for now)
  const defaultLocation = { lat: 20.5937, lng: 78.9629 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5,
    center: defaultLocation,
  });

  geocoder = new google.maps.Geocoder();

  // Attach event listener to form
  document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const query = document.getElementById("query").value;
    searchLocation(query);
  });
}

function searchLocation(address) {
  if (!address) {
    alert("Please enter a location to search!");
    return;
  }

  geocoder.geocode({ address: address }, function (results, status) {
    if (status === "OK") {
      map.setCenter(results[0].geometry.location);
      map.setZoom(14);

      // Remove old marker if exists
      if (marker) {
        marker.setMap(null);
      }

      // Add new marker
      marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
      });
    } else {
      alert("Geocode was not successful: " + status);
    }
  });
}
