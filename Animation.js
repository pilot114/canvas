function Anim(lifer, world, name) {

	switch(name) {

	  case 'random':
	  	lifer.dx = rand(-1, 1);
	  	lifer.dy = rand(-1, 1);

		if (lifer.x + lifer.dx >= world.width || lifer.x + lifer.dx <= 0) {
			lifer.dx = 0;
		}
		if (lifer.y + lifer.dy >= world.height || lifer.y + lifer.dy <= 0) {
			lifer.dy = 0;
		}
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

		if (lifer.x + lifer.dx >= world.width || lifer.x + lifer.dx <= 0) {
			lifer.dx = -lifer.dx;
		}
		if (lifer.y + lifer.dy >= world.height || lifer.y + lifer.dy <= 0) {
			lifer.dy = -lifer.dy;
		}
		break;
	  case 'circle':
	  		var radius = 150;
	  		var center = [world.width/2, world.height/2];

	  		// маштабируем до градусов
	  		var degree = world.time % 360;
	  		console.log(world.time);
	  		// и переводим в радианы
	  		var theta = degree * (2*Math.PI/360);
			lifer.x = center[0] + radius * Math.cos(theta);
			lifer.y = center[1] - radius * Math.sin(theta);
		return;
	  default:
	  		lifer.dx = 0;
	  		lifer.dy = 0;
		break;
	}

	lifer.x += lifer.dx;
	lifer.y += lifer.dy;
}