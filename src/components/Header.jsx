import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../assets/cart-icon.png';
import HeartIcon from '../assets/heart-icon.png'; // Add your heart icon
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsData } from '../store/slices/productsSlice';
import { fetchCartItemsData } from '../store/slices/cartSlice';
import { fetchWishItemsData } from '../store/slices/wishListSlice';
import { setSearchQuery } from '../store/slices/productsSlice'; // Will create this

export default function Header() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.list);
  const wishItems = useSelector((state) => state.wishItems.list);

  useEffect(() => {
    dispatch(fetchProductsData());
    dispatch(fetchCartItemsData());
    dispatch(fetchWishItemsData());
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">Shopee</Link>
        </h1>
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search products..."
            onChange={handleSearch}
            style={{ padding: '8px', width: '100%', maxWidth: '400px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link className="cart-icon" to="/cart">
            <img src={CartIcon} alt="cart-icon" />
            <div className="cart-items-count">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </div>
          </Link>
          <Link className="cart-icon" to="/wishlist">
            <img src={HeartIcon} alt="wishlist-icon" />
            <div className="cart-items-count">
              {wishItems.reduce((acc, item) => acc + item.quantity, 0)}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}