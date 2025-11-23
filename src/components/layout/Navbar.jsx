import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, User, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="logo">
                    <h1>IGNOU IQ HINDI</h1>
                    <span>Aapka Apna Institute</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/notes" className="nav-link">Notes</Link>
                    <Link to="/assignments" className="nav-link">Assignments</Link>
                    <Link to="/classes" className="nav-link">Classes</Link>

                    {user ? (
                        <div className="user-menu">
                            <Link to="/dashboard" className="user-name"><User size={18} /> {user.name}</Link>
                            <button onClick={handleLogout} className="btn-icon" title="Logout">
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary btn-sm">
                            Login
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="mobile-nav">
                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                    <Link to="/notes" onClick={() => setIsMobileMenuOpen(false)}>Notes</Link>
                    <Link to="/assignments" onClick={() => setIsMobileMenuOpen(false)}>Assignments</Link>
                    <Link to="/classes" onClick={() => setIsMobileMenuOpen(false)}>Classes</Link>
                    {user ? (
                        <>
                            <div className="mobile-user-info">Signed in as {user.name}</div>
                            <Link to="/dashboard" className="btn btn-secondary w-full" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                            <button onClick={handleLogout} className="btn btn-secondary w-full" style={{ marginTop: '0.5rem' }}>Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary w-full" onClick={() => setIsMobileMenuOpen(false)}>
                            Login
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
