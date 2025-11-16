import { useEffect, useState } from "react";
import api from "../../services/api"; // ✅ your axios instance

function Task() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks/");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // ✅ Add / Update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}/`, form);
        setEditingId(null);
      } else {
        await api.post("/tasks/", form);
      }
      setForm({ title: "", description: "", completed: false });
      fetchTasks();
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  // ✅ Delete task
  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}/`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // ✅ Edit task (set form data for editing)
  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description,
      completed: task.completed,
    });
    setEditingId(task.id);
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {editingId ? "Edit Task" : "Task List"}
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={form.completed}
            onChange={(e) =>
              setForm({ ...form, completed: e.target.checked })
            }
          />{" "}
          Completed
        </label>
        <button
          type="submit"
          style={{
            backgroundColor: editingId ? "#ffc107" : "#007bff",
            color: "white",
            border: "none",
            padding: "8px 12px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          {editingId ? "Update Task" : "Add Task"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({ title: "", description: "", completed: false });
            }}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              padding: "8px 12px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {tasks.length === 0 ? (
        <p style={{ textAlign: "center" }}>No tasks found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                Title
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                Description
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                Completed
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id}>
                <td style={{ padding: "8px" }}>{t.title}</td>
                <td style={{ padding: "8px" }}>{t.description}</td>
                <td style={{ padding: "8px" }}>{t.completed ? "✅" : "❌"}</td>
                <td style={{ padding: "8px" }}>
                  <button
                    onClick={() => handleEdit(t)}
                    style={{
                      backgroundColor: "#ffc107",
                      color: "white",
                      border: "none",
                      padding: "5px 8px",
                      cursor: "pointer",
                      borderRadius: "4px",
                      marginRight: "5px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 8px",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Task;



