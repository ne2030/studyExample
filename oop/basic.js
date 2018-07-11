const ChargeType = {
    Food: 'Food',
    Beverage: 'Beverage'
};

const HurtType = {
    Exercise: 'Excercise',
    Work: 'Work'
}

class Human {
    constructor(age, name, health) {
        this._age = age;
        this._name = name;
        this.health = health;
    }

    get age() {
        return this._age;
    }

    get name() {
        return this._name;
    }

    introduce() {
        console.log(`id : ${this.id} , name : ${this.name} , age : ${this.age}`);
    }

    drink(beverage, amount) {
        console.log(`[${this.name}] drink beverage ${amount} liters`);
        console.log(`[${this.name}] before charge health : ${this.health.currentHealth}`);
        beverage.consume(amount);
        this.health.charge(amount * 30);
        console.log(`[Human] after charge health : ${this.health.currentHealth}`);
    }

    workout(excercise, hours) {
        console.log(`[${this.name}] workin out ${hours} hours!!`);
        console.log(`[${this.name}] before excercise \n heath : ${this.health.currentHealth} \n healthCapacity : ${this.health.capacity}`);
        const effect = excercise.getEfficiency(hours);
        this.health.hurt(excercise.hardness * hours);
        this.health.getHealthy(effect);
        console.log(`[Human] after excercise \n health : ${this.health.currentHealth} \n healthCapacity : ${this.health.capacity}`)
    }
}

class Health {
    constructor(initialHealth) {
        this._capacity = initialHealth;
        this._currentHealth = initialHealth;
    }

    get capacity() {
        return this._capacity;
    }

    get currentHealth() {
        return this._currentHealth;
    }

    charge(amount) {
        this._currentHealth = Math.min(this._currentHealth + amount, this._capacity);
    }

    hurt(amount) {
        this._currentHealth = Math.max(this._currentHealth - amount, 0);
    }

    getHealthy(amount) {
        this._capacity += amount;
    }
}

class Beverage {
    constructor(liter) {
        this._liter = liter;
        this._type = ChargeType.Beverage;
    }

    consume(amount) {
        console.log('[Beverage]consume ' + amount);
        this._liter -= amount;
        console.log('[Beverage]remain ' + this.liter);
    }

    get liter() {
        return this._liter;
    }

    get type() {
        return this._type;
    }
}

class Exercise {
    constructor(hardness, effect) {
        this._hardness = hardness;
        this._effect = effect;
    }

    get hardness() {
        return this._hardness;
    }

    get effect() {
        return this._effect;
    }

    getEfficiency(hours) {
        return this.hardness * hours * (this.effect * 100) / 100;
    }
}

const john = new Human(30, 'john');
const water = new Beverage(1.5);
const deadLift = new Exercise(10, 0.3)
john.drink(water, 0.5);
console.log('남은 물의 양 : ' + water.liter + '리터');

john.workout(deadLift, 2);
john.drink(water, 0.5);
