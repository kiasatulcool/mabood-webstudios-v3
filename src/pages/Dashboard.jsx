import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'

function SkeletonRow() {
  return (
    <div className="dash-skel">
      <div className="skeleton skel-text" style={{ width: '15%' }} />
      <div className="skeleton skel-text" style={{ width: '25%' }} />
      <div className="skeleton skel-text" style={{ width: '20%' }} />
      <div className="skeleton skel-text" style={{ width: '15%' }} />
      <div className="skeleton skel-text" style={{ width: '10%' }} />
    </div>
  )
}

export default function Dashboard() {
  const { user, signOut, isAdmin } = useAuth()
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('contact_submissions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      setSubs(data || [])
      setLoading(false)
    }
    load()
  }, [user.id])

  const name = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'

  return (
    <main className="page-wrapper dash-page">
      <div className="dash-header">
        <div className="container">
          <div className="dash-header__inner">
            <div>
              <h1 className="h3">Welcome back, {name} 👋</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>{user.email}</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {isAdmin && <Link to="/admin" className="btn btn-outline btn-sm">⚙ Admin Panel</Link>}
              <Link to="/contact" className="btn btn-primary btn-sm">+ New Quote</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container dash-body">
        {/* Stats */}
        <div className="dash-stats">
          <div className="card dash-stat">
            <span className="dash-stat__num">{subs.length}</span>
            <span className="dash-stat__label">Total Submissions</span>
          </div>
          <div className="card dash-stat">
            <span className="dash-stat__num">{subs.filter(s => s.status === 'new').length}</span>
            <span className="dash-stat__label">Pending Review</span>
          </div>
          <div className="card dash-stat">
            <span className="dash-stat__num">{subs.filter(s => s.status === 'contacted').length}</span>
            <span className="dash-stat__label">In Discussion</span>
          </div>
          <div className="card dash-stat">
            <span className="dash-stat__num">{subs.filter(s => s.status === 'completed').length}</span>
            <span className="dash-stat__label">Completed</span>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="card dash-table-wrap">
          <div className="dash-table-header">
            <h2 className="h3">Your Quote Requests</h2>
            <Link to="/contact" className="btn btn-primary btn-sm">New Request +</Link>
          </div>

          {loading ? (
            <div className="dash-table-body">
              {[1, 2, 3].map(i => <SkeletonRow key={i} />)}
            </div>
          ) : subs.length === 0 ? (
            <div className="dash-empty">
              <span>📋</span>
              <p>No quote requests yet.</p>
              <Link to="/contact" className="btn btn-primary btn-sm">Submit Your First Quote →</Link>
            </div>
          ) : (
            <div className="dash-table">
              <div className="dash-table__head">
                <span>Date</span><span>Service</span><span>Budget</span><span>Status</span>
              </div>
              {subs.map(s => (
                <div key={s.id} className="dash-table__row">
                  <span>{new Date(s.created_at).toLocaleDateString('en-IN')}</span>
                  <span>{s.service || '—'}</span>
                  <span>{s.budget || '—'}</span>
                  <span><span className={`badge badge-${s.status}`}>{s.status}</span></span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Message Card */}
        <div className="card dash-message">
          <div>
            <h3 className="h3" style={{ marginBottom: 8 }}>Need Help?</h3>
            <p style={{ fontSize: 14, color: 'var(--text-2)' }}>Contact us directly via WhatsApp or email for faster response.</p>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="mailto:kiasatulmabood@gmail.com" className="btn btn-outline btn-sm">📧 Email</a>
            <a href="https://wa.me/91" target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </main>
  )
}
