import React from 'react';

const ProgressBar = ({ tasks }) => {
    
    if (!tasks || tasks.length === 0) {
        return (
            <div style={{ margin: '20px 0', textAlign: 'center' }}>
                <p>Progress: 0%</p>
                <div style={{ backgroundColor: '#e0e0e0', borderRadius: '4px', width: '100%', height: '20px' }}>
                    <div style={{
                        width: '0%',
                        height: '100%',
                        backgroundColor: '#4caf50',
                        borderRadius: '4px'
                    }}></div>
                </div>
            </div>
        );
    }

    
    const completedTasks = tasks.filter(task => task.status === 'Completed').length;
    
    const totalTasks = tasks.length;
    
    const progress = Math.round((completedTasks / totalTasks) * 100);

    return (
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
            <p>Progress: {progress}%</p>
            <div style={{ backgroundColor: '#e0e0e0', borderRadius: '4px', width: '100%', height: '20px' }}>
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: '#4caf50',
                    borderRadius: '4px',
                    transition: 'width 0.5s ease-in-out'
                }}></div>
            </div>
        </div>
    );
};

export default ProgressBar;