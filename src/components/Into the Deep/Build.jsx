import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Wrench, Cog, CircuitBoard, LineChart, Sparkles } from 'lucide-react'

import Evo1 from '../../assets/Into the Deep/Poliwag.png'
import Evo2 from '../../assets/Into the Deep/Poliwhirl.png'
import Evo3 from '../../assets/Into the Deep/Poliwrath.png'
import Robot from '../../assets/Into the Deep/robot.png'
import RobotSide from '../../assets/Into the Deep/RobotSide.png'
import CoAxial from '../../assets/Into the Deep/Co-Axial Arm.png'
import IntakeV1 from '../../assets/Into the Deep/IntakeV1.png'
import IntakeV2 from '../../assets/Into the Deep/IntakeV2.png'
import IntakeV3 from '../../assets/Into the Deep/IntakeV3.png'
import Sensor from '../../assets/Into the Deep/Sensor.png'
import Sensor2 from '../../assets/Into the Deep/Sensor2.png'
import IntakeFinal from '../../assets/Into the Deep/IntakeFinal.png'
import Linkage from '../../assets/Into the Deep/Scissor Linkage.png'

// --------- helpers (ASCII-only to avoid JSX parser issues) ---------
const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

const Section = ({ id, title, kicker, icon: Icon, children }) => (
  <section id={id} className="scroll-mt-28">
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

const Build = () => {
  // horizontal scroller for the evolution gallery
  const evoRef = useRef(null)
  const scrollEvo = (dir) => {
    const node = evoRef.current
    if (!node) return
    const amount = Math.min(600, node.clientWidth) * 0.9
    node.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  // subtle hero parallax like Home (ASCII-safe)
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
          src={Robot}
          alt="Robot hero"
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b1406] to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <motion.div variants={fade} initial="hidden" animate="show" className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-lime-900/60 px-3 py-1 text-xs font-semibold text-lime-100 ring-1 ring-lime-700/60">
              <Sparkles className="h-3.5 w-3.5" /> Build / Into the Deep
            </p>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
              Robot <span className="text-lime-200">Build and Evolution</span>
            </h1>
            <p className="mt-3 text-white/85 md:text-lg max-w-prose">
              Bot Evolution, Final Design, and Specific Parts breakdown for our 2024-25 season.
            </p>
          </motion.div>
        </div>
      </section>


      {/* BODY */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* BOT EVOLUTION */}
<Section id="evolution">

    <header className="flex items-center gap-2 mb-6">
    <Wrench className="w-10 h-10 text-lime-200 boroe" />
    <h2 className="text-5xl font-bold text-lime-200">Bot Evolution</h2>
  </header>
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {[
      {
        title: "Poliwag",
        img: Evo1,
        alt: "Evolution stage 1",
        desc:
          "During the pre-season, we focused mainly on odometry and the drive train. We also spent time considering potential strategies, auto routes, and other aspects that would drastically alter our path for what we wanted to create. There were no major season components like intakes or slides.",
      },
      {
        title: "Poliwhirl",
        img: Evo2,
        alt: "Evolution stage 2",
        desc:
          "As the season started, we began to develop the major components of our robot design, such as the horizontal/vertical slides, intake pieces, and outtake claws. This gave us the opportunity to find major areas to improve upon.",
      },
      {
        title: "Poliwrath",
        img: Evo3,
        alt: "Evolution stage 3",
        desc:
          "As we moved into the last few weeks of the season, we ensured that every major aspect of the robot — the intake, specimen claw, and auto — was the best it could be and optimal for our strategy.",
      },
    ].map((item, i) => (
      <article
        key={i}
        className="rounded-2xl bg-[#0f1d08] ring-1 ring-lime-900/60 overflow-hidden flex flex-col"
      >
        <img src={item.img} alt={item.alt} className="h-70 w-full object-cover" />
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-lime-200">{item.title}</h3>
          <p className="mt-2 text-sm text-white/85">{item.desc}</p>
        </div>
      </article>
    ))}
  </div>
</Section>

        {/* FINAL DESIGN */}
    <Section id="final-design">

    <header className="flex items-center gap-2 mb-6">
    <Cog className="w-10 h-10 text-lime-200 boroe" />
    <h2 className="text-5xl font-bold text-lime-200">Final Design</h2>
  </header>
  <div className="grid gap-8 lg:grid-cols-2 items-start">
    {/* LEFT: Intake + Passive Specimen */}
    <div className="space-y-10">
      {/* Intake Oct–Nov */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Pill>Oct - Nov</Pill>
          <h3 className="text-xl font-semibold">Intake</h3>
        </div>
        <p>
          When the season first started, our initial ideas were to create an intake box with an outtake box
          to transfer samples from the floor into a controlled drop-off mechanism, seen as the diagram on the
          right, and in other pages including our robot evolution.
        </p>
      </div>

      {/* Passive Specimen Dec */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Pill>Dec</Pill>
          <h3 className="text-xl font-semibold">Passive Specimen</h3>
        </div>
        <p>
          For the passive intake / outbox for specimen hanging and collecting, we wanted the process to be as smooth
          as possible. At first, our main priority was to score samples in the high baskets for 8 points, throughout
          both teleop and autonomous. However, moving through competitions and practice runs, we decided to diversify
          our strategy.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-2">
          <Pill>Jan-Feb</Pill>
          <h3 className="text-xl font-semibold">Strategy Overview</h3>
        </div>
        <p>
          While still keeping our plan of flexibility, keeping samples and specimens in mind, we settled on a design with
        a single co-axial arm to control both specimens and samples. This allows for ease of control and stops the
        problem of needing to rotate for specimen scoring.
        </p>
      </div>
    </div>

    

    {/* RIGHT: Robot image */}
    <div className="lg:sticky lg:top-28">
  {/* overlap stage */}
  <div className="relative min-h-[30rem]">
    {/* Top-left (on top) */}
    <div className="absolute top-0 left-0 w-[22rem] md:w-[26rem] drop-shadow-xl">
      <ImgCard
        src={Robot}
      />
    </div>

    {/* Bottom-right (pulled up/left to overlap) */}
    <div className="absolute bottom-0 right-0 w-[22rem] md:w-[26rem] -translate-x-0 -translate-y-0 drop-shadow-lg">
      <ImgCard
        src={RobotSide}
      />
    </div>
  </div>
</div>


  </div>
</Section>


{/* SPECIFIC PARTS (Bento Grid) */}
<Section id="specific-parts">
    <header className="flex items-center gap-2 mb-6">
    <Wrench className="w-10 h-10 text-lime-200 boroe" />
    <h2 className="text-5xl font-bold text-lime-200">Specific Parts</h2>
  </header>
  <div className="grid gap-6 md:grid-cols-2">
    {/* Co-Axial Arm — split card */}
    <article className="group rounded-2xl bg-gradient-to-b from-[#0f1d08] to-[#0b1406] ring-1 ring-lime-900/60 p-5 overflow-hidden">
      <div className="flex items-center gap-2">
        <Wrench className="h-5 w-5 text-lime-300" />
        <h3 className="text-lg font-semibold text-lime-200">Co-Axial Arm</h3>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <p className="text-white/85 list-disc pl-4 space-y-1">
          This new design implements an axon servo and a torque servo geared 2:1 for increased speed. We also changed the grippers to a large gripper that allowed us more range of motion as well as the ability to score specimen in a unique and efficient way
        </p>
        <div className="rounded-xl bg-[#0b1406] ring-1 ring-lime-900/50 p-2">
          <div className="">
            <img src={CoAxial} alt="Co-axial arm detail" className="h-full w-full" />
          </div>
        </div>
      </div>
    </article>

    {/* Sensors — two-up images */}
    <article className="rounded-2xl bg-[#0f1d08] ring-1 ring-lime-900/60 p-5">
      <div className="flex items-center gap-2">
        <CircuitBoard className="h-5 w-5 text-lime-300" />
        <h3 className="text-lg font-semibold text-lime-200">Sensors</h3>
      </div>
      <p className="mt-2 text-sm text-white/85">
        Three-sensor suite improved from the last competition. The intake color sensor distinguishes the
        three sample types and can eject or auto-transfer based on detection.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-[#0b1406] ring-1 ring-lime-900/50 p-2">
          <div className="aspect-[4/3] w-full">
            <img src={Sensor} alt="Sensor package v1" className="h-full w-full object-contain" />
          </div>
        </div>
        <div className="rounded-xl bg-[#0b1406] ring-1 ring-lime-900/50 p-2">
          <div className="aspect-[4/3] w-full">
            <img src={Sensor2} alt="Sensor package v2" className="h-full w-full object-contain" />
          </div>
        </div>
      </div>
    </article>

 {/* Intake — images on top, each with its own paragraph */}
<article className="md:col-span-2 rounded-2xl bg-gradient-to-br from-[#0f1d08] to-[#0b1406] ring-1 ring-lime-900/60 p-5">
  <div className="flex items-center gap-2">
    <Cog className="h-5 w-5 text-lime-300" />
    <h3 className="text-lg font-semibold text-lime-200">Intake (V1 - V3)</h3>
  </div>

  <div className="mt-4 grid gap-4 sm:grid-cols-3">
    {/* V1 */}
    <div className="rounded-xl bg-[#0b1406] ring-1 ring-lime-900/50 p-3">
      <div className="aspect-[4/3] w-full">
        <img
          src={IntakeV1}
          alt="Intake V1 — Wide box"
          className="h-full w-full object-contain"
        />
      </div>
      <h4 className="mt-3 text-sm font-semibold text-lime-200">Intake V1</h4>
      <p className="mt-1 text-xs sm:text-sm text-white/85">
        The old intake design consisted of a wide box, wide enough to intake the sample
        from any angle. However, the box was too bulky, the servos were too slow, and it
        was not consistent enough in intaking the samples.
      </p>
    </div>

    {/* V2 */}
    <div className="rounded-xl bg-[#0b1406] ring-1 ring-lime-900/50 p-3">
      <div className="aspect-[4/3] w-full">
        <img
          src={IntakeV2}
          alt="Intake V2 — Co-axial concept"
          className="h-full w-full object-contain"
        />
      </div>
      <h4 className="mt-3 text-sm font-semibold text-lime-200">Intake V2</h4>
      <p className="mt-1 text-xs sm:text-sm text-white/85">
        Seeing the flaws of our first design, we built the new intake, consisting of a
        coaxial design that allowed the rotation of the arm while being linked to a chain
        drive that could be driven by a motor.
      </p>
    </div>

    {/* V3 */}
    <div className="rounded-xl bg-[#0b1406] ring-1 ring-lime-900/50 p-3">
      <div className="aspect-[4/3] w-full">
        <img
          src={IntakeV3}
          alt="Intake V3 — Gate system"
          className="h-full w-full object-contain"
        />
      </div>
      <h4 className="mt-3 text-sm font-semibold text-lime-200">Intake V3</h4>
      <p className="mt-1 text-xs sm:text-sm text-white/85">
        Adding a gate system allowed our intake to be small and have high amounts of
        accuracy and stability. The gate system also allows us to eject samples simply by
        opening the gate—pushing them farther from the opposing team and letting us
        immediately begin intaking a new sample.
      </p>
    </div>
  </div>
</article>



    {/* Scissor Linkage — compact image top, description below */}
<article className="rounded-2xl overflow-hidden ring-1 ring-lime-900/60 bg-[#0f1d08] mx-auto max-w-xl md:max-w-2xl">
  <figure className="relative">
    {/* Constrain visual size */}
    <div className="aspect-[4/3] w-full bg-[#0b1406]">
      <img
        src={Linkage}
        className="h-full w-full object-contain p-4"
        loading="lazy"
      />
    </div>
  </figure>

  {/* Text below image */}
  <div className="p-5">
    <h3 className="text-lg font-semibold text-lime-200">Scissor Linkage</h3>
    <p className="mt-2 text-sm text-white/85">
      Originally, we created a scissor linkage to power the horizontal slides, but the servos were too weak.
      We then realized their ability to stretch cables over a distance, so we repurposed the linkage to keep
      our wires safe and secure.
    </p>
  </div>
</article>

  </div>
</Section>


      </div>
    </div>
  )
}

export default Build
