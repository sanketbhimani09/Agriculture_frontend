import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // For accessing route parameters
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, InputLabel, TextareaAutosize } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const CategoryWiseProduct = () => {
    const { categoryId } = useParams(); // Retrieve the category ID from the route
    const [products, setProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState({});
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [variantCount, setVariantCount] = useState(1);

    const location = useLocation();
    const categoryName = location.state?.categoryName || "Collection";
    useEffect(() => {
        fetchProducts();
    }, [categoryId]);

    const fetchProducts = () => {
        fetch(`https://agriculture-backend-kjha.onrender.com/products/${categoryId}`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts([]); // If not an array, set to empty
                }
            })
            .catch((error) => console.error('Error fetching products:', error));
    };
    const handleSizeChange = (productId, size) => {
        const product = products.find((p) => p._id === productId);
        if (product) {
            const variant = product.variants.find((v) => v.size === size);
            if (variant) {
                setSelectedSize((prev) => ({
                    ...prev,
                    [productId]: { size, price: variant.price },
                }));
            }
        }
    };
    const handleDeleteProduct = async (productId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this product? This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://agriculture-backend-kjha.onrender.com/delete-product/${productId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    Swal.fire('Deleted!', 'The product has been deleted.', 'success');
                    setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
                } else {
                    Swal.fire('Error!', 'Failed to delete the product.', 'error');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                Swal.fire('Error!', 'An error occurred.', 'error');
            }
        }
    };
    const handleEditProduct = (productId) => {
        const selectedProduct = products.find(product => product._id === productId);
        if (selectedProduct) {
            setEditMode(true);  // Set edit mode to true
            setCurrentCategory(selectedProduct);

            setFormData({
                productName: selectedProduct.productName,
                productCompany: selectedProduct.productCompany,
                productImageUrl: selectedProduct.productImageUrl,
                categoryID: categoryId,
                Description: selectedProduct.Description,
                variants: selectedProduct.variants || [{ size: '', price: '' }]
            });

            setOpen(true); // Open the modal
        }
    };
    const handleClickOpen = () => {
        setEditMode(false); // Set edit mode to false for adding a new product
        setFormData({
            productName: '',
            productCompany: '',
            productImageUrl: '',
            categoryID: categoryId,
            Description: '',
            variants: [{ size: '', price: '' }]
        });
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setCurrentCategory(null);
    };
    const [formData, setFormData] = useState({
        productName: editMode ? currentCategory?.productName || '' : '',
        productCompany: editMode ? currentCategory?.productCompany || '' : '',
        productImageUrl: editMode ? currentCategory?.productImageUrl || '' : '',
        categoryID: categoryId, // Keep category ID constant
        Description: editMode ? currentCategory?.Description || '' : '',
        variants: editMode ? currentCategory?.variants || [{ size: '', price: '' }] : [{ size: '', price: '' }]
    });

    // Handle input changes for regular fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle variant changes dynamically
    const handleVariantChange = (index, field, value) => {
        const updatedVariants = [...formData.variants];
        updatedVariants[index][field] = value;
        setFormData({ ...formData, variants: updatedVariants });
    };

    // Add a new empty variant row
    const addVariant = () => {
        setVariantCount(prevCount => prevCount + 1);
        setFormData({
            ...formData,
            variants: [...formData.variants, { size: '', price: '' }]
        });
    };
    const deleteVariant = (index) => {
        if (variantCount > 1) {
            setFormData({
                ...formData,
                variants: formData.variants.filter((_, i) => i !== index) // Remove the selected variant
            });
            setVariantCount(prevCount=>prevCount-1);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedData = {
            ...formData,
            variants: formData.variants.map(variant => ({
                size: variant.size,
                price: Number(variant.price)
            }))
        };

        if (editMode) {
            try {
                const response = await fetch(`https://agriculture-backend-kjha.onrender.com/update-product/${currentCategory._id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formattedData)

                });
                setOpen(false);
                if (response.ok) {
                    Swal.fire('Updated!', 'The product has been updated successfully.', 'success');
                    fetchProducts();
                } else {
                    Swal.fire('Error!', 'Failed to update the product.', 'error');
                }
            } catch (error) {
                console.error('Error updating product:', error);
                Swal.fire('Error!', 'An error occurred while updating the product.', 'error');
            }
        } else {
            try {
                const response = await fetch("https://agriculture-backend-kjha.onrender.com/add-product", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formattedData)
                });

                if (response.ok) {
                    Swal.fire('Success!', 'Product added successfully.', 'success');
                    fetchProducts();
                    handleClose();
                } else {
                    Swal.fire('Error!', 'Failed to add product.', 'error');
                }
            } catch (error) {
                console.error("Error adding product:", error);
                Swal.fire('Error!', 'An unexpected error occurred.', 'error');
            }
        }
    }

    return (
        <div>
            <div className="row">
                <div style={{
                    width: "100%", marginBottom: "10px", height: "100px", backgroundColor: "rgb(34,193,195)",
                    background: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)"
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', color: "white" }}>
                        <h2>{categoryName}</h2>
                    </div>
                </div>
                <div className='row' style={{ marginBottom: "20px" }}>
                    <div className='col-10'></div>
                    <div className='col-2' align="right">
                        <Button
                            variant="contained"
                            style={{ marginTop: '10px' }}
                            onClick={handleClickOpen}
                        >
                            + Add Product
                        </Button>
                    </div>
                </div>
                {products.map((product) => {
                    const selectedVariant = selectedSize[product._id] || product.variants[0];
                    return (
                        <>
                            <div key={product._id} className="col-md-2" style={{ flex: '0 0 20%', maxWidth: '20%' }}>
                                <div className="card p-1"
                                    style={{
                                        width: '12rem',
                                        border: '1px solid grey',
                                        borderRadius: '13px',
                                    }}
                                >
                                    <img src={product.productImageUrl} className="card-img-top" alt={product.productName} style={{ height: '150px' }} />

                                    <div className="card-body" style={{ fontFamily: 'Nunito,-serif', fontWeight: 'bold', }}>
                                        <h5 className="card-title"
                                            style={{
                                                fontFamily: 'Nunito, sans-serif',
                                                fontWeight: 'bold',
                                                fontSize: "14px"
                                            }}>
                                            {product.productName}
                                        </h5>
                                        <p className="card-text text-secondary"
                                            style={{ fontSize: '13px' }}>
                                            {product.productCompany}
                                        </p>
                                        <div className="row" style={{ marginTop: '4px', fontSize: "14px" }}>
                                            <div className="col" style={{ marginTop: '7px' }}>
                                                Size:
                                            </div>
                                            <div className="col-8">
                                                <select
                                                    onChange={(e) =>
                                                        handleSizeChange(product._id, e.target.value)
                                                    }
                                                    value={selectedVariant?.size}
                                                    className="form-select"
                                                >
                                                    {product.variants.map((variant) => (
                                                        <option
                                                            key={variant._id}
                                                            value={variant.size}
                                                        >
                                                            {variant.size}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginTop: '5px', fontSize: "14px" }}>
                                            <div className="col">
                                                Price:{' '}
                                                <span className="fs-6" >
                                                    &#8377;{selectedVariant?.price}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginTop: '10px' }}>
                                            <div className="col text-center">
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                    style={{
                                                        color: '#FFD300',
                                                        fontSize: '20px',
                                                        cursor: 'pointer',
                                                        marginRight: '10px',
                                                    }}
                                                    onClick={() => handleEditProduct(product._id)}
                                                />
                                            </div>
                                            <div className="col text-center">
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                    style={{
                                                        color: 'red',
                                                        fontSize: '20px',
                                                        cursor: 'pointer',
                                                    }}
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? 'Edit Product' : 'Add Product'}</DialogTitle>
                <DialogContent style={{ width: '400px' }}>
                    <form onSubmit={handleSubmit}>

                        <TextField required margin="dense" id="productName" name="productName" label="Product Name" type="text" fullWidth variant="standard" value={formData.productName} onChange={handleChange} />

                        <TextField required margin="dense" id="productCompany" name="productCompany" label="Product Company" type="text" fullWidth variant="standard" value={formData.productCompany} onChange={handleChange} />
                        
                        <TextField required margin="dense" id="productImageUrl" name="productImageUrl" label="Image Address" type="text" fullWidth variant="standard" value={formData.productImageUrl} onChange={handleChange} />

                        <TextField required margin="dense" id="Description" name="Description" label="Description" type="text" fullWidth variant="standard" value={formData.Description} onChange={handleChange} />

                        <InputLabel shrink>Variants*</InputLabel>
                        {formData.variants.map((variant, index) => (
                            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                                <TextField
                                    required label="Size" name="size" placeholder="Ex. 250ml, 500ml"
                                    type="text" value={variant.size}
                                    onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                                />
                                <TextField
                                    required label="Price" name="price" placeholder="Ex. 299, 1000"
                                    type="number" value={variant.price}
                                    onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
                                />
                                <Button variant="outlined" color="error"
                                    onClick={() => deleteVariant(index)}>
                                    X
                                </Button>
                            </div>
                        ))}
                        <Button onClick={addVariant} variant="outlined" style={{ marginBottom: '10px' }}>+ Add Variant</Button>

                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CategoryWiseProduct;
