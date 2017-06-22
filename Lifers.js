function Grass(coords) {
	this.name = 'Grass';
	this.x = coords[0];
	this.y = coords[1];
	this.radius = 8;
	this.tick = 0;
	this.lifeTime = 60*60;// минута?
	this.energy = 100;

	this.draw = function(context) {
		drawCircle(context, this, 'green');
	};

	this.update = function(world) {
		this.tick++;
		if (this.tick > this.lifeTime) {
			world.remove(this);
		}
	};
}

function Cow(coords) {
	this.name = 'Cow';
	this.x = coords[0];
	this.y = coords[1];
	this.radius = 10;
	this.tick = 0;
	this.lifeTime = 60*60 * 2;
	this.energy = 100;

	this.draw = function(context) {
		drawCircle(context, this, 'peru');
	};

	this.update = function(world) {
		Anim(this, world, 'random');
		this.tick++;
		if (this.tick > this.lifeTime) {
			world.remove(this);
		}
	};
}

function Wolf(coords) {
	this.name = 'Wolf';
	this.x = coords[0];
	this.y = coords[1];
	this.radius = 10;
	this.tick = 0;
	this.lifeTime = 60*60 * 5;
	this.energy = 100;

	this.draw = function(context) {
		drawCircle(context, this, 'gray');
	};

	this.update = function(world) {
		Anim(this, world, 'particle');
		this.tick++;
		if (this.tick > this.lifeTime) {
			world.remove(this);
		}
	};
}

function Ball(coords) {
	this.name = 'Ball';
	this.x = coords[0];
	this.y = coords[1];
	this.radius = 40;
	this.tick = 0;
	this.lifeTime = 60*60 * 5;
	this.energy = 100;

	this.draw = function(context) {
		drawCircle(context, this, 'green');
	};

	this.update = function(world) {
		Anim(this, world, 'circle');
		this.tick++;
		if (this.tick > this.lifeTime) {
			world.remove(this);
		}
	};
}