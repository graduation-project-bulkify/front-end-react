import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../supplier/SuppDashboard.css';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);

    const AdminToken = localStorage.getItem("AdminToken");

    const fetchCategories = async () => {
        try {
            const res = await axios.get("https://bulkify-back-end.vercel.app/api/v1/categories");
            setCategories(res.data.categories || []);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `https://bulkify-back-end.vercel.app/api/v1/categories/${id}`,
                {
                    headers: { "token": AdminToken },
                }
            );
            fetchCategories();
        } catch (err) {
            console.log("Failed to delete category", err);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;

        try {
            await axios.post(
                "https://bulkify-back-end.vercel.app/api/v1/categories",
                { name: newCategory },
                {
                    headers: {
                        "Content-Type": "application/json",
                       "token": AdminToken,
                    },
                }
            );

            closeModal();
            fetchCategories();
        } catch (err) {
            console.log("Failed to add category", err);
        }
    };

    const handleEditCategory = async () => {
        if (!newCategory.trim() || !editCategoryId) return;

        try {
            await axios.put(
                `https://bulkify-back-end.vercel.app/api/v1/categories/${editCategoryId}`,
                { name: newCategory },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "token": AdminToken,
                    },
                }
            );

            closeModal();
            fetchCategories();
        } catch (err) {
            console.log("Failed to update category", err);
        }
    };

    const openEditModal = (category) => {
        setEditMode(true);
        setNewCategory(category.name);
        setEditCategoryId(category._id);
        setShowModal(true);
    };

    const openAddModal = () => {
        setEditMode(false);
        setNewCategory('');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setNewCategory('');
        setEditCategoryId(null);
        setEditMode(false);
    };

    return (
        <div className="container-fluid">
            <div className="col-md-10" style={{ width: "100%" }}>
                <div className="table-section">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5>Categories</h5>
                        <button className="btn btn-success" onClick={openAddModal}>
                            Add Category
                        </button>
                    </div>

                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Category Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category._id}>
                                        <td>{category.name}</td>
                                        <td>
                                            <button
                                                className="btn btn-success mr-2"
                                                onClick={() => openEditModal(category)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(category._id)}
                                            style={{ marginLeft: '10px' }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {showModal && (
                        <div
                            className="modal show fade d-block"
                            tabIndex="-1"
                            role="dialog"
                            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                        >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            {editMode ? 'Edit Category' : 'Add New Category'}
                                        </h5>
                                        <button type="button" className="close" onClick={closeModal}>
                                            <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter category name"
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                                        <button
                                            className="btn btn-success"
                                            onClick={editMode ? handleEditCategory : handleAddCategory}
                                        >
                                            {editMode ? 'Update' : 'Add'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
