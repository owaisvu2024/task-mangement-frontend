import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded, taskToEdit, onTaskUpdated, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title);
            setDescription(taskToEdit.description);
            setStatus(taskToEdit.status);
        } else {
            setTitle('');
            setDescription('');
            setStatus('Pending');
        }
    }, [taskToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const task = { title, description, status };

        try {
            if (taskToEdit) {
                await onTaskUpdated({ ...task, _id: taskToEdit._id });
            } else {
                await axios.post('http://localhost:5000/api/tasks', task);
                setTitle('');
                setDescription('');
                setStatus('Pending');
                if (onTaskAdded) {
                    onTaskAdded();
                }
            }
        } catch (error) {
            console.error('Error saving task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#555' }}>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Task Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Task Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Status:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' }}
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
            <button
                type="submit"
                style={{
                    width: '100%',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    fontSize: '16px',
                    cursor: 'pointer',
                }}
            >
                {taskToEdit ? 'Update Task' : 'Add Task'}
            </button>
            {taskToEdit && (
                <button
                    type="button"
                    onClick={onCancel}
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '4px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        fontSize: '16px',
                        cursor: 'pointer',
                        marginTop: '10px',
                    }}
                >
                    Cancel
                </button>
            )}
        </form>
    );
};

export default TaskForm;