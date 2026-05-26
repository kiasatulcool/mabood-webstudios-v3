import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, signOut, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setOpen(false)
  }

  const close = () => setOpen(false)

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" onClick={close}>
          <span className="navbar__logo-icon">M</span>
          <span className="navbar__logo-text">Mabood<br/><small>WebStudios</small></span>
        </Link>

        <ul className={`navbar__links${open ? ' open' : ''}`}>
          {['/', '/about', '/services', '/portfolio', '/pricing', '/contact'].map(path => (
            <li key={path}>
              <NavLink to={path} className={({isActive}) => isActive ? 'active' : ''} onClick={close}>
                {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </NavLink>
            </li>
          ))}
          {user && (
            <li><NavLink to="/dashboard" onClick={close} className={({isActive}) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
          )}
          {isAdmin && (
            <li><NavLink to="/admin" onClick={close} className={({isActive}) => isActive ? 'active' : ''}>Admin</NavLink></li>
          )}
        </ul>

        <div className="navbar__actions">
          {user ? (
            <button className="btn btn-outline btn-sm" onClick={handleSignOut}>Sign Out</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-sm" onClick={close}>Log In</Link>
              <Link to="/contact" className="btn btn-primary btn-sm" onClick={close}>Get a Quote</Link>
            </>
          )}
        </div>

        <button className={`navbar__burger${open ? ' open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile${open ? ' open' : ''}`}>
        {['/', '/about', '/services', '/portfolio', '/pricing', '/contact'].map(path => (
          <NavLink key={path} to={path} onClick={close} className={({isActive}) => isActive ? 'active' : ''}>
            {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
          </NavLink>
        ))}
        {user && <NavLink to="/dashboard" onClick={close}>Dashboard</NavLink>}
        {isAdmin && <NavLink to="/admin" onClick={close}>⚙ Admin Panel</NavLink>}
        <div className="navbar__mobile-actions">
          {user ? (
            <button className="btn btn-outline" onClick={handleSignOut}>Sign Out</button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" onClick={close}>Log In</Link>
              <Link to="/signup" className="btn btn-primary" onClick={close}>Sign Up Free</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
