import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Braces,
  Timer,
  CircuitBoard,
  PlayCircle,
  Gauge,
  Sparkles,
  Cog,
  ArrowLeftRight,
} from 'lucide-react'

import teleop1 from '../../assets/Into-the-Deep/teleop1.png'
import teleop2 from '../../assets/Into-the-Deep/teleop2.png'
import teleop3 from '../../assets/Into-the-Deep/teleop3.png'
import meepmeep1 from '../../assets/Into-the-Deep/meepmeep1.png'
import meepmeep2 from '../../assets/Into-the-Deep/meepmeep2.png'
import colorsensor from '../../assets/Into-the-Deep/colorsensor.png'

// --------- helpers (ASCII-only to avoid JSX parser issues) ---------
const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

const Section = ({ id, title, kicker, icon: Icon, children, className = '' }) => (
  <section id={id} className={`scroll-mt-28 ${className}`}>
    <motion.header
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-120px' }}
      className="mb-4 flex items-center gap-3"
    >
      {Icon ? (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-lime-900/40 ring-1 ring-lime-800/60">
          <Icon className="h-5 w-5 text-lime-200" />
        </span>
      ) : null}
      <div>
        {kicker ? (
          <p className="text-[11px] uppercase tracking-wider text-lime-300/70">{kicker}</p>
        ) : null}
        <h2 className="text-2xl md:text-3xl font-semibold text-white">{title}</h2>
      </div>
    </motion.header>
    <motion.div
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-120px' }}
      className="prose prose-invert prose-slate max-w-none"
    >
      {children}
    </motion.div>
  </section>
)

const ImgCard = ({ src, alt, caption }) => (
  <figure className="bg-[#0f1d08] rounded-2xl shadow-sm ring-1 ring-lime-900/60 overflow-hidden">
    <img src={src} alt={alt} className="w-full h-auto object-contain" />
    {caption ? (
      <figcaption className="text-sm text-lime-200/80 p-3 border-t border-lime-900/50">{caption}</figcaption>
    ) : null}
  </figure>
)

const Pill = ({ children }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-lime-900/40 text-lime-200 ring-1 ring-lime-800/60">
    {children}
  </span>
)

const Callout = ({ icon: Icon, title, children }) => (
  <div className="rounded-xl bg-[#0f1d08] ring-1 ring-lime-900/60 p-4 not-prose">
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-lime-300" />
      <h4 className="text-sm font-semibold text-lime-200">{title}</h4>
    </div>
    <div className="mt-2 text-sm text-white/85">{children}</div>
  </div>
)

const Gallery = ({ items }) => {
  const ref = useRef(null)
  const scroll = (dir) => {
    const node = ref.current
    if (!node) return
    const amount = Math.min(600, node.clientWidth) * 0.9
    node.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }
  return (
    <div className="relative not-prose">
      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2"
      >
        {items.map((it, i) => (
          <div
            key={i}
            className="snap-start shrink-0 w-[18rem] md:w-[22rem]"
          >
            <ImgCard src={it.src} alt={it.alt} caption={it.caption} />
          </div>
        ))}
      </div>
    </div>
  )
}

