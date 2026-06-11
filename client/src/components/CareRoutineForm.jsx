import { useState } from "react";
import styles from "./CareRoutineForm.module.css";

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
        <form className={styles.form} onSubmit={handleSubmit}>
        {error ? <p className="error">{error}</p> : null}

        <label className={styles.field}>
            Title
            <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            />
        </label>

        <div className={styles.row}>
            <label className={styles.field}>
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

            <label className={styles.field}>
            Frequency
            <input
                type="text"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                placeholder="Daily, weekly, twice a day..."
                required
            />
            </label>
        </div>

        <label className={styles.field}>
            Time of Day
            <input
            type="time"
            name="time_of_day"
            value={formData.time_of_day}
            onChange={handleChange}
            />
        </label>

        <label className={styles.field}>
            Notes
            <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            />
        </label>

        <button className={styles.submitButton} type="submit">
            Add Care Routine
        </button>
        </form>
    );
}

export default CareRoutineForm;