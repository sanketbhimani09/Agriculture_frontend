import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../Footer/Footer.css";
import "./Technologys.css";

// Set app root for React Modal
Modal.setAppElement("#root");

const Technologys = () => {
    const [technologies, setTechnologies] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editingTech, setEditingTech] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        description: "",
    });

    useEffect(() => {
        fetch("https://agriculture-backend-kjha.onrender.com/technology")
            .then((response) => response.json())
            .then((data) => setTechnologies(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveTechnology = () => {
        if (editingTech) {
            // Update existing technology
            fetch(`https://agriculture-backend-kjha.onrender.com/edit-tech/${editingTech._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(updatedTech => {
                setTechnologies(prevTech =>
                    prevTech.map(tech =>
                        tech._id === editingTech._id
                            ? { ...tech, ...formData }
                            : tech
                    )
                );
                setEditingTech(null);
                setModalIsOpen(false);
                setFormData({ title: "", image: "", description: "" });
                Swal.fire("Updated!", "Technology updated successfully!", "success");
            })
            .catch(error => console.error("Error updating technology:", error));
        } else {
            // Add new technology
            fetch("https://agriculture-backend-kjha.onrender.com/add-tech", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
            .then(response => response.json())
            .then(newTech => {
                setTechnologies([...technologies, newTech]);
                setModalIsOpen(false);
                setFormData({ title: "", image: "", description: "" });
                Swal.fire("Success!", "Technology added successfully!", "success");
            })
            .catch(error => console.error("Error adding technology:", error));
        }
    };
    
    const handleDeleteTechnology = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this Technology? This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://agriculture-backend-kjha.onrender.com/delete-tech/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setTechnologies((prevTech) =>
                        prevTech.filter((tech) => tech._id !== id)
                    );
                    Swal.fire('Deleted!', 'The Technology has been deleted.', 'success');
                } else {
                    Swal.fire('Error!', 'Failed to delete the Technology. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error deleting Technology:', error);
                Swal.fire('Error!', 'An error occurred while deleting the Technology.', 'error');
            }
        }
    }
    return (
        <div className="backimage">
            <div className="text-center">
                <br />
                <h3 className="agileits_w3layouts_head">
                    Agriculture <span>Technology</span>
                </h3>
                <img
                    src="/assets/images/1.png"
                    alt="Agriculture Technology"
                    className="img-responsive"
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                />
            </div>

            <div className="container text-center d-flex justify-content-end">
                {localStorage.getItem("adminID") && (
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => setModalIsOpen(true)}
                    >
                        + Add Technology
                    </button>
                )}
            </div>
            <br />
            <div className="container text-center">
                <p style={{ fontSize: "17px", backgroundColor: "rgba(120,120,120, 0.6)", color: "white", border: "1px solid black", borderRadius: "10px" }}>
                    Agricultural technology or agrotechnology (abbreviated agtech, agritech, AgriTech, or agrotech) is the use of technology in agriculture, horticulture, and aquaculture with the aim of improving yield, efficiency, and profitability.
                </p>
            </div>
            <br/>
            <div className="container">
                <div className="row">
                    {technologies.map((technology) => (
                        <div
                            className="col-12 col-md-6 col-lg-4 card-container"
                            key={technology._id}
                        >
                            <div
                                className="card"
                                style={{
                                    boxShadow:
                                        "rgba(0, 0, 0, 0.26) 0px 20px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                                }}
                            >
                                <img
                                    className="card-img-top"
                                    src={technology.image}
                                    alt={technology.title}
                                    style={{
                                        height: "230px",
                                        width: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title" style={{ fontSize: "18px" }}>
                                        {technology.title}
                                    </h5>
                                    <p className="card-text" style={{ fontSize: "16px" }}>
                                        {technology.description}
                                    </p>
                                    <div className="row">
                                        <div className="col">
                                            {localStorage.getItem("adminID") && (
                                                <FontAwesomeIcon
                                                icon={faEdit}
                                                style={{
                                                    color: "#FFD300",
                                                    fontSize: "20px",
                                                    cursor: "pointer",
                                                    marginRight: "10px",
                                                }}
                                                onClick={() => {
                                                    setEditingTech(technology); // Store the current technology in state
                                                    setFormData({ 
                                                        title: technology.title, 
                                                        image: technology.image, 
                                                        description: technology.description 
                                                    });
                                                    setModalIsOpen(true);
                                                }}
                                            />
                                            
                                            )}
                                        </div>
                                        <div className="col d-flex justify-content-end">
                                            {localStorage.getItem("adminID") && (
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    style={{
                                                        color: "red",
                                                        fontSize: "20px",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => { handleDeleteTechnology(technology._id) }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* React Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Add Technology"
                className="custom-modal"
                overlayClassName="custom-overlay"
            >
                <h2 className="text-center">Add Technology</h2>
                <div className="form-group">
                    <label>Technology Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image Path</label>
                    <input
                        type="text"
                        className="form-control"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={() => setModalIsOpen(false)}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleSaveTechnology}>
                        Save Technology
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Technologys;
