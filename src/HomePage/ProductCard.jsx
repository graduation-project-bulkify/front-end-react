import React from 'react'
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'; // <-- Add this import for custom styles

const ProductCard = ({ product, style }) => {
  const imgStyle = {
    width: "100%",
    height: "150px",
    objectFit: "contain",
    marginLeft: "5px"
  };
  const navigate = useNavigate();
  const getImageUrl = (imageSource) => {
      if (!imageSource) return '';
      if (typeof imageSource === 'string') return imageSource;
      if (Array.isArray(imageSource) && imageSource.length > 0) return imageSource[0];
      return '';
  };

  const handleStartPurchase = () => {
      if (product?.name) {
          navigate(`/ProductDetails/${encodeURIComponent(product.name)}`);
      }
  };

  return (
    <Card
      className="custom-product-card"
      style={{
        ...style,
        padding: '16px',
        margin: '10px',
        width: "-webkit-fill-available",
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
      }}
    >
      <div className="custom-product-card-content">
          <img src={getImageUrl(product?.imageSource)} alt={product?.name} style={imgStyle} />
        <div className="custom-product-card-details">
          <h2  style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' ,marginTop:'10px' }}>{product?.name || "Loading..."}</h2>
          <p className='productCardDescription' style={{ color: '#6b7280', marginBottom: '16px' }}>{product?.description || ""}</p>
          <button className="btn btn-success h-100" type="button" onClick={handleStartPurchase}>Start Purchase</button>
        </div>
      </div>
    </Card>
  );
};
export default ProductCard;