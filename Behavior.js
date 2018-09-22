//TODO var -> let ничего не сломав

// подумать как сделать суперпозиции
function Behavior(lifer, world) {
	var nears = world.getNear(lifer);

	switch(lifer.behaviorName) {

		case 'berserk':
            var target = null;
            if (nears.length > 0) {
                target = getNearest(nears, lifer);
            }

            // съедаем цель
            if (target && getRange(lifer, target) < lifer.radius) {
                world.remove(target);
                lifer.kills += 1;
                lifer.berserkCounter += 1;
            }

            if (target) {
                return {AnimName: 'chase', vector: {x: target.x, y: target.y}}
            }
            return {AnimName: 'particle', vector: null};
        case 'compete':
            var danger = null;
            var target = null;

            if (nears.length > 0) {
                let berserk = getNearest(nears.filter(function(object) {
                    return object.behaviorName === 'berserk';
                }), lifer);
                if (berserk) {
                    return {AnimName: 'escape', vector: {x: berserk.x, y: berserk.y}}
                }
            }

            if (nears.length > 0) {
                danger = getNearest(nears.filter(function(object) {
                    return object.name === lifer.danger;
                }), lifer);

                target = getNearest(nears.filter(function(object) {
                    return object.name === lifer.target;
                }), lifer);
            }

            // заканчиваем матч
            if (world.totalTypes === 1) {
                if (!world.stopped) {
                    alert(lifer.name + ' win!');
                }
                world.stopped = true;
            }

            if (world.totalTypes === 2) {
                danger = null;
                target = null;

                target = getNearest(nears.filter(function(object) {
                    return object.name !== lifer.name;
                }), lifer);

                if (target) {
                	if (target.radius > lifer.radius) {
                        danger = target;
					}
                    if (target.radius === lifer.radius) {
                        danger = null;
                        target = null;
                    }
				}
            }

            // съедаем цель
            if (target && getRange(lifer, target) < lifer.radius) {
                world.remove(target);
                lifer.radius += 1;
                lifer.radiusView += 1;
                lifer.speed += 0.1;
                lifer.kills += 1;
                lifer.berserkCounter += 1;
            }

            if (danger) {
                return {AnimName: 'escape', vector: {x: danger.x, y: danger.y}}
            } else {
                // бежим за целью
                if (target) {
                    return {AnimName: 'chase', vector: {x: target.x, y: target.y}}
                }
                return {AnimName: 'particle', vector: null}
            }
		case 'herbivore':
			var nearestWolf = null;
			var nearestGrass = null;

			if (nears.length > 0) {
                nearestWolf = getNearest(nears.filter(function(object) {
                    return object.name === 'Wolf';
                }), lifer);

                nearestGrass = getNearest(nears.filter(function(object) {
                    return object.name === 'Grass';
                }), lifer);
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
                nearestCow = getNearest(nears.filter(function(object) {
                    return object.name === 'Cow';
                }), lifer);
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
                let nearest = getNearest(nears, lifer);
                return {AnimName: 'escape', vector: {x: nearest.x, y: nearest.y}};
            }
            return {AnimName: 'particle', vector: null};

		default:
			break;
	}
}