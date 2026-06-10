import { useState } from "react";

function CareRoutineForm({ onAddCareRoutine }) {
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        frequency: "",
        time_of_day: "",
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
            const routineData = {
            ...formData,
            time_of_day: formData.time_of_day
                ? `${formData.time_of_day}:00`
                : "",
            };

            await onAddCareRoutine(routineData);

            setFormData({
            title: "",
            category: "",
            frequency: "",
            time_of_day: "",
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
            Title
            <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            />
        </label>

        <label>
            Category
            <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Feeding, exercise, grooming..."
            required
            />
        </label>

        <label>
            Frequency
            <input
            type="text"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            placeholder="Daily, weekly, twice a day..."
            />
        </label>

        <label>
            Time of Day
            <input
            type="time"
            name="time_of_day"
            value={formData.time_of_day}
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

        <button type="submit">Add Care Routine</button>
        </form>
    );
}

export default CareRoutineForm;