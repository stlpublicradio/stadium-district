require("./lib/pym");

// using d3 for convenience
var map;
var stadiums;

function createBottomMap() {
  container = document.getElementById("bottom-map-container");
  container.style.height = window.innerHeight * 0.6;

  heightString = "height:" + window.innerHeight * 0.6 + "px";

  container.setAttribute("style", heightString);

  mapboxgl.accessToken =
    "pk.eyJ1Ijoic3RscHIiLCJhIjoicHNFVGhjUSJ9.WZtzslO6NLYL8Is7S-fdxg";
  bottom_map = new mapboxgl.Map({
    container: "bottom-map", // container id
    style: "mapbox://styles/mapbox/light-v10", // stylesheet location
    center: [-90.2019815, 38.6268055], // starting position [lng, lat]
    zoom: 9, // starting zoom
    bearing: 0,
    pitch: 0
  });

  bottom_map.setMaxBounds([
    [-91.2544739246, 37.8312261887],
    [-89.176684618, 39.4210941085]
  ]);
  bottom_map.addControl(new mapboxgl.NavigationControl());

  bottom_map.on("load", function() {
    cityColors = {
      "St. Louis": "#cc203b",
      Atlanta: "#666",
      Boston: "#cc0000",
      Chicago: "#006c8e",
      Cincinnati: "#f6883e",
      Cleveland: "#6b6256",
      Dallas: "#449970",
      Denver: "#571751",
      Detroit: "#358fb3",
      Houston: "#f6883e",
      "Kansas City": "#358fb3",
      "Los Angeles": "#358fb3",
      "Minneapolis-St. Paul": "#571751",
      Miami: "#70a99a",
      "New York City": "#cc203b",
      Nashville: "#f1bb4f",
      Philadelphia: "#449970",
      Phoenix: "#70a99a",
      Pittsburgh: "#f1bb4f",
      "San Francisco": "#31716e",
      Seattle: "#31716e",
      "Tampa Bay": "#f6883e",
      Toronto: "#55b7d9",
      "Washington D.C.": "#cc203b"
    };
    cities = Object.keys(stadiums);
    for (i = 0; i < cities.length; i++) {
      bottom_map.addLayer({
        id: cities[i],
        type: "circle",
        source: {
          type: "geojson",
          data: stadiums[cities[i]]["geojson"]
        },
        paint: {
          "circle-radius": 5,
          "circle-color": cityColors[cities[i]],
          "circle-opacity": 0.8
        }
      });
      bottom_map.addLayer({
        id: cities[i] + " labels",
        type: "symbol",
        source: {
          type: "geojson",
          data: stadiums[cities[i]]["geojson"]
        },
        layout: {
          "text-field": ["concat", ["get", "name"], " (" + cities[i] + ")"],
          "text-offset": [0, 0.9],
          "text-anchor": "top",
          "text-size": 10,
          visibility: "none"
        },
        paint: {
          "text-halo-color": "rgba(230, 230, 230, .8)",
          "text-halo-width": 1
        }
      });
    }
  });

  bottom_map.on("mousemove", function(e) {
    var features = bottom_map.queryRenderedFeatures(e.point, {
      layers: cities
    });
    if (features.length == 1) {
      bottom_map.setPaintProperty(
        features[0]["layer"]["id"],
        "circle-opacity",
        1
      );
      bottom_map.setPaintProperty(
        features[0]["layer"]["id"],
        "circle-radius",
        10
      );
      bottom_map.setLayoutProperty(
        features[0]["layer"]["id"] + " labels",
        "visibility",
        "visible"
      );
      for (i = 0; i < cities.length; i++) {
        if (cities[i] != features[0]["layer"]["id"]) {
          bottom_map.setPaintProperty(cities[i], "circle-opacity", 0.2);
        }
      }
    } else {
      for (i = 0; i < cities.length; i++) {
        bottom_map.setPaintProperty(cities[i], "circle-opacity", 0.8);
        bottom_map.setPaintProperty(cities[i], "circle-radius", 5);
        bottom_map.setLayoutProperty(
          cities[i] + " labels",
          "visibility",
          "none"
        );
      }
    }
  });
}

var requestURL = "assets/stadiums.json";
var request = new XMLHttpRequest();

request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function() {
  stadiums = request.response;
  // for (i=0,i<stadiums.length;i++;) {
  // }
};

function init() {
  createBottomMap();
}
// kick things off
init();
