//TODO var -> let ничего не сломав

// подумать как сделать суперпозиции
function Behavior(lifer, world) {
	var nears = world.getNear(lifer);

	switch(lifer.behaviorName) {

		case 'herbivore':
			var nearestWolf = null;
			var nearestGrass = null;

			if (nears.length > 0) {
				var wolfs = nears.filter(function(object) {
					return (object.name == 'Wolf') ? true : false;
				});
				if (wolfs.length > 0) {
					var nearestWolf = wolfs.pop();
					for (var i = 0; i < wolfs.length; i++) {
						if (getRange(wolfs[i], lifer) < getRange(nearestWolf, lifer)) {
							nearestWolf = wolfs[i];
						}
					}
				}

				var grass = nears.filter(function(object) {
					return (object.name == 'Grass') ? true : false;
				});
				if (grass.length > 0) {
					var nearestGrass = grass.pop();
					for (var i = 0; i < grass.length; i++) {
						if (getRange(grass[i], lifer) < getRange(nearestGrass, lifer)) {
							nearestGrass = grass[i];
						}
					}
				}
			}

			// съедаем траву
			if (nearestGrass && getRange(lifer, nearestGrass) < lifer.radius) {
				world.remove(nearestGrass);
			}

			if (nearestWolf) {
				return {AnimName: 'escape', vector: {x: nearestWolf.x, y: nearestWolf.y}}
			} else {
				// бежим за травой
				if (nearestGrass) {
					return {AnimName: 'chase', vector: {x: nearestGrass.x, y: nearestGrass.y}}
				}
				return {AnimName: 'particle', vector: null}
			}
		case 'predator':
			var nearestCow = null;

			if (nears.length > 0) {
				var cows = nears.filter(function(object) {
					return (object.name == 'Cow') ? true : false;
				});
				if (cows.length > 0) {
					var nearestCow = cows.pop();
					for (var i = 0; i < cows.length; i++) {
						if (getRange(cows[i], lifer) < getRange(nearestCow, lifer)) {
							nearestCow = cows[i];
						}
					}
				}
			}

			// съедаем корову
			if (nearestCow && getRange(lifer, nearestCow) < lifer.radius) {
				world.remove(nearestCow);
			}

			if (nearestCow) {
				return {AnimName: 'chase', vector: {x: nearestCow.x, y: nearestCow.y}}
			} else {
				return {AnimName: 'particle', vector: null}
			}
		case 'timid':
            if (nears.length > 0) {
                let nearest = nears.pop();
                for (var i = 0; i < nears.length; i++) {
                    if (getRange(nears[i], lifer) < getRange(nearest, lifer)) {
                        nearest = nears[i];
                    }
                }
                return {AnimName: 'escape', vector: {x: nearest.x, y: nearest.y}};
            }
            return {AnimName: 'particle', vector: null};

		default:
			break;
	}
}