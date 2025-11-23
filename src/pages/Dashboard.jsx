import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Download, BookOpen, Clock } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;

    // Mock purchased items
    const purchasedItems = [
        { id: 1, title: 'BEGC-101 - Foundation Course in English', date: '2025-11-20' },
        { id: 2, title: 'BHDLA-135 - Hindi Sahitya ka Itihas', date: '2025-11-22' }
    ];

    return (
        <div className="dashboard-page">
            <div className="container">
                <div className="dashboard-header">
                    <h2>My Dashboard</h2>
                    <p>Welcome back, {user.name}</p>
                </div>

                <div className="dashboard-grid">
                    {/* Sidebar / Stats */}
                    <div className="dashboard-sidebar">
                        <div className="stat-card">
                            <div className="stat-icon"><BookOpen size={24} /></div>
                            <div className="stat-info">
                                <h3>{purchasedItems.length}</h3>
                                <p>My Courses</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon"><Clock size={24} /></div>
                            <div className="stat-info">
                                <h3>Active</h3>
                                <p>Status</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="dashboard-content">
                        <h3 className="section-subtitle">My Purchased Notes</h3>
                        <div className="purchased-list">
                            {purchasedItems.map(item => (
                                <div key={item.id} className="purchased-item fade-in">
                                    <div className="item-info">
                                        <h4>{item.title}</h4>
                                        <span className="purchase-date">Purchased on: {item.date}</span>
                                    </div>
                                    <button className="btn btn-primary btn-sm">
                                        <Download size={16} /> Download PDF
                                    </button>
                                </div>
                            ))}

                            {purchasedItems.length === 0 && (
                                <div className="empty-state">
                                    <p>You haven't purchased any notes yet.</p>
                                    <Link to="/notes" className="btn btn-primary">Browse Notes</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
