import { useState } from "react";

function formatDateTimeForBackend(value) {
  if (!value) {
    return "";
  }

  return `${value.replace("T", " ")}:00`;
}

function CareEventForm({ onAddCareEvent, careRoutines, medications }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    scheduled_for: "",
    completed_at: "",
    status: "scheduled",
    notes: "",
    care_routine_id: "",
    medication_id: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
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

      await onAddCareEvent(careEventData);

      setFormData({
        title: "",
        category: "",
        scheduled_for: "",
        completed_at: "",
        status: "scheduled",
        notes: "",
        care_routine_id: "",
        medication_id: "",
      });
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error ? <p className="error">{error}</p> : null}

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
          placeholder="Feeding, medication, grooming..."
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
        <select name="status" value={formData.status} onChange={handleChange}>
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

      <button type="submit">Add Care Event</button>
    </form>
  );
}

export default CareEventForm;