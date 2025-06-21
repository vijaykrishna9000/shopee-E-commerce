import React from 'react';
import { useSelector } from 'react-redux';
import Product from '../components/Product';
import {
  getAllProducts,
  getProductError,
  getProductLoadingState,
} from '../store/slices/productsSlice';

export default function Home() {
  const productsList = useSelector(getAllProducts);
  const isLoading = useSelector(getProductLoadingState);
  const error = useSelector(getProductError);

  return (
    <div className="home-container">
      <section className="cover-section">
        <div className="cover-overlay">
          <h1 className="cover-quote">Discover Amazing Deals Today!</h1>
        </div>
      </section>
      {isLoading ? (
        <h1 style={{ textAlign: 'center' }}>Loading...</h1>
      ) : error ? (
        <h2 style={{ textAlign: 'center' }}>{error}</h2>
      ) : productsList.length === 0 ? (
        <h2 style={{ textAlign: 'center' }}>No products found</h2>
      ) : (
        <div className="products-container">
          {productsList.map(({ id, title, rating, price, image }) => (
            <Product
              key={id}
              productId={id}
              title={title}
              rating={rating.rate}
              price={price}
              imageUrl={image}
            />
          ))}
        </div>
      )}
    </div>
  );
}