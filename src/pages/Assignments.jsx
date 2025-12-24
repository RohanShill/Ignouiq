import React, { useState } from 'react';
import { Search, Download, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Assignments.css';

// Mock Data for Assignments
const ASSIGNMENTS_DATA = [
    { id: 1, code: 'BHDAE-182', title: 'Hindi Bhasha aur Sampreshan', category: 'Hindi', year: '2025-26', isFree: true },
    { id: 2, code: 'BHIC-102', title: 'Social Formations and Cultural Patterns of the Ancient World', category: 'History', year: '2025-26', isFree: true },
    { id: 3, code: 'BPAG-171', title: 'Disaster Management', category: 'Public Administration', year: '2025-26', isFree: true },
    { id: 4, code: 'BPSC-102', title: 'Constitutional Government and Democracy in India', category: 'Political Science', year: '2025-26', isFree: true },
    { id: 5, code: 'BPSC-105', title: 'Introduction to Comparative Government and Politics', category: 'Political Science', year: '2025-26', isFree: true },
    { id: 6, code: 'BPSC-109', title: 'Classical Political Philosophy', category: 'Political Science', year: '2025-26', isFree: true },
    { id: 7, code: 'BPSC-112', title: 'Indian Political Thought-I', category: 'Political Science', year: '2025-25', isFree: true },
    { id: 8, code: 'BPSC-113', title: 'Modern Political Philosophy', category: 'Political Science', year: '2025-26', isFree: true },
    { id: 9, code: 'BPSC-114', title: 'Indian Political Thought-II', category: 'Political Science', year: '2025-26', isFree: true },
    { id: 10, code: 'BPSE-143', title: 'State Politics in India', category: 'Political Science', year: '2025-26', isFree: true },
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
