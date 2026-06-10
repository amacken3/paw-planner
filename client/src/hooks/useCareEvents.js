import { useEffect, useState } from "react";
import API_BASE_URL from "../services/api";

function useCareEvents(petId) {
    const [careEvents, setCareEvents] = useState([]);
    const [careEventError, setCareEventError] = useState("");

    useEffect(() => {
        if (petId) {
        fetchCareEvents();
        }
    }, [petId]);

    async function fetchCareEvents() {
        try {
        const response = await fetch(
            `${API_BASE_URL}/api/pets/${petId}/care-events`,
            {
            credentials: "include",
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Unable to load care events.");
        }

        setCareEvents(data);
        } catch (error) {
        setCareEventError(error.message);
        }
    }

    async function addCareEvent(formData) {
        const response = await fetch(
        `${API_BASE_URL}/api/pets/${petId}/care-events`,
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
        throw new Error(data.error || "Unable to create care event.");
        }

        setCareEvents((currentEvents) => [...currentEvents, data]);
        return data;
    }

    async function updateCareEvent(careEventId, formData) {
        const response = await fetch(
        `${API_BASE_URL}/api/care-events/${careEventId}`,
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
        throw new Error(data.error || "Unable to update care event.");
        }

        setCareEvents((currentEvents) =>
        currentEvents.map((careEvent) =>
            careEvent.id === careEventId ? data : careEvent
        )
        );

        return data;
    }

    async function deleteCareEvent(careEventId) {
        const response = await fetch(
        `${API_BASE_URL}/api/care-events/${careEventId}`,
        {
            method: "DELETE",
            credentials: "include",
        }
        );

        if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Unable to delete care event.");
        }

        setCareEvents((currentEvents) =>
        currentEvents.filter((careEvent) => careEvent.id !== careEventId)
        );
    }

    return {
        careEvents,
        careEventError,
        addCareEvent,
        updateCareEvent,
        deleteCareEvent,
    };
}

export default useCareEvents;