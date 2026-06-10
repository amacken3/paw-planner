import { useState } from "react";

function formatDateTimeForBackend(value) {
  if (!value) {
    return "";
  }

  return `${value.replace("T", " ")}:00`;
}

function formatDateTimeForInput(value) {
  if (!value) {
    return "";
  }

  return value.replace(" ", "T").slice(0, 16);
}

function getRoutineTitle(careRoutines, routineId) {
  const routine = careRoutines.find((routine) => routine.id === routineId);
  return routine ? routine.title : null;
}

function getMedicationName(medications, medicationId) {
  const medication = medications.find(
    (medication) => medication.id === medicationId
  );
  return medication ? medication.name : null;
}

function CareEventList({
  careEvents,
  careRoutines,
  medications,
  onUpdateCareEvent,
  onDeleteCareEvent,
}) {
  if (careEvents.length === 0) {
    return <p>No care events added yet.</p>;
  }

  return (
    <div>
      {careEvents.map((careEvent) => (
        <CareEventCard
          key={careEvent.id}
          careEvent={careEvent}
          careRoutines={careRoutines}
          medications={medications}
          onUpdateCareEvent={onUpdateCareEvent}
          onDeleteCareEvent={onDeleteCareEvent}
        />
      ))}
    </div>
  );
}

function CareEventCard({
  careEvent,
  careRoutines,
  medications,
  onUpdateCareEvent,
  onDeleteCareEvent,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: careEvent.title || "",
    category: careEvent.category || "",
    scheduled_for: formatDateTimeForInput(careEvent.scheduled_for),
    completed_at: formatDateTimeForInput(careEvent.completed_at),
    status: careEvent.status || "scheduled",
    notes: careEvent.notes || "",
    care_routine_id: careEvent.care_routine_id || "",
    medication_id: careEvent.medication_id || "",
  });

  const routineTitle = getRoutineTitle(careRoutines, careEvent.care_routine_id);
  const medicationName = getMedicationName(medications, careEvent.medication_id);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleUpdate(event) {
    event.preventDefault();
    setError("");

    try {
      const careEventData = {
        ...formData,
        scheduled_for: formatDateTimeForBackend(formData.scheduled_for),
        completed_at: formatDateTimeForBackend(formData.completed_at),
        care_routine_id: formData.care_routine_id || null,
        medication_id: formData.medication_id || null,
      };

      await onUpdateCareEvent(careEvent.id, careEventData);
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDelete() {
    try {
      await onDeleteCareEvent(careEvent.id);
    } catch (error) {
      alert(error.message);
    }
  }

  function handleCancel() {
    setFormData({
      title: careEvent.title || "",
      category: careEvent.category || "",
      scheduled_for: formatDateTimeForInput(careEvent.scheduled_for),
      completed_at: formatDateTimeForInput(careEvent.completed_at),
      status: careEvent.status || "scheduled",
      notes: careEvent.notes || "",
      care_routine_id: careEvent.care_routine_id || "",
      medication_id: careEvent.medication_id || "",
    });

    setError("");
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <article>
        <h3>Edit {careEvent.title}</h3>

        {error ? <p className="error">{error}</p> : null}

        <form onSubmit={handleUpdate}>
          <label>
            Title
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Category
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Scheduled For
            <input
              type="datetime-local"
              name="scheduled_for"
              value={formData.scheduled_for}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Completed At
            <input
              type="datetime-local"
              name="completed_at"
              value={formData.completed_at}
              onChange={handleChange}
            />
          </label>

          <label>
            Status
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="missed">Missed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>

          <label>
            Related Care Routine
            <select
              name="care_routine_id"
              value={formData.care_routine_id}
              onChange={handleChange}
            >
              <option value="">None</option>
              {careRoutines.map((routine) => (
                <option key={routine.id} value={routine.id}>
                  {routine.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Related Medication
            <select
              name="medication_id"
              value={formData.medication_id}
              onChange={handleChange}
            >
              <option value="">None</option>
              {medications.map((medication) => (
                <option key={medication.id} value={medication.id}>
                  {medication.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Notes
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </label>

          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </article>
    );
  }

  return (
    <article>
      <h3>{careEvent.title}</h3>

      <p>
        <strong>Category:</strong> {careEvent.category}
      </p>

      <p>
        <strong>Status:</strong> {careEvent.status}
      </p>

      {careEvent.scheduled_for ? (
        <p>
          <strong>Scheduled For:</strong> {careEvent.scheduled_for}
        </p>
      ) : null}

      {careEvent.completed_at ? (
        <p>
          <strong>Completed At:</strong> {careEvent.completed_at}
        </p>
      ) : null}

      {routineTitle ? (
        <p>
          <strong>Routine:</strong> {routineTitle}
        </p>
      ) : null}

      {medicationName ? (
        <p>
          <strong>Medication:</strong> {medicationName}
        </p>
      ) : null}

      {careEvent.notes ? <p>{careEvent.notes}</p> : null}

      <button type="button" onClick={() => setIsEditing(true)}>
        Edit
      </button>

      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </article>
  );
}

export default CareEventList;