const initialState = {
    parkinglots: [],
};

const park = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PARKINGLOTS':
            return Object.assign({}, state, {
                parkinglots: action.parkinglots,
            });
        default:
            return state;
    }
};

const getParkinglots = () => {
    return {
        type: 'GET_PARKINGLOTS',
        parkinglots: [{
            id: 1,
            name: 'ryanPark',
            price: 1000,
        }],
    };
};

const store = {
    createStore(reducer) {
        this.state = reducer(undefined, {});
    },
    listeners: [],
    subscribe(fn) {
        this.listners.push(fn);
    },
    dispatch(action) {
        this.state = park(this.state, action);
        this.listeners.forEach((fn) => {
            fn(this.state);
        });
    },
    getState() {
        return this.state;
    },
};

store.createStore(park);

console.log(store.getState());
store.dispatch(getParkinglots());
console.log(store.getState());
