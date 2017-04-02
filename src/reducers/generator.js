import { ADD_RULE, REMOVE_RULE, COUNT_CARD, SET_RULE_TAB } from '../actions'

const initialState = [
        {
        id: 0,
        text: 'Fork',
        completed: false,
        count: 0
    }
]

export default function generator(state = initialState, action) {
    switch(action.type) {
        case ADD_RULE:
            return [
                {
                    id: state.reduce((maxId, todo) => (
                        Math.max(todo.id, maxId)
                    ), -1) + 1,
                    text: action.text,
                    completed: false
                },
                ...state
            ]
        case REMOVE_RULE:
            return state.filter(item => item.id !== action.id )

        case COUNT_CARD:
            return state.reduce((maxId, todo) => (
                        Math.max(todo.count, maxId)
                    ), -1) + 1
                    
        case SET_RULE_TAB:
            return state.filter(item => ( item.card === action.card))
        
        default:
            return state
    }
}