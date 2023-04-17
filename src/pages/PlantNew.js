import { useState } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const PlantNew = (props) => {
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    const plants = props.plants
    const plant = plants.find((p) => p.id === id)
    // state to hold all form data
    const [form, setForm] = useState({
        commonName: `${plant['Common name']}`,
        image: `${plant.Img}`,
        category: `${plant.Categories}`,
    })

    // handle changes in the form
    const handleChanges = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
        console.log(form)
    }

    // handle the submission of the form
    const handleSubmit = (event) => {
        event.preventDefault()
        props.createPlant(form).then(() => {
            navigate('/userPlants')
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <form onSubmit={handleSubmit} className="new-form">
            <input
                type="text"
                value={form.commonName}
                name="commonName"
                placeholder="Common Name"
                onChange={handleChanges}
            />
            <input
                type="text"
                value={form.image}
                name="image"
                placeholder="Image URL"
                onChange={handleChanges}
            />
            <input
                type="text"
                value={form.category}
                name="category"
                placeholder="Category"
                onChange={handleChanges}
            />
            <input type="submit" value="Create Plant" />
        </form>
    )
}

export default PlantNew;