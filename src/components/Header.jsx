import { Link, NavLink } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

function Header() {
  const { count } = useCart()

  // Initialize dark mode state, defaulting to false, saved in localStorage
  const [isDarkMode, setIsDarkMode] = useLocalStorage('campuseats-darkmode', false);

  // Apply or remove the 'dark-mode' CSS class on the <body> tag whenever the state changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/" className="logo-link">CampusEats</Link>
      </h1>
      <nav className="nav">
        <NavLink to="/" end>Vendors</NavLink>
        <NavLink to="/orders">My Orders</NavLink>
        <NavLink to="/cart">
          Cart <span className="badge">{count}</span>
        </NavLink>
      </nav>

      <button 
          type="button"
          onClick={() => setIsDarkMode(!isDarkMode)}
          style={{ 
            marginLeft: '16px', 
            cursor: 'pointer', 
            background: 'none', 
            border: 'none', 
            fontSize: '1.2rem' 
          }}
          title="Toggle Dark Mode"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        
    </header>
  )
}

export default Header