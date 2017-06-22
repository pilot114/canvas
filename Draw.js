function drawCircle(context, lifer, color) {
	context.fillStyle = color;
	context.beginPath();
	context.arc(lifer.x, lifer.y, lifer.radius, 0, Math.PI*2);
	context.closePath();
	context.fill();
};
