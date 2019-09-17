// require("./lib/pym");

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
    var figureHeight = window.innerHeight
    var figureMarginTop = (window.innerHeight - figureHeight) / 2
    figure
        .style('height', figureHeight + 'px')
        .style('top', figureMarginTop + 'px');

    // Set up d3 graphic

    width = document.getElementsByTagName("figure")[0].offsetWidth;
    height = figureHeight;

    d3.select('.container').attr('transform', 'translate(0,0) scale(1)')



    // xScale.range([0, width])
    // yScale.range([figureHeight, 0])

    // console.log(xScale.domain(), yScale.domain())
    // console.log(xScale(0), yScale(0))

    // svg.transition()
    //     .attr("transform", "translate(" + xScale(0) + "," + yScale(0) + ")")

    // svg.select(".cities").selectAll("circle").transition()
    //     .attr("cx", d => xScale(d.normalized_coords[0]))
    //     .attr("cy", d => yScale(d.normalized_coords[1]))

    // svg.select('.scale').selectAll("circle").transition()
    //     .attr("cx", xScale(0))
    //     .attr("cy", yScale(0))
    //     .attr("r", d => xScale(d * meters_per_mile) - xScale(0))

    // svg.selectAll('.labels').selectAll("text").transition().duration(750)
    //     .attr("x", function (d) {
    //         if (d.normalized_coords[0] > 0) {
    //             return xScale(d.normalized_coords[0]) - text_nudge_x
    //         } else {
    //             return xScale(d.normalized_coords[0]) + text_nudge_x
    //         }
    //     })
    //     .attr("y", d => yScale(d.normalized_coords[1]) + text_nudge_y)

    // svg.select('.map').transition()
    //     .attr('transform', function () {
    //         return 'translate(' + width / 2 + ',' + figureHeight / 2 + ')'
    //     })


    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

// d3 transition functions

function makeVisible(path, duration, delay) {
    path.transition("makeVisible")
        .delay(delay)
        .duration(duration)
        .transition()
        .attr('opacity', 1)
        .attr('stroke-opacity', 1)
}

function makeInvisible(path, duration, delay) {
    path.transition("makeInvisible")
        .delay(delay)
        .duration(duration)
        .transition()
        .attr('opacity', 0)
        .attr('stroke-opacity', 0)
}

function revealMeasurements(path, duration, delay) {
    path.transition("revealMeasurements")
    path.transition()
        .ease(d3.easeExp)
        .delay(delay)
        .duration(duration)
        .attr('stroke-dashoffset', 150)
}

function hideMeasurements(path, duration, delay) {
    path.transition("hideMeasurements")
    path.transition()
        .ease(d3.easeExp)
        .delay(delay)
        .duration(duration)
        .attr('stroke-dashoffset', 0)
}

function hideOldCity(oldCityClass) {
    classString = "." + oldCityClass


    old_city = svg.select(classString)

    old_city.select('.stadiums').selectAll('circle').transition().attr('fill-opacity', .5)



    old_city_measurements = old_city.select('.measurement')
    old_city.selectAll('circle.cover').call(hideMeasurements, 2000, 0)
    old_city.selectAll('line.cover').call(hideMeasurements, 2000, 0)
    old_city.selectAll("line").call(makeInvisible, 0, 2500)
    old_city.selectAll("circle").call(makeInvisible, 0, 2500)


}

function revealNewCity(newCityClass) {
    classString = "." + newCityClass

    new_city = svg.select(classString)

    new_city.call(makeVisible, 0, 0)

    new_city.select('.stadiums').selectAll('circle').transition().duration(500).attr('fill-opacity', 1)

    new_city_measurements = new_city.select('.measurement')
    new_city_measurements.call(makeVisible, 0, 500)
    new_city_measurements.selectAll("line").call(makeVisible, 0, 500)
    new_city_measurements.selectAll("circle").call(makeVisible, 0, 500)
    new_city_measurements.selectAll('circle.cover').call(revealMeasurements, 2000, 0)
    new_city_measurements.selectAll('line.cover').call(revealMeasurements, 2000, 1000)

}

