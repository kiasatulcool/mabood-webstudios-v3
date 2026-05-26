import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import './Contact.css'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }),
      { threshold: 0.1 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const INIT = { name: '', email: '', phone: '', service: '', budget: '', message: '' }

async function checkRateLimit(email) {
  const window24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { count } = await supabase
    .from('contact_submissions')
    .select('*', { count: 'exact', head: true })
    .eq('email', email)
    .gte('created_at', window24h)
  return (count || 0) >= 3
}

export default function Contact() {
  useReveal()
  const { user } = useAuth()
  const [form, setForm] = useState(INIT)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    if (user) setForm(f => ({ ...f, name: user.user_metadata?.full_name || '', email: user.email || '' }))
  }, [user])

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: false })) }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = true
    if (!form.email.trim() || !form.email.includes('@')) e.email = true
    if (!form.service) e.service = true
    if (!form.message.trim() || form.message.length < 20) e.message = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setStatus('loading')

    try {
      // Rate limit check
      const limited = await checkRateLimit(form.email)
      if (limited) { setStatus('error'); setErrMsg('Too many submissions. Please wait 24 hours.'); return }

      // Save to Supabase
      const { error: dbErr } = await supabase.from('contact_submissions').insert({
        user_id: user?.id || null,
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        budget: form.budget,
        message: form.message,
        status: 'new',
      })
      if (dbErr) throw dbErr

      // Send via Formspree
      const emailRes = await fetch('https://formspree.io/f/xreyaavq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!emailRes.ok) console.warn('Formspree response:', emailRes.status)

      setStatus('success')
      setForm(INIT)
    } catch (err) {
      setStatus('error')
      setErrMsg('Something went wrong. Please try again.')
    }
  }

  return (
    <main className="page-wrapper">
      <section className="contact-hero">
        <div className="container">
          <span className="tag reveal">Get In Touch</span>
          <h1 className="h1 reveal" style={{ marginTop: 16 }}>
            Let's Build <span className="serif teal">Together</span>
          </h1>
          <p className="reveal" style={{ color: 'var(--text-2)', marginTop: 12, fontSize: 17 }}>
            Tell us about your project. We respond within 24 hours with a personalised quote.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* FORM */}
            <div className="card contact-form reveal">
              {status === 'success' ? (
                <div className="contact-success">
                  <div className="contact-success__icon">✅</div>
                  <h3 className="h3">Message Sent!</h3>
                  <p>We'll reply within 24 hours. Your submission has been saved.</p>
                  <button className="btn btn-outline" style={{ marginTop: 20 }} onClick={() => setStatus('idle')}>Send Another</button>
                </div>
              ) : (
                <>
                  <h2 className="h3">Start Your Project</h2>
                  {status === 'error' && <div className="contact-err">{errMsg}</div>}
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input className={`form-control${errors.name ? ' error' : ''}`} placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Email *</label>
                      <input type="email" className={`form-control${errors.email ? ' error' : ''}`} placeholder="your@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone (optional)</label>
                      <input type="tel" className="form-control" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => set('phone', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>Service *</label>
                      <select className={`form-control${errors.service ? ' error' : ''}`} value={form.service} onChange={e => set('service', e.target.value)}>
                        <option value="">Select a service</option>
                        <option>Landing Page Design</option>
                        <option>Multi-Page Business Website</option>
                        <option>E-Commerce Store</option>
                        <option>Portfolio Website</option>
                        <option>Web App Development</option>
                        <option>Website Maintenance</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Budget Range</label>
                    <select className="form-control" value={form.budget} onChange={e => set('budget', e.target.value)}>
                      <option value="">Select budget range</option>
                      <option>Under ₹3,000</option>
                      <option>₹3,000 – ₹5,000</option>
                      <option>₹5,000 – ₹10,000</option>
                      <option>Above ₹10,000</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tell Us About Your Project *</label>
                    <textarea className={`form-control${errors.message ? ' error' : ''}`} rows={5} placeholder="Describe your project, goals, any specific requirements..." value={form.message} onChange={e => set('message', e.target.value)} />
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={submit} disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending...' : 'Send Message →'}
                  </button>
                  {!user && <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8, textAlign: 'center' }}>
                    <a href="/signup" style={{ color: 'var(--accent)' }}>Sign up</a> to track your quote requests
                  </p>}
                </>
              )}
            </div>

            {/* INFO */}
            <div className="contact-info">
              {[
                { icon: '📧', title: 'Email', val: 'kiasatulmabood@gmail.com', link: 'mailto:kiasatulmabood@gmail.com' },
                { icon: '💬', title: 'WhatsApp', val: 'Chat with us directly', link: 'https://wa.me/91' },
                { icon: '📍', title: 'Location', val: 'Kolkata, West Bengal, India', link: null },
                { icon: '⏱', title: 'Response Time', val: 'Within 24 hours', link: null },
              ].map(i => (
                <div key={i.title} className="card contact-info__item reveal">
                  <span className="contact-info__icon">{i.icon}</span>
                  <div>
                    <strong>{i.title}</strong>
                    {i.link ? <a href={i.link} style={{ color: 'var(--accent)', display: 'block', fontSize: 14, marginTop: 4 }}>{i.val}</a>
                      : <p style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 4 }}>{i.val}</p>}
                  </div>
                </div>
              ))}

              <div className="card contact-upi reveal">
                <h3 className="h3" style={{ marginBottom: 12 }}>Pay via UPI</h3>
                <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 16 }}>Pay your advance directly via UPI after quote approval.</p>
                <div className="contact-upi__id">
                  <code>kiasatulmabood@oksbi</code>
                  <span className="tag">GPay / PhonePe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
