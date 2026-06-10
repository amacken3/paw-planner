import { useEffect, useState } from "react";
import API_BASE_URL from "../services/api";

function useMedications(petId) {
    const [medications, setMedications] = useState([]);
    const [medicationError, setMedicationError] = useState("");

    useEffect(() => {
        if (petId) {
        fetchMedications();
        }
    }, [petId]);

    async function fetchMedications() {
        try {
        const response = await fetch(
            `${API_BASE_URL}/api/pets/${petId}/medications`,
            {
            credentials: "include",
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Unable to load medications.");
        }

        setMedications(data);
        } catch (error) {
        setMedicationError(error.message);
        }
    }

    async function addMedication(formData) {
        const response = await fetch(
        `${API_BASE_URL}/api/pets/${petId}/medications`,
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
        throw new Error(data.error || "Unable to create medication.");
        }

        setMedications((currentMedications) => [...currentMedications, data]);
        return data;
    }

    async function updateMedication(medicationId, formData) {
        const response = await fetch(
        `${API_BASE_URL}/api/medications/${medicationId}`,
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
        throw new Error(data.error || "Unable to update medication.");
        }

        setMedications((currentMedications) =>
        currentMedications.map((medication) =>
            medication.id === medicationId ? data : medication
        )
        );

        return data;
    }

    async function deleteMedication(medicationId) {
        const response = await fetch(
        `${API_BASE_URL}/api/medications/${medicationId}`,
        {
            method: "DELETE",
            credentials: "include",
        }
        );

        if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Unable to delete medication.");
        }

        setMedications((currentMedications) =>
        currentMedications.filter((medication) => medication.id !== medicationId)
        );
    }

    return {
        medications,
        medicationError,
        addMedication,
        updateMedication,
        deleteMedication,
    };
}

export default useMedications;