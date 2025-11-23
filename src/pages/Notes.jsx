import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { loadRazorpay, initiatePayment, verifyPayment } from '../services/paymentService';
import { useNavigate } from 'react-router-dom';
import './Notes.css';

// Mock Data
const NOTES_DATA = [
    { id: 1, code: 'BEGC-101', title: 'Foundation Course in English', category: 'English', price: 299, isFree: false },
    { id: 2, code: 'BHDLA-135', title: 'Hindi Sahitya ka Itihas', category: 'Hindi', price: 0, isFree: true },
    { id: 3, code: 'BHDC-132', title: 'Hindi Kavita', category: 'Hindi', price: 399, isFree: false },
    { id: 4, code: 'BSOC-131', title: 'Introduction to Sociology', category: 'Sociology', price: 199, isFree: false },
    { id: 5, code: 'BPSC-131', title: 'Political Theory', category: 'Political Science', price: 249, isFree: false },
    { id: 6, code: 'BEVAE-181', title: 'Environmental Studies', category: 'General', price: 0, isFree: true },
    { id: 7, code: 'POLSCI-TEST1', title: 'Political Science Test 1', category: 'Political Science', price: 0, isFree: true },
    { id: 8, code: 'HISTORY-TEST', title: 'History Test Note', category: 'History', price: 149, isFree: false },
];

const Notes = () => {
    const [notes, setNotes] = useState(NOTES_DATA);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadRazorpay();
    }, []);

    const handleFilter = (category) => {
        setFilter(category);
        if (category === 'All') {
            setNotes(NOTES_DATA);
        } else {
            setNotes(NOTES_DATA.filter(note => note.category === category));
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearch(term);
        setNotes(NOTES_DATA.filter(note =>
            note.title.toLowerCase().includes(term) ||
            note.code.toLowerCase().includes(term)
        ));
    };

    const handleBuy = async (note) => {
        if (!user) {
            alert('Please login to purchase notes');
            navigate('/login');
            return;
        }

        if (note.isFree) {
            // Download free PDF from public folder
            // Use test.pdf for Political Science Test 1
            const pdfUrl = note.code === 'POLSCI-TEST1'
                ? '/free_notes/test.pdf'
                : `/free_notes/${note.code.toLowerCase()}.pdf`;
            window.open(pdfUrl, '_blank');
            return;
        }

        try {
            const order = await initiatePayment({ amount: note.price, productId: note.id });

            if (order.success) {
                // Mock payment - show confirmation dialog
                const confirmed = window.confirm(
                    `Mock Payment Mode\n\n` +
                    `Item: ${note.title}\n` +
                    `Amount: ₹${note.price}\n\n` +
                    `Click OK to simulate successful payment`
                );

                if (confirmed) {
                    // Simulate payment success
                    const verification = { verified: true };
                    if (verification.verified) {
                        alert('✅ Payment Successful! (Mock Mode)\n\nYou can now download the notes from your Dashboard.');
                        // In real app, this would update user's purchased items in database
                    }
                }
            }
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="notes-page">
            <div className="container">
                <div className="notes-header">
                    <h2 className="section-title">Study Notes Store</h2>
                    <p>Find high-quality notes for your IGNOU courses</p>
                </div>

                <div className="notes-controls">
                    <div className="search-bar">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search by subject code or title..."
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>

                    <div className="filter-tabs">
                        {['All', 'Hindi', 'English', 'Sociology', 'Political Science', 'History'].map(cat => (
                            <button
                                key={cat}
                                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => handleFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="notes-grid">
                    {notes.map(note => (
                        <div key={note.id} className="note-card fade-in">
                            <div className="note-header">
                                <span className="note-code">{note.code}</span>
                                <span className={`note-badge ${note.isFree ? 'free' : 'paid'}`}>
                                    {note.isFree ? 'Free' : 'Premium'}
                                </span>
                            </div>
                            <h3 className="note-title">{note.title}</h3>
                            <p className="note-category">{note.category}</p>

                            <div className="note-footer">
                                <div className="note-price">
                                    {note.isFree ? 'FREE' : `₹${note.price}`}
                                </div>
                                <button
                                    className={`btn ${note.isFree ? 'btn-secondary' : 'btn-primary'} btn-sm w-full`}
                                    onClick={() => handleBuy(note)}
                                >
                                    {note.isFree ? <><Download size={16} /> Download</> : <><ShoppingCart size={16} /> Buy Now</>}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notes;
