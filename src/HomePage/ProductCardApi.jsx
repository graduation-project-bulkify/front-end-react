import { Link } from 'react-router-dom';
import RatingDisplay from '../components/Rating/RatingDisplay';

const ProductCardApi = ({ _id, name, price, quantity, image }) => {
    const imgStyle = {
      width: "100%",
      height: "150px", 
      objectFit:"contain"     
  }
  return (
    <div className="product-card" style={{ width: '300px', textAlign: 'center' }}>
      <img src={image} alt={name} style={imgStyle} />
      <p className="product-name" style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '10px 0' }}>
        {name}
      </p>
      <RatingDisplay productId={_id} />
      <div className="details d-flex justify-content-center align-items-center"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <p style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' ,marginRight:"3px"}}>Price:   </p>
        <p className="product-price" style={{ margin: 0, fontSize: '1rem', color: '#007BFF' }}> EGP {price}   </p>
      </div>
      <p className="product-quantity" style={{ fontSize: '0.9rem', color: '#777' }}>Quantity: {quantity}</p>
      <Link to={`/ProductDetails/${encodeURIComponent(name)}`} className="btn btn-success">
        View Details
      </Link>
    </div>
  );
};

export default ProductCardApi;