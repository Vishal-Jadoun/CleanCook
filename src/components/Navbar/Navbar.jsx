import { Link, NavLink } from 'react-router-dom';
import potLogo from '../../assets/pot.svg';
import './Navbar.css';
import userIcon from "../../assets/user.svg";
function Navbar() {
  return (
    <nav className='navbar'>
      <div className='navbarContainer'>

        <Link to="/" className='navbarLogo'>
          <span className='logoIcon'><img src={potLogo} alt="CleanCook Logo" /></span>
          <span className='logoText'>CleanCook</span>
        </Link>

        <ul className='navbarLinks'>
          <li><NavLink to="/" end className="navItem">Home</NavLink></li>
          <li><NavLink to="/recipes" className="navItem">Recipes</NavLink></li>
          <li><NavLink to="/planner" className="navItem">Planner</NavLink></li>
          <li><NavLink to="/shopping" className="navItem">Shopping</NavLink></li>
        </ul>

        <div className='navbarActions'>
          <Link to="/login" className='loginBtn'>Login</Link>
          <Link to="/dashboard" className='profileBtn' aria-label="Profile">
            <img src={userIcon} alt="Profile" className='profileSvg' />
          </Link>
        </div>
      </div>

    </nav>
  );
}

export default Navbar;
