import { useState } from "react";
import styles from "./CareRoutineList.module.css";

function formatTimeForDisplay(value) {
    if (!value) {
      return "";
    }

    const [hours, minutes] = value.split(":");
    const date = new Date();

    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    return date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  function CareRoutineList({
    careRoutines,
    onDeleteCareRoutine,
    onUpdateCareRoutine,
  }) {
    if (careRoutines.length === 0) {
      return (
        <div className={styles.emptyState}>
          <p>No care routines added yet.</p>
          <span>Add a routine to start building this pet&apos;s care plan.</span>
        </div>
      );
    }

    return (
      <div className={styles.cardGrid}>
        {careRoutines.map((routine) => (
          <CareRoutineCard
            key={routine.id}
            routine={routine}
            onDeleteCareRoutine={onDeleteCareRoutine}
            onUpdateCareRoutine={onUpdateCareRoutine}
          />
        ))}
      </div>
    );
  }

  function CareRoutineCard({
    routine,
    onDeleteCareRoutine,
    onUpdateCareRoutine,
  }) {
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
      title: routine.title || "",
      category: routine.category || "",
      frequency: routine.frequency || "",
      time_of_day: routine.time_of_day ? routine.time_of_day.slice(0, 5) : "",
      notes: routine.notes || "",
    });

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
        const routineData = {
          ...formData,
          time_of_day: formData.time_of_day ? `${formData.time_of_day}:00` : "",
        };

        await onUpdateCareRoutine(routine.id, routineData);
        setIsEditing(false);
      } catch (error) {
        setError(error.message);
      }
    }

    async function handleDelete() {
      try {
        await onDeleteCareRoutine(routine.id);
      } catch (error) {
        alert(error.message);
      }
    }

    function handleCancel() {
      setFormData({
        title: routine.title || "",
        category: routine.category || "",
        frequency: routine.frequency || "",
        time_of_day: routine.time_of_day ? routine.time_of_day.slice(0, 5) : "",
        notes: routine.notes || "",
      });

      setError("");
      setIsEditing(false);
    }

    if (isEditing) {
      return (
        <article className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Edit {routine.title}</h3>
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
              Frequency
              <input
                type="text"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Time of Day
              <input
                type="time"
                name="time_of_day"
                value={formData.time_of_day}
                onChange={handleChange}
              />
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
            <p className={styles.kicker}>{routine.category}</p>
            <h3>{routine.title}</h3>
          </div>

          <button
            className={styles.iconButton}
            type="button"
            onClick={() => setIsEditing(true)}
            aria-label={`Edit ${routine.title}`}
            title="Edit routine"
          >
            ✏️
          </button>
        </div>

        <div className={styles.details}>
          {routine.frequency ? (
            <p>
              <span>Frequency</span>
              <strong>{routine.frequency}</strong>
            </p>
          ) : null}

          {routine.time_of_day ? (
            <p>
              <span>Time</span>
              <strong>{formatTimeForDisplay(routine.time_of_day)}</strong>
            </p>
          ) : null}
        </div>

        {routine.notes ? <p className={styles.notes}>{routine.notes}</p> : null}

        <div className={styles.actions}>
          <button className={styles.dangerButton} type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </article>
    );
}

export default CareRoutineList;