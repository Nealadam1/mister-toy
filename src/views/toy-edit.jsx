import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { toyService } from "../services/toy.service";
import { loadToys } from "../store/actions/toy.action";
import React from 'react'
import Select from 'react-select'


export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()
    const labels = toyService.getLabelList()
    const options = labels.map(l => ({ value: l, label: l }))

    console.log(toyToEdit)

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])
    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch(err => {
                console.log('had issues in toy edit')
                navigate('/toy')
            })
    }

    function handleChange({ target }, value) {
        if (target) {
            let { value, type, name: field } = target
            value = type === 'number' ? +value : value
            setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
        } else {
            console.log(value)
            if (value.action === "remove-value") {
                setToyToEdit((prevToy) => ({ ...prevToy, labels: prevToy.labels.filter(label => label !== value.removedValue.label) }))
            } else {
                setToyToEdit((prevToy) => ({ ...prevToy, labels: [...prevToy.labels, value.option.label] }))
            }
        }
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit)
            .then((toy) => {
                console.log('Toy saved', toy)
                showSuccessMsg('Toy saved')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }

    return <section className="toy-edit">
        <h2>{toyToEdit._id ? 'Edit this Toy' : 'Add a new Toy'}</h2>
        <form onSubmit={onSaveToy}>
            <label htmlFor="name">Name:</label>
            <input type="text"
                name="name"
                id="name"
                placeholder="Enter toy name"
                value={toyToEdit.name}
                onChange={handleChange} />
            <label htmlFor="price">Price:</label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                value={toyToEdit.price}
                onChange={handleChange} />
            <label htmlFor="inStock">inStock:</label>
            <select name="inStock" id="inStock" onChange={handleChange}>
                <option value={true}>In Stock</option>
                <option value={false}>Out of Stock</option>
            </select>
            <Select
                isMulti
                value={toyToEdit.labels ? toyToEdit.labels.map((label) => ({ value: label, label })) : []}
                options={options}
                name='labels'
                onChange={handleChange}
            />

            <div>
                <button> {toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </div>

        </form>
    </section>
}