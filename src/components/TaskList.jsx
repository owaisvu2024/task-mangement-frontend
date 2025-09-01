import React from 'react';

const TaskList = ({ tasks, onTaskDeleted, onTaskUpdated, onTaskShared }) => {
  const getStatusBg = (status) => {
    if (status === 'Completed') return '#28a745';
    if (status === 'In Progress') return '#ffc107';
    return '#dc3545'; 
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h2 
  style={{ 
    color: '#444', 
    marginBottom: 20, 
    textAlign: 'center', 
    fontSize: 22, 
    borderBottom: '2px solid #ddd', 
    paddingBottom: 10 
  }}
>
  Task List
</h2>


      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 16,
        }}
      >
        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              background: '#fff',
              borderRadius: 12,
              border: '1px solid #eee',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = 'translateY(-3px)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = 'translateY(0)')
            }
          >
            {/* Title + Status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <h3 style={{ margin: 0, fontSize: 18, color: '#007bff', flex: 1, marginRight: 8 }}>
                {task.title}
              </h3>
              <span
                style={{
                  padding: '4px 10px',
                  fontSize: 12,
                  fontWeight: 600,
                  borderRadius: 20,
                  color: '#fff',
                  backgroundColor: getStatusBg(task.status),
                  whiteSpace: 'nowrap',
                }}
              >
                {task.status}
              </span>
            </div>

            {/* Description */}
            {task.description && (
              <p style={{ color: '#555', fontSize: 14, margin: '0 0 12px' }}>
                {task.description}
              </p>
            )}

            {/* Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 'auto',
              }}
            >
              <button
                onClick={() => onTaskUpdated(task)}
                style={buttonStyle('#007bff')}
              >
                Update
              </button>
              <button
                onClick={() => onTaskDeleted(task._id)}
                style={buttonStyle('#dc3545')}
              >
                Delete
              </button>
              <button
                onClick={() => onTaskShared(task._id)}
                style={buttonStyle('#20c997')}
              >
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const buttonStyle = (bg) => ({
  flex: '1 1 80px',
  minWidth: 80,
  padding: '8px 10px',
  backgroundColor: bg,
  color: '#fff',
  border: 'none',
  borderRadius: 6,
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 500,
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
});

export default TaskList;
