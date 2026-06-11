import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PetCard.module.css";

function PetCard({ pet, onDeletePet, onUpdatePet }) {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: pet.name || "",
        species: pet.species || "",
        breed: pet.breed || "",
        age: pet.age || "",
        weight: pet.weight || "",
        notes: pet.notes || "",
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
        await onUpdatePet(pet.id, formData);
        setIsEditing(false);
        } catch (error) {
        setError(error.message);
        }
    }

    async function handleDelete() {
        try {
        await onDeletePet(pet.id);
        } catch (error) {
        alert(error.message);
        }
    }

    function handleCancel() {
        setFormData({
        name: pet.name || "",
        species: pet.species || "",
        breed: pet.breed || "",
        age: pet.age || "",
        weight: pet.weight || "",
        notes: pet.notes || "",
        });
        setError("");
        setIsEditing(false);
    }

    if (isEditing) {
        return (
        <article className={styles.card}>
            <div className={styles.cardHeader}>
            <h3>Edit {pet.name}</h3>
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

            <div className={styles.formRow}>
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
            </div>

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
            <p className={styles.species}>{pet.species}</p>
            <h3>{pet.name}</h3>
            </div>

            <button
            className={styles.iconButton}
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label={`Edit ${pet.name}`}
            title="Edit pet"
            >
            ✏️
            </button>
        </div>

        <div className={styles.details}>
            {pet.breed ? (
            <p>
                <span>Breed</span>
                <strong>{pet.breed}</strong>
            </p>
            ) : null}

            {pet.age ? (
            <p>
                <span>Age</span>
                <strong>{pet.age}</strong>
            </p>
            ) : null}

            {pet.weight ? (
            <p>
                <span>Weight</span>
                <strong>{pet.weight} lbs</strong>
            </p>
            ) : null}
        </div>

        {pet.notes ? <p className={styles.notes}>{pet.notes}</p> : null}

        <div className={styles.actions}>
            <Link className={styles.detailsLink} to={`/pets/${pet.id}`}>
            View Details
            </Link>

            <button className={styles.dangerButton} type="button" onClick={handleDelete}>
            Delete
            </button>
        </div>
        </article>
    );
}

export default PetCard;