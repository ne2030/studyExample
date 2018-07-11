// 추상화

// 공유 주차장, 제휴 주차장, 일반 주차장이 있음
// 공유, 제휴는 주차권 구매 가능함
// 주차권 구매하는 함수 만들것

const log = (a) => { console.log(a); return a; };

const guPrice = 600;

class Ticket {
    constructor(parkinglotName, price) {
        this.parkinglotName = parkinglotName;
        this.price = price;
        this.isAvailable = true;
    }

    use() {
        log('use ticket!');
        this.isAvailable = false;
    }

    refund() {
        log('refund ticket!');
        this.isAvailable = false;
    }
}

class Human {
    constructor(name, money) {
        this.name = name;
        this.money = money;
        this.ticket = null;
    }

    // type: SellableParkinglot
    buyTicket(parkinglot) {
        if (!(parkinglot instanceof SellableParkinglot)) { log(`'${parkinglot.name}' parkinglot doesn't sell ticket to '${this.name}'`); return false; }
        if (this.ticket) { log(`${this.name} already have ticket`); return false; }
        else if (this.money < parkinglot.price) { log(`'${this.name}' don't have enough money to buy '${parkinglot.name}'`); return false; }
        else {
            const ticket = parkinglot.buyTicket();
            if (!ticket) { log(`'${this.name}' couldn't buy ticket from '${parkinglot.name}'!!`); return false; }
            this.money -= ticket.price;
            this.ticket = ticket;
            log(`'${this.name}' buy ticket from '${parkinglot.name}'!!`);
            return true;
        }
    }
}

class Parkinglot {
    constructor(name, price, parkCapacity) {
        this.name = name;
        this.price = price;
        this.availablePlace = parkCapacity;
        this.parkCapacity = parkCapacity;
        this.revenue = 0;
    }
}

class SellableParkinglot extends Parkinglot {
    constructor(...params) {
        super(...params);
    }

    buyTicket() {
        if (this.availablePlace === 0) { log(`${this.name} parkinglot is full`); return false; }

        this.revenue += this.price;
        this.availablePlace -= 1;
        return new Ticket(this.name, this.price);
    }

    refundTicket() {
        this.revenue -= this.price;
        this.availablePlace += 1;
        return this.price;
    }
}

class PartnerParkinglot extends SellableParkinglot {
    constructor(name, price, parkCapacity) {
        super(name, price, parkCapacity)
    }
}

class ShareParkinglot extends SellableParkinglot {
    constructor(name) {
        super(name, guPrice, 1);
    }
}

class NormalParkinglot extends Parkinglot {
    constructor(name, price, parkCapacity) {
        super(name, price, parkCapacity);
    }
}


// 따로 함수를 만들어야 하는지?
// parkinglot: SellableParkinglot, human: human
function buyParkinglotTicket(parkinglot, human) {
    log('\nticket buy start\n');
    human.buyTicket(parkinglot);
    log('\nticket buy end\n');
}

//

const ryan = new Human('ryan', 5000);
const john = new Human('john', 100000);

const amano = new PartnerParkinglot('amano', 10000, 2);
const songpa = new ShareParkinglot('01-01-110');
const jecheon = new NormalParkinglot('jecheon-emart', 1000, 10);

buyParkinglotTicket(amano, ryan);
buyParkinglotTicket(songpa, ryan);
buyParkinglotTicket(songpa, john);
buyParkinglotTicket(jecheon, john);
buyParkinglotTicket(amano, john);
