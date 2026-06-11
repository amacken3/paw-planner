import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import API_BASE_URL from "../services/api";
import PetForm from "../components/PetForm";
import PetList from "../components/PetList";
import styles from "./Dashboard.module.css";

function Dashboard() {
    const { user } = useUser();
    const [pets, setPets] = useState([]);
    const [error, setError] = useState("");
    const [showPetForm, setShowPetForm] = useState(false);

    useEffect(() => {
      fetchPets();
    }, []);

    async function fetchPets() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/pets`, {
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load pets.");
        }

        setPets(data);
      } catch (error) {
        setError(error.message);
      }
    }

    async function addPet(formData) {
      const response = await fetch(`${API_BASE_URL}/api/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create pet.");
      }

      setPets([...pets, data]);
      setShowPetForm(false);
      return data;
    }

    async function deletePet(petId) {
      const response = await fetch(`${API_BASE_URL}/api/pets/${petId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Unable to delete pet.");
      }

      setPets(pets.filter((pet) => pet.id !== petId));
    }

    async function updatePet(petId, formData) {
      const response = await fetch(`${API_BASE_URL}/api/pets/${petId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to update pet.");
      }

      setPets(pets.map((pet) => (pet.id === petId ? data : pet)));

      return data;
    }

    return (
      <main className={styles.dashboard}>
        <section className={styles.hero}>
          <div>
            <p className={styles.kicker}>PawPlanner</p>
            <h1>Welcome back{user?.username ? `, ${user.username}` : ""}.</h1>
            <p className={styles.subtitle}>
              Manage your pets, routines, medications, and care events in one place.
            </p>
          </div>
        </section>

        {error ? <p className="error">{error}</p> : null}

        <section className={styles.contentGrid}>
            <div className={styles.formPanel}>
              <div className={styles.formPanelHeader}>
                <div>
                  <p className={styles.kicker}>New pet</p>
                  <h2>Add a Pet</h2>
                </div>

                <button
                  className={styles.toggleButton}
                  type="button"
                  onClick={() => setShowPetForm(!showPetForm)}
                >
                  {showPetForm ? "Close" : "+ Add"}
                </button>
              </div>

              {showPetForm ? <PetForm onAddPet={addPet} /> : (
                <p className={styles.formHint}>
                  Add a pet profile to start tracking routines, medications, and care events.
                </p>
              )}
            </div>

          <div className={styles.petPanel}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Overview</p>
                <h2>My Pets</h2>
              </div>
              <span className={styles.countBadge}>
                {pets.length} {pets.length === 1 ? "pet" : "pets"}
              </span>
            </div>

            <PetList
              pets={pets}
              onDeletePet={deletePet}
              onUpdatePet={updatePet}
            />
          </div>
        </section>
      </main>
    );
}

export default Dashboard;