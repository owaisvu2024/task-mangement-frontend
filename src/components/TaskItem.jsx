import React from 'react';

const TaskItem = ({ task, onDelete, onUpdate }) => {
    return (
        <div style={{ 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            padding: '15px', 
            margin: '10px', 
            backgroundColor: '#291313ff', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            flex: '1',
            boxSizing: 'border-box'
        }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{task.title}</h3>
            <p style={{ margin: '0 0 10px 0', color: '#666' }}>{task.description}</p>
            <p style={{ margin: '0', fontSize: '0.9em', color: '#888' }}>Status: {task.status}</p>
            <div style={{ marginTop: '10px' }}>
                <button 
                    onClick={onDelete} 
                    style={{ 
                        padding: '8px 12px', 
                        marginRight: '10px', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer', 
                        backgroundColor: '#dc3545', 
                        color: 'white' 
                    }}
                >
                    Delete
                </button>
                <button 
                    onClick={onUpdate} 
                    style={{ 
                        padding: '8px 12px', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer', 
                        backgroundColor: '#007bff', 
                        color: 'white' 
                    }}
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default TaskItem;