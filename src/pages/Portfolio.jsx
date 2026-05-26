// Portfolio.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Portfolio.css'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }), { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const PROJECTS = [
  { name: 'LuxeEats', cat: 'Restaurant', url: 'https://luxe-eats.vercel.app/', desc: 'Premium restaurant website with online menu, gallery, and reservation form.', tags: ['React','Vite','Vercel'] },
  { name: 'FitForge', cat: 'Fitness', url: 'https://fit-forge-amber.vercel.app/', desc: 'Gym and personal training landing page with class schedule and pricing.', tags: ['React','CSS','Vercel'] },
  { name: 'ZephyrStays', cat: 'Hotel', url: 'https://zephyr-stays.vercel.app/', desc: 'Boutique hotel site with room showcase and booking enquiry form.', tags: ['React','Vite','Vercel'] },
  { name: 'ClarityLaw', cat: 'Legal', url: 'https://clarity-law-ochre.vercel.app/', desc: 'Law firm website with practice areas, team profiles, and appointment booking.', tags: ['React','CSS','Vercel'] },
  { name: 'PulseClinic', cat: 'Healthcare', url: 'https://pulse-clinic-murex.vercel.app/', desc: 'Healthcare clinic website with doctor profiles and online consultation booking.', tags: ['React','Vite','Vercel'] },
  { name: 'Code Vichar', cat: 'Education', url: '#', desc: 'Educational platform for programming concepts and tutorials.', tags: ['HTML','CSS','JS'] },
]

const CATS = ['All', 'Restaurant', 'Fitness', 'Hotel', 'Legal', 'Healthcare', 'Education']

export default function Portfolio() {
  useReveal()
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === active)
  return (
    <main className="page-wrapper">
      <section className="section port-hero">
        <div className="container">
          <span className="tag reveal">Portfolio</span>
          <h1 className="h1 reveal" style={{ marginTop: 16 }}>Our <span className="serif teal">Work Speaks</span></h1>
          <p className="reveal" style={{ color: 'var(--text-2)', marginTop: 12, fontSize: 17, maxWidth: 520 }}>Live projects delivered for real businesses. Click any card to visit the live site.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="port-filters reveal">
            {CATS.map(c => <button key={c} className={`port-filter${active === c ? ' active' : ''}`} onClick={() => setActive(c)}>{c}</button>)}
          </div>
          <div className="port-grid">
            {filtered.map(p => (
              <div key={p.name} className="card port-card reveal">
                <div className="port-card__thumb">
                  <span className="port-card__initial">{p.name[0]}</span>
                  <span className="port-card__cat">{p.cat}</span>
                </div>
                <div className="port-card__body">
                  <h3 className="h3">{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="port-card__tags">
                    {p.tags.map(t => <span key={t} className="port-tag">{t}</span>)}
                  </div>
                  {p.url !== '#' ? (
                    <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{ marginTop: 14 }}>Live Site →</a>
                  ) : (
                    <span className="btn btn-outline btn-sm" style={{ marginTop: 14, cursor: 'default' }}>Coming Soon</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ background: 'var(--bg-2)', textAlign: 'center' }}>
        <div className="container">
          <span className="tag reveal">Want to be next?</span>
          <h2 className="h2 reveal" style={{ marginTop: 16 }}>Let's Add Your Business Here</h2>
          <Link to="/contact" className="btn btn-primary btn-lg reveal" style={{ marginTop: 24 }}>Get a Free Quote →</Link>
        </div>
      </section>
    </main>
  )
}
