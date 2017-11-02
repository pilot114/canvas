// target - объект, который влияет на выбор движения
// target -> targets
function Anim(lifer, world, name, target) {

	switch(name) {

	  case 'random':
	  	lifer.dx = rand(-1, 1);
	  	lifer.dy = rand(-1, 1);
		break;

	  // используем информацию о текущем импульсе через объект lifer: получаем и сохраняем
	  case 'particle':
	  	// если импульса нет
		if (!lifer.hasOwnProperty('dx')) {
			lifer.dx = rand([-3, -2, -1, 1, 2, 3]);
		}
		if (!lifer.hasOwnProperty('dy')) {
			lifer.dy = rand([-3, -2, -1, 1, 2, 3]);
		}
		break;
	  case 'circle':
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
	  case 'escape':
		if (target.x > lifer.x) {
			lifer.dx = -1;
		}
		if (target.x < lifer.x) {
			lifer.dx = 1;
		}
		if (target.y < lifer.y) {
			lifer.dy = 1;
		}
		if (target.y > lifer.y) {
			lifer.dy = -1;
		}
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