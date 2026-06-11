import { useState } from "react";
import MedicationForm from "./MedicationForm";
import MedicationList from "./MedicationList";
import styles from "./ResourceSection.module.css";

function MedicationSection({
  medications,
  medicationError,
  addMedication,
  updateMedication,
  deleteMedication,
}) {
    const [showForm, setShowForm] = useState(false);

    async function handleAddMedication(formData) {
        await addMedication(formData);
        setShowForm(false);
    }

    return (
        <section className={styles.section}>
        <div className={styles.header}>
            <div>
            <p className={styles.kicker}>Medication plan</p>
            <h3>Medications</h3>
            <p className={styles.description}>
                Track prescriptions, supplements, dosage, frequency, and date ranges.
            </p>
            </div>

            <div className={styles.headerActions}>
            <span className={styles.count}>
                {medications.length}{" "}
                {medications.length === 1 ? "medication" : "medications"}
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

        {medicationError ? <p className="error">{medicationError}</p> : null}

        {showForm ? (
            <div className={styles.formWrapper}>
            <MedicationForm onAddMedication={handleAddMedication} />
            </div>
        ) : null}

        <MedicationList
            medications={medications}
            onUpdateMedication={updateMedication}
            onDeleteMedication={deleteMedication}
        />
        </section>
    );
}

export default MedicationSection;