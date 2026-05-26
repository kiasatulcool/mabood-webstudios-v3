import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">M</span>
              <span>Mabood WebStudios</span>
            </div>
            <p>Professional web development for small businesses across India. Fast, affordable, and built to convert.</p>
            <p className="footer__location">📍 Kolkata, West Bengal, India</p>
          </div>
          <div className="footer__col">
            <h4>Pages</h4>
            <ul>
              {[['/', 'Home'],['/about','About'],['/services','Services'],['/portfolio','Portfolio'],['/pricing','Pricing'],['/contact','Contact']].map(([to, label]) => (
                <li key={to}><Link to={to}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h4>Services</h4>
            <ul>
              {['Landing Pages','Business Websites','E-Commerce Stores','Portfolio Sites','Web Apps','Maintenance'].map(s => (
                <li key={s}><Link to="/services">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:kiasatulmabood@gmail.com">kiasatulmabood@gmail.com</a></li>
              <li><a href="https://wa.me/91" target="_blank" rel="noreferrer">WhatsApp Us</a></li>
              <li><a href="https://github.com/kiasatulcool" target="_blank" rel="noreferrer">GitHub</a></li>
              <li><a href="https://linkedin.com/in/kiasatul-mabood-8146923b7" target="_blank" rel="noreferrer">LinkedIn</a></li>
            </ul>
            <div className="footer__upi">
              <span className="tag">UPI</span>
              <code>kiasatulmabood@oksbi</code>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Mabood WebStudios. All rights reserved.</p>
          <p>Starting at <strong>₹2,999</strong> · 3–10 day delivery · Free consultation</p>
        </div>
      </div>
    </footer>
  )
}
