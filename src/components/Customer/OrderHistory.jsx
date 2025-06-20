import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
    Pagination as MuiPagination, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel, 
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Chip
} from "@mui/material";

const OrderHistory = () => {
    // State for orders and pagination
    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalOrders: 0,
        limit: 10,
    });
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState("");
    const [cancelLoadingId, setCancelLoadingId] = useState(null);
    
    // Confirmation dialog state
    const [confirmDialog, setConfirmDialog] = useState({
        open: false,
        orderId: null,
        productName: ""
    });

    // Function to get status color and variant
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return { color: 'warning', variant: 'outlined' };
            case 'confirmed':
                return { color: 'info', variant: 'outlined' };
            case 'waiting payment':
                return { color: 'info', variant: 'filled' };
            case 'shipped':
                return { color: 'primary', variant: 'outlined' };
            case 'delivered':
                return { color: 'success', variant: 'filled' };
            case 'cancelled':
                return { color: 'error', variant: 'filled' };
            case 'refunded':
                return { color: 'secondary', variant: 'outlined' };
            default:
                return { color: 'default', variant: 'outlined' };
        }
    };

    // Fetch order history from API
    const fetchOrders = async () => {
        setLoading(true);
        setApiError("");
        try {
            const token = localStorage.getItem("CustomerToken");
            const res = await axios.get(
                `https://bulkify-back-end.vercel.app/api/v1/customers/orders-history?page=${pagination.currentPage}&limit=${pagination.limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
                { headers: { "Content-Type": "application/json", token } }
            );
            console.log('orders-history API response:', res);
            setOrders(res.data.data.orders || []);
            setPagination(res.data.data.pagination || pagination);
        } catch (error) {
            setOrders([]);
            setPagination(prev => ({ ...prev, totalPages: 1, totalOrders: 0 }));
            setApiError(
                error.response?.data?.err?.join(", ") ||
                error.response?.data?.msg ||
                "Error fetching order history."
            );
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line
    }, [pagination.currentPage, sortBy, sortOrder]);
    
    // Open confirmation dialog
    const handleCancelClick = (orderId, productName) => {
        setConfirmDialog({
            open: true,
            orderId,
            productName
        });
    };

    // Close confirmation dialog
    const handleCloseDialog = () => {
        setConfirmDialog({
            open: false,
            orderId: null,
            productName: ""
        });
    };

    // Cancel purchase handler
    const handleCancelPurchase = async () => {
        const { orderId } = confirmDialog;
        setCancelLoadingId(orderId);
        handleCloseDialog();
        
        try {
            const Customertoken = localStorage.getItem("CustomerToken");
            await axios.delete(
                `https://bulkify-back-end.vercel.app/api/v1/purchases/${orderId}/cancel`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        token: ` ${Customertoken}`
                    }
                }
            );
            setCancelLoadingId(null);
            // Refresh the orders to show updated status
            await fetchOrders();
        } catch (error) {
            setCancelLoadingId(null);
            alert(
                error.response?.data?.msg ||
                error.response?.data?.err?.join(", ") ||
                "Failed to cancel purchase."
            );
        }
    };
    
    // Handle page change
    const handlePageChange = (_, value) => {
        setPagination(prev => ({ ...prev, currentPage: value }));
    };

    return (
        <div className="order-history-container">
            <h2>Order History</h2>
            {/* Sorting Controls */}
            <div className="d-flex align-items-center mb-3 gap-3">
                <FormControl size="small">
                    <InputLabel id="sort-by-label" >Sort By</InputLabel>
                    <Select
                        labelId="sort-by-label"
                        value={sortBy}
                        label="Sort By"
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <MenuItem value="createdAt">Date</MenuItem>
                        <MenuItem value="updatedAt">Updated</MenuItem>
                        <MenuItem value="purchaseQuantity">Purchase Quantity</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small">
                    <InputLabel id="sort-order-label">Order</InputLabel>
                    <Select
                        labelId="sort-order-label"
                        value={sortOrder}
                        label="Order"
                        onChange={e => setSortOrder(e.target.value)}
                    >
                        <MenuItem value="desc">Descending</MenuItem>
                        <MenuItem value="asc">Ascending</MenuItem>
                    </Select>
                </FormControl>
            </div>
            {/* Error Message */}
            {apiError && <div className="alert alert-danger text-center">{apiError}</div>}
            {/* Loading State */}
            {loading ? (
                <div style={{ minHeight: "100vh" }}>Loading...</div>
            ) : orders.length === 0 ? (
                <div>No orders found.</div>
            ) : (
                // Orders Table
                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Image</th>
                                <th>Category</th>
                                <th>Purchase Quantity</th>
                                <th>Status</th>
                                <th>Payment Method</th>
                                <th>Order Date</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, idx) => {
                                const statusConfig = getStatusColor(order.status);
                                
                                return (
                                    <tr key={order._id}>
                                        <td>{(pagination.currentPage - 1) * pagination.limit + idx + 1}</td>
                                        <td>{order.product?.name || "N/A"}</td>
                                        <td>
                                            {order.product?.imageSource?.[0] && (
                                                <img
                                                    src={order.product.imageSource[0]}
                                                    alt={order.product?.name}
                                                    style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 6 }}
                                                />
                                            )}
                                        </td>
                                        <td>{order.product?.category?.name || "N/A"}</td>
                                        <td>{order.purchaseQuantity}</td>
                                        <td>
                                            <Chip
                                                label={order.status}
                                                color={statusConfig.color}
                                                variant={statusConfig.variant}
                                                size="small"
                                                style={{ fontWeight: 'bold' }}
                                            />
                                        </td>
                                        <td>{order.paymentMethod}</td>
                                        <td>{order.createdAt ? new Date(order.createdAt).toLocaleString() : ""}</td>
                                        <td>{order.product?.price ? `EGP ${order.product.price}` : "N/A"}</td>
                                        <td>
                                            {order.status === "Pending" && (
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    disabled={cancelLoadingId === order._id}
                                                    onClick={() => handleCancelClick(order._id, order.product?.name || "this product")}
                                                >
                                                    {cancelLoadingId === order._id ? "Cancelling..." : "Cancel Purchase"}
                                                </Button>
                                            )}
                                            {order.status === "Waiting payment" && (
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    disabled={cancelLoadingId === order._id}
                                                    onClick={() => handleCancelClick(order._id, order.product?.name || "this product")}
                                                >
                                                    {cancelLoadingId === order._id ? "Cancelling..." : "Cancel Purchase"}
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="d-flex justify-content-center mt-4">
                        <MuiPagination
                            count={pagination.totalPages}
                            page={pagination.currentPage}
                            onChange={handlePageChange}
                            variant="outlined"
                            color="success"
                        />
                    </div>
                </div>
            )}

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmDialog.open}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Cancellation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to cancel the purchase for "{confirmDialog.productName}"? 
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Keep Order
                    </Button>
                    <Button onClick={handleCancelPurchase} color="error" variant="contained" autoFocus>
                        Cancel Purchase
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OrderHistory;
