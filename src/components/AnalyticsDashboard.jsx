import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AnalyticsDashboard = () => {
    const [stats, setStats] = useState(null);
    const [trends, setTrends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsResponse = await axios.get(`${API_URL}/api/analytics/overview`);
                setStats(statsResponse.data);

                const trendsResponse = await axios.get(`${API_URL}/api/analytics/trends`);
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

    if (loading) return <div className="analytics-loading">Loading...</div>;
    if (error) return <div className="analytics-error">{error}</div>;

    return (
        <div className="analytics-container">
            <h2 className="analytics-title">Analytics Dashboard</h2>

            {stats && (
                <div className="analytics-grid">
                    <div className="analytics-card">
                        <h3>Total Tasks</h3>
                        <p>{stats.totalTasks}</p>
                    </div>
                    <div className="analytics-card">
                        <h3>Completed</h3>
                        <p>{stats.completedTasks}</p>
                    </div>
                    <div className="analytics-card">
                        <h3>In Progress</h3>
                        <p>{stats.inProgressTasks}</p>
                    </div>
                    <div className="analytics-card">
                        <h3>Pending</h3>
                        <p>{stats.pendingTasks}</p>
                    </div>
                </div>
            )}

            <div className="trends-section">
                <h3>Weekly Trends</h3>
                <ul>
                    {trends.map((trend, index) => (
                        <li key={index}>
                            Week {trend._id.week}, {trend._id.year}:
                            <span> Created: {trend.createdTasks}, </span>
                            <span>Completed: {trend.completedTasks}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
