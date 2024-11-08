import React, { useState } from "react";
import './Support.css';

const Support = () => {
    const [isChatOpen, setChatOpen] = useState(false);
    const toggleChat = () => setChatOpen(!isChatOpen);

    return (
        <div className="support-container">
            <header className="support-header">
                <h1>Customer Support</h1>
                <nav>
                    <ul>
                        <li><a href="#live-chat" onClick={toggleChat}>Live Chat</a></li>
                        <li><a href="#faq">FAQs</a></li>
                        <li><a href="#troubleshooting">Troubleshooting</a></li>
                        <li><a href="#feedback">Feedback</a></li>
                    </ul>
                </nav>
            </header>

            <section id="live-chat" className="support-section">
                <h2>Live Chat</h2>
                <button className="chat-toggle" onClick={toggleChat}>
                    {isChatOpen ? 'Close Chat' : 'Start Live Chat'}
                </button>
                {isChatOpen && (
                    <div className="chat-box">
                        <div className="chat-header">
                            <h3>Support Assistant</h3>
                            <button onClick={toggleChat}>X</button>
                        </div>
                        <div className="chat-content">
                            <p>Welcome! How can we assist you today?</p>
                        </div>
                        <input type="text" placeholder="Type your message..." />
                    </div>
                )}
            </section>

            <section id="faq" className="support-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-item">
                    <h3>How can I reset my password?</h3>
                    <p>To reset your password, click on the 'Forgot Password' option on the login page and follow the steps.</p>
                </div>
                <div className="faq-item">
                    <h3>Why aren't my recommendations updating?</h3>
                    <p>Make sure you have rated enough movies recently. You can also try clearing your cache or checking your internet connection.</p>
                </div>
                {/* Add more FAQ items */}
            </section>

            <section id="troubleshooting" className="support-section">
                <h2>Troubleshooting</h2>
                <div className="guide">
                    <h3>App Crashing</h3>
                    <ol>
                        <li>Ensure your app is updated to the latest version.</li>
                        <li>Try restarting your phone or tablet.</li>
                        <li>If the issue persists, reinstall the app.</li>
                    </ol>
                    <button className="help-btn">Get More Help</button>
                </div>
            </section>

            <section id="feedback" className="support-section">
                <h2>Feedback</h2>
                <form className="feedback-form">
                    <label htmlFor="feedback-message">Your Feedback:</label>
                    <textarea id="feedback-message" placeholder="Tell us about your experience or suggestions"></textarea>
                    <button type="submit">Submit Feedback</button>
                </form>
            </section>

            <footer className="support-footer">
                <p>&copy; 2024 MovieApp. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Support;
