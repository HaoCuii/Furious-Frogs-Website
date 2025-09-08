import React from 'react'
import Logo from '../assets/Logo.png'

const Team = () => {
  const members = [
    { name: 'Jerry Liu',     role: 'Team Captain' },
    { name: 'Brandon Wu',   role: 'Design' },
    { name: 'Leon Chen',role: 'Design' },
    { name: 'Andy Wang',  role: 'Programming' },
    { name: 'Isaac Kang',    role: 'Outreach' },
    { name: 'Roy Zhou',   role: 'Design' },
    { name: 'Charles Wu',   role: 'Programming' },
    { name: 'Hao Cui',     role: 'Programming' },
    { name: 'Eden Liang',    role: 'Design' },
    { name: 'Daniel Go',    role: 'Design' },
    { name: 'Charlie Wang',    role: 'Outreach' },
  ]

  return (
    <section id="team" className="bg-[#0b1406] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-lime-200 md:text-4xl">
            Meet the Team
          </h2>
          <p className="mt-2 max-w-2xl text-white/80">
            Designers, builders, coders, and strategists working together to compete — and grow STEM
            in our community.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {members.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      </div>
    </section>
  )
}

const TeamCard = ({ member }) => {
  const { name, role } = member

  return (
    <article className="overflow-hidden rounded-2xl bg-[#0f1d08] ring-1 ring-lime-900/60 shadow-[0_0_0_1px_rgba(163,230,53,0.06)]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="flex h-full w-full items-center justify-center bg-white">
          <img
            src={Logo}
            alt={`${name} placeholder logo`}
            className="h-24 w-24 object-contain"
            loading="lazy"
          />
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-white">{name}</h3>
        <p className="mt-0.5 text-sm font-medium text-lime-200/90">{role}</p>
      </div>
    </article>
  )
}

export default Team
