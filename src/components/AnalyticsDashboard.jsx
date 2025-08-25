import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnalyticsDashboard = () => {
    const [stats, setStats] = useState(null);
    const [trends, setTrends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch summary stats
                const statsResponse = await axios.get('http://localhost:5000/api/analytics/overview');
                setStats(statsResponse.data);

                // Fetch trends data
                const trendsResponse = await axios.get('http://localhost:5000/api/analytics/trends');
                setTrends(trendsResponse.data);

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch analytics data.');
                setLoading(false);
                console.error('Analytics Fetch Error:', err);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
    if (error) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>{error}</div>;

    return (
        <div style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Analytics Dashboard</h2>
            {stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                    <div style={cardStyle}>
                        <h3>Total Tasks</h3>
                        <p style={countStyle}>{stats.totalTasks}</p>
                    </div>
                    <div style={cardStyle}>
                        <h3>Completed</h3>
                        <p style={countStyle}>{stats.completedTasks}</p>
                    </div>
                    <div style={cardStyle}>
                        <h3>In Progress</h3>
                        <p style={countStyle}>{stats.inProgressTasks}</p>
                    </div>
                    <div style={cardStyle}>
                        <h3>Pending</h3>
                        <p style={countStyle}>{stats.pendingTasks}</p>
                    </div>
                </div>
            )}
            
            {/* Trends Section */}
            <div style={{ marginTop: '40px' }}>
                <h3 style={{ textAlign: 'center', color: '#333' }}>Weekly Trends</h3>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {trends.map((trend, index) => (
                        <li key={index} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                            Week {trend._id.week}, {trend._id.year}:
                            <span style={{ marginLeft: '10px' }}>Created: {trend.createdTasks}, </span>
                            <span style={{ marginLeft: '10px' }}>Completed: {trend.completedTasks}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const cardStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center'
};

const countStyle = {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#007bff'
};

export default AnalyticsDashboard;