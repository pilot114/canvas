function World(width, height) {
	this.width = width;
	this.height = height;

	this.state = [];
	this.history = {};
	this.tick = 0;
	this.ms = 0;
	this.nextId = 1;
	this.select = null;

	this.add = function(object) {
		object.id = this.nextId;
		this.state.push(object);
		this.nextId++;
	};

	this.remove = function(object) {
		this.state = this.state.filter(function(el) {
			return el.id !== this.id;
		}, object);

        if (this.select && this.select.id === object.id) {
            this.select = null;
        }
    };

	this.selectByLocation = function(location){
	    let nearest = {distance: Infinity};

        for (let i = 0; i < this.state.length; i++) {
            let dx = location.x - this.state[i].x;
            let dy = location.y - this.state[i].y;
            let distance = Math.sqrt(dx*dx + dy*dy);

            if (distance < nearest.distance) {
                nearest = this.state[i];
                nearest.distance = distance;
            }
        }
        this.select = nearest;
    };

	this.getNear = function(lifer) {
		return this.state.filter(function(object){
			if (this === object) {
				return false;
			}
            let dx = object.x - this.x;
            let dy = object.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            return distance < this.radiusView;
		}, lifer);
	};

	this.update = function(time) {

		let log = [];

		for (let i = 0; i < this.state.length; i++) {
			this.state[i].update(this); //  ага! при обновлении меняется this.state.length!!!

            if (this.tick % 10 === 0) {
				//  т.к. локальный update может удалять элементы из state, обработаем такой случай
				if (typeof this.state[i] !== 'undefined') {
                    log.push(this.state[i].export()[1]);
				}
            }
		}
		if (this.tick % 10 === 0) {
            this.history[this.tick] = log;
		}

		this.tick++;
		this.ms = time;
	};

	this.draw = function(context) {
		for (let i = 0; i < this.state.length; i++) {
			this.state[i].draw(context);
		}

		if (this.select) {
            drawSelectLabel(context, this.select, 'id:' + this.select.id);
        }
	};

	this.hasLife = function() {
		return this.state.length > 0;
	};

	this.getCounts = function() {
        let counts = {};
		for (let i = 0; i < this.state.length; i++) {
            let name = this.state[i].name;
			if (!counts.hasOwnProperty(name)) {
				counts[name] = 0;
			}
			counts[name]++;
		}
		return counts;
	}

    this.maxCounts = function() {
		let max = 0;
		let counts = this.getCounts();
        for (let field in counts) {
            if (counts[field] > max) {
                max = counts[field];
            }
        }
        return max;
	}
}
