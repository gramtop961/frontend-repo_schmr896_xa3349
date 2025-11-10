import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Star, Shield, Truck, ArrowRight, Menu, ChevronDown } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

const conditions = ["Like New", "Good", "Fair", "Broken"]

const brandImages = {
  Apple: 'https://images.unsplash.com/photo-1677050319876-1a6d61dc0f7b?q=80&w=1600&auto=format&fit=crop',
  Samsung: 'https://images.unsplash.com/photo-1610945265561-a34f84a20a9a?q=80&w=1600&auto=format&fit=crop',
  Google: 'https://images.unsplash.com/photo-1609250291996-fdebe6020a3a?q=80&w=1600&auto=format&fit=crop',
}
const genericImage = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1600&auto=format&fit=crop'

function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-white/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-3">
            <img src="https://cdn.eightlabs.ca/cdn/pasted-1762808024926.png" alt="The Fone Buyers" className="h-8 w-auto" />
            <span className="sr-only">The Fone Buyers</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-600">
            <a href="#how" className="hover:text-black transition">How it works</a>
            <a href="#devices" className="hover:text-black transition">Sell your phone</a>
            <a href="#faq" className="hover:text-black transition">FAQ</a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="#quote" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-neutral-800 transition">
              Get Offer <ArrowRight size={16} />
            </a>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden inline-flex items-center p-2 rounded-md border border-neutral-200">
            <Menu />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="px-4 py-3 grid gap-3 text-sm">
            <a href="#how" className="hover:text-black">How it works</a>
            <a href="#devices" className="hover:text-black">Sell your phone</a>
            <a href="#faq" className="hover:text-black">FAQ</a>
            <a href="#quote" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black text-white">Get Offer</a>
          </div>
        </div>
      )}
    </header>
  )
}

function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.08),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600 mb-5">
              <Star size={14} /> Highest payouts. Zero hassle.
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-black">
              Sell your phone in minutes.
              <span className="block text-neutral-500">Fast quotes. Free pickup. Paid today.</span>
            </h1>
            <p className="mt-6 text-neutral-600 max-w-lg">
              The Fone Buyers makes it effortless to turn devices into cash. Transparent pricing, instant offers and same‑day collection in most areas.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button onClick={onStart} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white hover:bg-neutral-800">
                Get your offer <ArrowRight size={16} />
              </button>
              <a href="#how" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-neutral-300 hover:border-neutral-800">
                How it works
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-neutral-600">
              <div className="flex items-center gap-2"><Shield className="text-black" size={16}/>Best price guaranteed</div>
              <div className="flex items-center gap-2"><Truck className="text-black" size={16}/>Free pickup</div>
            </div>
          </div>
          <div className="relative">
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="relative rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 space-y-4">
                  <div className="aspect-[4/5] overflow-hidden rounded-xl bg-neutral-900">
                    <img src={brandImages.Apple} alt="iPhone" className="h-full w-full object-cover" />
                  </div>
                  <div className="aspect-[4/5] overflow-hidden rounded-xl bg-neutral-900">
                    <img src={brandImages.Google} alt="Pixel" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="col-span-1 flex items-center">
                  <div className="w-full aspect-[9/16] overflow-hidden rounded-xl bg-neutral-900">
                    <img src={brandImages.Samsung} alt="Galaxy" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-neutral-900/5 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

