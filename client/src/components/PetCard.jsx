import { useState } from "react";
import { Link } from "react-router-dom";

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
      <article>
        <h3>Edit {pet.name}</h3>

        {error ? <p className="error">{error}</p> : null}

        <form onSubmit={handleUpdate}>
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
      <h3>{pet.name}</h3>

      <p>
        <strong>Species:</strong> {pet.species}
      </p>

      {pet.breed ? (
        <p>
          <strong>Breed:</strong> {pet.breed}
        </p>
      ) : null}

      {pet.age ? (
        <p>
          <strong>Age:</strong> {pet.age}
        </p>
      ) : null}

      {pet.weight ? (
        <p>
          <strong>Weight:</strong> {pet.weight}
        </p>
      ) : null}

      {pet.notes ? <p>{pet.notes}</p> : null}

      <Link to={`/pets/${pet.id}`}>View Details</Link>

      <button type="button" onClick={() => setIsEditing(true)}>
        Edit
      </button>

      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </article>
  );
}

export default PetCard;