import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get("https://agriculture-backend-kjha.onrender.com/users")
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    return (
        <>
            <div style={{ marginTop: '30px', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                <div align="right" className="row">
                    <div className="col-7">
                        <span
                            align="center"
                            style={{ fontSize: '30px', fontWeight: 'normal' }}
                        >
                            Users List
                        </span>
                    </div>
                </div>
                <hr style={{ height: '1px', backgroundColor: 'black' }} />
                <div className="row">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" className="w-15 text-center">Sr. No.</th>
                                <th scope="col" className="w-30">Username</th>
                                <th scope="col" className="w-25">Contact No</th>
                                <th scope="col" className="w-25">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={index} onClick={() => handleRowClick(user)} style={{ cursor: "pointer" }}>
                                        <td className='text-center'>{index + 1}</td>
                                        <td>{user.Username}</td>
                                        <td>{user.ContactNo}</td>
                                        <td>{user.Email}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center">No Users Found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for displaying user details */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <div>
                            <p><strong>Username:</strong> {selectedUser.Username}</p>
                            <p><strong>Password:</strong> {selectedUser.Password}</p>
                            <p><strong>Contact No:</strong> {selectedUser.ContactNo}</p>
                            <p><strong>Email:</strong> {selectedUser.Email}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Users;
