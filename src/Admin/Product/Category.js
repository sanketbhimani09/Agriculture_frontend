import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2'; // Import SweetAlert
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null); // To track the category being edited

    const handleClickOpen = () => {
        setEditMode(false); // Default to add mode
        setCurrentCategory(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentCategory(null);
    };

    // Fetch categories on initial render
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        fetch('https://agriculture-backend-kjha.onrender.com/categories')
            .then((res) => res.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error fetching data:', error));
    };

    const handleAddOrEditCategory = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const categoryData = {
            categoryName: formData.get('categoryName'),
            imageUrl: formData.get('imageUrl'),
        };

        try {
            if (editMode) {
                // Edit existing category
                const response = await fetch(`https://agriculture-backend-kjha.onrender.com/edit-category/${currentCategory._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(categoryData),
                });

                if (response.ok) {
                    const updatedCategory = await response.json();

                    // Update the category list
                    setCategories((prevCategories) =>
                        prevCategories.map((category) =>
                            category._id === updatedCategory._id ? updatedCategory : category
                        )
                    );

                    Swal.fire({
                        icon: 'success',
                        title: 'Category Updated!',
                        text: 'The category has been successfully updated.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to update the category. Please try again.',
                    });
                }
            } else {
                // Add new category
                const response = await fetch('https://agriculture-backend-kjha.onrender.com/add-category', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(categoryData),
                });

                if (response.ok) {
                    const newCategory = await response.json();

                    // Update category list
                    setCategories((prevCategories) => [...prevCategories, newCategory]);

                    Swal.fire({
                        icon: 'success',
                        title: 'Category Added!',
                        text: 'Your new category has been successfully added.',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to add the category. Please try again.',
                    });
                }
            }

            // Close the dialog
            handleClose();
        } catch (error) {
            console.error(editMode ? 'Error updating category:' : 'Error adding category:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'An error occurred while processing your request.',
            });
        }
    };

    const handleEditClick = (category) => {
        setEditMode(true);
        setCurrentCategory(category);
        setOpen(true);
    };

    const handleDeleteCategory = async (categoryId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this category? This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://agriculture-backend-kjha.onrender.com/delete-category/${categoryId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setCategories((prevCategories) =>
                        prevCategories.filter((category) => category._id !== categoryId)
                    );
                    Swal.fire('Deleted!', 'The category has been deleted.', 'success');
                } else {
                    Swal.fire('Error!', 'Failed to delete the category. Please try again.', 'error');
                }
            } catch (error) {
                console.error('Error deleting category:', error);
                Swal.fire('Error!', 'An error occurred while deleting the category.', 'error');
            }
        }
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
                            Product Categories
                        </span>
                    </div>
                    <div className="col">
                        <Button
                            variant="contained"
                            style={{ marginTop: '10px' }}
                            onClick={handleClickOpen}
                        >
                            + Add Category
                        </Button>
                    </div>
                </div>
                <hr style={{ height: '1px', backgroundColor: 'black' }} />
                <div className="row">
                    {categories.map((category) => (
                        <div key={category._id} className="col-md-2">
                            <div style={{ padding: '20px', cursor: 'pointer' }}>
                                <Link to={`/Admin/CategoryWiseProduct/${category._id}`}   state={{ categoryName: category.categoryName }}
                                >
                                    <img
                                        src={category.imageUrl}
                                        style={{ width: '100%', borderRadius: '100%' }}
                                        alt={category.categoryName}
                                    />
                                </Link>
                                <h4
                                    align="center"
                                    className="p-2"
                                    style={{
                                        fontFamily: 'Nunito, sans-serif',
                                        fontWeight: 'bold',
                                        fontSize: '18px',
                                    }}
                                >
                                    {category.categoryName}
                                </h4>
                                <div className="row" style={{ marginLeft: '5px' }}>
                                    <div
                                        className="col text-center"
                                        style={{ justifyContent: 'right', display: 'flex' }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faEdit}
                                            style={{
                                                color: '#FFD300',
                                                fontSize: '20px',
                                                cursor: 'pointer',
                                                marginRight: '10px',
                                            }}
                                            onClick={() => handleEditClick(category)}
                                        />
                                    </div>
                                    <div
                                        className="col text-center"
                                        style={{ justifyContent: 'left', display: 'flex' }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            style={{ color: 'red', fontSize: '20px', cursor: 'pointer' }}
                                            onClick={() => handleDeleteCategory(category._id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? 'Edit Category' : 'Add Category'}</DialogTitle>
                <DialogContent style={{ width: '400px' }}>
                    <form onSubmit={handleAddOrEditCategory}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="categoryName"
                            name="categoryName"
                            label="Category Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            defaultValue={editMode ? currentCategory?.categoryName : ''}
                        />
                        <TextField
                            required
                            margin="dense"
                            id="imageUrl"
                            name="imageUrl"
                            label="Image Address"
                            type="text"
                            fullWidth
                            variant="standard"
                            defaultValue={editMode ? currentCategory?.imageUrl : ''}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Category;
