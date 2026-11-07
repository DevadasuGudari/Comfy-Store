import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils.js';

const Product = ({ product }) => {
  const { addToCart } = useCart();
  const { id, name, image, price } = product;

  return (
    <article className="product">
      <div className="product-container">
        <img src={image} className="product-img img" alt={name} />
        <div className="product-icons">
          <Link to={`/products/${id}`} className="product-icon">
            <i className="fas fa-search"></i>
          </Link>
          <button
            className="product-cart-btn product-icon"
            onClick={() => addToCart(product)}
          >
            <i className="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>
      <footer>
        <p className="product-name">{name}</p>
        <h4 className="product-price">{formatPrice(price)}</h4>
      </footer>
    </article>
  );
};

export default Product;
