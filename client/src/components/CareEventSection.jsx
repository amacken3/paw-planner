import CareEventForm from "./CareEventForm";
import CareEventList from "./CareEventList";

function CareEventSection({
  careEvents,
  careEventError,
  careRoutines,
  medications,
  addCareEvent,
  updateCareEvent,
  deleteCareEvent,
}) {
    return (
        <section>
        <h2>Care Events</h2>

        {careEventError ? <p className="error">{careEventError}</p> : null}

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
    );
}

export default CareEventSection;