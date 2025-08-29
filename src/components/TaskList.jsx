import React from 'react';

const TaskList = ({ tasks, onTaskDeleted, onTaskUpdated, onTaskShared }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <h2 style={{ color: '#555' }}>Task List</h2>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
                {tasks.map(task => (
                    <li 
                        key={task._id} 
                        style={{ 
                            padding: '15px', 
                            border: '1px solid #ddd', 
                            marginBottom: '10px', 
                            borderRadius: '5px', 
                            backgroundColor: '#f9f9f9',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end'   // ✅ buttons & badge straight line me
                        }}
                    >
                        <div>
                            <h3 style={{ margin: '0', color: '#007bff' }}>{task.title}</h3>
                            <p style={{ margin: '5px 0 0', color: '#666' }}>{task.description}</p>
                            <span 
                                style={{ 
                                    display: 'inline-block', 
                                    minWidth: '100px',       // ✅ size stable
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap',    // ✅ "In Progress" ek line me
                                    padding: '5px 10px', 
                                    borderRadius: '15px', 
                                    color: 'white', 
                                    backgroundColor: 
                                        task.status === 'Completed' ? '#28a745' :
                                        task.status === 'In Progress' ? '#ffc107' : '#dc3545' 
                                }}
                            >
                                {task.status}
                            </span>
                        </div>

                        {/* ✅ Buttons aligned properly */}
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                            <button 
                                onClick={() => onTaskUpdated(task)}
                                style={btnStyleBlue}
                            >
                                Update
                            </button>
                            <button 
                                onClick={() => onTaskDeleted(task._id)}
                                style={btnStyleRed}
                            >
                                Delete
                            </button>
                            <button 
                                onClick={() => onTaskShared(task._id)}
                                style={btnStyleGreen}
                            >
                                Share
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// 🎨 Reusable button styles
const btnStyleBlue = {
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
};

const btnStyleRed = {
    padding: '8px 12px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
};

const btnStyleGreen = {
    padding: '8px 12px',
    backgroundColor: '#20c997',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
};

export default TaskList;
