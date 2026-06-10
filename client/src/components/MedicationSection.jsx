import MedicationForm from "./MedicationForm";
import MedicationList from "./MedicationList";

function MedicationSection({
  medications,
  medicationError,
  addMedication,
  updateMedication,
  deleteMedication,
}) {
    return (
        <section>
        <h2>Medications</h2>

        {medicationError ? <p className="error">{medicationError}</p> : null}

        <MedicationForm onAddMedication={addMedication} />

        <MedicationList
            medications={medications}
            onUpdateMedication={updateMedication}
            onDeleteMedication={deleteMedication}
        />
        </section>
    );
}

export default MedicationSection;