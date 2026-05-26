import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './About.css'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }), { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const STACK = ['React','Vite','Supabase','Vercel','Node.js','Tailwind CSS','JavaScript','HTML/CSS']
const VALUES = [
  { icon: '⚡', title: 'Speed First', desc: 'Every site loads under 2 seconds. Performance is non-negotiable.' },
  { icon: '📱', title: 'Mobile-First', desc: 'Built for phones first, then scaled up — matching how India browses.' },
  { icon: '💸', title: 'Honest Pricing', desc: 'No inflated quotes, no hidden fees. You pay what we quote.' },
  { icon: '🤝', title: 'Long-Term Partner', desc: 'We build relationships, not just websites. Monthly support included.' },
]

export default function About() {
  useReveal()
  return (
    <main className="page-wrapper">
      {/* Hero */}
      <section className="section about-hero">
        <div className="container">
          <span className="tag reveal">Our Story</span>
          <h1 className="h1 reveal" style={{ marginTop: 16 }}>
            A Student-Founded Agency<br />
            <span className="serif teal">Built on Real Ambition</span>
          </h1>
          <p className="about-hero__sub reveal">
            Mabood WebStudios was founded in Kolkata with one goal: give small businesses access to the same quality websites as big brands — at prices that actually make sense.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="section about-founder">
        <div className="container">
          <div className="about-founder__grid">
            <div className="about-founder__card card reveal">
              <div className="about-founder__avatar">K</div>
              <div>
                <h2 className="h3">Kiasatul Mabood</h2>
                <p className="about-founder__role">Founder & Lead Developer</p>
                <p className="about-founder__bio">
                  16 years old. Self-taught developer with expertise in React, Supabase, and modern web technologies. Based in Kolkata, WB. Building the future one website at a time.
                </p>
                <div className="about-founder__links">
                  <a href="https://github.com/kiasatulcool" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">GitHub</a>
                  <a href="https://linkedin.com/in/kiasatul-mabood-8146923b7" target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">LinkedIn</a>
                </div>
              </div>
            </div>
            <div className="about-founder__text reveal">
              <span className="tag">The Mission</span>
              <h2 className="h2" style={{ marginTop: 14 }}>Web Development Shouldn't Be a Luxury</h2>
              <p>Small businesses in Kolkata and across India are losing customers every day because they don't have a decent website. Big agencies charge ₹50,000+. Templates look generic. We fill that gap.</p>
              <p style={{ marginTop: 16 }}>Every site we build is custom, fast, and conversion-focused — starting at just ₹2,999.</p>
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: 24 }}>Start Your Project</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="tag">Our Values</span>
            <h2 className="h2" style={{ marginTop: 16 }}>What We Stand For</h2>
          </div>
          <div className="about-values">
            {VALUES.map(v => (
              <div key={v.title} className="card about-value reveal">
                <span className="about-value__icon">{v.icon}</span>
                <h3 className="h3">{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="tag">Tech Stack</span>
            <h2 className="h2" style={{ marginTop: 16 }}>Tools We Use</h2>
          </div>
          <div className="about-stack reveal">
            {STACK.map(s => (
              <div key={s} className="card about-stack__item">{s}</div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
