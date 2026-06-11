import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_BASE_URL from "../services/api";
import useCareRoutines from "../hooks/useCareRoutines";
import useMedications from "../hooks/useMedications";
import useCareEvents from "../hooks/useCareEvents";
import CareRoutineSection from "../components/CareRoutineSection";
import MedicationSection from "../components/MedicationSection";
import CareEventSection from "../components/CareEventSection";
import styles from "./PetDetails.module.css";

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
        <main className={styles.page}>
            <p className="error">{petError}</p>
            <Link className={styles.backLink} to="/dashboard">
            ← Back to Dashboard
            </Link>
        </main>
        );
    }

    if (!pet) {
        return (
        <main className={styles.page}>
            <p className={styles.loading}>Loading pet...</p>
        </main>
        );
    }

    return (
        <main className={styles.page}>
        <Link className={styles.backLink} to="/dashboard">
            ← Back to Dashboard
        </Link>

        <section className={styles.petHero}>
            <div className={styles.petIntro}>
            <p className={styles.kicker}>Pet Profile</p>
            <h1>{pet.name}</h1>
            <p className={styles.subtitle}>
                Track care plans, medications, and care history for {pet.name}.
            </p>
            </div>

            <div className={styles.petStats}>
            <p>
                <span>Species</span>
                <strong>{pet.species}</strong>
            </p>

            {pet.breed ? (
                <p>
                <span>Breed</span>
                <strong>{pet.breed}</strong>
                </p>
            ) : null}

            {pet.age ? (
                <p>
                <span>Age</span>
                <strong>{pet.age}</strong>
                </p>
            ) : null}

            {pet.weight ? (
                <p>
                <span>Weight</span>
                <strong>{pet.weight} lbs</strong>
                </p>
            ) : null}
            </div>

            {pet.notes ? (
            <div className={styles.notesCard}>
                <span>Notes</span>
                <p>{pet.notes}</p>
            </div>
            ) : null}
        </section>

        <section className={styles.pageGroup}>
            <div className={styles.groupHeader}>
            <p className={styles.kicker}>Care Plan</p>
            <p>
                Set up recurring routines and medications that help organize daily
                care for your pet.
            </p>
            </div>

            <div className={styles.planGrid}>
            <CareRoutineSection {...careRoutineData} />
            <MedicationSection {...medicationData} />
            </div>
        </section>

        <section className={styles.pageGroup}>
            <div className={styles.groupHeader}>
            <p className={styles.kicker}>Care Timeline</p>
            <h2>Scheduled & Completed Care</h2>
            <p>
                Track individual care actions, including events connected to
                routines or medications.
            </p>
            </div>

            <CareEventSection
            {...careEventData}
            careRoutines={careRoutineData.careRoutines}
            medications={medicationData.medications}
            />
        </section>
        </main>
    );
}

export default PetDetails;