import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../store/slices/cartSlice';
import { addWishItem, removeWishItem } from '../store/slices/wishListSlice';
import { openProductModal } from '../store/slices/productsSlice'; // Will create this
import { toast } from 'react-toastify';

export default function Product({ productId, title, rating, price, imageUrl }) {
  const dispatch = useDispatch();
  const wishItems = useSelector((state) => state.wishItems.list);
  const isWishlisted = wishItems.some((item) => item.productId === productId);

  const handleAddToCart = () => {
    dispatch(addCartItem({ productId }));
    toast.success('Added to cart!');
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      dispatch(removeWishItem({ productId }));
    } else {
      dispatch(addWishItem({ productId }));
    }
  };

  return (
    <div
      className="product"
      onClick={() => dispatch(openProductModal({ productId }))}
      style={{ cursor: 'pointer' }}
    >
      <div className="product-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="title-container">
        <h3>
          <a href="#">{title}</a>
        </h3>
      </div>
      <div className="price-rating-container">
        <p className="rating">{+rating} ★ ★ ★ ★</p>
        <p className="price">${price}</p>
      </div>
      <div className="cta-container">
        <button onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}>
          Add to Cart
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleWishlistToggle(); }}
          style={{ backgroundColor: isWishlisted ? '#ff4444' : '#ddd' }}
        >
          {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        </button>
      </div>
    </div>
  );
}