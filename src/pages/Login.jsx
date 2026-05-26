import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const submit = async () => {
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    setLoading(true); setError('')
    const { error: err } = await signIn(form.email, form.password)
    if (err) { setError(err.message); setLoading(false) }
    else navigate('/dashboard')
  }

  return (
    <main className="auth-page page-wrapper">
      <div className="auth-box card">
        <div className="auth-brand">
          <span className="auth-brand__icon">M</span>
          <span className="auth-brand__name">Mabood WebStudios</span>
        </div>
        <h1 className="h3">Welcome Back</h1>
        <p className="auth-sub">Log in to track your quote requests and projects.</p>
        {error && <div className="auth-error">{error}</div>}
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} onKeyDown={e => e.key === 'Enter' && submit()} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} onKeyDown={e => e.key === 'Enter' && submit()} />
        </div>
        <button className="btn btn-primary auth-btn" onClick={submit} disabled={loading}>
          {loading ? 'Logging in...' : 'Log In →'}
        </button>
        <p className="auth-footer">Don't have an account? <Link to="/signup">Sign up free</Link></p>
        <Link to="/" className="auth-back">← Back to site</Link>
      </div>
    </main>
  )
}
