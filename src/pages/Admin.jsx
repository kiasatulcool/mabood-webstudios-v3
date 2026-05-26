import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import './Admin.css'

function StatSkel() {
  return <div className="skeleton skel-card" style={{ height: 90, borderRadius: 'var(--radius)' }} />
}

function RowSkel() {
  return (
    <div className="admin-row admin-skel">
      {[30, 20, 20, 15, 10, 10].map((w, i) => (
        <div key={i} className="skeleton skel-text" style={{ width: `${w}%` }} />
      ))}
    </div>
  )
}

const STATUS_OPTIONS = ['new', 'contacted', 'in_progress', 'completed', 'rejected']

export default function Admin() {
  const { user } = useAuth()
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [toast, setToast] = useState(null)
  const [updating, setUpdating] = useState(false)

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  useEffect(() => {
    loadSubs()
  }, [])

  async function loadSubs() {
    setLoading(true)
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    setSubs(data || [])
    setLoading(false)
  }

  async function updateStatus(id, status) {
    setUpdating(true)
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id)
    if (!error) {
      setSubs(s => s.map(r => r.id === id ? { ...r, status } : r))
      if (selected?.id === id) setSelected(s => ({ ...s, status }))
      showToast('Status updated!')
    } else showToast('Update failed', 'error')
    setUpdating(false)
  }

  async function deleteSub(id) {
    if (!confirm('Delete this submission?')) return
    await supabase.from('contact_submissions').delete().eq('id', id)
    setSubs(s => s.filter(r => r.id !== id))
    setSelected(null)
    showToast('Deleted.')
  }

  const filtered = subs.filter(s => {
    const matchFilter = filter === 'all' || s.status === filter
    const matchSearch = !search || s.name?.toLowerCase().includes(search.toLowerCase()) || s.email?.toLowerCase().includes(search.toLowerCase()) || s.service?.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const stats = {
    total: subs.length,
    new: subs.filter(s => s.status === 'new').length,
    contacted: subs.filter(s => s.status === 'contacted').length,
    completed: subs.filter(s => s.status === 'completed').length,
  }

  return (
    <main className="page-wrapper admin-page">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      {/* Header */}
      <div className="admin-header">
        <div className="container">
          <div className="admin-header__inner">
            <div>
              <span className="tag">Admin Panel</span>
              <h1 className="h3" style={{ marginTop: 8 }}>Mabood WebStudios</h1>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>Logged in as {user?.email}</p>
            </div>
            <button className="btn btn-outline btn-sm" onClick={loadSubs}>↻ Refresh</button>
          </div>
        </div>
      </div>

      <div className="container admin-body">
        {/* Stats */}
        <div className="admin-stats">
          {loading ? [1,2,3,4].map(i => <StatSkel key={i} />) : (
            <>
              {[
                { label: 'Total', val: stats.total, color: 'var(--accent)' },
                { label: 'New', val: stats.new, color: '#e67e22' },
                { label: 'Contacted', val: stats.contacted, color: '#2980b9' },
                { label: 'Completed', val: stats.completed, color: '#27ae60' },
              ].map(s => (
                <div key={s.label} className="card admin-stat">
                  <span className="admin-stat__num" style={{ color: s.color }}>{s.val}</span>
                  <span className="admin-stat__label">{s.label}</span>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Filters */}
        <div className="admin-filters card">
          <input
            className="form-control admin-search"
            placeholder="🔍 Search by name, email, or service..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="admin-filter-tabs">
            {['all', 'new', 'contacted', 'in_progress', 'completed', 'rejected'].map(f => (
              <button
                key={f}
                className={`admin-filter-tab${filter === f ? ' active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f === 'all' ? `All (${subs.length})` : `${f} (${subs.filter(s => s.status === f).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Table + Detail */}
        <div className={`admin-main${selected ? ' has-detail' : ''}`}>
          {/* Table */}
          <div className="card admin-table-wrap">
            <div className="admin-table-head">
              <span>Name / Email</span>
              <span>Service</span>
              <span>Budget</span>
              <span>Date</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            <div className="admin-table-body">
              {loading ? [1,2,3,4,5].map(i => <RowSkel key={i} />) : filtered.length === 0 ? (
                <div className="admin-empty">No submissions found.</div>
              ) : filtered.map(s => (
                <div key={s.id} className={`admin-row${selected?.id === s.id ? ' selected' : ''}`} onClick={() => setSelected(s)}>
                  <div className="admin-row__name">
                    <strong>{s.name}</strong>
                    <span>{s.email}</span>
                  </div>
                  <span className="admin-row__service">{s.service || '—'}</span>
                  <span>{s.budget || '—'}</span>
                  <span>{new Date(s.created_at).toLocaleDateString('en-IN')}</span>
                  <span><span className={`badge badge-${s.status}`}>{s.status}</span></span>
                  <div className="admin-row__actions" onClick={e => e.stopPropagation()}>
                    <select
                      className="admin-select"
                      value={s.status}
                      onChange={e => updateStatus(s.id, e.target.value)}
                      disabled={updating}
                    >
                      {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                    <button className="admin-del" onClick={() => deleteSub(s.id)} title="Delete">🗑</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          {selected && (
            <div className="card admin-detail">
              <div className="admin-detail__header">
                <h3 className="h3">Submission Detail</h3>
                <button className="admin-detail__close" onClick={() => setSelected(null)}>✕</button>
              </div>
              <div className="admin-detail__body">
                {[
                  ['Name', selected.name],
                  ['Email', selected.email],
                  ['Phone', selected.phone || '—'],
                  ['Service', selected.service || '—'],
                  ['Budget', selected.budget || '—'],
                  ['Submitted', new Date(selected.created_at).toLocaleString('en-IN')],
                ].map(([k, v]) => (
                  <div key={k} className="admin-detail__row">
                    <span className="admin-detail__key">{k}</span>
                    <span className="admin-detail__val">{v}</span>
                  </div>
                ))}
                <div className="admin-detail__row admin-detail__msg">
                  <span className="admin-detail__key">Message</span>
                  <p className="admin-detail__val">{selected.message}</p>
                </div>
                <div className="admin-detail__row">
                  <span className="admin-detail__key">Status</span>
                  <select
                    className="form-control"
                    style={{ maxWidth: 160 }}
                    value={selected.status}
                    onChange={e => updateStatus(selected.id, e.target.value)}
                    disabled={updating}
                  >
                    {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="admin-detail__actions">
                  <a href={`mailto:${selected.email}?subject=Re: Your quote request for ${selected.service}`} className="btn btn-primary btn-sm">📧 Reply via Email</a>
                  <button className="btn btn-outline btn-sm" style={{ color: '#d63031', borderColor: '#d63031' }} onClick={() => deleteSub(selected.id)}>🗑 Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
