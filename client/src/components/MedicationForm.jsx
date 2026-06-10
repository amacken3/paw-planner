import { useState } from "react";

function MedicationForm({ onAddMedication }) {
    const [formData, setFormData] = useState({
        name: "",
        dosage: "",
        unit: "",
        instructions: "",
        frequency: "",
        start_date: "",
        end_date: "",
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
        await onAddMedication(formData);

        setFormData({
            name: "",
            dosage: "",
            unit: "",
            instructions: "",
            frequency: "",
            start_date: "",
            end_date: "",
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
            Medication Name
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            />
        </label>

        <label>
            Dosage
            <input
            type="text"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            placeholder="Example: 1, 2.5, 10"
            />
        </label>

        <label>
            Unit
            <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="mg, tablet, capsule..."
            />
        </label>

        <label>
            Instructions
            <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Give with food, once in the morning..."
            />
        </label>

        <label>
            Frequency
            <input
            type="text"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            placeholder="Daily, twice a day, weekly..."
            />
        </label>

        <label>
            Start Date
            <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            />
        </label>

        <label>
            End Date
            <input
            type="date"
            name="end_date"
            value={formData.end_date}
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

        <button type="submit">Add Medication</button>
        </form>
    );
}

export default MedicationForm;