export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const UPDATE_TOY = 'UPDATE_TOY'
export const UNDO_REMOVE_TOY = 'UNDO_REMOVE_TOY'

const initialState = {
    toys: [],
    isLoading: false,
    lastRemovedToy: null
}

export function toyReducer(state = initialState, action) {
    let toys
    let lastRemovedToy

    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case REMOVE_TOY:
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)

        case UNDO_REMOVE_TOY:
            ({ lastRemovedToy } = state)
            toys = [lastRemovedToy, ...state.toys]
            return { ...state, toys, lastRemovedToy: null }


        default:
            return state
    }
}