function Grass(x, y) {
	this.name = 'Grass';
	this.x = x;
	this.y = y;
	this.radius = 10;
	this.ttl = 60*60 * 10; // ~10 минут при 60 fps
	this.energy = 100;

	this.draw = function(context) {
		drawCircle(context, this, 'green');
	};

	this.update = function(world) {
		if (!--this.ttl) {
			world.remove(this);
		}
	};
}

function Cow(x, y) {
	this.name = 'Cow';
	this.x = x;
	this.y = y;
	this.radius = 10;
	this.radiusView = 100;
	this.ttl = 60*60 * 2;
	this.energy = 100;
	this.speed = 1.4;

	this.draw = function(context) {
		drawCircle(context, this, 'peru');
		drawViewCircle(context, this);
	};

	this.update = function(world) {
		var beh = Behavior(this, world);
		Anim(this, world, beh.AnimName, beh.vector);

		if (!--this.ttl) {
			world.remove(this);
		}
	};
}

function Wolf(x, y) {
	this.name = 'Wolf';
	this.x = x;
	this.y = y;
	this.radius = 8;
	this.radiusView = 100;
	this.ttl = 60*60 * 2;
	this.energy = 100;
	this.speed = 0.5;


	this.draw = function(context) {
		drawCircle(context, this, 'gray');
		drawViewCircle(context, this);
	};

	this.update = function(world) {
		var beh = Behavior(this, world);
		Anim(this, world, beh.AnimName, beh.vector);

		if (!--this.ttl) {
			world.remove(this);
		}
	};
}
