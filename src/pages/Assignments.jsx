import React, { useState, useEffect } from 'react';
import { Search, Download, FileText, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { loadRazorpay, initiatePayment, verifyPayment } from '../services/paymentService';
import { useNavigate } from 'react-router-dom';
import './Assignments.css';

// Mock Data for Assignments
const ASSIGNMENTS_DATA = [
    { id: 101, code: 'BHDAE-182', title: 'Hindi Bhasha aur Sampreshan', category: 'Hindi', year: '2025-26', price: 25, isFree: false },
    { id: 102, code: 'BHIC-102', title: 'Social Formations and Cultural Patterns of the Ancient World', category: 'History', year: '2025-26', price: 25, isFree: false },
    { id: 103, code: 'BPAG-171', title: 'Disaster Management', category: 'Public Administration', year: '2025-26', price: 25, isFree: false },
    { id: 104, code: 'BPSC-102', title: 'Constitutional Government and Democracy in India', category: 'Political Science', year: '2025-26', price: 25, isFree: false },
    { id: 105, code: 'BPSC-105', title: 'Introduction to Comparative Government and Politics', category: 'Political Science', year: '2025-26', price: 25, isFree: false },
    { id: 106, code: 'BPSC-109', title: 'Classical Political Philosophy', category: 'Political Science', year: '2025-26', price: 25, isFree: false },
    { id: 107, code: 'BPSC-112', title: 'Indian Political Thought-I', category: 'Political Science', year: '2025-25', price: 25, isFree: false },
    { id: 108, code: 'BPSC-113', title: 'Modern Political Philosophy', category: 'Political Science', year: '2025-26', price: 25, isFree: false },
    { id: 109, code: 'BPSC-114', title: 'Indian Political Thought-II', category: 'Political Science', year: '2025-26', price: 25, isFree: false },
    { id: 110, code: 'BPSE-143', title: 'State Politics in India', category: 'Political Science', year: '2025-26', price: 25, isFree: false },
];

const Assignments = () => {
    const [assignments, setAssignments] = useState(ASSIGNMENTS_DATA);
    const [search, setSearch] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadRazorpay();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearch(term);
        setAssignments(ASSIGNMENTS_DATA.filter(item =>
            item.title.toLowerCase().includes(term) ||
            item.code.toLowerCase().includes(term)
        ));
    };

    const handleBuy = async (item) => {
        if (item.isFree) {
            const pdfUrl = `/assignments/${item.code.toLowerCase()}.pdf`;
            window.open(pdfUrl, '_blank');
            return;
        }

        try {
            const order = await initiatePayment({ amount: item.price, productId: item.id });

            if (order.success) {
                const options = {
                    key: order.key,
                    amount: order.amount,
                    currency: order.currency,
                    name: "IGNOU IQ HINDI",
                    description: item.title,
                    order_id: order.orderId,
                    handler: async function (response) {
                        const verification = await verifyPayment(response);
                        if (verification.verified) {
                            alert('✅ Payment Successful!\n\nYou can now download the assignment.');
                            const pdfUrl = `/assignments/${item.code.toLowerCase()}.pdf`;
                            window.open(pdfUrl, '_blank');
                        } else {
                            alert('Payment verification failed.');
                        }
                    },
                    prefill: {
                        name: user?.name || '',
                        email: user?.email || '',
                    },
                    theme: {
                        color: "#2563EB"
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            }
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Something went wrong. Please try again.');
        }
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
                                <div className={`card-badge ${item.isFree ? 'free' : 'paid'}`}>
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
                                    <div className="card-footer">
                                        {!item.isFree && (
                                            <div className="card-price" style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                                ₹{item.price}
                                            </div>
                                        )}
                                        <button
                                            className="btn btn-primary w-full"
                                            onClick={() => handleBuy(item)}
                                        >
                                            {item.isFree ? (
                                                <><Download size={18} style={{ marginRight: '0.5rem' }} /> Download PDF</>
                                            ) : (
                                                <><ShoppingCart size={18} style={{ marginRight: '0.5rem' }} /> Buy Now</>
                                            )}
                                        </button>
                                    </div>
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
