import './Footer.css';
import { Link } from 'react-router-dom';
import potLogo from '../../assets/pot.svg';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footerContianer'>

        <div className='footerTop'>
          <div className='footerLogoCorner'>
            <Link to="/" className="footerLogo">
              <img className="footFavicon" src={potLogo} alt="CleanCook Logo" />
              <span className='footerLogoText'>CleanCook</span>
            </Link>

            <p>CleanCook brings you the finest cook recipes, health tracking and delicious meals made with love and the finest ingredients</p>
            <div className='socialLinks'>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="CleanCook on Facebook">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="CleanCook on Instagram">Instagram</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="CleanCook on YouTube">YouTube</a>
            </div>
          </div>

          <div className='footerExploreCol'>
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/planner">Planner</Link>
            <Link to="/shopping">Shopping</Link>
          </div>

          <div className='footerSupportCol'>
            <h4>Support</h4>
            <span className="footerDisabledLink">Help Center (24/7)</span>
            <span className="footerDisabledLink">FAQs & Guides</span>
            <span className="footerDisabledLink">Privacy & Terms</span>
          </div>

          <div className='footerContactCol'>
            <h4>Contact Us</h4>
            <p> 068, Chitkara Square 1, Healthy Wave</p>
            <p> +91 9876543210</p>
            <p> work.vishaljadoun@gmail.com</p>
          </div>
        </div>

        <div className='footerBottom'>
          <p>© 2026 CleanCook. All rights reserved.</p>
          <div className='footerContributorNames'>
            <span>Vishal Jadoun</span>
            <span>Aditya Bansal</span>
            <span>Harnoor Kaur</span>
          </div>

          <div>
            <p>Make with Love and Care</p>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

