import { useState } from "react";

function MedicationList({
  medications,
  onUpdateMedication,
  onDeleteMedication,
}) {
    if (medications.length === 0) {
        return <p>No medications added yet.</p>;
    }

    return (
        <div>
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

    function MedicationCard({
    medication,
    onUpdateMedication,
    onDeleteMedication,
    }) {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: medication.name || "",
        dosage: medication.dosage || "",
        unit: medication.unit || "",
        instructions: medication.instructions || "",
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
        await onUpdateMedication(medication.id, formData);
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
        unit: medication.unit || "",
        instructions: medication.instructions || "",
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
        <article>
            <h3>Edit {medication.name}</h3>

            {error ? <p className="error">{error}</p> : null}

            <form onSubmit={handleUpdate}>
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
                />
            </label>

            <label>
                Unit
                <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                />
            </label>

            <label>
                Instructions
                <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                />
            </label>

            <label>
                Frequency
                <input
                type="text"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
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

            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>
                Cancel
            </button>
            </form>
        </article>
        );
    }

    return (
        <article>
        <h3>{medication.name}</h3>

        {medication.dosage ? (
            <p>
            <strong>Dosage:</strong> {medication.dosage}
            </p>
        ) : null}

        {medication.unit ? (
            <p>
            <strong>Unit:</strong> {medication.unit}
            </p>
        ) : null}

        {medication.frequency ? (
            <p>
            <strong>Frequency:</strong> {medication.frequency}
            </p>
        ) : null}

        {medication.start_date ? (
            <p>
            <strong>Start Date:</strong> {medication.start_date}
            </p>
        ) : null}

        {medication.end_date ? (
            <p>
            <strong>End Date:</strong> {medication.end_date}
            </p>
        ) : null}

        {medication.instructions ? (
            <p>
            <strong>Instructions:</strong> {medication.instructions}
            </p>
        ) : null}

        {medication.notes ? <p>{medication.notes}</p> : null}

        <button type="button" onClick={() => setIsEditing(true)}>
            Edit
        </button>

        <button type="button" onClick={handleDelete}>
            Delete
        </button>
        </article>
    );
}

export default MedicationList;