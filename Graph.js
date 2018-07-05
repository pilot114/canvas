let n = 40,
    random = d3.randomNormal(0, .2),
    data = d3.range(n).map(random);

let svg = d3.select("svg"),
    margin = {top: 0, right: 0, bottom: 0, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let xAxis = d3.scaleLinear()
    .domain([0, n - 1])
    .range([0, width]);

let yAxis = d3.scaleLinear()
    .domain([-1, 1])
    .range([height, 0]);

let line = d3.line()
    .x(function(d, i) { return xAxis(i); })
    .y(function(d, i) { return yAxis(d); });

g.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + yAxis(0) + ")")
    .call(d3.axisBottom(xAxis));

g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(yAxis));

g.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .datum(data)
    .attr("class", "line")
    .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .on("start", tick);


function tick() {
    // Push a new data point onto the back.
    data.push(Math.random() - 0.5);
    // Redraw the line.
    d3.select(this)
        .attr("d", line)
        .attr("transform", null);
    // Slide it to the left.
    d3.active(this)
        .attr("transform", "translate(" + xAxis(-1) + ",0)")
        .transition()
        .on("start", tick);
    // Pop the old data point off the front.
    data.shift();
}