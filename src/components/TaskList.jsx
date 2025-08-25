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
                            alignItems: 'center'
                        }}
                    >
                        <div>
                            <h3 style={{ margin: '0', color: '#007bff' }}>{task.title}</h3>
                            <p style={{ margin: '5px 0 0', color: '#666' }}>{task.description}</p>
                            <span 
                                style={{ 
                                    display: 'inline-block', 
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
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <button 
                                onClick={() => onTaskUpdated(task)}
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                Update
                            </button>
                            <button 
                                onClick={() => onTaskDeleted(task._id)}
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                Delete
                            </button>
                            {/* Naya Share Button */}
                            <button 
                                onClick={() => onTaskShared(task._id)}
                                style={{
                                    padding: '8px 12px',
                                    backgroundColor: '#20c997',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
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

export default TaskList;