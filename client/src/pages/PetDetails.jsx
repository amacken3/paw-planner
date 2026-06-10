import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_BASE_URL from "../services/api";
import useCareRoutines from "../hooks/useCareRoutines";
import useMedications from "../hooks/useMedications";
import useCareEvents from "../hooks/useCareEvents";
import CareRoutineSection from "../components/CareRoutineSection";
import MedicationSection from "../components/MedicationSection";
import CareEventSection from "../components/CareEventSection";

function PetDetails() {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [petError, setPetError] = useState("");

    const careRoutineData = useCareRoutines(id);
    const medicationData = useMedications(id);
    const careEventData = useCareEvents(id);

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
        setPetError(error.message);
        }
    }

    if (petError) {
        return (
        <main>
            <p className="error">{petError}</p>
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

        <CareRoutineSection {...careRoutineData} />

        <hr />

        <MedicationSection {...medicationData} />

        <hr />

        <CareEventSection
            {...careEventData}
            careRoutines={careRoutineData.careRoutines}
            medications={medicationData.medications}
        />
        </main>
    );
}

export default PetDetails;