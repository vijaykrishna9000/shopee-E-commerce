import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProductDetailsModal from './components/ProductDetailsModal';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
      <ProductDetailsModal />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}