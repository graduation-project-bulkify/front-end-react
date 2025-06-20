import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Select from 'react-select';
export default function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        description: '',
        price: '',
        bulkThreshold: '',
        category: [], // now an array for multiple selections
        images: [],
    });

    const [categories, setCategories] = useState([]);
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");
    const errRef = useRef(null);
    const categoryOptions = categories.map(cat => ({
        value: cat._id,
        label: cat.name
    }));
    const handleCategoryChange = (selectedOptions) => {
        setFormData(prev => ({
            ...prev,
            category: selectedOptions || []
        }));
    };

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await axios.get("https://bulkify-back-end.vercel.app/api/v1/categories");
                setCategories(res.data.categories || []);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        }

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({
            ...prev,
            images: files
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const SupplierToken = localStorage.getItem("SupplierToken");
        if (!SupplierToken) {
            setMsg("Token not found. Please log in.");
            setMsgType("error");
            return;
        }

        if (formData.images.length === 0) {
            setMsg("At least one image is required.");
            setMsgType("error");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", Number(formData.price));
        formDataToSend.append("quantity", Number(formData.quantity));
        formDataToSend.append("bulkThreshold", Number(formData.bulkThreshold));

        formData.category.forEach(cat => {
            formDataToSend.append("categoryId", cat.value);
        });

        formData.images.forEach(image => {
            formDataToSend.append("images", image);
        });

        try {
            const res = await axios.post(
                "https://bulkify-back-end.vercel.app/api/v1/products",
                formDataToSend,
                {
                    headers: {
                        "token": SupplierToken,
                        "Content-Type": "multipart/form-data",
                    }
                }
            );

            localStorage.setItem('productId', res.data.productId);
            setMsg(res.data.message || "Product added successfully");
            setMsgType("success");
        } catch (error) {
            if (error.response) {
                setMsg(`Server responded with error: ${error.response.data}`);
                console.error("Error response:", error.response.data);
            } else {
                setMsg(`Request error: ${error.message}`);
            }
            setMsgType("error");
        }
    };

    return (
        <div style={{ width: "100%" }}>
            <div className="form-section">
                <h5 className="mb-4">ADD Product</h5>
                <p
                    ref={errRef}
                    className={`alert ${msgType === "success" ? "alert-success" : "alert-danger"} ${msg ? 'd-block' : 'd-none'} text-center mx-auto`}
                    aria-live="assertive"
                    id="alert"
                    style={{
                        padding: "20px",
                        borderRadius: "10px",
                        maxWidth: "90%",
                        width: "400px",
                        color: "#fff",
                        textAlign: "center",
                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                        backgroundColor: msgType === "success" ? "#28a745" : "#ff4d4d",
                    }}
                >
                    {msg}
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Product Name" />
                    </div>
                    <div className="mb-3">
                        <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} className="form-control" placeholder="Pieces" />
                    </div>
                    <div className="mb-3">
                        <input type="text" name="description" value={formData.description} onChange={handleChange} className="form-control" placeholder="Bulk orders / Description" />
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" name="price" value={formData.price} onChange={handleChange} className="form-control" placeholder="Product Price" />
                        </div>
                        <div className="col">
                            <input type="text" name="bulkThreshold" value={formData.bulkThreshold} onChange={handleChange} className="form-control" placeholder="Bulk Threshold" />
                        </div>
                    </div>
                    <div className="mb-3">
                        <Select
                            isMulti
                            options={categoryOptions}
                            value={formData.category}
                            onChange={handleCategoryChange}
                            placeholder="Select categories..."
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="form-control"
                            name="images"
                        />
                    </div>
                    <button type="submit" className="btn btn-success">ADD</button>
                </form>
            </div>
        </div>
    );
}
