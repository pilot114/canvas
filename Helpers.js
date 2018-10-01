function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}

// Convert any CSS color to a hex representation
// Examples:
// colorToHex('red')            # '#ff0000'
// colorToHex('rgb(255, 0, 0)') # '#ff0000'
function colorToHex(color) {
    var rgba, hex;
    rgba = colorToRGBA(color);
    hex = [0,1,2].map(
        function(idx) { return byteToHex(rgba[idx]); }
    ).join('');
    return "#"+hex;
}

// Returns the color as an array of [r, g, b, a] -- all range from 0 - 255
// color must be a valid canvas fillStyle. This will cover most anything
// you'd want to use.
// Examples:
// colorToRGBA('red')  # [255, 0, 0, 255]
// colorToRGBA('#f00') # [255, 0, 0, 255]
function colorToRGBA(color) {
    var cvs, ctx;
    cvs = document.createElement('canvas');
    cvs.height = 1;
    cvs.width = 1;
    ctx = cvs.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    return ctx.getImageData(0, 0, 1, 1).data;
}

// Turns a number (0-255) into a 2-character hex number (00-ff)
function byteToHex(num) {
    return ('0'+num.toString(16)).slice(-2);
}




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
