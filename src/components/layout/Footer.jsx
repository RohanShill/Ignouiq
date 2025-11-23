import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram, Send, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-section">
                    <h3>IGNOU IQ HINDI</h3>
                    <p>Your trusted partner in IGNOU education. We provide comprehensive study materials, live classes, and constant support to help you succeed.</p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="#" aria-label="YouTube"><Youtube size={20} /></a>
                        <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" aria-label="Telegram"><Send size={20} /></a>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/notes">Study Notes</Link></li>
                        <li><Link to="/assignments">Assignments</Link></li>
                        <li><Link to="/news">Latest News</Link></li>
                        <li><Link to="/classes">Live Classes</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Resources</h3>
                    <ul>
                        <li><Link to="/downloads">Free Downloads</Link></li>
                        <li><Link to="/papers">Previous Year Papers</Link></li>
                        <li><Link to="/schedule">Exam Schedule</Link></li>
                        <li><Link to="/faqs">FAQs</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <ul className="contact-list">
                        <li><Mail size={16} /> info@ignouiqhindi.com</li>
                        <li><Phone size={16} /> +91 XXXXX XXXXX</li>
                        <li><MapPin size={16} /> Ranchi, Jharkhand</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} IGNOU IQ HINDI. All rights reserved.</p>
                    <div className="footer-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
