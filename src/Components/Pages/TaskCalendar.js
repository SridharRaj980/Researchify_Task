import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import TaskForm from './TaskForm';
import TaskCard from './TaskCard';  // Import TaskCard component

const SimpleCalendar = () => {
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('myTasks');
  const [activeState, setActiveState] = useState('myTasks');
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksArray = [];
      querySnapshot.forEach((doc) => {
        tasksArray.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksArray);
    });

    return () => unsubscribe();
  }, []);

  const getTitle = () => {
    switch (activeState) {
      case 'myTasks':
        return 'My Tasks';
      case 'inProgress':
        return 'In-progress';
      case 'completed':
        return 'Completed';
      default:
        return 'Tasks';
    }
  };

  const getStartOfWeek = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday as first day of the week
    startOfWeek.setDate(diff);
    return startOfWeek;
  };

  const getEndOfWeek = (startOfWeek) => {
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    return endOfWeek;
  };

  const renderDaysOfWeek = () => {
    const startOfWeek = getStartOfWeek(currentDate);
    const endOfWeek = getEndOfWeek(startOfWeek);
    const days = [];
    let currentDay = new Date(startOfWeek);

    while (currentDay <= endOfWeek) {
      const dayTasks = tasks.filter(task => new Date(task.assignedDate).toDateString() === currentDay.toDateString());
      days.push(
        <div key={currentDay} style={calendarDayStyle}>
          <div style={{ ...dayHeaderStyle, ...(currentDay.getDay() === new Date().getDay() && currentDay.getDate() === new Date().getDate() ? currentDayStyle : {}) }}>
            {currentDay.toLocaleDateString(undefined, { weekday: 'short' })}<br />
            {currentDay.getDate()}
          </div>
          <div>
            {dayTasks.map(task => (
              <div
                key={task.id}
                style={taskStyle}
                onClick={() => handleCardClick(task)}
              >
                <h4 style={taskTitleStyle}>{task.title}</h4>
              </div>
            ))}
          </div>
        </div>
      );
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return days;
  };

  const handlePrevWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };

  const handleCardClick = (task) => {
    navigate(`/edit-task/${task.id}`);
  };

  const handleAddTask = () => {
    navigate('/add-task');
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    switch (selectedFilter) {
      case 'myTasks':
        return task.status === 'in-progress' || task.status === 'completed';
      case 'inProgress':
        return task.status === 'in-progress';
      case 'completed':
        return task.status === 'completed';
      default:
        return true;
    }
  });

  return (
    <div style={pageStyle}>
      <div style={simpleCalendarStyle}>
        <div style={containerStyle}>
          <div style={calendarControlsStyle}>
            <button onClick={handlePrevWeek} style={buttonStyle}>&larr;</button>
            <div style={currentMonthStyle}>
              {currentDate.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
            </div>
            <button onClick={handleNextWeek} style={buttonStyle}>&rarr;</button>
          </div>
          <div style={calendarWeekStyle}>
            {renderDaysOfWeek()}
          </div>
        </div>
        <button style={addTaskButtonStyle} onClick={handleAddTask}>+ Add Task</button>
        <div style={dropdownContainerStyle}>
          <h2 style={progressHeadingStyle}>Tasks</h2>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            style={dropdownStyle}
          >
            <option value="myTasks">My Tasks</option>
            <option value="inProgress">In-progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div style={progressTasksContainerStyle}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={handleCardClick}
              onDelete={handleDeleteTask}
              onUpdateStatus={() => {/* Implement status update logic here */}}
            />
          ))}
        </div>
        {selectedTask && (
          <TaskForm
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
          />
        )}
      </div>
    </div>
  );
};

const pageStyle = {
  backgroundColor: '#F2F5FF',
  minHeight: '100vh',
  padding: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const simpleCalendarStyle = {
  width: '100%',
  maxWidth: '1200px',
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#F2F5FF',
};

const containerStyle = {
  padding: '30px',
  backgroundColor: '#ffffff',
  borderRadius: '15px',
  marginBottom: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const calendarControlsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
};

const buttonStyle = {
  backgroundColor: '#6c63ff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '24px',
  cursor: 'pointer',
  padding: '5px 10px',
};

const currentMonthStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
};

const calendarWeekStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  gap: '10px',
};

const calendarDayStyle = {
  padding: '10px',
  flex: '1',
  textAlign: 'center',
  position: 'relative',
  borderRadius: '10px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const dayHeaderStyle = {
  fontWeight: 'bold',
  marginBottom: '10px',
  fontSize: '18px',
  color: '#333',
};

const currentDayStyle = {
  backgroundColor: '#6c63ff',
  borderRadius: '10px',
  color: '#fff',
  padding: '5px 0',
};

const taskStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  padding: '10px',
  marginBottom: '5px',
  borderRadius: '5px',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
};

const taskTitleStyle = {
  margin: '0',
  fontSize: '14px',
  color: '#333',
};

const addTaskButtonStyle = {
  backgroundColor: '#6c63ff',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '25px',
  fontSize: '16px',
  cursor: 'pointer',
  marginTop: '20px',
  transition: 'background-color 0.3s',
};

const dropdownContainerStyle = {
  marginTop: '20px',
  textAlign: 'center',
};

const dropdownStyle = {
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
  marginTop: '10px',
};

const progressHeadingStyle = {
  fontSize: '24px',
  marginTop: '40px',
  color: '#333',
};

const progressTasksContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
};

export default SimpleCalendar;
