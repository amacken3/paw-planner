import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_BASE_URL from "../services/api";

function PetDetails() {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchPet();
    }, [id]);

    async function fetchPet() {
        try {
        const response = await fetch(`${API_BASE_URL}/api/pets/${id}`, {
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Unable to load pet.");
        }

        setPet(data);
        } catch (error) {
        setError(error.message);
        }
    }

    if (error) {
        return (
        <main>
            <p className="error">{error}</p>
            <Link to="/dashboard">Back to Dashboard</Link>
        </main>
        );
    }

    if (!pet) {
        return (
        <main>
            <p>Loading pet...</p>
        </main>
        );
    }

    return (
        <main>
        <Link to="/dashboard">Back to Dashboard</Link>

        <h1>{pet.name}</h1>

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

        {pet.notes ? (
            <p>
            <strong>Notes:</strong> {pet.notes}
            </p>
        ) : null}

        <hr />

        <p>
            Care routines, medications, and care events will be added on the next
            frontend branch.
        </p>
        </main>
    );
}

export default PetDetails;