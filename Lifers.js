function Base(x, y) {
    this.name = 'Base';
    this.x = x;
    this.y = y;

    this.radius = 8;
    // ~10 минут при 60 fps
    this.ttl = 60*60 * 10;
    this.energy = 100;
    this.color = 'black';

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

function Grass(x, y) {
    let base = new Base(x, y);
    base.name = 'Grass';
    base.color = 'green';
    return base;
}

function Ghost(x, y) {
    let base = new Base(x, y);

    base.name = 'Ghost';
    base.behaviorName = 'timid';

    base.radius = 10;
    base.radiusView = 100;
    base.speed = 0.5;
    base.color = 'purple';

    base.draw = function(context) {
        drawCircle(context, this, this.color);
        drawViewCircle(context, this);
    };

    base.update = function(world) {
        let beh = Behavior(this, world);
        Anim(this, world, beh.AnimName, beh.vector);

        if (!--this.ttl) {
            world.remove(this);
        }
    };
    return base;
}

function Cow(x, y) {
    let base = new Base(x, y);

    base.name = 'Cow';
    base.behaviorName = 'herbivore';

    base.radius = 10;
    base.radiusView = 100;
    base.ttl = 60*60 * 2;
    base.speed = 1;
    base.color = 'peru';

    base.draw = function(context) {
        drawCircle(context, this, this.color);
		drawViewCircle(context, this);
	};

    base.update = function(world) {
		let beh = Behavior(this, world);
		Anim(this, world, beh.AnimName, beh.vector);

		if (!--this.ttl) {
			world.remove(this);
		}
	};
    return base;
}

function Wolf(x, y) {
    let base = new Base(x, y);

    base.name = 'Wolf';
    base.behaviorName = 'predator';

    base.radiusView = 100;
    base.ttl = 60*60;
    base.speed = 1.2;
    base.color = 'gray';

    base.draw = function(context) {
        drawCircle(context, this, this.color);
		drawViewCircle(context, this);
	};

    base.update = function(world) {
        let beh = Behavior(this, world);
		Anim(this, world, beh.AnimName, beh.vector);

		if (!--this.ttl) {
			world.remove(this);
		}
	};
    return base;
}

function Unit(x, y) {
    let base = new Base(x, y);
    base.behaviorName = 'compete';

    base.radius = 10;
    base.radiusView = 100;
    base.speed = 1;

    base.kills = 0;
    base.berserkCounter = 0;
    base.berserkTtl = 0;

    base.draw = function(context) {
        drawCircle(context, this, this.color);
        // drawViewCircle(context, this);
    };

    base.update = function(world) {
        let beh = Behavior(this, world);
        Anim(this, world, beh.AnimName, beh.vector);

        if (!--this.ttl) {
            world.remove(this);
        }

        // если более 4 киллов за 20 сек - входим в режим берсерк на 5 сек
        if (this.berserkCounter > 4 && base.berserkTtl === 0) {
            base.color = 'black';
            // 300 = 60fps * 5sec
            base.berserkTtl = 300;
            base.speed *= 1.5;
            base.behaviorName = 'berserk';
        }
        
        // 240 = 60fps * 4sec
        // каждые 4 секунды berserkCounter уменьшается, если не 0
        if (world.tick % 240 === 0 && this.berserkCounter > 0) {
            this.berserkCounter--;
        }

        // выход из режима берсерка, т.е. умираем
        if (base.berserkTtl > 0) {
            base.berserkTtl--;
            if (base.berserkTtl === 0) {
                world.remove(this);
            }
        }
    };

    return base;
}


function Green(x, y) {
    let unit = new Unit(x, y);
    unit.name = 'Green';
    unit.color = 'green';

    unit.danger = 'Red';
    unit.target = 'Blue';

    return unit;
}

function Red(x, y) {
    let unit = new Unit(x, y);
    unit.name = 'Red';
    unit.color = 'red';

    unit.danger = 'Blue';
    unit.target = 'Green';

    return unit;
}

function Blue(x, y) {
    let unit = new Unit(x, y);
    unit.name = 'Blue';
    unit.color = 'blue';

    unit.danger = 'Green';
    unit.target = 'Red';

    return unit;
}