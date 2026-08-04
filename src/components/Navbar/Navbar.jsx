import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link> | 
      <Link to="/recipes">Recipes</Link> | 
      <Link to="/planner">Planner</Link> | 
      <Link to="/shopping">Shopping</Link> | 
      <Link to="/dashboard">Dashboard</Link> | 
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;
