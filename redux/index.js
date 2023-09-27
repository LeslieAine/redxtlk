const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const CAKE_ORDERED = 'CAKE_ORDERED'
const CAKE_RESTORED = 'CAKE_RESTORED'
const ICECREAM_ORDERED = 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED'

function orderCake() {
    return(
        {
        type: CAKE_ORDERED,
        payload: 1
    })
}

function restockCake (qty = 1) {
    return(
        {
            type: CAKE_RESTORED,
            payload: qty
        }
    )
}

function orderIcecream (qty =1){
    return(
        {
            type: ICECREAM_ORDERED,
            payload: qty
        }
    )
}

function restockIcecream (qty=1) {
    return(
        {
            type: ICECREAM_RESTOCKED, 
            payload: qty
        }
    )
}

// const initialState = {
//     numOfCakes: 10,
//     numofIcecreams: 20
// }

const initialCakeState = {
    numOfCakes :10
}

const initialIcecreamState = {
    numofIcecreams : 20
}

const cakeReducer = (state=initialCakeState, action) => {
    switch(action.type) {
        case CAKE_ORDERED:
            return{
                ...state,
                numOfCakes: state.numOfCakes - 1,
            }
        case CAKE_RESTORED:
            return{
                ...state,
                numOfCakes: state.numOfCakes + action.payload,
            }

        default:
                return state
    }
}

const icecreamReducer = (state=initialIcecreamState, action) => {
    switch(action.type) {
        case ICECREAM_ORDERED:
            return{
                ...state,
                numofIcecreams: state.numofIcecreams - 1,
            }
        case ICECREAM_RESTOCKED:
            return{
                ...state,
                numofIcecreams: state.numofIcecreams + action.payload,
            }

        default:
                return state
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: icecreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('initial state', store.getState())

const unsubscribe = store.subscribe(() => {})

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())

// store.dispatch(restockCake(3))

const actions = bindActionCreators({orderCake, restockCake, orderIcecream, restockIcecream}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()

actions.restockCake(3)

actions.orderIcecream()
actions.orderIcecream()

actions.restockIcecream(2)

unsubscribe()