// scrollama event handlers
function handleStepEnter(response) {
    console.log(response)
    // response = { element, direction, index }
    // add color to current step only
    step.classed('is-active', function (d, i) {
        return i === response.index;
    })

    if (response.index == 0) {
        scale = 6

        d3.select('.container').transition().duration(2000).attr('transform', 'translate(' + (1 - scale) * 450 + ',' + (1 - scale) * 450 + ') scale(' + scale + ')')

        stl = svg.select('.STL').select('.measurement')

        stl.selectAll('circle.cover').call(hideMeasurements, 2000, 0)
        stl.selectAll('line.cover').call(hideMeasurements, 2000, 0)
        stl.selectAll("line").call(makeInvisible, 0, 2500)
        stl.selectAll("circle").call(makeInvisible, 0, 2500)
        stl.call(makeInvisible, 0, 3000)

        svg.select('.map').call(makeVisible, 500, 2000)


        // svg.select('.measurement').transition().attr("opacity", 0)
        // svg.select('.measurement').select('circle.cover').transition().attr('stroke-dashoffset', 0)
        // svg.select('.measurement').select('.center').transition().attr('r', 0)
    }

    if (response.index == 1) {
        svg.select('.map').transition().delay(100).attr('opacity', .5)


        cur_city = svg.select('.STL').select('.measurement')
        cur_city.call(makeVisible, 0, 500)
        cur_city.selectAll("line").call(makeVisible, 0, 500)
        cur_city.selectAll("circle").call(makeVisible, 0, 500)
        cur_city.selectAll('circle.cover').call(revealMeasurements, 2000, 0)
        cur_city.selectAll('line.cover').call(revealMeasurements, 2000, 1000)



        // svg.select('.measurement').transition().delay(750).attr("opacity", 1);

        // svg.select('.measurement').select('circle.center').transition().ease(d3.easeBounce).delay(500).duration(1000).attr('r', 3);

        // svg.select('.measurement').select('circle.cover').transition().ease(d3.easeExp).delay(1000).duration(2000).attr('stroke-dashoffset', 150)

        // svg.select('.measurement').select('line.cover').transition().ease(d3.easeExp).delay(2000).duration(2000).attr('stroke-dashoffset', 150)

        svg.select('.cities').select('.Philadelphia').transition().attr("opacity", 0);
    }

    if (response.index == 2) {
        scale = 10

        d3.select('.container').transition().duration(2000).attr('transform', 'translate(' + (1 - scale) * 450 + ',' + (1 - scale) * 450 + ') scale(' + scale + ')')

        hideOldCity("STL")
        revealNewCity("Philadelphia")
    }

    if (response.index == 3) {

        console.log(d3.zoomIdentity)
        scale = 1

        d3.select('.container').transition().duration(2000).attr('transform', 'translate(' + (1 - scale) * 450 + ',' + (1 - scale) * 450 + ') scale(' + scale + ')')

        hideOldCity("Philadelphia")
        revealNewCity("Boston")


        svg.selectAll('.stadiums').selectAll('circle').transition("grow").delay(1000).attr('r', 5)




    }


    // update graphic based on step
    // figure.select('p').text(response.index + 1);


}

var meters_per_mile = 1609.34;

var svg = figure.append('svg')
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("viewBox", "0 0 900 900")
    .append('g')
    .attr('class', 'container')
    .attr("transform", "translate(0,0)");

svg.append("g").attr("class", "scale").attr('opacity', 0)
svg.append("g").attr("class", "map").attr('opacity', 1).attr('stroke-opacity', 1)
svg.append("g").attr("class", "cities")

var xScale = d3.scaleLinear()
    .range([0, 900])


var yScale = d3.scaleLinear()
    .range([900, 0])

