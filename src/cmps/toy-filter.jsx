import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { toyService } from "../services/toy.service";
import { utilService } from "../services/util.service";

export function ToyFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter)
    const labels = toyService.getLabelList()
    const options = labels.map(l => ({ value: l, label: l }))

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }
    function handleChange({ target }, value) {
        if (target) {
            let { value, type, name: field } = target
            value = type === 'number' ? +value : value
            setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        } else {
            console.log(value)
            if (value.action === "remove-value") {
                setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: prevFilter.labels.filter(label => label !== value.removedValue.label) }))
            } else {
                setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: [...prevFilter.labels, value.option.label] }))
            }
        }
    }

    return <section className="toy-filter">
        <h2>Toy Filter</h2>
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="name"></label>
            <input type="text"
                name="name"
                id="name"
                placeholder="By name"
                value={filterByToEdit.name}
                onChange={handleChange} />
            <select name="stock" id="inStock" onChange={handleChange}>
                <option value={true}>In Stock</option>
                <option value={false}>Out of Stock</option>
            </select>
            <Select
                isMulti
                value={filterByToEdit.labels ? filterByToEdit.labels.map((label) => ({ value: label, label })) : []}
                options={options}
                name='labels'
                onChange={handleChange}
            />
        </form>

    </section>



}