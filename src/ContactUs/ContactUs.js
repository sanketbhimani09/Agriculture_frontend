import React, { useState } from "react";
import "./ContactUs.css";
import Swal from 'sweetalert2';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        message: "",
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Log the form data for debugging
        console.log(formData);
    
        // Check if all fields are filled
        if (!formData.fullName || !formData.email || !formData.message) {
            Swal.fire('Please fill in all fields!', '', 'error');
            return;
        }
    
        try {
            const response = await fetch('https://agriculture-backend-kjha.onrender.com/add-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            if (response.ok) {
                Swal.fire('Success', 'Your message has been sent!', 'success');
                setFormData({ fullName: '', email: '', message: '' });
            } else {
                console.log(data); // Log error message
                Swal.fire('Error', data.message || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            Swal.fire('Error', 'Server error, please try again later.', 'error');
        }
    };
    


    return (
        <div className="contactbg">
            <div className="contact-container">
                <div className="contact-box">
                    {/* Left Side Form */}
                    <div className="contact-form">
                        <h2>Contact Us</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group inp-bg">
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div className="form-group inp-bg">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="form-group inp-bg">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Enter your message"
                                ></textarea>
                            </div>
                            <button type="submit" className="send-button">Send</button>
                        </form>
                    </div>
                    {/* Right Side Image */}
                    <div className="contact-image">
                        <img
                            src="assets/images/contactus.jpg"
                            alt="Contact Us"
                            style={{ height: "443px" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
