import { useEffect, useState } from "react";
import API_BASE_URL from "../services/api";

function useCareRoutines(petId) {
    const [careRoutines, setCareRoutines] = useState([]);
    const [careRoutineError, setCareRoutineError] = useState("");

    useEffect(() => {
        if (petId) {
        fetchCareRoutines();
        }
    }, [petId]);

    async function fetchCareRoutines() {
        try {
        const response = await fetch(
            `${API_BASE_URL}/api/pets/${petId}/care-routines`,
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
        setCareRoutineError(error.message);
        }
    }

    async function addCareRoutine(formData) {
        const response = await fetch(
        `${API_BASE_URL}/api/pets/${petId}/care-routines`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        }
        );

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.error || "Unable to create care routine.");
        }

        setCareRoutines((currentRoutines) => [...currentRoutines, data]);
        return data;
    }

    async function updateCareRoutine(routineId, formData) {
        const response = await fetch(
        `${API_BASE_URL}/api/care-routines/${routineId}`,
        {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(formData),
        }
        );

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.error || "Unable to update care routine.");
        }

        setCareRoutines((currentRoutines) =>
        currentRoutines.map((routine) =>
            routine.id === routineId ? data : routine
        )
        );

        return data;
    }

    async function deleteCareRoutine(routineId) {
        const response = await fetch(
        `${API_BASE_URL}/api/care-routines/${routineId}`,
        {
            method: "DELETE",
            credentials: "include",
        }
        );

        if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Unable to delete care routine.");
        }

        setCareRoutines((currentRoutines) =>
        currentRoutines.filter((routine) => routine.id !== routineId)
        );
    }

    return {
        careRoutines,
        careRoutineError,
        addCareRoutine,
        updateCareRoutine,
        deleteCareRoutine,
    };
}

export default useCareRoutines;