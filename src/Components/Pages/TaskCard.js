import React from 'react';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

const TaskCard = ({ task, onClick, onDelete, onUpdateStatus }) => {
  const handleCardClick = () => {
    onClick(task);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  const handleUpdateStatusClick = (e) => {
    e.stopPropagation();
    onUpdateStatus(task);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={taskCardStyle} onClick={handleCardClick}>
        <div style={taskCardContentStyle}>
          <div style={taskCardHeaderStyle}>
            <div style={iconContainerStyle}>
              <AssignmentOutlinedIcon style={{ ...iconStyle, fill: 'url(#gradient1)' }} />
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#9C2CF3', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#3A49F9', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div style={textContainerStyle}>
              <h3 style={taskCardTitleStyle}>{task.title}</h3>
              <p style={taskCardDateStyle}>{task.dueDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const taskCardStyle = {
  border: '1px solid #ffffff',
  borderRadius: '40px',
  padding: '10px',
  margin: '10px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
  backgroundColor: '#ffffff',
  width: '800px',
  height: '160px',
};

const taskCardContentStyle = {
  textAlign: 'left',
};

const taskCardHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
};

const iconContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '20px',
};

const iconStyle = {
  fontSize: '150px',
};

const textContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const taskCardTitleStyle = {
  margin: 0,
  fontSize: '30px',
  fontWeight: 'bold',
};

const taskCardDateStyle = {
  margin: '5px 0 0 0',
  fontSize: '20px',
  color: '#000000',
};

export default TaskCard;
