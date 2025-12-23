import React, { useState } from 'react';
import { Search, Download, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Assignments.css';

// Mock Data for Assignments
const ASSIGNMENTS_DATA = [
    { id: 1, code: 'BEGC-101', title: 'Foundation Course in English - Assignment 1', category: 'English', year: '2024-25', isFree: true },
    { id: 2, code: 'BHDLA-135', title: 'Hindi Sahitya ka Itihas - Assignment 1', category: 'Hindi', year: '2024-25', isFree: true },
];

const Assignments = () => {
    const [assignments, setAssignments] = useState(ASSIGNMENTS_DATA);
    const [search, setSearch] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearch(term);
        setAssignments(ASSIGNMENTS_DATA.filter(item =>
            item.title.toLowerCase().includes(term) ||
            item.code.toLowerCase().includes(term)
        ));
    };

    const handleDownload = (item) => {
        if (!user) {
            alert('Please login to download assignments');
            navigate('/login');
            return;
        }

        const pdfUrl = `/assignments/${item.code.toLowerCase()}.pdf`;
        window.open(pdfUrl, '_blank');
    };

    return (
        <div className="assignments-page">
            <div className="page-header">
                <div className="container">
                    <h1>Soved Assignments</h1>
                    <p>Get the latest solved assignments for your IGNOU courses</p>

                    <div className="search-bar">
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search by subject code or title..."
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="assignments-grid">
                    {assignments.length > 0 ? (
                        assignments.map(item => (
                            <div key={item.id} className="assignment-card">
                                <div className="card-badge">
                                    {item.isFree ? 'Free' : 'Premium'}
                                </div>
                                <div className="card-icon">
                                    <FileText size={40} />
                                </div>
                                <div className="card-content">
                                    <span className="course-code">{item.code}</span>
                                    <h3>{item.title}</h3>
                                    <div className="card-meta">
                                        <span>Category: {item.category}</span>
                                        <span>Session: {item.year}</span>
                                    </div>
                                    <button
                                        className="btn btn-primary w-full"
                                        onClick={() => handleDownload(item)}
                                    >
                                        <Download size={18} /> Download PDF
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No assignments found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Assignments;
