const store = {
    human: {},
    beverage: {},
    exercise: {},
    work: {}
};

const log = (a) => { log(a); return a; };

/*
* Functions
*/

const initHealth = amount => ({ capacity: amount, currentHealth: amount });
const chargeHealth = (health, amount) => ({ ...health, currentHealth: Math.min(health.currentHealth + amount, health.capacity) });
const hurtHealth = (health, amount) => ({ ...health, currentHealth: Math.max(health.currentHealth - amount, 0)});
const getHealthy = (health, amount) => ({ ...health, capacity: health.capacity + amount});

const createHuman = (name, age, job, healthAmount) => ({ name, age, job, health: setHealth(amount) });
const drinkBeverage = (human, drinkAmount) => ({ ...human, health: chargeHealth(human.health, drinkAmount)});
const doWorkout = (human, exercise, hours) => {
    log(`[${human.name}] workin out ${hours} hours!!`);
    log(`[${human.name}] before excercise \n heath : ${human.health.currentHealth} \n healthCapacity : ${human.health.capacity}`);
    const health = _.chain(human.health,
        (health) => hurtHealth(health, excercise.hardness * hours),
        (health) => getHealthy(health, getEfficiency(excercise, hours))
    )
    log(`[Human] after excercise \n health : ${human.health.currentHealth} \n healthCapacity : ${human.health.capacity}`)
    return Object.assign(human, { health });
}


const createBeverage = (name, amount) => ({ name, amount })
const consumeBeverage = (beverage, drinkAmount) => {
    log(`[${beverage.name} : Beverage] consume : ${drinkAmount}`);
    const remain = Math.max(beverage.amount - drinkAmount, 0);
    log(`[${beverage.name} : Beverage] remain :  ${remain}`);
    return { ...beverage, amount: remain};
};

const createExercise = (name, hardness, effect) => ({ name, hardness, effect });
const getEfficiency = (exercise, hours) => exercise.hardness * hours * (exercise.effect * 100) / 100;


/*
* Services
*/

const drink_service = (store, beverage, human, amount) => {
    return { ...store, beverage: { ...store.beverage, [beverage.name]: consumeBeverage(beverage, amount) }, human: { ...store.human, [human.name]: drinkBeverage(human, amount) }};
}

const workOut_service = (store, ...params) => {
    return { ...store, human: { ...store.human, [human.name]: drinkBeverage(...params) }}
}



store.human.ryan = createHuman('ryan', 24, 'programmer');
store.exercise.deadLift = createExercise('deadLift', 10, 0.3);
store.beverage.water = createBeverage('water', 1.5);
store.beverage.beer = createBeverage('beer', 3);

function mondayLife() {
    const { human: { ryan }, beverage: { water }, exercise: { deadLift } } = store;
    store.human.ryan = doWorkout(ryan, deadLift, 3);
    doWorkout(ryan, deadLift, 3);
    drinkBeverage(ryan, 30, water)



    // drink
    _.chain(
        drink_service(store, water, ryan, 30)
    )


    [ryan, water] = _.chain([ryan, water])
        ([ryan, water]) =>
        ([ryan, water]) =>
        (ryan) => doWorkout(ryan, deadLift, 5)
    )
}


consumeBeverage(water, 0.5);
