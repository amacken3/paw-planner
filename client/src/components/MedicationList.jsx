import { useState } from "react";
import styles from "./MedicationList.module.css";

function MedicationList({ medications, onUpdateMedication, onDeleteMedication }) {
    if (medications.length === 0) {
        return (
        <div className={styles.emptyState}>
            <p>No medications added yet.</p>
            <span>Add a medication to track dosage, frequency, and notes.</span>
        </div>
        );
    }

    return (
        <div className={styles.cardGrid}>
        {medications.map((medication) => (
            <MedicationCard
            key={medication.id}
            medication={medication}
            onUpdateMedication={onUpdateMedication}
            onDeleteMedication={onDeleteMedication}
            />
        ))}
        </div>
    );
    }

    function MedicationCard({ medication, onUpdateMedication, onDeleteMedication }) {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: medication.name || "",
        dosage: medication.dosage || "",
        frequency: medication.frequency || "",
        start_date: medication.start_date || "",
        end_date: medication.end_date || "",
        notes: medication.notes || "",
    });

    function handleChange(event) {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        });
    }

    async function handleUpdate(event) {
        event.preventDefault();
        setError("");

        try {
        const medicationData = {
            ...formData,
            dosage: formData.dosage ? Number(formData.dosage) : "",
        };

        await onUpdateMedication(medication.id, medicationData);
        setIsEditing(false);
        } catch (error) {
        setError(error.message);
        }
    }

    async function handleDelete() {
        try {
        await onDeleteMedication(medication.id);
        } catch (error) {
        alert(error.message);
        }
    }

    function handleCancel() {
        setFormData({
        name: medication.name || "",
        dosage: medication.dosage || "",
        frequency: medication.frequency || "",
        start_date: medication.start_date || "",
        end_date: medication.end_date || "",
        notes: medication.notes || "",
        });

        setError("");
        setIsEditing(false);
    }

    if (isEditing) {
        return (
        <article className={styles.card}>
            <div className={styles.cardHeader}>
            <h3>Edit {medication.name}</h3>
            </div>

            {error ? <p className="error">{error}</p> : null}

            <form className={styles.editForm} onSubmit={handleUpdate}>
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
                Dosage
                <input
                type="number"
                step="0.1"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
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
                required
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

            <div className={styles.actions}>
                <button className={styles.primaryButton} type="submit">
                Save
                </button>
                <button
                className={styles.secondaryButton}
                type="button"
                onClick={handleCancel}
                >
                Cancel
                </button>
            </div>
            </form>
        </article>
        );
    }

    return (
        <article className={styles.card}>
        <div className={styles.cardHeader}>
            <div>
            <p className={styles.kicker}>Medication</p>
            <h3>{medication.name}</h3>
            </div>

            <button
            className={styles.iconButton}
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label={`Edit ${medication.name}`}
            title="Edit medication"
            >
            ✏️
            </button>
        </div>

        <div className={styles.details}>
            <p>
            <span>Dosage</span>
            <strong>{medication.dosage}</strong>
            </p>

            <p>
            <span>Frequency</span>
            <strong>{medication.frequency}</strong>
            </p>

            {medication.start_date ? (
            <p>
                <span>Start</span>
                <strong>{medication.start_date}</strong>
            </p>
            ) : null}

            {medication.end_date ? (
            <p>
                <span>End</span>
                <strong>{medication.end_date}</strong>
            </p>
            ) : null}
        </div>

        {medication.notes ? <p className={styles.notes}>{medication.notes}</p> : null}

        <div className={styles.actions}>
            <button className={styles.dangerButton} type="button" onClick={handleDelete}>
            Delete
            </button>
        </div>
        </article>
    );
}

export default MedicationList;