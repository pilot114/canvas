function World(width, height) {
	this.width = width;
	this.height = height;

	this.state = [];
	this.tick = 0;
	this.ms = 0;
	this.nextId = 0;

	/*
	 *	Методы работы с состоянием
	 */

	this.add = function(object) {
		object.id = this.nextId;
		this.state.push(object);
		this.nextId++;
	}

	this.remove = function(object) {
		this.state = this.state.filter(function(el) {
			if (el.id == this.id) {
			    return false;
			}
		    return true;
		}, object);
	}

	this.getNear = function(lifer) {
		this.state = this.state.map(function(object){
			var dx = object.x - this.x;
			var dy = object.y - this.y;
			if (Math.sqrt(dx*dx + dy*dy) > object.radiusView) {
				// TODO
			}
		}, lifer);
	}

	this.update = function(time) {
		for (var i = 0; i < this.state.length; i++) {
			this.state[i].update(this);
		}
		this.tick++;
		this.ms = time;
	}

	this.draw = function(context) {
		for (var i = 0; i < this.state.length; i++) {
			this.state[i].draw(context);
		}
	}

	this.hasLife = function() {
		return this.state.length > 0;
	}
};
