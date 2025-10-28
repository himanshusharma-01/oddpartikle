import Link from 'next/link';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Left Section - Let's Talk */}
          <div className="footer-section">
            <h2 className="footer-heading">Let&apos;s Talk</h2>
            <p className="footer-subheading">Get in touch</p>
          </div>

          {/* Middle Section - Contact */}
          <div className="footer-section">
            <h3 className="footer-subtitle">Contact</h3>
            <div className="footer-links">
              <a href="mailto:bhartendu@oddpartikle.com" className="footer-link">
                bhartendu@oddpartikle.com
              </a>
              <a href="tel:+919930687849" className="footer-link">
                +91 99306 87849
              </a>
            </div>
          </div>

          {/* Right Section - Catch us */}
          <div className="footer-section">
            <h3 className="footer-subtitle">Catch us</h3>
            <div className="footer-links">
              <a href="#" className="footer-link" target="_blank" rel="noopener noreferrer">
                Linkedin
              </a>
              <a href="#" className="footer-link" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}