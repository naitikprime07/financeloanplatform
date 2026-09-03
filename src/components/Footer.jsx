import { Link } from 'react-router-dom';
import mainLogo from '../assets/logo/mainLogo.png';
import './Footer.css';

const Footer = () => {
  const categories = [
    { name: 'Customer Management', path: '/category/Customer Management' },
    { name: 'Sales Automation', path: '/category/Sales Automation' },
    { name: 'Business Growth', path: '/category/Business Growth' },
    { name: 'CRM Solutions', path: '/category/CRM Solutions' },
  ];

  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const legalLinks = [
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <Link to="/" className="footer-logo">
              <img className="footer-logo-image" src={mainLogo} alt="Finvexa" />
            </Link>
            <p className="footer-description">
              Your ultimate destination for finance news, reviews, and insights. Making finance knowledge accessible for everyone.
            </p>
          </div>

          <div className="footer-section">
            <h3>Categories</h3>
            <ul className="footer-links">
              {categories.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Company</h3>
            <ul className="footer-links">
              {companyLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Legal</h3>
            <ul className="footer-links">
              {legalLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Finvexa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
