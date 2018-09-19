function graphInit() {
    // по x - 300 отсчетов по 60 миллисекунд
    let n = 300;
    let dt = 60;

    //добавляем svg
    let svg = d3.select("svg"),
        margin = {top: 10, right: 10, bottom: 20, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // добавляем шкалу к осям
    let xAxis = d3.scaleLinear()
        .domain([0, n - 1])
        .range([0, width]);

    let yAxis = d3.scaleLinear()
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

    for (let name in world.getCounts()) {
        let obj = new window[name](0, 0);

        init(obj, {
            dt: dt,
            n: n,
            g: g,
            width: width,
            height: height,
            xAxis: xAxis,
            yAxis: yAxis
        });
    }
}

function init(obj, conf) {

    let data = d3.range(conf.n).map(function(){ return 0; });

    // d - это значение, i - время (т.е. тики)
    // получается по x выводим время, по y - значение
    let line = d3.line().x(function (d, i) { return conf.xAxis(i); }).y(function (d, i) { return conf.yAxis(d); });

    conf.g.append("g")
        .attr("clip-path", "url(#clip)")
        .append("path")
        .datum(data)
        .style("stroke", function (d) {
            return d.color = obj.color;
        })
        .attr("class", "line")
        .transition()
        .duration(conf.dt)
        .ease(d3.easeLinear)
        .on("start", tick);

    function tick() {
        // добавляем новые данные
        if (world.getCounts()[obj.name]) {
            data.push(world.getCounts()[obj.name]);
        } else {
            data.push(0);
        }

        // перерисовываем линию
        d3.select(this)
            .attr("d", line)
            .attr("transform", null);
        // сдвигаем влево
        d3.active(this)
            .attr("transform", "translate(" + conf.xAxis(-1) + ",0)")
            .transition()
            .on("start", tick);
        // старые данные удаляем
        data.shift();
    }
}
