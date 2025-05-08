import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="pizzahub-navbar">
      <div className="pizzahub-navbar-container">
        <Link to="/" className="pizzahub-navbar-logo">
          <span className="pizzahub-logo-text">Pizza</span>
          <span className="pizzahub-logo-accent">Hub</span>
        </Link>

        <ul className="pizzahub-navbar-menu">
          <li><Link to="/" className="pizzahub-navbar-link">Home</Link></li>
          <li><Link to="/menu" className="pizzahub-navbar-link">Menu</Link></li>
          <li><Link to="/admin" className="pizzahub-navbar-link">Admin</Link></li>
          {isAuthenticated && (
            <li><Link to="/my-orders" className="pizzahub-navbar-link">My Orders</Link></li>
          )}
          {isAuthenticated && user?.role === 'admin' && (
            <li><Link to="/admin" className="pizzahub-navbar-link">Admin</Link></li>
          )}
        </ul>

        <div className="pizzahub-navbar-actions">
          <Link to="/cart" className="pizzahub-cart-icon">
            <i className="fas fa-shopping-cart"></i>
            {cartItems.length > 0 && (
              <span className="pizzahub-cart-badge">{cartItems.length}</span>
            )}
          </Link>

         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;