const text_nudge_x = 3,
    text_nudge_y = 0

function drawMap() {
    var projection = d3.geoTransverseMercator()
        .rotate([90 + 30 / 60, -35 - 50 / 60])
        .scale(156000) //            .scale(1400000)
        .center([0.2437, 2.8672]); //            .center([.2355, 2.7988]);

    // var projection = d3.geoMercator()
    //     // .rotate()
    //     .center([-90.180890, 38.618007])
    //     .scale(1300000)


    var path = d3.geoPath().projection(projection)

    d3.json('./assets/roads-large.geojson').then(function (mapData) {

        svg.select('.map').append('g').attr('class', 'roads-large')
            // .attr('transform', function () {
            //     return 'translate(' + xScale.range()[1] / 2 + ',' + window.innerHeight / 2 + ')'
            // })
            .selectAll('path')
            .data(mapData.features)
            .enter().append('path')
            .attr('d', path)
            .attr('class', d => d.properties.type)

    })

    d3.json('./assets/roads-small.geojson').then(function (mapData) {

        svg.select('.map').append('g').attr('class', 'roads-small')
            // .attr('transform', function () {
            //     return 'translate(' + xScale.range()[1] / 2 + ',' + window.innerHeight / 2 + ')'
            // })
            .selectAll('path')
            .data(mapData.features)
            .enter().append('path')
            .attr('d', path)
            .attr('class', d => d.properties.type)

    })

    d3.json('./assets/water.geojson').then(function (mapData) {

        svg.select('.map').append('g').attr('class', 'water')
            // .attr('transform', function () {
            //     return 'translate(' + xScale.range()[1] / 2 + ',' + window.innerHeight / 2 + ')'
            // })
            .selectAll('path')
            .data(mapData.features)
            .enter().append('path')
            .attr('d', path)
            .attr('class', d => d.properties.type)

    })
}

