import { useState } from "react";
import CareRoutineForm from "./CareRoutineForm";
import CareRoutineList from "./CareRoutineList";
import styles from "./ResourceSection.module.css";

function CareRoutineSection({
  careRoutines,
  careRoutineError,
  addCareRoutine,
  updateCareRoutine,
  deleteCareRoutine,
}) {
    const [showForm, setShowForm] = useState(false);

    async function handleAddCareRoutine(formData) {
        await addCareRoutine(formData);
        setShowForm(false);
    }

    return (
        <section className={styles.section}>
        <div className={styles.header}>
            <div>
            <p className={styles.kicker}>Recurring tasks</p>
            <h3>Care Routines</h3>
            <p className={styles.description}>
                Repeating care tasks like feeding, walks, grooming, or daily checks.
            </p>
            </div>

            <div className={styles.headerActions}>
            <span className={styles.count}>
                {careRoutines.length}{" "}
                {careRoutines.length === 1 ? "routine" : "routines"}
            </span>

            <button
                className={styles.toggleButton}
                type="button"
                onClick={() => setShowForm(!showForm)}
            >
                {showForm ? "Close" : "+ Add"}
            </button>
            </div>
        </div>

        {careRoutineError ? <p className="error">{careRoutineError}</p> : null}

        {showForm ? (
            <div className={styles.formWrapper}>
            <CareRoutineForm onAddCareRoutine={handleAddCareRoutine} />
            </div>
        ) : null}

        <CareRoutineList
            careRoutines={careRoutines}
            onUpdateCareRoutine={updateCareRoutine}
            onDeleteCareRoutine={deleteCareRoutine}
        />
        </section>
    );
}

export default CareRoutineSection;