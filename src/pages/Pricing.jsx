import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Pricing.css'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target) } }), { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

const PLANS = [
  {
    name: 'Starter', price: '₹2,999', period: 'one-time',
    desc: 'Perfect for solo businesses and first-time website owners.',
    features: ['1 page landing site','Contact form','Mobile responsive','Basic SEO','Vercel hosting setup','3-5 day delivery','7 days support'],
    cta: 'Get Started',
  },
  {
    name: 'Business', price: '₹5,999', period: 'one-time',
    desc: 'Ideal for growing businesses that need a complete online presence.',
    features: ['Up to 8 pages','Supabase contact form','Admin dashboard','Full SEO setup','Google Maps embed','Custom domain setup','7-10 day delivery','30 days support'],
    cta: 'Most Popular', popular: true,
  },
  {
    name: 'Premium', price: '₹9,999', period: 'one-time',
    desc: 'For businesses that need e-commerce or custom web app features.',
    features: ['Unlimited pages','E-commerce / web app','Payment integration','User auth system','Advanced analytics','Priority delivery','60 days support'],
    cta: 'Go Premium',
  },
]

const FAQS = [
  ['What is included in the price?', 'Design, development, deployment on Vercel, and post-launch support. Domain registration is separate (usually ₹800–₹1,200/year).'],
  ['How do I pay?', '50% advance before work starts, 50% on delivery. Payment via UPI (kiasatulmabood@oksbi) or bank transfer.'],
  ['Can I upgrade my plan later?', 'Yes. You can upgrade at any time by paying the difference. We\'ll migrate your existing site.'],
  ['Do you offer refunds?', 'If we fail to deliver within the agreed timeline, we offer a full refund. Partial refunds available if work has started.'],
  ['What if I need changes after delivery?', 'Minor changes are free within the support period. After that, we offer a monthly maintenance plan at ₹499/month.'],
  ['How do I get started?', 'Fill out the contact form, WhatsApp us, or email directly. We\'ll reply within 24 hours with a quote.'],
]

export default function Pricing() {
  useReveal()
  return (
    <main className="page-wrapper">
      <section className="section">
        <div className="container">
          <div className="section-header reveal">
            <span className="tag">Pricing</span>
            <h1 className="h1 reveal" style={{ marginTop: 16 }}>Simple, <span className="serif teal">Transparent Pricing</span></h1>
            <p className="reveal" style={{ color: 'var(--text-2)', marginTop: 12, fontSize: 17 }}>No hidden fees. No inflated quotes. Pay what you see.</p>
          </div>
          <div className="pricing-grid">
            {PLANS.map(p => (
              <div key={p.name} className={`card pricing-card reveal${p.popular ? ' pricing-card--popular' : ''}`}>
                {p.popular && <div className="pricing-badge">Most Popular</div>}
                <h3 className="h3">{p.name}</h3>
                <p className="pricing-desc">{p.desc}</p>
                <div className="pricing-price">{p.price}</div>
                <div className="pricing-period">{p.period}</div>
                <ul className="pricing-features">
                  {p.features.map(f => <li key={f}><span>✓</span>{f}</li>)}
                </ul>
                <Link to="/contact" className={`btn ${p.popular ? 'btn-primary' : 'btn-outline'}`} style={{ justifyContent: 'center', marginTop: 'auto' }}>
                  {p.cta} →
                </Link>
              </div>
            ))}
          </div>

          {/* Maintenance */}
          <div className="card pricing-maintain reveal">
            <div>
              <h3 className="h3">Monthly Maintenance Plan</h3>
              <p style={{ color: 'var(--text-2)', marginTop: 6, fontSize: 14 }}>Keep your site fast, secure, and up-to-date. Includes bug fixes, content updates, and monthly reports.</p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div className="pricing-price" style={{ fontSize: '1.8rem' }}>₹499<span style={{ fontSize: '1rem', fontWeight: 500 }}>/mo</span></div>
              <Link to="/contact" className="btn btn-outline btn-sm" style={{ marginTop: 8 }}>Add to Plan</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section" style={{ background: 'var(--bg-2)' }}>
        <div className="container">
          <div className="section-header reveal">
            <span className="tag">FAQs</span>
            <h2 className="h2" style={{ marginTop: 16 }}>Frequently Asked Questions</h2>
          </div>
          <div className="pricing-faqs">
            {FAQS.map(([q, a]) => (
              <div key={q} className="card pricing-faq reveal">
                <h3 className="h3" style={{ fontSize: '1rem' }}>{q}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 8, lineHeight: 1.7 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
