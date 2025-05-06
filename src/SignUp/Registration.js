import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import '../Login/Login.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        Username: "",
        ContactNo: "",
        Email: "",
        Password: "",
        reEnterPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const apiUrl = "https://agriculture-backend-kjha.onrender.com/add-user";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { Username, ContactNo, Email, Password, reEnterPassword } = formData;
    
        if (Password !== reEnterPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match!',
            });
            return;
        }
    
        const data = { Username, ContactNo, Email, Password }; // Exclude reEnterPassword
    
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to submit your information.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, submit it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(apiUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data) // Send correct data format
                    });
    
                    if (response.ok) {
                        Swal.fire({
                            icon: "success",
                            title: "Submitted!",
                            text: "Your data has been submitted successfully."
                        }).then(() => {
                            setFormData({
                                Username: "",
                                ContactNo: "",
                                Email: "",
                                Password: "",
                                reEnterPassword: ""
                            });
                            navigate("/");
                        });
                    } else {
                        const errorMsg = await response.text();
                        Swal.fire({
                            icon: "error",
                            title: "Submission Failed",
                            text: errorMsg || "An error occurred while submitting your data."
                        });
                    }
                } catch (error) {
                    console.error("Error occurred while adding data:", error.message);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "An error occurred while connecting to the server."
                    });
                }
            }
        });
    };
    

    return (
        <>
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2 className="login-title">Registration Form</h2>

                    <div className="input-group">
                        <label htmlFor="Username">Username</label><br />
                        <input
                            type="text"
                            id="Username"
                            name="Username"
                            value={formData.Username}
                            onChange={handleInputChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="ContactNo">Contact No</label><br />
                        <input
                            type="text"
                            id="ContactNo"
                            name="ContactNo"
                            value={formData.ContactNo}
                            onChange={handleInputChange}
                            placeholder="Enter your contact number"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="Email">Email</label><br />
                        <input
                            type="email"
                            id="Email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="Password">Password</label>
                        <div className="password-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="Password"
                                name="Password"
                                value={formData.Password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={handlePasswordVisibility}
                            >
                                {showPassword ? '🐵' : '🙈'}
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="reEnterPassword">Re-Enter Password</label><br />
                        <input
                            type="password"
                            id="reEnterPassword"
                            name="reEnterPassword"
                            value={formData.reEnterPassword}
                            onChange={handleInputChange}
                            placeholder="Re-enter your password"
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Submit
                    </button>
                </form>
            </div>
            <div>
                <img src="assets/images/grass.webp" style={{ width: "100%" }} alt="Registration illustration" />
            </div>
        </>
    );
};

export default Registration;
