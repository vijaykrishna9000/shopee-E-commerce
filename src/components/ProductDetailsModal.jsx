import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeProductModal, getProductModal } from '../store/slices/productsSlice';
import { getAllProducts } from '../store/slices/productsSlice';

export default function ProductDetailsModal() {
  const dispatch = useDispatch();
  const { isOpen, productId } = useSelector(getProductModal);
  const products = useSelector(getAllProducts);
  const product = products.find((p) => p.id === productId);

  if (!isOpen || !product) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={() => dispatch(closeProductModal())}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => dispatch(closeProductModal())}
          style={{
            float: 'right',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
        />
        <h2>{product.title}</h2>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating.rate} ★ ({product.rating.count} reviews)</p>
        <p>Description: {product.description || 'No description available.'}</p>
      </div>
    </div>
  );
}