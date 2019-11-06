require("./lib/pym");


// using d3 for convenience
var map;
var main = d3.select('main')
var scrolly = main.select('#scrolly');
var figure = scrolly.select('figure');
var article = scrolly.select('article');
var step = article.selectAll('.step');
// initialize the scrollama
// var scroller = scrollama();
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
    // scroller.resize();
}

steps = step.nodes();

function callback (entries, observer) {
    console.log('entries:', entries);
    console.log('observer:', observer);
}

const observer = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            handleStepEnter(entry.target.getAttribute('data-step'))
        }
    })

});

Array.prototype.forEach.call(steps, (el) => {
    observer.observe(el);
})




// scrollama event handlers
function handleStepEnter(response) {
    // response = { element, direction, index }
    // add color to current step only
    step.classed('is-active', function (d, i) {
        return i === response;
    })
    // update graphic based on step
    figure.select('p').text(response + 1);

    if (response == 1) {
        map.flyTo({
            zoom: 14, // starting zoom
            bearing: 90,
            pitch: 60,
            speed: 0.4,
            curve: 1,
            easing: function (t) {
                return t;
            }
        })
        setTimeout(function () {
        map.setPaintProperty('stl', 'circle-radius', 10);
        map.setPaintProperty('stl-measurement', 'line-opacity', 0);
        map.setPaintProperty('stl', 'circle-opacity', 1);
        
        map.setPaintProperty('phi', 'circle-radius', 10);
        map.setPaintProperty('phi', 'circle-opacity', 0);
        map.setPaintProperty('phi-measurement', 'line-opacity', 0);

        map.setPaintProperty('kc', 'circle-radius', 10);
        map.setPaintProperty('kc', 'circle-opacity', 0);
        map.setPaintProperty('kc-measurement', 'line-opacity', 0);
    }, 1000);

    }
    
    if (response == 2) {
        map.flyTo({
            bearing: 0,
            zoom: 13,
            pitch: 0,
            speed: 0.4,
            curve: 1,
            easing: function (t) {
                return t;
            }
        })

        setTimeout(function () {
            map.setPaintProperty('stl', 'circle-radius', 10);
            map.setPaintProperty('stl-measurement', 'line-opacity', .8);
            map.setPaintProperty('stl', 'circle-opacity', 1);
            
            map.setPaintProperty('phi', 'circle-radius', 10);
            map.setPaintProperty('phi', 'circle-opacity', 0);
            map.setPaintProperty('phi-measurement', 'line-opacity', 0);
    
            map.setPaintProperty('kc', 'circle-radius', 10);
            map.setPaintProperty('kc', 'circle-opacity', 0);
            map.setPaintProperty('kc-measurement', 'line-opacity', 0);        }, 1000);

    }

    if (response == 3) {

        map.flyTo({
            bearing: 0,
            zoom: 15,
            pitch: 0,
            speed: 0.4,
            curve: 1,
            easing: function (t) {
                return t;
            }
        })

        setTimeout(function () {
                        
            map.setPaintProperty('stl', 'circle-radius', 10);
            map.setPaintProperty('stl-measurement', 'line-opacity', 0);
            map.setPaintProperty('stl', 'circle-opacity', .7);
            
            map.setPaintProperty('phi', 'circle-radius', 10);
            map.setPaintProperty('phi', 'circle-opacity', 1);
            map.setPaintProperty('phi-measurement', 'line-opacity', .8);
            
            map.setPaintProperty('kc-measurement', 'line-opacity', 0);
            map.setPaintProperty('kc', 'circle-opacity', 0);
            
            

        }, 1000)
    }

    if (response == 4) {
        map.flyTo({
            bearing: 0,
            zoom: 10,
            pitch: 0,
            speed: 0.6,
            curve: 1,
            easing: function (t) {
                return t;
            }
        })

        setTimeout(function () {
            map.setPaintProperty('phi-measurement', 'line-opacity', 0);
            map.setPaintProperty('kc', 'circle-opacity', 1);
            map.setPaintProperty('kc-measurement', 'line-opacity', .8);
            map.setPaintProperty('phi', 'circle-radius', 4);
            map.setPaintProperty('stl', 'circle-radius', 4);
            map.setPaintProperty('phi', 'circle-opacity', 1);
            map.setPaintProperty('stl', 'circle-opacity', 1);
        }, 1000)
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
                    }, {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.2025, 38.626667]
                        },
                        "properties": {
                            "title": "Enterprise Center",
                        }
                    }, {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.210907, 38.631111]
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
        circle_center = [-90.2019815, 38.6268055];
        var stl_circle = turf.circle(circle_center, .9127259383682821);
        map.addLayer({
            "id": "stl-measurement",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [stl_circle, {
                        "type": "Feature",
                        "geometry": {
                            "type": "LineString",
                            "coordinates": [
                                [-90.210907, 38.631111],
                                [-90.193056, 38.6225]
                            ]
                        }
                    }]
                }
            },
            "paint": {
                "line-opacity": 0,
                "line-width": 3,
                "line-dasharray": [3, 2]
            }
        }, 'stl');

        map.addLayer({
            "id": "phi",
            "type": "circle",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.20045354498988,38.62412768492097]
                        },
                        "properties": {
                            "title": "Lincoln Financial Field",
                        }
                    }, {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.2048011735628,38.624515978971736]
                        },
                        "properties": {
                            "title": "Wells Fargo Center",
                        }
                    }, {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.19915744935304,38.62909481582355]
                        },
                        "properties": {
                            "title": "Citizens Bank Park",
                        }
                    }, ]
                }
            },
            'paint': {
                "circle-radius": 10,
                "circle-color": '#31716e',
                "circle-opacity": 0
            }
        })

        var phi_circle = turf.circle(circle_center, .35362);
        map.addLayer({
            "id": "phi-measurement",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [phi_circle, {
                        "type": "Feature",
                        "geometry": {
                            "type": "LineString",
                            "coordinates": [
                                [-90.2048011735628,38.624515978971736],
                                [-90.19915744935304,38.62909481582355]
                            ]
                        }
                    }]
                }
            },
            "paint": {
                "line-opacity": 0,
                "line-width": 3,
                "line-dasharray": [3, 2]
            }
        }, 'phi');

        map.addLayer({
            "id": "kc",
            "type": "circle",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [{
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.0375391791927,38.582664531194844]
                        },
                        "properties": {
                            "title": "Arrowhead Stadium",
                        }
                    }, {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.03407886015619,38.585034079760405]
                        },
                        "properties": {
                            "title": "Kauffman Stadium",
                        }
                    }, {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": [-90.37008784281909,38.668342252633735]
                        },
                        "properties": {
                            "title": "Children's Mercy Park",
                        }
                    }, ]
                }
            },
            'paint': {
                "circle-radius": 10,
                "circle-color": '#006c8e',
                "circle-opacity": 0
            }
        })

        var kc_circle = turf.circle(circle_center, 15.348);
        map.addLayer({
            "id": "kc-measurement",
            "type": "line",
            "source": {
                "type": "geojson",
                "data": {
                    "type": "FeatureCollection",
                    "features": [kc_circle, {
                        "type": "Feature",
                        "geometry": {
                            "type": "LineString",
                            "coordinates": [
                                [-90.03407886015619,38.585034079760405],
                                [-90.37008784281909,38.668342252633735]
                            ]
                        }
                    }]
                }
            },
            "paint": {
                "line-opacity": 0,
                "line-width": 3,
                "line-dasharray": [3, 2]
            }
        }, 'kc');





        

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
    // scroller.setup({
    //         step: '#scrolly article .step',
    //         offset: 0.85,
    //         debug: false,
    //     })
    //     .onStepEnter(handleStepEnter)
    // setup resize event
    window.addEventListener('resize', handleResize);

    createMap();

    const YTPlayer = require('yt-player')

    console.log(window.innerWidth)
    const player = new YTPlayer('#youtube', {'width': window.innerWidth, 'height': window.innerHeight/3, 'autoplay':true })
     
    player.load('gDcKT0X_uUo')
    player.setVolume(0)
    player.play()
    player.on('ended', () => {player.play()})

              
}
// kick things off
init();