import PetCard from "./PetCard";
import styles from "./PetList.module.css";

function PetList({ pets, onDeletePet, onUpdatePet }) {
  if (pets.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No pets added yet.</p>
        <span>Add your first pet to start tracking care routines.</span>
      </div>
    );
  }

  return (
    <div className={styles.petGrid}>
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