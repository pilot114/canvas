// target - объект, который влияет на выбор движения
// target -> targets
// вообще, заменить targets на вектор, получаемый от Behavior
function Anim(lifer, world, name, target) {
	// обычно dx и dy высчитываем из вектора

	switch(name) {

	  case 'random':
	  	// для рандома удобнее сразу задавать угол
	  	var angle = rand(0, 360);
	  	lifer.dy = Math.sin(angle*(Math.PI/180)) * lifer.speed;
	  	lifer.dx = Math.cos(angle*(Math.PI/180)) * lifer.speed;
		break;
	  // используем информацию о текущем импульсе через объект lifer: получаем и сохраняем
	  case 'particle':
	  	var angle = rand(0, 360);
	  	// если импульса нет
		if (!lifer.hasOwnProperty('dx')) {
		  	lifer.dx = Math.cos(angle*(Math.PI/180)) * lifer.speed;
		}
		if (!lifer.hasOwnProperty('dy')) {
		  	lifer.dy = Math.sin(angle*(Math.PI/180)) * lifer.speed;
		}
		break;
	  case 'circle':
			// параметрическое движение
	  		var radius = 150;
	  		var center = [world.width/2, world.height/2];

	  		// маштабируем до градусов
	  		var degree = world.tick % 360;
	  		console.log(world.tick);
	  		// и переводим в радианы
	  		var theta = degree * (2*Math.PI/360);
			lifer.x = center[0] + radius * Math.cos(theta);
			lifer.y = center[1] - radius * Math.sin(theta);
		// для параметрического движения дальнейшие действия не нужны
		return;
	  case 'chase':
		    var vector = [lifer.x - target.x, lifer.y - target.y];
			var c = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
		    lifer.dx = -(vector[0] / c) * lifer.speed;
		    lifer.dy = -(vector[1] / c) * lifer.speed;
		break;
	  case 'escape':
		    var vector = [lifer.x - target.x, lifer.y - target.y];
		  	var c = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
		    lifer.dx = (vector[0] / c) * lifer.speed;
		    lifer.dy = (vector[1] / c) * lifer.speed;
		break;
	  default:
	  		lifer.dx = 0;
	  		lifer.dy = 0;
		break;
	}

	// не пересекаем границы мира
	if (lifer.x + lifer.dx >= world.width || lifer.x + lifer.dx <= 0) {
		lifer.dx = -lifer.dx;
	}
	if (lifer.y + lifer.dy >= world.height || lifer.y + lifer.dy <= 0) {
		lifer.dy = -lifer.dy;
	}

	lifer.x += lifer.dx;
	lifer.y += lifer.dy;
}