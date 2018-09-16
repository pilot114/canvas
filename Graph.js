let data;

let n,svg;
let xAxis,yAxis;

function graphInit() {
    data = world.getCounts();

    // срез данных для отображения
    n = 300;

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
        .domain([0, world.maxCounts()])
        .range([height, 0]);

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

    let dt = 60;

    for (let name in data) {
        data[name] = {
            count: data[name],
            obj: new window[name](0, 0),
            data: d3.range(n).map(function(){ return 0; }),
            // d - это значение, i - время (т.е. тики)
            // получается по x выводим время, по y - значение
            line: d3.line().x(function(d, i) { return xAxis(i); }).y(function(d, i) { return yAxis(d); })
        };

        // добавляем линии на график
        g.append("g")
            .attr("clip-path", "url(#clip)")
            .append("path")
            .datum(data[name].data)
            .style("stroke", function(d) { return d.color = data[name].obj.color; })
            .attr("class", "line")
            .transition()
            .duration(dt)
            .ease(d3.easeLinear)
            .on("start", tick(data[name]));
    }
}

// TODO: сделать динамический вывод графиков
function tick(obj) {

    // добавляем новые данные
    if (obj.count) {
        obj.data.push(obj.count);
    } else {
        obj.data.push(0);
    }
    console.log(this);

    // d3.select(this)
    //     .attr("d", obj.line)
    //     .attr("transform", null);

    // старые данные удаляем
    obj.data.shift();

    return;

    d3.select(this)
        .attr("d", obj.line)
        .attr("transform", null);

    d3.active(this)
        .attr("transform", "translate(" + xAxis(-1) + ",0)")
        .transition()
        .on("start", tick(obj));

    // старые данные удаляем
    obj.data.shift();
};
