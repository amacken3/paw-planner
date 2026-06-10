import PetCard from "./PetCard";

function PetList({ pets, onDeletePet, onUpdatePet }) {
  if (pets.length === 0) {
    return <p>No pets added yet.</p>;
  }

  return (
    <div>
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          pet={pet}
          onDeletePet={onDeletePet}
          onUpdatePet={onUpdatePet}
        />
      ))}
    </div>
  );
}

export default PetList;