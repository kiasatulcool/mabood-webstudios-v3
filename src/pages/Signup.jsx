import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const submit = async () => {
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields.'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true); setError('')
    const { error: err } = await signUp(form.email, form.password, form.name)
    if (err) { setError(err.message); setLoading(false) }
    else { setSuccess(true) }
  }

  if (success) return (
    <main className="auth-page page-wrapper">
      <div className="auth-box card">
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>
          <h2 className="h3">Check Your Email</h2>
          <p className="auth-sub">We sent a confirmation link to <strong>{form.email}</strong>. Click it to activate your account.</p>
          <Link to="/login" className="btn btn-primary" style={{ marginTop: 24, justifyContent: 'center', width: '100%' }}>Go to Login</Link>
        </div>
      </div>
    </main>
  )

  return (
    <main className="auth-page page-wrapper">
      <div className="auth-box card">
        <div className="auth-brand">
          <span className="auth-brand__icon">M</span>
          <span className="auth-brand__name">Mabood WebStudios</span>
        </div>
        <h1 className="h3">Create Account</h1>
        <p className="auth-sub">Sign up to track your quote requests and project status.</p>
        {error && <div className="auth-error">{error}</div>}
        <div className="form-group">
          <label>Full Name</label>
          <input className="form-control" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Min. 6 characters" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" className="form-control" placeholder="Repeat password" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))} />
        </div>
        <button className="btn btn-primary auth-btn" onClick={submit} disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up Free →'}
        </button>
        <p className="auth-footer">Already have an account? <Link to="/login">Log in</Link></p>
        <Link to="/" className="auth-back">← Back to site</Link>
      </div>
    </main>
  )
}
