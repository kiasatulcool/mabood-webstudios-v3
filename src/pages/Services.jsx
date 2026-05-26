import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Services.css'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }), { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const SERVICES = [
  { icon: '🎯', title: 'Landing Pages', price: '₹2,999', time: '3–5 days', features: ['Single page design','Lead capture form','Mobile responsive','Fast loading','Basic SEO setup','1 revision round'] },
  { icon: '🌐', title: 'Business Websites', price: '₹5,999', time: '7–10 days', features: ['5–8 pages','Contact form + Supabase','Mobile responsive','SEO optimized','Google Maps integration','2 revision rounds'], popular: true },
  { icon: '🛒', title: 'E-Commerce Stores', price: '₹8,999', time: '10–14 days', features: ['Full product catalog','Cart & checkout','Payment gateway','Order management','Admin dashboard','3 revision rounds'] },
  { icon: '📁', title: 'Portfolio Sites', price: '₹3,999', time: '4–6 days', features: ['Clean modern design','Project showcase','About & skills section','Contact integration','Social links','2 revision rounds'] },
  { icon: '⚙️', title: 'Web Apps', price: 'Custom', time: 'Custom', features: ['Custom functionality','Database integration','User auth system','API integrations','Scalable architecture','Ongoing support'] },
  { icon: '🔧', title: 'Maintenance Plan', price: '₹499/mo', time: 'Monthly', features: ['Uptime monitoring','Bug fixes','Content updates','Security updates','Performance checks','Monthly report'] },
]

const PROCESS = [
  { n: '01', title: 'Discovery Call', desc: 'We discuss your goals, requirements, and budget. Free consultation via WhatsApp or email.' },
  { n: '02', title: 'Quote & Agreement', desc: 'You receive a detailed quote within 24 hours. We agree on scope, timeline, and price.' },
  { n: '03', title: 'Design & Build', desc: 'We build your site with regular progress updates. You see the work before final delivery.' },
  { n: '04', title: 'Launch & Support', desc: 'Site goes live on your domain. We provide 7 days of post-launch support included free.' },
]

export default function Services() {
  useReveal()
  return (
    <main className="page-wrapper">
      <section className="section serv-hero">
        <div className="container">
          <span className="tag reveal">Our Services</span>
          <h1 className="h1 reveal" style={{ marginTop: 16 }}>
            What We <span className="serif teal">Build For You</span>
          </h1>
          <p className="reveal" style={{ color: 'var(--text-2)', fontSize: 17, marginTop: 12, maxWidth: 560 }}>
            From simple landing pages to full web apps — everything built with clean code, delivered fast, and priced fairly.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="serv-grid">
            {SERVICES.map(s => (
              <div key={s.title} className={`card serv-card reveal${s.popular ? ' serv-card--popular' : ''}`}>
                {s.popular && <div className="serv-card__badge">Most Popular</div>}
                <span className="serv-card__icon">{s.icon}</span>
                <h3 className="h3">{s.title}</h3>
                <div className="serv-card__price">{s.price}</div>
                <div className="serv-card__time">⏱ {s.time}</div>
                <ul className="serv-card__features">
                  {s.features.map(f => <li key={f}><span>✓</span>{f}</li>)}
                </ul>
                <Link to="/contact" className={`btn ${s.popular ? 'btn-primary' : 'btn-outline'}`} style={{ justifyContent: 'center', marginTop: 'auto' }}>
                  Get a Quote →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="tag">How It Works</span>
            <h2 className="h2" style={{ marginTop: 16 }}>Our 4-Step Process</h2>
          </div>
          <div className="serv-process">
            {PROCESS.map((p, i) => (
              <div key={p.n} className="serv-process__item reveal">
                <div className="serv-process__num">{p.n}</div>
                {i < PROCESS.length - 1 && <div className="serv-process__line" />}
                <h3 className="h3" style={{ marginTop: 16 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 8 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