function drawGraphic(data) {

    zoom = 18000
    xScale.domain([-zoom, zoom])
    yScale.domain([-zoom, zoom])





    var i,
        city_names = [];

    for (i = 0; i < data.length; i++) {
        city_names.push(data[i].city)
    }

    const colorScale = d3.scaleOrdinal()
        .domain(city_names)
        .range(["#c35659", "#a2ce64", "#c45c57", "#a8ce63", "#c46458", "#afcd62", "#c56b58", "#b5cd62", "#c57359", "#bccc61", "#c67b59", "#c2cc61", "#c6825a", "#c9cb60", "#cbc65f", "#c78a5b", "#cabf5f", "#c7915b", "#cab75e", "#c8995c", "#c9b05d", "#c8a15c", "#c9a85d"])

    const draw = function (zoom) {

        // draw map

        drawMap();


        const scale = svg.select('.scale')

        const cities = svg.select('.cities')
            .selectAll('g')
            .data(data)
            .enter().append('g')
            .attr('class', d => d.city)
            .attr('fill', d => colorScale(d.city))
            .attr('opacity', d => (d.city == "STL") ? 1 : 0)

        explainer = cities.append('g')
            .attr('class', 'measurement')
            .attr('opacity', 0)

        explainer.selectAll('circle.dashed')
            .data(d => [d.circle_radius])
            .enter().append("circle")
            .attr('class', "dashed")
            .attr("cx", xScale(0))
            .attr("cy", yScale(0))
            .attr("r", d => xScale(d) - xScale(0))
            .attr('class', "dashed")
            .attr('stroke-dasharray', '2')
            .attr('stroke', '#333')
            .attr('stroke-opacity', '0')
            .attr('fill-opacity', '0')
            .attr('stroke-width', '.1')

        explainer.selectAll('circle.cover')
            .data(d => [d.circle_radius])
            .enter().append("circle")
            .attr('class', "cover")
            .attr('cx', xScale(0))
            .attr('cy', yScale(0))
            .attr("r", d => xScale(d) - xScale(0))
            .attr('stroke-dasharray', '150')
            .attr('stroke-dashoffset', '0')
            .attr('stroke', '#fff')
            .attr('stroke-opacity', '0')
            .attr('fill-opacity', '0')
            .attr('stroke-width', '1.1')


        explainer.selectAll('line.dashed')
            .data(function (d) {
                stadiums = d.stadiums.sort((b, a) => a.dist_to_circle_center - b.dist_to_circle_center).slice(0, 2);

                if (stadiums[0].dist_to_circle_center == d.circle_radius) {
                    return [{
                        "x1": stadiums[0].normalized_coords[0],
                        "y1": stadiums[0].normalized_coords[1],
                        "x2": stadiums[1].normalized_coords[0],
                        "y2": stadiums[1].normalized_coords[1]
                    }]
                } else {
                    return [{
                        "x1": -d.dist_to_circle_center,
                        "y1": 0,
                        "x2": d.dist_to_circle_center,
                        "y2": 0
                    }]
                }

            })
            .enter().append('line')
            .attr('class', 'dashed')
            .attr("x1", d => xScale(d.x1))
            .attr("y1", d => yScale(d.y1))
            .attr("x2", d => xScale(d.x2))
            .attr("y2", d => yScale(d.y2))
            .attr('stroke-dasharray', '2')
            .attr('stroke', '#333')
            .attr('fill-opacity', '0')
            .attr('stroke-width', '.1')

        explainer.selectAll('line.cover')
            .data(function (d) {
                stadiums = d.stadiums.sort((b, a) => a.dist_to_circle_center - b.dist_to_circle_center).slice(0, 2);

                if (stadiums[0].dist_to_circle_center == d.circle_radius) {
                    return [{
                        "x1": stadiums[0].normalized_coords[0],
                        "y1": stadiums[0].normalized_coords[1],
                        "x2": stadiums[1].normalized_coords[0],
                        "y2": stadiums[1].normalized_coords[1]
                    }]
                } else {
                    return [{
                        "x1": -d.dist_to_circle_center,
                        "y1": 0,
                        "x2": d.dist_to_circle_center,
                        "y2": 0
                    }]
                }

            })
            .enter().append('line')
            .attr('class', 'cover')
            .attr("x1", d => xScale(d.x1))
            .attr("y1", d => yScale(d.y1))
            .attr("x2", d => xScale(d.x2))
            .attr("y2", d => yScale(d.y2))
            .attr('stroke-dasharray', '150')
            .attr('stroke-dashoffset', '0')
            .attr('stroke', '#fff')
            .attr('fill-opacity', '0')
            .attr('stroke-width', '1.1')


        cities.append('g')
            .attr('class', 'stadiums')
            .selectAll("circle")
            .data(function (d) {
                return d.stadiums
            })
            .enter().append("circle")
            .attr("cx", d => xScale(d.normalized_coords[0]))
            .attr("cy", d => yScale(d.normalized_coords[1]))
            .attr("r", 1)




        cities.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(function (d) {
                return d.stadiums
            })
            .enter().append("text")
            .attr("x", function (d) {
                if (d.normalized_coords[0] > 0) {
                    return xScale(d.normalized_coords[0]) - text_nudge_x
                } else {
                    return xScale(d.normalized_coords[0]) + text_nudge_x
                }
            })
            .attr("text-anchor", function (d) {
                if (d.normalized_coords[0] > 0) {
                    return "end"
                } else {
                    return "start"
                }
            })
            .attr("y", d => yScale(d.normalized_coords[1]) + text_nudge_y)
            .text(d => d.name)
            .attr("opacity", 0)
            .style("visibility", "hidden")

        cities.selectAll('.stadiums').selectAll("circle")
            .on('mouseover', function () {
                //       var old_zoom = zoom;

                //       var circles = d3.select(this.parentNode).selectAll("circle").data();

                //       var coords = [] 
                //       circles.forEach(d => {coords.push(Math.abs(d.normalized_coords[0])); coords.push(Math.abs(d.normalized_coords[1]))})

                //     var max_coord = Math.max.apply(Math,coords);

                //     viewof zoom.value = Math.max(max_coord,20000);

                //     xScale.domain([-zoom.value,zoom.value])
                //     yScale.domain([-zoom.value,zoom.value])
                //     draw();



                d3.select(this.parentNode).selectAll("circle")
                    .transition()
                    .attr("r", 2)

                d3.select(this.parentNode).select(".labels").selectAll("text")
                    .style("visibility", "visible")
                    .transition()
                    .attr("opacity", 1)
            })
            .on('mouseout', function () {
                d3.select(this.parentNode).selectAll("circle")
                    .transition()
                    .attr("r", 1)

                d3.select(this.parentNode).select(".labels").selectAll("text")
                    .style("visibility", "hidden")
                    .transition()
                    .attr("opacity", 0)
            })



        var i;
        var scale_distances = []
        for (i = 0; i < 23; i++) {
            scale_distances.push(i / 2)
        }

        scale.append("g").selectAll("circle")
            .data(scale_distances.reverse())
            .enter().append("circle")
            .attr("cx", xScale(0))
            .attr("cy", yScale(0))
            .attr("r", d => xScale(d * meters_per_mile) - xScale(0))
            .attr("class", d => {
                return d % 1 ? "dist maj" : "dist min"
            })

        // draw explainer step

        // svg.select('.explainer')
        //     .append('circle')

        //     .attr('cx', xScale(0))
        //     .attr('cy', yScale(0))
        //     .attr('r', 22.8)
        //     .attr('class', "dashed")
        //     .attr('stroke-dasharray', '2')
        //     .attr('stroke', '#333')
        //     .attr('fill-opacity', '0')
        //     .attr('stroke-width', '.1')

        // svg.select('.explainer')
        //     .append('circle')
        //     .attr('class', "cover")
        //     .attr('cx', xScale(0))
        //     .attr('cy', yScale(0))
        //     .attr('r', 22.8)
        //     .attr('stroke-dasharray', '150')
        //     .attr('stroke-dashoffset', '0')
        //     .attr('stroke', '#fff')
        //     .attr('fill-opacity', '0')
        //     .attr('stroke-width', '1.1')



        // svg.select('.explainer')
        //     .append('line')
        //     .attr('class', 'distance-line')
        //     .attr("x1", 469.79260825497335)
        //     .attr("y1", 461.35431889509783)
        //     .attr("x2", 430.2073917450296)
        //     .attr("y2", 438.64568110487886)
        //     .attr('stroke-dasharray', '2')
        //     .attr('stroke', '#333')
        //     .attr('fill-opacity', '0')
        //     .attr('stroke-width', '.1')


        // svg.select('.explainer')
        //     .append('line')
        //     .attr('class', 'distance-line-cover')
        //     .attr("x1", 469.79260825497335)
        //     .attr("y1", 461.35431889509783)
        //     .attr("x2", 430.2073917450296)
        //     .attr("y2", 438.64568110487886)
        //     .attr('stroke-dasharray', '150')
        //     .attr('stroke-dashoffset', '0')
        //     .attr('stroke', '#fff')
        //     .attr('fill-opacity', '0')
        //     .attr('stroke-width', '1.1')

        // svg.select('.explainer')
        //     .append('circle')
        //     .attr('class', "center")
        //     .attr('cx', xScale(0))
        //     .attr('cy', yScale(0))







    }

    draw(zoom);
}







function init() {
    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();
    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller.setup({
            step: '#scrolly article .step',
            offset: 0.33,
            debug: true,
        })
        .onStepEnter(handleStepEnter)
    // setup resize event
    window.addEventListener('resize', handleResize);


    d3.json('./assets/data.json').then(function (data) {
        drawGraphic(data);
    })

}
// kick things off
init();