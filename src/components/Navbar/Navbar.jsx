import { Link, NavLink } from 'react-router-dom';
import potLogo from '../../assets/pot.svg';
import './Navbar.css';

function Navbar() {
  return (
    <nav className='navbar'>
      <div className='navbarContainer'>

        <Link to="#" className='navbarLogo'>
          <span className='logoIcon'><img src={potLogo} alt="CleanCook Logo" /></span>
          <span className='logoText'>CleanCook</span>
        </Link>

        <ul className='navbarLinks'>

          <li><NavLink to="" className="navItem">Home</NavLink></li>
          <li><NavLink to="/recipe" className="navItem">Recipe</NavLink></li>
          <li><NavLink to="/planner" className="navItem">Planner</NavLink></li>
          <li><NavLink to="/shopping" className="navItem">Shopping</NavLink></li>
        </ul>

        <div className='navbarActions'>
          <Link to="/login" className='loginBtn'>Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
