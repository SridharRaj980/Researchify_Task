import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, doc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("personal");
  const [assignedDate, setAssignedDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const taskDoc = await getDoc(doc(db, "tasks", id));
        if (taskDoc.exists()) {
          const taskData = taskDoc.data();
          setTitle(taskData.title);
          setDescription(taskData.description);
          setCategory(taskData.category);
          setAssignedDate(taskData.assignedDate);
          setDueDate(taskData.dueDate);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        title,
        description,
        category,
        assignedDate,
        dueDate,
        status: new Date(dueDate) > new Date() ? "in-progress" : "pending",
      };

      if (id) {
        const taskDoc = doc(db, "tasks", id);
        await updateDoc(taskDoc, taskData);
      } else {
        await addDoc(collection(db, "tasks"), taskData);
      }
      navigate('/');
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      navigate('/');
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleComplete = async () => {
    try {
      const taskDoc = doc(db, "tasks", id);
      await updateDoc(taskDoc, { status: 'completed' });
      navigate('/');
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#F2F5FF',
  };

  const formContainerStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px',
    textAlign: 'center',
  };

  const formStyle = {
    marginTop: '20px',
  };

  const inputContainerStyle = {
    marginBottom: '20px',
    textAlign: 'left',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  const buttonContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  const buttonStyle = {
    flex: '1',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '5px',
    border: 'none',
    marginRight: '10px',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#e81919',
    color: '#fff',
  };

  const completeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#4caf50',
    color: '#fff',
  };

  const updateButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c63ff',
    color: '#fff',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h1>Task Form</h1>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
              style={inputStyle}
            />
          </div>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
              style={inputStyle}
            ></textarea>
          </div>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
              <option value="personal">Personal</option>
              <option value="team">Team</option>
            </select>
          </div>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Assigned Date</label>
            <input
              type="date"
              value={assignedDate}
              onChange={(e) => setAssignedDate(e.target.value)}
              placeholder="Assigned Date"
              required
              style={inputStyle}
            />
          </div>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="Due Date"
              required
              style={inputStyle}
            />
          </div>
          <div style={buttonContainerStyle}>
            <button type="submit" style={updateButtonStyle}>{id ? "Update Task" : "Add Task"}</button>
            {id && (
              <>
                <button type="button" onClick={handleDelete} style={deleteButtonStyle}>Delete</button>
                <button type="button" onClick={handleComplete} style={completeButtonStyle}>Complete</button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
