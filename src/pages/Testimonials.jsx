import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Testimonials.css'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }), { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const TESTIMONIALS = [
  { name: 'Rahul Sharma', role: 'Owner, FitForge Gym', rating: 5, text: 'Kiasatul delivered our gym website in just 5 days. Clean design, fast loading, and exactly what we asked for. The pricing was very reasonable.' },
  { name: 'Priya Mehta', role: 'Manager, LuxeEats', rating: 5, text: 'Our restaurant bookings went up after the new site launched. Very professional work for the price. Would definitely recommend to other small businesses.' },
  { name: 'Arjun Das', role: 'Partner, ClarityLaw', rating: 5, text: 'We needed a professional legal website quickly. Mabood WebStudios delivered in a week with all features working perfectly. Great communication throughout.' },
  { name: 'Sneha Roy', role: 'Owner, ZephyrStays', rating: 5, text: 'The hotel website looks premium. Guests comment on how nice it looks. The WhatsApp booking integration was a great addition we didn\'t even ask for.' },
  { name: 'Mohammed Ali', role: 'Director, PulseClinic', rating: 5, text: 'Affordable, fast, and professional. Exactly what a growing clinic needs. The appointment booking form works flawlessly.' },
  { name: 'Tanisha Gupta', role: 'Freelance Designer', rating: 5, text: 'Referred multiple clients here. They always come back satisfied. Best value web development in Kolkata without question.' },
]

export default function Testimonials() {
  useReveal()
  return (
    <main className="page-wrapper">
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="tag">Testimonials</span>
            <h1 className="h1 reveal" style={{ marginTop: 16 }}>What Our <span className="serif teal">Clients Say</span></h1>
            <p className="reveal" style={{ color: 'var(--text-2)', marginTop: 12, fontSize: 17 }}>Real feedback from real businesses we've helped grow.</p>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card testi-card reveal">
                <div className="testi-stars">{'★'.repeat(t.rating)}</div>
                <p className="testi-text">"{t.text}"</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.name[0]}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--bg-2)', textAlign: 'center' }}>
        <div className="container">
          <span className="tag reveal">Join Them</span>
          <h2 className="h2 reveal" style={{ marginTop: 16 }}>Ready to Get Your Website?</h2>
          <p className="reveal" style={{ color: 'var(--text-2)', marginTop: 10 }}>Free consultation. No commitment required.</p>
          <Link to="/contact" className="btn btn-primary btn-lg reveal" style={{ marginTop: 24 }}>Get a Free Quote →</Link>
        </div>
      </section>
    </main>
  )
}
