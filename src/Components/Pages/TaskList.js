import React, { useEffect, useState, useRef } from 'react';
import { db } from '../../firebase';
import { collection, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import TaskCard from './TaskCard';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [displayedTaskIndex, setDisplayedTaskIndex] = useState(0);
  const [activeState, setActiveState] = useState('myTasks');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const targetRef = useRef(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || 'User'); // Set to 'User' if displayName is not available
        setUserEmail(user.email || 'No email available');
      } else {
        setUserName('User');
        setUserEmail('No email available');
      }
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'tasks'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksArray = [];
      querySnapshot.forEach((doc) => {
        tasksArray.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksArray);
    });

    return () => unsubscribe();
  }, []);

  const filteredTasks = tasks.filter(task => {
    switch (activeState) {
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

  useEffect(() => {
    if (filteredTasks.length > 0) {
      const interval = setInterval(() => {
        setDisplayedTaskIndex((prevIndex) => (prevIndex + 1) % filteredTasks.length);
      }, 10000); // Adjust the interval as needed
      return () => clearInterval(interval);
    }
  }, [filteredTasks]);

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

  const displayedTask = filteredTasks[displayedTaskIndex];

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

  // react-spring animation for horizontal scrolling
  const props = useSpring({
    to: { transform: 'translateX(100%)' },
    from: { transform: 'translateX(0%)' },
    reset: true,
    reverse: true,
    config: { duration: 4000 },
    loop: true,
  });

  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSignOut = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      navigate('/welcome'); // Redirect to login page or wherever appropriate
    }).catch((error) => {
      console.error('Sign Out Error', error);
    });
    handleClose();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Hello {userName}!</h1>
      <p style={subheadingStyle}>Have a nice day.</p>

      <div style={accountIconContainerStyle}>
        <AccountCircle
          style={accountIconStyle}
          onClick={handleClick}
        />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem onClick={handleOpenModal}>
            <AccountCircle style={menuIconStyle} />
            Account Info
          </MenuItem>
          <MenuItem onClick={handleSignOut}>
            <ExitToAppOutlinedIcon style={menuIconStyle} />
            Sign Out
          </MenuItem>
        </Menu>
      </div>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Account Information</DialogTitle>
        <DialogContent>
          <p><strong>Name:</strong> {userName}</p>
          <p><strong>Email:</strong> {userEmail}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <div style={tabsContainerStyle}>
        <button style={activeState === 'myTasks' ? activeTabStyle : tabStyle} onClick={() => setActiveState('myTasks')}>My Tasks</button>
        <button style={activeState === 'inProgress' ? activeTabStyle : tabStyle} onClick={() => setActiveState('inProgress')}>In-progress</button>
        <button style={activeState === 'completed' ? activeTabStyle : tabStyle} onClick={() => setActiveState('completed')}>Completed</button>
      </div>
      <div ref={targetRef} style={carouselContainerStyle}>
        <animated.div style={{ ...props, whiteSpace: 'nowrap' }} className="horizontal-scroll">
          {filteredTasks.slice(0, 3).map((task) => (
            <div key={task.id} style={taskStyle} onClick={() => handleCardClick(task)}>
              <TipsAndUpdatesOutlinedIcon style={iconStyle} />
              <h4 style={taskTitleStyle}>{task.title}</h4>
              <p style={taskDescriptionStyle}>{task.description}</p>
              <p style={taskDateStyle}>{task.dueDate}</p>
            </div>
          ))}
        </animated.div>
      </div>
      <h2 style={progressHeadingStyle}>{getTitle()}</h2>
      <div style={progressTasksContainerStyle}>
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={handleCardClick}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
  textAlign: 'center',
  backgroundColor: '#F2F5FF',
  position: 'relative', // Ensure the account icon is positioned relative to this container
};

const headingStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
};

const subheadingStyle = {
  fontSize: '18px',
  color: '#777',
};

const tabsContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '20px',
};

const tabStyle = {
  padding: '10px 20px',
  margin: '0 5px',
  border: 'none',
  borderRadius: '20px',
  backgroundColor: '#f0f0f0',
  cursor: 'pointer',
};

const activeTabStyle = {
  ...tabStyle,
  backgroundColor: '#6c63ff',
  color: '#fff',
};

const carouselContainerStyle = {
  display: 'flex',
  overflowX: 'hidden',
  justifyContent: 'center',
  marginBottom: '20px',
  padding: '10px 0',
};

const progressHeadingStyle = {
  fontSize: '24px',
  marginTop: '40px',
  display: 'flex',
  justifyContent: 'center',
};

const progressTasksContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'left',
};

const taskStyle = {
  background: 'linear-gradient(177.23deg, #9C2CF3 -13.49%, #3A49F9 109.75%)',
  border: '1px solid #ccc',
  padding: '20px',
  margin: '10px',
  borderRadius: '10px',
  cursor: 'pointer',
  display: 'inline-block',
  verticalAlign: 'top',
  width: '400px',
  height: '250px',
  boxSizing: 'border-box',
  overflow: 'hidden',
  textAlign: 'left', 
};

const taskTitleStyle = {
  marginTop: '-44px',
  marginLeft:'50px',
  fontSize: '40px',
  color:'#ffffff'
};

const taskDescriptionStyle = {
  margin: '5px 0 0',
  fontSize: '20px',
  color:'#ffffff',
  marginTop: '-44px',
  marginLeft:'50px',
};

const taskDateStyle ={
    fontSize: '15px',
    color:'#ffffff',
    marginTop: '100px',
    marginLeft:'52px',
}

const iconStyle = {
  color: '#fff',
  fontSize:'45px',
  verticalAlign: 'middle',
  marginRight: '10px',
};

const accountIconContainerStyle = {
  position: 'absolute',
  top: 16,
  right: 16,
  zIndex: 1300, // Ensure it is above other content
};

const accountIconStyle = {
  fontSize: 40,
  cursor: 'pointer',
};

const menuIconStyle = {
  fontSize: 24,
  marginRight: '10px',
};

export default TaskList;
