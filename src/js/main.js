// require("./lib/pym");

// using d3 for convenience
var map;
var main = d3.select('main')
var scrolly = main.select('#scrolly');
var figure = scrolly.select('figure');
var article = scrolly.select('article');
var step = article.selectAll('.step');
// initialize the scrollama
var scroller = scrollama();
// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.75);
    step.style('height', stepH + 'px');
    var figureHeight = window.innerHeight / 1
    var figureMarginTop = (window.innerHeight - figureHeight) / 2
    figure
        .style('height', figureHeight + 'px')
        .style('top', figureMarginTop + 'px');
    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}
// scrollama event handlers
function handleStepEnter(response) {
    console.log(response)
    // response = { element, direction, index }
    // add color to current step only
    step.classed('is-active', function (d, i) {
        return i === response.index;
    })
    // update graphic based on step
    figure.select('p').text(response.index + 1);

    if (response.index == 1) {
        console.log(map)
        map.flyTo({
            bearing: 0,
            zoom: 13,
            pitch: 0,
            speed: 0.4,
            curve: 1,
            easing: function(t) { return t;}
        })
        var circle = turf.circle([-90.2019815, 38.6268055],.9127259383682821);
        map.addLayer({
            "id": "stl-measurement",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [circle]
                }
            },
            "paint": {
                "line-opacity": .5,
            "line-width": 3,
            "line-dasharray": [3,2]
            }
        }, 'stl');
    }
}

function setupStickyfill() {
    d3.selectAll('.sticky').each(function () {
        Stickyfill.add(this);
    });
}





    function createMap() {
    // create map
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3RscHIiLCJhIjoicHNFVGhjUSJ9.WZtzslO6NLYL8Is7S-fdxg';
    map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
        center: [-90.2019815, 38.6268055], // starting position [lng, lat]
        zoom: 14, // starting zoom
        bearing: 90,
        pitch: 60,
        interactive: false
    });    

    // map.on('load', function() {
    //     // Insert the layer beneath any symbol layer.
    //     var layers = map.getStyle().layers;

    //     var labelLayerId;
    //     for (var i = 0; i < layers.length; i++) {
    //     if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
    //     labelLayerId = layers[i].id;
    //     break;
    //     }
    //     }

    //     map.addLayer({
    //     'id': '3d-buildings',
    //     'source': 'composite',
    //     'source-layer': 'building',
    //     'filter': ['==', 'extrude', 'true'],
    //     'type': 'fill-extrusion',
    //     'minzoom': 15,
    //     'paint': {
    //     'fill-extrusion-color': '#aaa',

    //     // use an 'interpolate' expression to add a smooth transition effect to the
    //     // buildings as the user zooms in
    //     'fill-extrusion-height': [
    //     "interpolate", ["linear"], ["zoom"],
    //     15, 0,
    //     15.05, ["get", "height"]
    //     ],
    //     'fill-extrusion-base': [
    //     "interpolate", ["linear"], ["zoom"],
    //     15, 0,
    //     15.05, ["get", "min_height"]
    //     ],
    //     'fill-extrusion-opacity': .6
    //     }
    //     }, labelLayerId);
    //     });

    map.on('load', function () {

        
        map.addLayer({
            "id": "stl",
            "type": "circle",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.193056, 38.6225]
                        },
                        "properties": {
                            "title": "Busch Stadium",
                        }
                    },{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.2025,38.626667]
                        },
                        "properties": {
                            "title": "Enterprise Center",
                        }
                    },{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.210907,38.631111]
                        },
                        "properties": {
                            "title": "MLS Stadium (planned)",
                        }
                    }, ]
                }
            },
            'paint': {
                "circle-radius": 10,
                "circle-color": '#cc203b'
            }
        })
    });

    // var requestURL = 'assets/data.json'
    // var request = new XMLHttpRequest();

    // request.open('GET', requestURL);
    // request.responseType = 'json';
    // request.send();

    // request.onload = function () {
    //     var stadiums = request.response;
    //     // for (i=0,i<stadiums.length;i++;) {
    //     // }
    //     console.log(map)


    // }


}

function init() {
    setupStickyfill();
    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();
    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller.setup({
            step: '#scrolly article .step',
            offset: 0.85,
            debug: true,
        })
        .onStepEnter(handleStepEnter)
    // setup resize event
    window.addEventListener('resize', handleResize);

    createMap();
}
// kick things off
init();