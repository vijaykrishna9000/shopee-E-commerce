import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllWishItems,
  getWishError,
  getWishLoadingState,
  removeWishItem,
} from '../store/slices/wishListSlice';
import { getProductLoadingState } from '../store/slices/productsSlice';

export default function Wishlist() {
  const dispatch = useDispatch();
  const wishItems = useSelector(getAllWishItems);
  const isLoading = useSelector(getWishLoadingState);
  const isProductsLoading = useSelector(getProductLoadingState);
  const error = useSelector(getWishError);

  return (
    <div className="cart-container">
      <h2>Your Wishlist</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Actions</div>
        </div>
        {isLoading || isProductsLoading ? (
          <h1 style={{ textAlign: 'center' }}>Loading...</h1>
        ) : error ? (
          <h2 style={{ textAlign: 'center' }}>{error}</h2>
        ) : wishItems.length === 0 ? (
          <h2 style={{ textAlign: 'center' }}>Your wishlist is empty</h2>
        ) : (
          wishItems.map(({ id, title, rating, price, image, quantity }) => (
            <div key={id} className="cart-item-container">
              <div className="cart-item">
                <img src={image} alt={title} />
                <div>
                  <h3>{title}</h3>
                  <p>{rating.rate} ★ ★ ★ ★</p>
                </div>
              </div>
              <div className="item-price">${price}</div>
              <div className="item-quantity">{quantity}</div>
              <div className="item-total">
                <button
                  onClick={() => dispatch(removeWishItem({ productId: id }))}
                  style={{
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    padding: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}