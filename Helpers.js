function getElementPosition(obj) {
    let curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return null;
}

function getEventLocation(element,event){
    let pos = getElementPosition(element);
    return {
        x: (event.pageX - pos.x),
        y: (event.pageY - pos.y)
    };
}

function createRandomLifers(world, count) {
    let randCoords = randCoordGenerate(world.width, world.height);

    for (let i = 0; i < count; i++) {
        let coords = randCoords();
        let color = rand(['yellow', 'blue', 'red']);

        let thing = function(x, y) {
            this.name = 'Cow';
            this.x = x;
            this.y = y;
            this.radius = rand(5, 15);
            this.ttl = 60*60 * rand(1, 10);
            this.energy = rand(10, 1000);

            this.draw = function(context) {
                drawCircle(context, this, color);
            };

            this.update = function(world) {
                if (!--this.ttl) {
                    world.remove(this);
                }
            };
        };

        let obj = new thing(coords[0], coords[1]);
        world.add(obj);
    }
}

function createLifers(world, name, count) {
    // генератор случайных координат внутри канваса
    let randCoords = randCoordGenerate(world.width, world.height);

    for (let i = 0; i < count; i++) {
        let coords = randCoords();
        let obj = new window[name](coords[0], coords[1]);
        world.add(obj);
    }
}

function randCoordGenerate(maxWidth, maxHeight) {
    return function () {
        return [
            Math.floor(Math.random() * maxWidth) + 1,
            Math.floor(Math.random() * maxHeight) + 1
        ];
    }
}

function getRange(one, two) {
    return Math.sqrt(Math.pow(two.x - one.x, 2) + Math.pow(two.y - one.y, 2));
}

// min max OR random from array
function rand(min, max) {

    if (!max) {
        let arr = min;
        return arr[Math.floor(Math.random() * arr.length)];
    }

    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function uniqTypes(arr) {
    let counts = {};
    for (let i = 0; i < arr.length; i++) {
        let name = arr[i].name;
        if (counts.hasOwnProperty(name)) {
            counts[name]++;
        } else {
            counts[name] = 1;
        }
    }
    return counts;
}

function drawCircle(context, lifer, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(lifer.x, lifer.y, lifer.radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}

function drawViewCircle(context, lifer) {
    context.beginPath();
    context.arc(lifer.x, lifer.y, lifer.radiusView, 0, Math.PI * 2);
    context.lineWidth = 0.1;
    context.closePath();
    context.stroke();
}

function drawSelectLable(context, lifer, text) {
    context.fillStyle = "#444444";
    context.font = "normal normal 14px Helvetica";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText(text, lifer.x, lifer.y + 20);
}

// examples
function drawRect(context) {
    context.fillStyle = 'green';
    context.fillRect(100, 100, 200, 200);
}

function drawTriangle(context) {
    context.fillStyle = 'yellow';
    context.beginPath();
    context.moveTo(50, 20);
    context.lineTo(200, 50);
    context.lineTo(150, 80);
    context.closePath();
    context.fill();
    context.strokeStyle = 'blue';
    context.lineWidth = 5;
    context.stroke();
}

function drawCurve(context) {
    context.fillStyle = 'red';
    context.beginPath();
    context.moveTo(200, 300);
    context.bezierCurveTo(50, 90, 159, -30, 200, 30);
    context.lineTo(200, 90);
    context.lineTo(10, 90);
    context.closePath();
    context.fill();
    context.lineWidth = 4;
    context.strokeStyle = 'black';
    context.stroke();
}

function drawText(context) {
    context.fillStyle = "black";
    context.font = "italic " + 96 + "pt Arial";
    context.fillText("this is text", 20, 150);
}

function drawGradient(context) {
    var gradient = context.createLinearGradient(0, 0, 200, 0);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.5, "red");
    gradient.addColorStop(1, "black");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 400, 200);
}

function drawPixels(context) {
    // создаём новый буфер 300x200 пикселей
    let data = context.createImageData(300, 200);

    // обходим в цикле каждый пиксель
    for (let x = 0; x < data.width; x++) {
        for (let y = 0; y < data.height; y++) {

            let val = 0;
            let horz = (Math.floor(x / 4) % 2 == 0); // цикл каждые 4 пикселя
            let vert = (Math.floor(y / 4) % 2 == 0); // цикл каждые 4 пикселя
            if ((horz && !vert) || (!horz && vert)) {
                val = 255;
            } else {
                val = 0;
            }

            let index = (y * data.width + x) * 4;  // вычисляем индекс
            data.data[index] = val;   // красный
            data.data[index + 1] = val; // зелёный
            data.data[index + 2] = val; // синий
            data.data[index + 3] = 255; // явно задаём альфу как 255
        }
    }
    // устанавливаем данные обратно
    context.putImageData(data, 0, 0);
}