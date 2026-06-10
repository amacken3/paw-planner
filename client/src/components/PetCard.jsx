function PetCard({ pet, onDeletePet }) {
  async function handleDelete() {
    try {
      await onDeletePet(pet.id);
    } catch (error) {
      alert(error.message);
    }
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

      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </article>
  );
}

export default PetCard;