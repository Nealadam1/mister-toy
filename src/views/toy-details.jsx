import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChatApp } from "../cmps/chat-app";
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
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot Load Toy')
                navigate('/toy')
            })
    }

    async function onAddToyMsg(msg){
        try {
            const savedMsg = await toyService.addToyMsg(toyId, msg)
            setToy((prevToy)=> ({...prevToy, msgs: [...prevToy.msgs, savedMsg]}))
        } catch (error) {
            console.log('err'.err)
            showErrorMsg('cannot save msg')
        }
    }

    if (!toy) return <div>Loading...</div>
    return <section className='toy-details'>
        <h1>{toy.name}</h1>
        <h5>Price:${toy.price}</h5>
        <p>Added at:{utilService.getLocalDate(toy.createdAt)}</p>
        <p>labels: {toy.labels.join(' ,')}</p>
        <p>Stock: {toy.inStock? 'Available':'Out of stock'}</p>

        <ChatApp toy={toy} onAddToyMsg={onAddToyMsg}/>

        <Link to={'/toy'}>Back</Link>

    </section>
}