import React, { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import FTCSCOUT from '../assets/26025-FTC-Scout.png'

// NOTE: In your snippet, "Gallery1" points to "gallery 2.jpg" and is used as the HERO background.
// We'll keep that mapping as-is.
import Gallery1 from '../assets/Gallery-2.jpg' // HERO background
import Gallery2 from '../assets/Gallery-1.jpg'
import Gallery3 from '../assets/Gallery-3.jpg'
import Gallery4 from '../assets/Gallery-4.jpg'
import Gallery5 from '../assets/Gallery-5.jpg'

import Sponsor1 from '../assets/ProtocaseSponsor.png'
import Sponsor2 from '../assets/RenRobotsSponsor.jpg'
import Sponsor3 from '../assets/CorticSponsor.png'

const Home = () => {
  // --- Data ---
  const sponsors = [
    { src: Sponsor1, alt: 'Protocase' },
    { src: Sponsor2, alt: 'Ren Robots' },
    { src: Sponsor3, alt: 'Cortic' },
  ]

  // Gallery 1 (gallery 2.jpg) is hero; gallery uses the other images
  const galleryBase = [
    { src: Gallery2, alt: 'Furious Frogs 1' },
    { src: Gallery3, alt: 'Furious Frogs 3' },
    { src: Gallery4, alt: 'Furious Frogs 4' },
    { src: Gallery5, alt: 'Furious Frogs 5' },
  ]

  // --- Refs ---
  const heroRef = useRef(null)
  const heroBgRef = useRef(null)
  const galleryViewportRef = useRef(null)

  // --- Parallax for HERO background ---
  useEffect(() => {
    const section = heroRef.current
    const bg = heroBgRef.current
    if (!section || !bg) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let rafId
    const onScroll = () => {
      if (prefersReduced) return
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        // Move the bg ~60% as fast as scroll (subtle parallax)
        const offsetY = rect.top * -0.6
        bg.style.transform = `translate3d(0, ${offsetY}px, 0) scale(1.2)`
      })
    }

    // Prime once + listen
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafId)
      if (bg) bg.style.transform = ''
    }
  }, [])

  // --- Button handlers (nudge gallery manually) ---
  const scrollGallery = (dir) => {
    const node = galleryViewportRef.current
    if (!node) return
    const amount = Math.min(600, node.clientWidth) * 0.9
    node.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <div className="bg-[#0b1406] text-white">
      {/* HERO with parallax background */}
      <section
        id="home"
        ref={heroRef}
        className="
          relative isolate
          min-h-[420px]
          h-[72vh] md:h-[85vh]
          [@supports(height:100svh)]:h-[72svh] [@supports(height:100svh)]:md:h-[85svh]
          overflow-hidden
        "
      >
        {/* Background image fills the section; crop from the top; parallax via transform */}
        <img
          ref={heroBgRef}
          src={Gallery1}
          alt="Team in action"
          className="absolute inset-0 h-full w-full object-cover object-top"
          style={{ willChange: 'transform', transform: 'translate3d(0,0,0)', transformOrigin: 'center top' }}
        />
        {/* Readability overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b1406] to-transparent" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20 lg:py-24 mt-20">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center rounded-full bg-lime-900/60 px-3 py-1 text-xs font-semibold text-lime-100 ring-1 ring-lime-700/60">
              Team 26025 • Furious Frogs
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-6xl">
              Welcome to FTC 26025 <span className="text-lime-200">Furious Frogs</span>
            </h1>
            <p className="mt-4 text-white/85 md:text-lg">
              We build, code, and compete with passion. Dive into our robot, explore our code, and
              check what we did last season.
            </p>
          </div>
        </div>
      </section>


      {/* WHO ARE WE + CLICKABLE FTC SCOUT IMAGE */}
<section id="scout" className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
  <div className="grid items-center gap-10 md:grid-cols-2">
    {/* Left: Who are we */}
    <div className="rounded-3xl bg-[#0f1d08] p-6 ring-1 ring-lime-900/60">
      <h2 className="text-3xl font-bold text-lime-200">Who are we</h2>
      <p className="mt-2 text-white/80 text-lg">
        The Furious Frogs is a vibrant and innovative robotics team based in
        Coquitlam, British Columbia. Founded in 2024, we bring together a unique blend of
        creativity, technical skills, and problem-solving passion. Rooted in teamwork and
        a commitment to growth, we strive to inspire our community and leave a lasting
        impact as we represent Coquitlam on both local and global stages.
      </p>
    </div>

    {/* Right: Clickable image → FTC Scout */}
    <a
      href="https://ftcscout.org/teams/26025"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open FTC Scout for Team 26025"
      className="relative block overflow-hidden rounded-3xl ring-1 ring-lime-900/60 bg-white group focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
    >
      <img
        src={FTCSCOUT}
        alt="FTC Scout preview for team 26025"
        className="block h-auto w-full max-h-[420px] object-contain transition-transform duration-300 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/5 transition-colors group-hover:bg-black/10" />
      <span className="sr-only">Open FTC Scout for Team 26025</span>
    </a>
  </div>
</section>







      {/* GALLERY (manual; scroll-snap) */}
      <section id="gallery" className="mx-auto max-w-7xl px-4 pb-16 md:px-6">

        <div className="flex items-center gap-2">
          {/* Left */}
          <button
            onClick={() => scrollGallery(-1)}
            className="shrink-0 rounded-full bg-lime-500 p-2 text-[#0b1406] shadow transition hover:bg-lime-400"
            aria-label="Scroll gallery left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Viewport */}
          <div
            ref={galleryViewportRef}
            className="w-full overflow-x-auto rounded-2xl border border-lime-900/60 bg-[#0f1d08] p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
          >
            <div className="inline-flex w-max items-center gap-4">
              {galleryBase.map((img, i) => (
                <figure key={i} className="shrink-0 w-[80vw] sm:w-[55vw] md:w-[40vw] snap-start">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-56 w-full rounded-xl object-cover shadow md:h-72"
                  />
                </figure>
              ))}
            </div>
          </div>

          {/* Right */}
          <button
            onClick={() => scrollGallery(1)}
            className="shrink-0 rounded-full bg-lime-500 p-2 text-[#0b1406] shadow transition hover:bg-lime-400"
            aria-label="Scroll gallery right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      <section id="sponsors" className="mx-auto max-w-7xl px-4 md:px-6 pb-8">
  <h2 className="text-lg font-bold text-lime-200">Our Sponsors</h2>

  {/* Autoscroll container */}
  <div className="group relative mt-3 overflow-hidden rounded-2xl border border-lime-900/60 bg-[#0f1d08] p-4">
    {/* Track with 3 copies */}
    <div
      className="
        flex w-max min-w-full items-center gap-6
        animate-[marquee3_var(--speed)_linear_infinite]
        motion-reduce:animate-none
        [will-change:transform]
        [--speed:20s]
      "
    >
      {[0, 1, 2].map((copy) =>
        sponsors.map((s, idx) => (
          <div
            key={`${copy}-${idx}`}
            className="flex h-20 w-[200px] shrink-0 items-center justify-center rounded-xl bg-white p-3 shadow"
          >
            <img
              src={s.src}
              alt={copy === 0 ? s.alt : ""}
              aria-hidden={copy !== 0}
              className="max-h-full object-contain"
            />
          </div>
        ))
      )}
    </div>
  </div>

  {/* Keyframes: 3-copy seamless loop (shift exactly one sequence) */}
  <style>{`
    @keyframes marquee3 {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-33.333333%); }
    }
  `}</style>
</section>
    </div>
  )
}

export default Home
