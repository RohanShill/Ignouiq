import React from 'react';
import { Link } from 'react-router-dom';
import { Book, FileText, Newspaper, Video, Users, Headset, ArrowRight } from 'lucide-react';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container hero-content">
                    <h2 className="hero-title fade-in">Welcome to IGNOU IQ HINDI</h2>
                    <p className="hero-subtitle fade-in">
                        Your one-stop resource for everything related to IGNOU. Access notes, assignments, latest news, YouTube videos, and Zoom classes tailored to support your academic journey.
                    </p>
                    <div className="hero-buttons fade-in">
                        <Link to="/notes" className="btn btn-primary">Explore Notes <ArrowRight size={18} /></Link>
                        <Link to="/classes" className="btn btn-secondary">Join Live Classes</Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section features-section">
                <div className="container">
                    <h2 className="section-title">Why Choose IGNOU IQ HINDI?</h2>
                    <div className="grid grid-cols-3">
                        <FeatureCard
                            icon={<Book size={32} />}
                            title="Notes"
                            desc="Access detailed study materials and notes for all IGNOU courses in Hindi."
                            badge="Free & Paid"
                        />
                        <FeatureCard
                            icon={<FileText size={32} />}
                            title="Assignments"
                            desc="Get solved assignments and reference materials for your submissions."
                            badge="Updated"
                        />
                        <FeatureCard
                            icon={<Newspaper size={32} />}
                            title="Latest Updates"
                            desc="Stay updated with exam dates, notices, and important announcements."
                            badge="Real-time"
                        />
                        <FeatureCard
                            icon={<Video size={32} />}
                            title="Video Lectures"
                            desc="Learn from expertly crafted YouTube video lectures and tutorials."
                            badge="Free"
                        />
                        <FeatureCard
                            icon={<Users size={32} />}
                            title="Live Zoom Classes"
                            desc="Join interactive Zoom sessions with experienced faculty members."
                            badge="Interactive"
                        />
                        <FeatureCard
                            icon={<Headset size={32} />}
                            title="24/7 Support"
                            desc="Get assistance whenever you need help with your IGNOU journey."
                            badge="Always Available"
                        />
                    </div>
                </div>
            </section>

            {/* Popular Notes Section */}
            <section className="section bg-light">
                <div className="container">
                    <h2 className="section-title">Popular Study Materials</h2>
                    <div className="notes-list">
                        <NoteItem
                            title="BEGC-101 - Foundation Course in English"
                            desc="Comprehensive notes with examples and practice questions"
                            price="₹299"
                            isFree={false}
                        />
                        <NoteItem
                            title="BHDLA-135 - Hindi Sahitya ka Itihas"
                            desc="Complete study material with chapter-wise breakdown"
                            price="FREE"
                            isFree={true}
                        />
                        <NoteItem
                            title="BHDC-132 - Hindi Kavita"
                            desc="Detailed analysis with previous year questions"
                            price="₹399"
                            isFree={false}
                        />
                    </div>
                    <div className="text-center mt-xl">
                        <Link to="/notes" className="btn btn-primary">View All Notes</Link>
                    </div>
                </div>
            </section>

            {/* News Section */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Latest IGNOU Updates</h2>
                    <div className="news-grid">
                        <NewsItem
                            date="November 4, 2025"
                            title="IGNOU December 2025 TEE Exam Form Date Extended"
                            desc="IGNOU has extended the last date for submission of exam forms for December 2025 Term End Examination. Students can now submit their forms until November 15, 2025."
                        />
                        <NewsItem
                            date="November 2, 2025"
                            title="New Study Centers Opened in Jharkhand Region"
                            desc="IGNOU announces the opening of five new study centers across Jharkhand, including Ranchi, Jamshedpur, and Dhanbad to facilitate better access for students."
                        />
                        <NewsItem
                            date="October 30, 2025"
                            title="Assignment Submission Deadline - Important Notice"
                            desc="Last date for submitting assignments for the current session is November 30, 2025. Students are advised to complete their submissions on time."
                        />
                    </div>
                    <div className="text-center mt-xl">
                        <Link to="/news" className="btn btn-secondary">View All Updates</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Sub-components for cleaner code
const FeatureCard = ({ icon, title, desc, badge }) => (
    <div className="card feature-card fade-in">
        <div className="card-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{desc}</p>
        <span className="card-badge">{badge}</span>
    </div>
);

const NoteItem = ({ title, desc, price, isFree }) => (
    <div className="notes-item fade-in">
        <div className="notes-info">
            <h4>{title}</h4>
            <p>{desc}</p>
        </div>
        <div className="notes-action">
            <div className={`price ${isFree ? 'free' : ''}`}>{price}</div>
            <button className={`btn ${isFree ? 'btn-secondary' : 'btn-primary'} btn-sm`}>
                {isFree ? 'Download' : 'Buy Now'}
            </button>
        </div>
    </div>
);

const NewsItem = ({ date, title, desc }) => (
    <div className="news-item fade-in">
        <div className="news-date">{date}</div>
        <h4>{title}</h4>
        <p>{desc}</p>
    </div>
);

export default Home;
