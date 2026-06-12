import { useState } from "react";
import styles from "./CareEventList.module.css";

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

  function formatDateTimeForDisplay(value) {
    if (!value) {
      return "";
    }

    return new Date(value).toLocaleString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function formatNowForBackend() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function getRoutineTitle(careRoutines, routineId) {
    const routine = careRoutines.find(
      (routine) => routine.id === Number(routineId)
    );
    return routine ? routine.title : null;
  }

  function getMedicationName(medications, medicationId) {
    const medication = medications.find(
      (medication) => medication.id === Number(medicationId)
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
      return (
        <div className={styles.emptyState}>
          <p>No care events added yet.</p>
          <span>Add an event to track scheduled or completed care actions.</span>
        </div>
      );
    }

    return (
      <div className={styles.cardGrid}>
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
    const isCompleted = careEvent.status === "completed";
    const isMissed = careEvent.status === "missed";
    const isCancelled = careEvent.status === "cancelled";
    const isScheduled = careEvent.status === "scheduled";

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
          completed_at: formData.completed_at
            ? formatDateTimeForBackend(formData.completed_at)
            : null,
          care_routine_id: formData.care_routine_id || null,
          medication_id: formData.medication_id || null,
        };

        await onUpdateCareEvent(careEvent.id, careEventData);
        setIsEditing(false);
      } catch (error) {
        setError(error.message);
      }
    }

    async function handleSetStatus(status) {
        try {
          const completedAt = status === "completed" ? formatNowForBackend() : null;

          const careEventData = {
            status: status,
            completed_at: completedAt,
          };

          await onUpdateCareEvent(careEvent.id, careEventData);

          setFormData((currentFormData) => ({
            ...currentFormData,
            status: status,
            completed_at: completedAt ? formatDateTimeForInput(completedAt) : "",
          }));
        } catch (error) {
          alert(error.message);
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
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Edit {careEvent.title}</h3>
          </div>

          {error ? <p className="error">{error}</p> : null}

          <form className={styles.editForm} onSubmit={handleUpdate}>
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

            <div className={styles.actions}>
              <button className={styles.primaryButton} type="submit">
                Save
              </button>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </article>
      );
    }

    return (
      <article className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <p className={styles.kicker}>{careEvent.category}</p>
            <h3>{careEvent.title}</h3>
          </div>

          <button
            className={styles.iconButton}
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label={`Edit ${careEvent.title}`}
            title="Edit care event"
          >
            ✏️
          </button>
        </div>

        <div className={styles.details}>
          <p>
            <span>Status</span>
            <strong className={styles.statusText}>{careEvent.status}</strong>
          </p>

          {careEvent.scheduled_for ? (
            <p>
              <span>Scheduled</span>
              <strong>{formatDateTimeForDisplay(careEvent.scheduled_for)}</strong>
            </p>
          ) : null}

          {careEvent.completed_at ? (
            <p>
              <span>Completed</span>
              <strong>{formatDateTimeForDisplay(careEvent.completed_at)}</strong>
            </p>
          ) : null}

          {routineTitle ? (
            <p>
              <span>Routine</span>
              <strong>{routineTitle}</strong>
            </p>
          ) : null}

          {medicationName ? (
            <p>
              <span>Medication</span>
              <strong>{medicationName}</strong>
            </p>
          ) : null}
        </div>

              {careEvent.notes ? <p className={styles.notes}>{careEvent.notes}</p> : null}

              <div className={styles.actions}>
        {!isCompleted ? (
          <button
            className={styles.primaryButton}
            type="button"
            onClick={() => handleSetStatus("completed")}
          >
            Mark Complete
          </button>
        ) : null}

        {!isMissed ? (
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={() => handleSetStatus("missed")}
          >
            Mark Missed
          </button>
        ) : null}

        {!isCancelled ? (
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={() => handleSetStatus("cancelled")}
          >
            Cancel Event
          </button>
        ) : null}

        {!isScheduled ? (
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={() => handleSetStatus("scheduled")}
          >
            Reset Scheduled
          </button>
        ) : null}

        <button className={styles.dangerButton} type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>
      </article>
    );
}

export default CareEventList;