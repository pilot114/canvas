function Grass(x, y) {
	this.name = 'Grass';

	this.x = x;
	this.y = y;
	this.radius = 8;
	this.ttl = 60*60 * 10; // ~10 минут при 60 fps
	this.energy = 100;
	this.color = 'green';

	this.draw = function(context) {
		drawCircle(context, this, this.color);
	};

	this.update = function(world) {
		if (!--this.ttl) {
			world.remove(this);
		}
	};

	this.export = function() {
        // 'x:y:ttl:energy',
		return this.x.toFixed(2) + ':' + this.y.toFixed(2) + ':' + this.ttl + ':' + this.energy;
	}
}

function Ghost(x, y) {
    this.name = 'Ghost';
    this.behaviorName = 'timid';

    this.x = x;
    this.y = y;
    this.radius = 10;
    this.radiusView = 100;
    this.ttl = 60*60 * 2;
    this.energy = 100;
    this.speed = 0.5;
    this.color = 'purple';

    this.draw = function(context) {
        drawCircle(context, this, this.color);
        drawViewCircle(context, this);
    };

    this.update = function(world) {
        let beh = Behavior(this, world);
        Anim(this, world, beh.AnimName, beh.vector);

        if (!--this.ttl) {
            world.remove(this);
        }
    };

    this.export = function() {
        // 'x:y:ttl:energy',
        return this.x.toFixed(2) + ':' + this.y.toFixed(2) + ':' + this.ttl + ':' + this.energy;
    }
}

function Cow(x, y) {
	this.name = 'Cow';
	this.behaviorName = 'herbivore';

	this.x = x;
	this.y = y;
	this.radius = 10;
	this.radiusView = 100;
	this.ttl = 60*60 * 2;
	this.energy = 100;
	this.speed = 1;
	this.color = 'peru';

	this.draw = function(context) {
        drawCircle(context, this, this.color);
		drawViewCircle(context, this);
	};

	this.update = function(world) {
		let beh = Behavior(this, world);
		Anim(this, world, beh.AnimName, beh.vector);

		if (!--this.ttl) {
			world.remove(this);
		}
	};

    this.export = function() {
        // 'x:y:ttl:energy',
        return this.x.toFixed(2) + ':' + this.y.toFixed(2) + ':' + this.ttl + ':' + this.energy;
    }
}

function Wolf(x, y) {
	this.name = 'Wolf';
	this.behaviorName = 'predator';
	this.x = x;
	this.y = y;
	this.radius = 8;
	this.radiusView = 100;
	this.ttl = 60*60;
	this.energy = 100;
	this.speed = 1.2;
	this.color = 'gray';


	this.draw = function(context) {
        drawCircle(context, this, this.color);
		drawViewCircle(context, this);
	};

	this.update = function(world) {
        let beh = Behavior(this, world);
		Anim(this, world, beh.AnimName, beh.vector);

		if (!--this.ttl) {
			world.remove(this);
		}
	};

    this.export = function() {
        // 'x:y:ttl:energy',
        return this.x.toFixed(2) + ':' + this.y.toFixed(2) + ':' + this.ttl + ':' + this.energy;
    }
}