const CodePage = () => {
  // subtle hero parallax like Build
  const heroRef = useRef(null)
  const heroImgRef = useRef(null)
  useEffect(() => {
    const section = heroRef.current
    const img = heroImgRef.current
    if (!section || !img) return

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
        const offsetY = rect.top * -0.4
        img.style.transform = `translate3d(0, ${offsetY}px, 0) scale(1)`
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafId)
      if (img) img.style.transform = ''
    }
  }, [])

  return (
    <div className="bg-[#0b1406] text-white">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative isolate min-h-[360px] h-[48vh] md:h-[58vh] overflow-hidden"
      >
        <img
          ref={heroImgRef}
          src={teleop2}
          alt="Tele-op hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b1406] to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <motion.div variants={fade} initial="hidden" animate="show" className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-lime-900/60 px-3 py-1 text-xs font-semibold text-lime-100 ring-1 ring-lime-700/60">
              <Sparkles className="h-3.5 w-3.5" /> Code / Into the Deep
            </p>
            {/* IMPORTANT: include the exact requested title text */}
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              Title with Programming: <span className="text-lime-200">Tele-op</span>
            </h1>
            <p className="mt-3 text-white/85 md:text-lg max-w-prose">
              A code-focused deep dive into tele-op sequencing, transfer logic, sensor integration, and our autonomous experiments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BODY */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* OVERVIEW — keep the user's text verbatim */}
        <Section id="overview" title="Overview" kicker="Programming" icon={Braces}>
          <p>
            This year, we wanted to use a complex yet accurate transfer system that would allow the robot to prepare samples for outtake with the push of only a few buttons.
          </p>
        </Section>

        {/* TELE-OP: TRANSFER + OUTTAKE (combined, with images on the right) */}
        <Section id="teleop-transfer-outtake" title="Tele-op: Transfer & Outtaking" kicker="Sequences" icon={ArrowLeftRight}>
          <div className="grid gap-8 lg:grid-cols-2 items-start not-prose">
            {/* LEFT: text content (verbatim) */}
            <div className="prose prose-invert max-w-none">
              <h3 className="text-white text-xl font-semibold">Transfer system:</h3>
              <p>
                The robot will bring all the slides back and transfer the sample from the intake to the outtake claw regardless of slide and servo positions. This sequence is built to be highly robust as well as efficient, accounting for every scenario of where the sample may be. The code is based on time, as, without absolute value servo encoders, it is impossible to determine the exact position of the servos. Thus, we used a non-blocking timer logic that would ensure accuracy as well allowing us to run other commands while transferring.
              </p>

              <h3 className="mt-8 text-white text-xl font-semibold">Outtaking system:</h3>
              <p>
                We also have another pre-progammed sequence that outtakes the sample at the click of a button. Additionally, we have a robust and well-thoughtout specimen scoring system.
              </p>
            </div>

            {/* RIGHT: stacked images (teleop1 + teleop2) */}
            <div className="lg:sticky lg:top-28 space-y-4">
              <ImgCard src={teleop1} alt="Transfer sequence 1" />
            </div>
          </div>
        </Section>

{/* TELE-OP SAFETY + SWITCH STATEMENTS */}
<Section id="teleop" title="Tele-op:" icon={Cog}>
  <p>
    Our code is designed to be robust, quick, and efficient but also extremely safe. There are many failsafes that ensure that none of our components can get stuck. For example, if the slides are set to retract, but don’t because they stuck, drivers can take manual control over slides. We implemented switch statements to allow for efficient coding as well as speed. all systems on the robot are coded using well tuned timers as well sensors.
  </p>

  {/* Two equal-size images side by side */}
  <div className="mt-6 grid grid-cols-2 gap-4 not-prose">
    <figure className="bg-[#0f1d08] rounded-2xl ring-1 ring-lime-900/60 overflow-hidden">
      <div className="aspect-[4/3] w-full">
        <img src={teleop2} alt="Tele-op view 1" className="h-full w-full object-cover" />
      </div>
    </figure>
    <figure className="bg-[#0f1d08] rounded-2xl ring-1 ring-lime-900/60 overflow-hidden">
      <div className="aspect-[4/3] w-full">
        <img src={teleop3} alt="Tele-op view 2" className="h-full w-full object-cover" />
      </div>
    </figure>
  </div>
</Section>


        {/* SENSORS */}
        <Section id="sensors" title="Implementation of sensors:" icon={CircuitBoard}>
          <p>
            We have a colour sensor that is able to detect when it intakes a sample of any colour, once it does, it will stop the intake
            We have also implemented a touch sensor at the end of both the horizontal and the vertical slides. This allows us to reset encoder positions as well as determine, with more accuracy, when our intakes are fully retracted. Lastly, we implemented colour LEDS. Although they are largely for aesthetics, they also give our driver an indication to when we can move.
          </p>
        </Section>


        {/* EXPERIMENTATION */}
        <Section id="experimentation" title="Experimentation:" kicker="Pathing & Odometry" icon={Gauge}>
          <p className='mb-4'>
            This year, we also experimented with many other autonomous point to point systems. We started the season using three wheel odometry 
            and roadrunner 0.5. This system tended to be innacurate and difficult to use. As the season progressed, we experimented 
            with roadrunner 1.0 and that is what we used during the first qualifiers.
          </p>
          <p>
            We also experimented with Pedo pathing and Pinpoint odometry. We found that these systems were too complicated and didn’t work as well as two wheel imu with Roadrunner 1.0 We found that three wheel odometry tended to struggle with heading. We then used two wheel imu. We found this system to be extremely accurate and it is what we ended up using.
          </p>

  <div className="mt-6 grid grid-cols-2 gap-4 not-prose">
    <figure className="bg-[#0f1d08] rounded-2xl ring-1 ring-lime-900/60 overflow-hidden">
      <div className="aspect-[4/3] w-full">
        <img src={meepmeep1} alt="Tele-op view 1" className="h-full w-full object-cover" />
      </div>
    </figure>
    <figure className="bg-[#0f1d08] rounded-2xl ring-1 ring-lime-900/60 overflow-hidden">
      <div className="aspect-[4/3] w-full">
        <img src={meepmeep2} alt="Tele-op view 2" className="h-full w-full object-cover" />
      </div>
    </figure>
  </div>
        </Section>



        {/* INITIAL vs FINAL TUNING (based on provided image) */}
<Section>
  {/* Card container */}
  <div className="not-prose bg-[#e7f4c9] ring-1 ring-lime-900/30 text-[#0b1406] overflow-hidden">
    <div className="grid grid-cols-1 md:grid-cols-[1fr_120px_1fr] items-stretch">
      {/* LEFT: Initial Tuning */}
      <div className="p-5 md:p-7">
        <h3 className="text-base md:text-lg font-extrabold uppercase tracking-wide">
          Initial Tuning
        </h3>
        <p className="mt-2 text-sm md:text-base leading-relaxed">
          In the past, we never used any sensors during autonomous. This year, we
          wanted to experiment using sensors such as odometry and colour sensing
        </p>
      </div>

      {/* CENTER: decorative chevrons */}
      <div className="relative hidden md:flex items-center justify-center">
        <div className="relative h-28 w-24">
          {/* Back-most chevron */}
          <span
            className="absolute inset-y-0 left-0 w-full"
            style={{
              background: '#cfe7ab',
              clipPath:
                'polygon(0 0, 68% 0, 100% 50%, 68% 100%, 0 100%, 32% 50%)',
              opacity: 0.9,
            }}
          />
          {/* 2nd */}
          <span
            className="absolute inset-y-0 left-3 w-[calc(100%-0.75rem)]"
            style={{
              background: '#b8db8f',
              clipPath:
                'polygon(0 0, 68% 0, 100% 50%, 68% 100%, 0 100%, 32% 50%)',
              opacity: 0.95,
            }}
          />
          {/* 3rd */}
          <span
            className="absolute inset-y-0 left-6 w-[calc(100%-1.5rem)]"
            style={{
              background: '#9fcf76',
              clipPath:
                'polygon(0 0, 68% 0, 100% 50%, 68% 100%, 0 100%, 32% 50%)',
            }}
          />
          {/* Front-most chevron */}
          <span
            className="absolute inset-y-0 left-9 w-[calc(100%-2.25rem)]"
            style={{
              background: '#86be5f',
              clipPath:
                'polygon(0 0, 68% 0, 100% 50%, 68% 100%, 0 100%, 32% 50%)',
            }}
          />
        </div>
      </div>

      {/* RIGHT: Final Tuning */}
      <div className="p-5 md:p-7">
        <h3 className="text-base md:text-lg font-extrabold uppercase tracking-wide">
          Final Tuning
        </h3>
        <p className="mt-2 text-sm md:text-base leading-relaxed">
          In the end, we implemented 4 sensors: IMU, touch sensor, colour sensor, and
          odometry dead wheels.these 4 sensors are vital for our robot to consistently
          and efficiently score 5 samples or 5 specimens during auto
        </p>
      </div>
    </div>
  </div>
</Section>

{/* SPECIMEN AUTO — text left, image right (smaller and top-aligned) */}
<Section id="specimen-auto" title="Specimen & Sample Auto:" icon={PlayCircle}>
  <div className="grid gap-8 lg:grid-cols-2 items-start not-prose">
    {/* LEFT: Text */}
    <div className="prose prose-invert max-w-none">
      <p className="mb-4">
        For our specimen auto we wanted to use our intake more than our robot. We found that many teams push
        the 3 coloured samples using their robot. However, since our robot is very slow we wanted to use an intake,
        and eject system that utilizes our accurate turning (thanks to IMU) and extremely fast intake slides.
      </p>
      <p>
        For our samples we are able to easily get 4 samples that we essentially start with. For our 5th sample, we
        would stick our intake into the submersible and slowly advance, using the colour sensor to differentiate
        between samples.
      </p>
    </div>

    {/* RIGHT: Smaller image, lined up with text */}
    <div className="self-start">
      <figure className="w-full max-w-sm md:max-w-md lg:max-w-[22rem] rounded-2xl bg-[#0f1d08] ring-1 ring-lime-900/60 overflow-hidden mx-auto lg:mx-0">
        {/* Cap the height so it doesn't exceed the text column */}
        <div className="aspect-[4/3] max-h-[20rem]">
          <img
            src={colorsensor}
            alt="Colour sensing module used to differentiate samples during auto"
            className="h-full w-full object-contain"
          />
        </div>
      </figure>
    </div>
  </div>
</Section>



      </div>
    </div>
  )
}

export default CodePage
