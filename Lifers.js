function Grass(coords) {
	this.name = 'Grass';
	this.x = coords[0];
	this.y = coords[1];
	this.radius = 10;
	this.ttl = 60*60; // ~1 минута при 60 fps
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

function Cow(coords) {
	this.name = 'Cow';
	this.x = coords[0];
	this.y = coords[1];
	this.radius = 10;
	this.radiusView = 100;
	this.ttl = 60*60 * 2;
	this.energy = 100;
	this.speed = 1;

	this.draw = function(context) {
		drawCircle(context, this, 'peru');
		drawViewCircle(context, this);
	};

	this.update = function(world) {
		// TODO: move to Behavior
		var escape = false;

		var nears = world.getNear(this);
		if (nears.length > 0) {
			var wolfs = nears.filter(function(object){
				return (object.name == 'Wolf') ? true : false;
			});

			if (wolfs.length > 0) {
				escape = true;
			}
		}

		// если видим волка - убегаем, иначе движемся рандомно
		if (escape) {
			Anim(this, world, 'escape', wolfs[0]);
		} else {
			Anim(this, world, 'particle');
		}

		if (!--this.ttl) {
			world.remove(this);
		}
	};
}

function Wolf(coords) {
	this.name = 'Wolf';
	this.x = coords[0];
	this.y = coords[1];
	this.radius = 8;
	this.radiusView = 100;
	this.ttl = 60*60;
	this.energy = 100;
	this.speed = 1;


	this.draw = function(context) {
		drawCircle(context, this, 'gray');
		drawViewCircle(context, this);
	};

	this.update = function(world) {
		var chase = false;

		var nears = world.getNear(this);
		if (nears.length > 0) {
			var cows = nears.filter(function(object){
				return (object.name == 'Cow') ? true : false;
			});

			if (cows.length > 0) {
				chase = true;
			}
		}

		if (chase) {
			Anim(this, world, 'chase', cows[0]);
		} else {
			Anim(this, world, 'particle');
		}

		if (!--this.ttl) {
			world.remove(this);
		}
	};
}
