import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = () => {
        axios.get("https://agriculture-backend-kjha.onrender.com/messages")
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error("Error fetching messages:", error);
            });
    };

    const deleteMessage = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this message!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://agriculture-backend-kjha.onrender.com/delete-message/${id}`)
                    .then(() => {
                        setMessages(messages.filter(msg => msg._id !== id));
                        Swal.fire("Deleted!", "The message has been deleted.", "success");
                    })
                    .catch(error => {
                        console.error("Error deleting message:", error);
                        Swal.fire("Error!", "Could not delete the message.", "error");
                    });
            }
        });
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
                            Messages
                        </span>
                    </div>
                </div>
                <hr style={{ height: '1px', backgroundColor: 'black' }} />
                <div className="row">
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <div key={msg._id} className="col-md-4 mb-3">
                                <Card className="shadow-sm p-3" style={{backgroundColor:"lightcyan"}}>
                                    <Card.Body>
                                        <Card.Title>{msg.fullName}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{msg.email}</Card.Subtitle>
                                        <Card.Text>{msg.message}</Card.Text>
                                        <FaTrash 
                                            style={{ cursor: "pointer", color: "red" }} 
                                            onClick={() => deleteMessage(msg._id)} 
                                        />
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-100">
                            <p>No Messages Found</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Messages;
