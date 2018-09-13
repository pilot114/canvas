let n,data,line,svg;
let xAxis,yAxis;


function graphInit() {
    // массив данных и какая часть этого массива отображается
    n = 40;
    data = d3.range(n).map(function(){ return 0; });

    //добавляем svg
    svg = d3.select("svg"),
        margin = {top: 10, right: 10, bottom: 20, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // добавляем шкалу к осям
    xAxis = d3.scaleLinear()
        .domain([0, n - 1])
        .range([0, width]);

    yAxis = d3.scaleLinear()
        .domain([0, world.getCounts()['Cow']])
        .range([height, 0]);


    line = d3.line()
        .x(function(d, i) { return xAxis(i); })
        .y(function(d, i) { return yAxis(d); });

    // границы
    g.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    // оси
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
}

function tick() {
    // добавляем новые данные
    if (world.getCounts()['Cow']) {
        data.push(world.getCounts()['Cow']);
    } else {
        data.push(0);
    }

    // перерисовываем линию
    d3.select(this)
        .attr("d", line)
        .attr("transform", null);
    // сдвигаем влево
    d3.active(this)
        .attr("transform", "translate(" + xAxis(-1) + ",0)")
        .transition()
        .on("start", tick);
    // старые данные удаляем
    data.shift();
}