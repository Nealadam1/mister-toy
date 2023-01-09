import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { showErrorMsg } from "../services/event-bus.service";
import { toyService } from "../services/toy.service";
import { utilService } from "../services/util.service";
import { loadToys } from "../store/actions/toy.action";

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot Load Toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    return <section className='toy-details'>
        <h1>{toy.name}</h1>
        <h5>Price:${toy.price}</h5>
        <p>Added at:{utilService.getLocalDate(toy.createdAt)}</p>
        <p>labels: {toy.labels.join(' ,')}</p>
        <p>Stock: {toy.inStock? 'Available':'Out of stock'}</p>

        <Link to={'/toy'}>Back</Link>

    </section>
}