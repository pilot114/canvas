function Grass(coords) {
	this.name = 'Grass';
	this.x = coords[0];
	this.y = coords[1];
	this.radius = 8;
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
				for (var i = 0; i < wolfs.length; i++) {
					escape = true;
				}
			}
		}

		// если видим волка - убегаем, иначе движемся рандомно
		if (escape) {
			Anim(this, world, 'escape', wolfs[0]);
		} else {
			Anim(this, world, 'random');
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
	this.radius = 10;
	this.radiusView = 100;
	this.ttl = 60*60;
	this.energy = 100;

	this.draw = function(context) {
		drawCircle(context, this, 'gray');
		drawViewCircle(context, this);
	};

	this.update = function(world) {
		Anim(this, world, 'particle');
		if (!--this.ttl) {
			world.remove(this);
		}
	};
}
