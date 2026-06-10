import { useState } from "react";

function PetForm({ onAddPet }) {
    const [formData, setFormData] = useState({
        name: "",
        species: "",
        breed: "",
        age: "",
        weight: "",
        notes: "",
    });

    const [error, setError] = useState("");

    function handleChange(event) {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        try {
        await onAddPet(formData);

        setFormData({
            name: "",
            species: "",
            breed: "",
            age: "",
            weight: "",
            notes: "",
        });
        } catch (error) {
        setError(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
        {error ? <p className="error">{error}</p> : null}

        <label>
            Name
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            />
        </label>

        <label>
            Species
            <input
            type="text"
            name="species"
            value={formData.species}
            onChange={handleChange}
            required
            />
        </label>

        <label>
            Breed
            <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            />
        </label>

        <label>
            Age
            <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            />
        </label>

        <label>
            Weight
            <input
            type="number"
            step="0.1"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            />
        </label>

        <label>
            Notes
            <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            />
        </label>

        <button type="submit">Add Pet</button>
        </form>
    );
}

    export default PetForm;