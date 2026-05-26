import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

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

function CountUp({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / 60
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target])
  return <>{count}{suffix}</>
}

const SERVICES = [
  { icon: '🎯', title: 'Landing Pages', desc: 'High-converting pages designed to capture leads and drive action.' },
  { icon: '🌐', title: 'Business Websites', desc: 'Professional, responsive websites that establish credibility.' },
  { icon: '🛒', title: 'E-Commerce Stores', desc: 'Full-featured stores with secure payments and seamless shopping.' },
  { icon: '📁', title: 'Portfolio Sites', desc: 'Beautiful, fast portfolios that showcase your work perfectly.' },
  { icon: '⚙️', title: 'Web Apps', desc: 'Custom web applications built for your specific business needs.' },
  { icon: '🔧', title: 'Maintenance', desc: 'Monthly maintenance plans to keep your site fast and secure.' },
]

const PORTFOLIO = [
  { name: 'LuxeEats', category: 'Restaurant', url: 'https://luxe-eats.vercel.app/', desc: 'Premium restaurant website with online menu.' },
  { name: 'FitForge', category: 'Fitness', url: 'https://fit-forge-amber.vercel.app/', desc: 'Gym & personal training landing page.' },
  { name: 'ZephyrStays', category: 'Hotel', url: 'https://zephyr-stays.vercel.app/', desc: 'Boutique hotel with booking integration.' },
  { name: 'ClarityLaw', category: 'Legal', url: 'https://clarity-law-ochre.vercel.app/', desc: 'Law firm website with appointment booking.' },
]

const STATS = [
  { label: 'Projects Delivered', value: 10, suffix: '+' },
  { label: 'Happy Clients', value: 8, suffix: '+' },
  { label: 'Day Delivery', value: 10, suffix: '' },
  { label: 'Starting Price (₹)', value: 2999, suffix: '' },
]

export default function Home() {
  useReveal()
  return (
    <main className="page-wrapper">
      {/* HERO */}
      <section className="home-hero">
        <div className="container">
          <div className="home-hero__content">
            <span className="tag home-hero__tag reveal">Web Development Agency — Kolkata</span>
            <h1 className="h1 home-hero__title reveal">
              We Build Websites<br />
              That <span className="serif teal">Work For Your Business</span>
            </h1>
            <p className="home-hero__sub reveal">
              Professional web development for small businesses across India.<br />
              Fast, affordable, and built to convert.
            </p>
            <div className="home-hero__cta reveal">
              <Link to="/portfolio" className="btn btn-primary btn-lg">View Our Work</Link>
              <Link to="/contact" className="btn btn-outline btn-lg">Get a Free Quote</Link>
            </div>
            <p className="home-hero__note reveal">Starting at ₹2,999 · 3–10 day delivery · Free consultation</p>
          </div>
          <div className="home-hero__visual reveal">
            <div className="home-hero__card card">
              <div className="home-hero__card-header">
                <span className="home-hero__dot red"/><span className="home-hero__dot yellow"/><span className="home-hero__dot green"/>
                <span style={{marginLeft:8, fontSize:11, color:'var(--text-muted)', fontFamily:'monospace'}}>mabood-webstudios.vercel.app</span>
              </div>
              <div className="home-hero__card-body">
                <div className="home-hero__mock-nav skeleton" style={{height:24,marginBottom:16}}/>
                <div className="home-hero__mock-h skeleton" style={{height:40,marginBottom:12}}/>
                <div className="home-hero__mock-h skeleton" style={{height:40,width:'70%',marginBottom:20}}/>
                <div className="home-hero__mock-p skeleton" style={{height:14,marginBottom:8}}/>
                <div className="home-hero__mock-p skeleton" style={{height:14,width:'80%',marginBottom:20}}/>
                <div style={{display:'flex',gap:8}}>
                  <div className="skeleton" style={{height:36,flex:1,borderRadius:100}}/>
                  <div className="skeleton" style={{height:36,flex:1,borderRadius:100}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="home-stats section-sm">
        <div className="container">
          <div className="home-stats__grid">
            {STATS.map(s => (
              <div key={s.label} className="home-stats__item reveal">
                <span className="home-stats__num"><CountUp target={s.value} suffix={s.suffix} /></span>
                <span className="home-stats__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SERVICES */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="tag">Our Services</span>
            <h2 className="h2" style={{marginTop:16}}>Everything You Need to<br /><span className="teal">Establish a Powerful Presence</span></h2>
          </div>
          <div className="home-services__grid">
            {SERVICES.map(s => (
              <div key={s.title} className="card home-services__card reveal">
                <span className="home-services__icon">{s.icon}</span>
                <h3 className="h3">{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:40}}>
            <Link to="/services" className="btn btn-outline reveal">View All Services →</Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="home-why section">
        <div className="container">
          <div className="home-why__inner">
            <div className="home-why__left reveal">
              <span className="tag">Why Choose Us</span>
              <h2 className="h2" style={{marginTop:16}}>We Deliver Excellence<br />in Every Project</h2>
              <p style={{color:'var(--text-2)', marginTop:16, lineHeight:1.8}}>
                We're not just developers — we're your growth partners. Every website we build is optimized for speed, mobile, and conversions.
              </p>
              <Link to="/contact" className="btn btn-primary" style={{marginTop:24}}>Start Your Project</Link>
            </div>
            <div className="home-why__right">
              {[
                ['✓','Fast Delivery','Your project delivered on time, every time. 3–10 day turnaround.'],
                ['✓','Mobile Responsive','Perfect on all devices — phones, tablets, and desktops.'],
                ['✓','Affordable Pricing','Starting at ₹2,999. No hidden fees, no surprises.'],
                ['✓','Clean Code','Well-structured, maintainable code built to scale.'],
              ].map(([icon, title, desc]) => (
                <div key={title} className="home-why__item reveal">
                  <span className="home-why__check">{icon}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="tag">Our Work</span>
            <h2 className="h2" style={{marginTop:16}}>Recent Projects</h2>
          </div>
          <div className="home-portfolio__grid">
            {PORTFOLIO.map(p => (
              <div key={p.name} className="card home-portfolio__card reveal">
                <div className="home-portfolio__thumb">
                  <span className="home-portfolio__initial">{p.name[0]}</span>
                </div>
                <div className="home-portfolio__info">
                  <span className="badge badge-completed">{p.category}</span>
                  <h3 className="h3" style={{marginTop:8}}>{p.name}</h3>
                  <p>{p.desc}</p>
                  <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm" style={{marginTop:12}}>Live Site →</a>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:36}}>
            <Link to="/portfolio" className="btn btn-primary reveal">See All Projects →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta section">
        <div className="container">
          <div className="home-cta__inner reveal">
            <span className="tag">Ready to Start?</span>
            <h2 className="h2" style={{marginTop:16, color:'var(--bg)'}}>Let's Build Your<br /><span className="serif">Dream Website</span></h2>
            <p>Get a free consultation and quote. No commitment required.</p>
            <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',marginTop:24}}>
              <Link to="/contact" className="btn btn-lg" style={{background:'var(--bg)',color:'var(--accent)'}}>Get a Free Quote</Link>
              <Link to="/pricing" className="btn btn-lg btn-outline" style={{color:'var(--bg)',borderColor:'rgba(255,255,255,0.4)'}}>See Pricing</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
