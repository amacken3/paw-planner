import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import API_BASE_URL from "../services/api";
import PetForm from "../components/PetForm";
import PetList from "../components/PetList";

function Dashboard() {
    const { user } = useUser();
    const [pets, setPets] = useState([]);
    const [error, setError] = useState("");

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
        <main>
        <h1>Dashboard</h1>

        <p>Welcome back{user?.username ? `, ${user.username}` : ""}.</p>

        {error ? <p className="error">{error}</p> : null}

        <section>
            <h2>Add a Pet</h2>
            <PetForm onAddPet={addPet} />
        </section>

        <section>
            <h2>My Pets</h2>
            <PetList
                pets={pets}
                onDeletePet={deletePet}
                onUpdatePet={updatePet}
            />
        </section>
        </main>
    );
    }

export default Dashboard;