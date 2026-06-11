import { useState } from "react";
import CareEventForm from "./CareEventForm";
import CareEventList from "./CareEventList";
import styles from "./ResourceSection.module.css";

function CareEventSection({
  careEvents,
  careEventError,
  careRoutines,
  medications,
  addCareEvent,
  updateCareEvent,
  deleteCareEvent,
}) {
    const [showForm, setShowForm] = useState(false);

    async function handleAddCareEvent(formData) {
        await addCareEvent(formData);
        setShowForm(false);
    }

    return (
        <section className={styles.section}>
        <div className={styles.header}>
            <div>
            <p className={styles.kicker}>Care actions</p>
            <h3>Care Events</h3>
            <p className={styles.description}>
                Scheduled or completed care actions connected to routines,
                medications, or one-time needs.
            </p>
            </div>

            <div className={styles.headerActions}>
            <span className={styles.count}>
                {careEvents.length} {careEvents.length === 1 ? "event" : "events"}
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

        {careEventError ? <p className="error">{careEventError}</p> : null}

        {showForm ? (
            <div className={styles.formWrapper}>
            <CareEventForm
                onAddCareEvent={handleAddCareEvent}
                careRoutines={careRoutines}
                medications={medications}
            />
            </div>
        ) : null}

        <CareEventList
            careEvents={careEvents}
            careRoutines={careRoutines}
            medications={medications}
            onUpdateCareEvent={updateCareEvent}
            onDeleteCareEvent={deleteCareEvent}
        />
        </section>
    );
}

export default CareEventSection;