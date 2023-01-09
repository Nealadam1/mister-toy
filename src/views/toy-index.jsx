import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToyFilter } from "../cmps/toy-filter";
import { ToyList } from "../cmps/toy-list";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { loadToys, removeToy } from "../store/actions/toy.action";

export function ToyIndex(){
    const toys= useSelector((storeState)=> storeState.toyModule.toys)
    const isLoading = useSelector((storeState)=> storeState.toyModule.isLoading)
    const dispatch=useDispatch()
    
    useEffect(()=>{
        onLoadToys()
    },[])

    function onLoadToys(filterBy,sortBy){
        loadToys(filterBy,sortBy)
        .catch(err => {
            showErrorMsg('Cannot Load Toys')
        })
    }

    function onRemoveToy(toyId){
        removeToy(toyId)
        .then(()=> {
            showSuccessMsg('Toy removed')
        })
        .catch(()=>{
            showErrorMsg('Could not remove toy')
        })
    }

    function setFilter(filterBy){
        console.log('set filter by:',filterBy)
        onLoadToys(filterBy)
    }

    return <section>
        <h3>Toys App</h3>
        <main>
            <Link to={'/toy/edit'}>Add Toy</Link>
            <ToyFilter onSetFilter={setFilter}/>
            {isLoading&& <p>Loading...</p>}
            <ToyList toys={toys} onRemoveToy={onRemoveToy}/>
        </main>
    </section>

    
}