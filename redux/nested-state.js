const redux = require('redux')
const produce = require('immer').produce
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators

const initialState = {
    name: 'leslie',
    address: {
        street: '123 street',
        city: 'kampala',
        state: 'central'
    }
}

const STREET_UPDATED = 'STREET_UPDATED'

const updateStreet = (street) => {
    return({
        type: 'STREET_UPDATED',
        payload: street
    })
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case STREET_UPDATED:
            // return {
            //     ...state,
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     }
            // }

            return produce(state, (draft) => {
                draft.address.street = action.payload
            })

        default: {
            return state
        }
    }
}

const store = createStore(reducer)
console.log('initial state', store.getState())

const unsubscribe = store.subscribe(() => console.log('updated state', store.getState()))

const actions = bindActionCreators({updateStreet}, store.dispatch)

actions.updateStreet('456 strase')

unsubscribe()