function Grass(coords) {
	this.name = 'Grass';
	this.x = coords[0];
	this.y = coords[1];
	this.radius = 8;
	this.ticksToDeath = 60*60; // ~1 минута при 60 fps
	this.energy = 100;

	this.draw = function(context) {
		drawCircle(context, this, 'green');
	};

	this.update = function(world) {
		if (!--this.ticksToDeath) {
			world.remove(this);
		}
	};
}

function Cow(coords) {
	this.name = 'Cow';
	this.x = coords[0];
	this.y = coords[1];
	this.radius = 10;
	this.ticksToDeath = 60*60 * 2;
	this.energy = 100;

	this.draw = function(context) {
		drawCircle(context, this, 'peru');
	};

	this.update = function(world) {
		Anim(this, world, 'random');
		if (!--this.ticksToDeath) {
			world.remove(this);
		}
	};
}

function Wolf(coords) {
	this.name = 'Wolf';
	this.x = coords[0];
	this.y = coords[1];
	this.radius = 10;
	this.ticksToDeath = 60*60;
	this.energy = 100;

	this.draw = function(context) {
		drawCircle(context, this, 'gray');
	};

	this.update = function(world) {
		Anim(this, world, 'particle');
		if (!--this.ticksToDeath) {
			world.remove(this);
		}
	};
}
