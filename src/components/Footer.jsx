import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-lime-900/60 bg-[#0f1d08]">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <p className="text-sm text-white/70 text-center">
            © {new Date().getFullYear()} Furious Frogs FTC • Team 26025
          </p>
        </div>
      </footer>
  )
}

export default Footer