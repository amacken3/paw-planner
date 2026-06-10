import { useState } from "react";

function CareRoutineList({
    careRoutines,
    onDeleteCareRoutine,
    onUpdateCareRoutine,
  }) {
    if (careRoutines.length === 0) {
      return <p>No care routines added yet.</p>;
    }

    return (
      <div>
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
        <article>
          <h3>Edit {routine.title}</h3>

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
              Frequency
              <input
                type="text"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
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
        <h3>{routine.title}</h3>

        <p>
          <strong>Category:</strong> {routine.category}
        </p>

        {routine.frequency ? (
          <p>
            <strong>Frequency:</strong> {routine.frequency}
          </p>
        ) : null}

        {routine.time_of_day ? (
          <p>
            <strong>Time:</strong> {routine.time_of_day}
          </p>
        ) : null}

        {routine.notes ? <p>{routine.notes}</p> : null}

        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>

        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      </article>
    );
}

export default CareRoutineList;