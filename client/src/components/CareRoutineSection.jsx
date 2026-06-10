import CareRoutineForm from "./CareRoutineForm";
import CareRoutineList from "./CareRoutineList";

function CareRoutineSection({
  careRoutines,
  careRoutineError,
  addCareRoutine,
  updateCareRoutine,
  deleteCareRoutine,
}) {
    return (
        <section>
        <h2>Care Routines</h2>

        {careRoutineError ? <p className="error">{careRoutineError}</p> : null}

        <CareRoutineForm onAddCareRoutine={addCareRoutine} />

        <CareRoutineList
            careRoutines={careRoutines}
            onUpdateCareRoutine={updateCareRoutine}
            onDeleteCareRoutine={deleteCareRoutine}
        />
        </section>
    );
}

export default CareRoutineSection;