import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_BASE_URL from "../services/api";
import CareRoutineForm from "../components/CareRoutineForm";
import CareRoutineList from "../components/CareRoutineList";
import MedicationForm from "../components/MedicationForm";
import MedicationList from "../components/MedicationList";
import CareEventForm from "../components/CareEventForm";
import CareEventList from "../components/CareEventList";

function PetDetails() {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [careRoutines, setCareRoutines] = useState([]);
    const [error, setError] = useState("");
    const [medications, setMedications] = useState([]);
    const [careEvents, setCareEvents] = useState([]);

    useEffect(() => {
        fetchPet();
        fetchCareRoutines();
        fetchMedications();
        fetchCareEvents();
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

    async function fetchCareRoutines() {
        try {
        const response = await fetch(
            `${API_BASE_URL}/api/pets/${id}/care-routines`,
            {
            credentials: "include",
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Unable to load care routines.");
        }

        setCareRoutines(data);
        } catch (error) {
        setError(error.message);
        }
    }

    async function addCareRoutine(formData) {
        const response = await fetch(`${API_BASE_URL}/api/pets/${id}/care-routines`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.error || "Unable to create care routine.");
        }

        setCareRoutines([...careRoutines, data]);
        return data;
    }

    async function updateCareRoutine(routineId, formData) {
        const response = await fetch(`${API_BASE_URL}/api/care-routines/${routineId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.error || "Unable to update care routine.");
        }

        setCareRoutines(
        careRoutines.map((routine) =>
            routine.id === routineId ? data : routine
        )
        );

        return data;
    }

    async function deleteCareRoutine(routineId) {
        const response = await fetch(`${API_BASE_URL}/api/care-routines/${routineId}`, {
        method: "DELETE",
        credentials: "include",
        });

        if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Unable to delete care routine.");
        }

        setCareRoutines(
        careRoutines.filter((routine) => routine.id !== routineId)
        );
    }

    async function fetchMedications() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/pets/${id}/medications`, {
            credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
            throw new Error(data.error || "Unable to load medications.");
            }

            setMedications(data);
        } catch (error) {
            setError(error.message);
        }
    }

    async function addMedication(formData) {
        const response = await fetch(`${API_BASE_URL}/api/pets/${id}/medications`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Unable to create medication.");
        }

        setMedications([...medications, data]);
        return data;
    }

    async function updateMedication(medicationId, formData) {
        const response = await fetch(`${API_BASE_URL}/api/medications/${medicationId}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Unable to update medication.");
        }

        setMedications(
            medications.map((medication) =>
            medication.id === medicationId ? data : medication
            )
        );

        return data;
    }

        async function deleteMedication(medicationId) {
            const response = await fetch(`${API_BASE_URL}/api/medications/${medicationId}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Unable to delete medication.");
            }

            setMedications(
                medications.filter((medication) => medication.id !== medicationId)
            );
        }

    async function fetchCareEvents() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/pets/${id}/care-events`, {
            credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
            throw new Error(data.error || "Unable to load care events.");
            }

            setCareEvents(data);
        } catch (error) {
            setError(error.message);
        }
    }

    async function addCareEvent(formData) {
        const response = await fetch(`${API_BASE_URL}/api/pets/${id}/care-events`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Unable to create care event.");
        }

        setCareEvents([...careEvents, data]);
        return data;
    }

    async function updateCareEvent(careEventId, formData) {
        const response = await fetch(`${API_BASE_URL}/api/care-events/${careEventId}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Unable to update care event.");
        }

        setCareEvents(
            careEvents.map((careEvent) =>
            careEvent.id === careEventId ? data : careEvent
            )
        );

        return data;
    }

    async function deleteCareEvent(careEventId) {
        const response = await fetch(`${API_BASE_URL}/api/care-events/${careEventId}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Unable to delete care event.");
        }

        setCareEvents(
            careEvents.filter((careEvent) => careEvent.id !== careEventId)
        );
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

            <section>
                <h2>Care Routines</h2>

                <CareRoutineForm onAddCareRoutine={addCareRoutine} />

                <CareRoutineList
                    careRoutines={careRoutines}
                    onDeleteCareRoutine={deleteCareRoutine}
                    onUpdateCareRoutine={updateCareRoutine}
                    />
            </section>

            <hr />

            <section>
                <h2>Medications</h2>

                <MedicationForm onAddMedication={addMedication} />

                <MedicationList
                    medications={medications}
                    onUpdateMedication={updateMedication}
                    onDeleteMedication={deleteMedication}
                />
            </section>

            <hr />

            <section>
            <h2>Care Events</h2>

            <CareEventForm
                onAddCareEvent={addCareEvent}
                careRoutines={careRoutines}
                medications={medications}
            />

            <CareEventList
                careEvents={careEvents}
                careRoutines={careRoutines}
                medications={medications}
                onUpdateCareEvent={updateCareEvent}
                onDeleteCareEvent={deleteCareEvent}
            />
            </section>
        </main>
    );
}

export default PetDetails;