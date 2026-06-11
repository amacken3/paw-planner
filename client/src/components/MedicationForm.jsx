import { useState } from "react";
import styles from "./MedicationForm.module.css";

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
        <form className={styles.form} onSubmit={handleSubmit}>
        {error ? <p className="error">{error}</p> : null}

        <label className={styles.field}>
            Medication Name
            <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            />
        </label>

        <div className={styles.row}>
            <label className={styles.field}>
            Dosage
            <input
                type="text"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                placeholder="Example: 1, 2.5, 10"
            />
            </label>

            <label className={styles.field}>
            Unit
            <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="mg, tablet, capsule..."
            />
            </label>
        </div>

        <label className={styles.field}>
            Instructions
            <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            placeholder="Give with food, once in the morning..."
            />
        </label>

        <label className={styles.field}>
            Frequency
            <input
            type="text"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            placeholder="Daily, twice a day, weekly..."
            />
        </label>

        <div className={styles.row}>
            <label className={styles.field}>
            Start Date
            <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
            />
            </label>

            <label className={styles.field}>
            End Date
            <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
            />
            </label>
        </div>

        <label className={styles.field}>
            Notes
            <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            />
        </label>

        <button className={styles.submitButton} type="submit">
            Add Medication
        </button>
        </form>
    );
}

export default MedicationForm;