function DeviceSelect({ devices, onQuote }) {
  const brands = useMemo(() => Array.from(new Set(devices.map(d => d.brand))), [devices])
  const [brand, setBrand] = useState(brands[0] || '')
  const models = useMemo(() => devices.filter(d => d.brand === brand).map(d => d.model), [devices, brand])
  const [model, setModel] = useState(models[0] || '')
  const current = useMemo(() => devices.find(d => d.brand === brand && d.model === model), [devices, brand, model])
  const [storage, setStorage] = useState(current?.storages?.[0] || 128)
  const [condition, setCondition] = useState(conditions[0])

  useEffect(() => {
    setBrand(brands[0] || '')
  }, [brands.join('|')])

  useEffect(() => {
    setModel(models[0] || '')
  }, [models.join('|')])

  useEffect(() => {
    if (current) setStorage(current.storages[0])
  }, [current?.model])

  return (
    <section id="quote" className="py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-200 p-6 bg-white/80 backdrop-blur">
          <h2 className="text-2xl font-semibold mb-4">Get your instant offer</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm text-neutral-600">Brand</label>
              <div className="relative mt-1">
                <select value={brand} onChange={e=>setBrand(e.target.value)} className="w-full appearance-none rounded-lg border border-neutral-300 px-3 py-2 pr-8 focus:outline-none">
                  {brands.map(b=> <option key={b} value={b}>{b}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
              </div>
            </div>
            <div>
              <label className="text-sm text-neutral-600">Model</label>
              <div className="relative mt-1">
                <select value={model} onChange={e=>setModel(e.target.value)} className="w-full appearance-none rounded-lg border border-neutral-300 px-3 py-2 pr-8 focus:outline-none">
                  {models.map(m=> <option key={m} value={m}>{m}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500" size={16} />
              </div>
            </div>
            <div>
              <label className="text-sm text-neutral-600">Storage</label>
              <div className="flex gap-2 mt-1 flex-wrap">
                {current?.storages?.map(s => (
                  <button key={s} onClick={()=>setStorage(s)} className={`px-3 py-2 rounded-lg border text-sm ${storage===s? 'bg-black text-white border-black':'border-neutral-300 text-neutral-700 hover:border-neutral-600'}`}>
                    {s} GB
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-neutral-600">Condition</label>
              <div className="flex gap-2 mt-1 flex-wrap">
                {conditions.map(c => (
                  <button key={c} onClick={()=>setCondition(c)} className={`px-3 py-2 rounded-lg border text-sm ${condition===c? 'bg-black text-white border-black':'border-neutral-300 text-neutral-700 hover:border-neutral-600'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <div className="text-sm text-neutral-600">Select options to see your price.</div>
            <button onClick={()=> onQuote({brand, model, storage, condition})} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white">
              Get Offer <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    {icon: Phone, title: 'Choose your device', desc: 'Pick your brand, model and storage.'},
    {icon: Star, title: 'Get an instant offer', desc: 'Transparent pricing based on condition.'},
    {icon: Truck, title: 'Free pickup', desc: 'We collect from your door at a time that suits.'},
    {icon: Shield, title: 'Paid today', desc: 'Fast payout via e‑transfer or cash on collection.'}
  ]
  return (
    <section id="how" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center mb-12">How it works</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl border border-neutral-200 p-6 bg-white/60 backdrop-blur">
              <s.icon className="text-black" />
              <h3 className="mt-4 font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DevicesGrid({ devices }) {
  return (
    <section id="devices" className="py-20 bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-center mb-12">Popular devices</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((d, i) => {
            const imgSrc = d.image || brandImages[d.brand] || genericImage
            return (
              <div key={i} className="group rounded-2xl border border-neutral-200 overflow-hidden bg-white">
                <div className="relative aspect-[4/3] bg-neutral-100">
                  <img src={imgSrc} alt={`${d.brand} ${d.model}`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
                <div className="p-4">
                  <div className="font-medium">{d.brand} {d.model}</div>
                  <div className="text-sm text-neutral-600">Up to ${d.base_price}+ depending on condition</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
          <div className="flex items-center gap-3">
            <img src="https://cdn.eightlabs.ca/cdn/pasted-1762808024926.png" alt="The Fone Buyers" className="h-6 w-auto" />
            <span>© {new Date().getFullYear()} The Fone Buyers</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-black">Terms</a>
            <a href="#" className="hover:text-black">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const [devices, setDevices] = useState([])
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/devices`)
        const json = await res.json()
        setDevices(json)
      } catch (e) {
        setDevices([])
      } finally {
        setLoading(false)
      }
    }
    fetchDevices()
  }, [])

  const startQuote = () => {
    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleQuote = async (payload) => {
    try {
      const res = await fetch(`${API_BASE}/api/quote`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
      const json = await res.json()
      setQuote(json)
    } catch (e) {
      setQuote(null)
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <Hero onStart={startQuote} />

      {!loading && devices.length > 0 && (
        <>
          <DeviceSelect devices={devices} onQuote={handleQuote} />
          {quote && (
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-8">
              <div className="rounded-2xl border border-neutral-200 p-6 bg-black text-white flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm uppercase tracking-wide text-neutral-400">Your Offer</div>
                  <div className="text-3xl font-semibold mt-1">${quote.offer}</div>
                  <div className="text-sm text-neutral-300 mt-2">{quote.brand} {quote.model} · {quote.storage} GB · {quote.condition}</div>
                </div>
                <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black border border-white self-start sm:self-auto">
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
          <DevicesGrid devices={devices} />
        </>
      )}

      <HowItWorks />

      <section id="faq" className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-center mb-10">FAQ</h2>
          <div className="space-y-4">
            {[{
              q:'How fast do I get paid?', a:'Most customers are paid the same day their device is collected.'
            },{
              q:'Do you erase my data?', a:'Yes. We securely wipe every device upon receipt.'
            },{
              q:'What areas do you cover?', a:'We offer free pickup in most urban areas and fast shipping labels elsewhere.'
            }].map((f, i) => (
              <details key={i} className="group border border-neutral-200 rounded-xl p-4">
                <summary className="flex cursor-pointer items-center justify-between font-medium">
                  {f.q}
                  <span className="ml-4 text-neutral-500 group-open:rotate-180 transition">▾</span>
                </summary>
                <p className="mt-2 text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
