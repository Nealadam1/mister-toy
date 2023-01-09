import { toyService } from "../../services/toy.service";
import { ADD_TOY, REMOVE_TOY, SET_IS_LOADING, SET_TOYS, UNDO_REMOVE_TOY, UPDATE_TOY } from "../reducers/toy.reducer";
import { store } from "../store";

export function loadToys(filterBy, sortBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return toyService.query(filterBy, sortBy)
        .then((toys) => {
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('Had issues loading toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeToy(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    return toyService.remove(toyId)
        .catch(err => {
            store.dispatch({ type: UNDO_REMOVE_TOY })
            console.log('Had issues removing toy', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({type, toy: savedToy})
            return savedToy
        })
        .catch(err => {
            console.error('Cannot save toy',err)
            throw err
        })
}
