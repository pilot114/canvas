function getNearest(arr, obj) {
    if (arr.length === 0) {
        return null;
    }
    let nearest = arr.pop();
    for (let i = 0; i < arr.length; i++) {
        if (getRange(arr[i], obj) < getRange(nearest, obj)) {
            nearest = arr[i];
        }
    }
    return nearest;
}

function objectToString(obj) {
    let output = '';
    for (let property in obj) {
        output += property + ': ' + obj[property]+"\n";
    }
    return output;
}

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
        let color = rand(['yellow', 'blue', 'red', 'black']);

        let thing = new Unit(coords[0], coords[1]);

        thing.radius = rand(5, 15);
        thing.ttl = 60*60 * rand(1, 10);
        thing.energy = rand(10, 1000);
        thing.speed = rand(1, 2);
        thing.draw = function(context) {
            drawCircle(context, thing, color);
        };
        this.update = function(world) {
            let beh = Behavior(this, world);
            Anim(this, world, beh.AnimName, beh.vector);

            if (!--this.ttl) {
                world.remove(this);
            }
        };

        world.add(thing);
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

function drawSelectLabel(context, lifer, text) {
    context.fillStyle = "#444444";
    context.font = "normal normal 14px Helvetica";
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText(text, lifer.x, lifer.y + 20);
}

// context, begin, size, angle
function drawLine(context, xy, size, angle) {

    xy[0] = parseInt(xy[0]);
    xy[1] = parseInt(xy[1]);
    let xy2 = [
        xy[0] + Math.sin(Math.PI * angle/180.0)*size,
        xy[1] + Math.cos(Math.PI * angle/180.0)*size
    ];
    context.beginPath();
    context.moveTo(xy[0], xy[1]);
    context.lineTo(xy2[0], xy2[1]);
    context.stroke();
    return xy2;
}
