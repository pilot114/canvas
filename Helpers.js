function createLifers(world, name, count) {
	// генератор случайных координат внутри канваса
	var randCoords = randCoordGenerate(world.width, world.height);

	for (var i = 0; i < count; i++) {
		var obj = new window[name](randCoords());
		world.add(obj);
	}
}

function randCoordGenerate(maxWidth, maxHeight) {	
	var maxWidth = maxWidth;
	var maxHeight = maxHeight;
	return function() {
		return [
			Math.floor(Math.random() * maxWidth) + 1,
			Math.floor(Math.random() * maxHeight) + 1
		];
	}
}

// min max OR random from array
function rand(min, max) {
	
	if (!max) {
		var arr = min;
		return arr[Math.floor(Math.random()*arr.length)];
	}

    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function uniqTypes(arr) {
	var counts = {};
	for (var i = 0; i < arr.length; i++) {
		var name = arr[i].name;
		if (counts.hasOwnProperty(name) ) {
			counts[name]++;
		} else {
			counts[name] = 1;
		}
	}
	return counts;
}

// examples
function drawCircle(context, lifer, color) {
	context.fillStyle = color;
	context.beginPath();
	context.arc(lifer.x, lifer.y, lifer.radius, 0, Math.PI*2);
	context.closePath();
	context.fill();
}

function drawRect(context) {
	context.fillStyle = 'green';
	context.fillRect(100,100,200,200);
}

function drawTriangle(context) {
	context.fillStyle = 'yellow';
	context.beginPath();
	context.moveTo(50,20);
	context.lineTo(200,50);
	context.lineTo(150,80);
	context.closePath();
	context.fill();
	context.strokeStyle = 'blue';
	context.lineWidth = 5;
	context.stroke();
}

function drawCurve(context) {
	context.fillStyle = 'red';
	context.beginPath();
	context.moveTo(200,300);
	context.bezierCurveTo(50,90,159,-30,200,30);
	context.lineTo(200,90);
	context.lineTo(10,90);
	context.closePath();
	context.fill();
	context.lineWidth = 4;
	context.strokeStyle = 'black';
	context.stroke();
}

function drawText(context) {
	context.fillStyle = "black";
	context.font = "italic "+96+"pt Arial";
	context.fillText("this is text", 20,150);
}

function drawGradient(context) {
	var gradient = context.createLinearGradient(0,0,200,0);
	gradient.addColorStop(0, "white");
	gradient.addColorStop(0.5, "red");
	gradient.addColorStop(1, "black");
	context.fillStyle = gradient;
	context.fillRect(0,0,400,200);
}

function drawPixels(context) {
		// создаём новый буфер 300x200 пикселей
	var data = context.createImageData(300,200);
	 
	  // обходим в цикле каждый пиксель
	for(var x=0; x<data.width; x++) {
	    for(var y=0; y<data.height; y++) {
	 
	      var val = 0;
	      var horz = (Math.floor(x/4) % 2 == 0); // цикл каждые 4 пикселя
	      var vert = (Math.floor(y/4) % 2 == 0); // цикл каждые 4 пикселя
	      if( (horz && !vert) || (!horz && vert)) {
	        val = 255;
	      } else {
	        val = 0;
	      }
	 
	    var index = (y*data.width+x)*4;  // вычисляем индекс
	    data.data[index] = val;   // красный
	    data.data[index+1] = val; // зелёный
	    data.data[index+2] = val; // синий
	    data.data[index+3] = 255; // явно задаём альфу как 255
	  }
	}
	// устанавливаем данные обратно
	context.putImageData(data,0,0);
}