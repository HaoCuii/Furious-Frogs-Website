import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Logo.png";
import {
  Menu,
  X,
  Home,
  Info,
  Code2,
  Wrench,
  ChevronDown,
} from "lucide-react";

const links = {
  home: { label: "Home", href: "/" },
  about: { label: "Team", href: "/team" },
};

const codeItems = [
  { label: "Into the Deep", href: "/code/into-the-deep" },
];

const buildItems = [
  { label: "Into the Deep", href: "/build/into-the-deep" },
];

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    function listener(e) {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    }
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const codeRef = useRef(null);
  const buildRef = useRef(null);

  useOnClickOutside(codeRef, () => openMenu === "code" && setOpenMenu(null));
  useOnClickOutside(buildRef, () => openMenu === "build" && setOpenMenu(null));

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const NavItem = ({ href, icon: Icon, children }) => (
    <a
      href={href}
      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white hover:bg-lime-900/60"
    >
      {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
      <span>{children}</span>
    </a>
  );

  const Dropdown = ({ label, items, icon: Icon, isOpen, setIsOpen, refEl, id }) => (
    <div className="relative" ref={refEl}>
      <button
        onClick={() => setIsOpen(isOpen ? null : id)}
        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white hover:bg-lime-900/60 focus:outline-none focus:ring-2 focus:ring-lime-400"
      >
        {Icon ? <Icon className="h-4 w-4" aria-hidden /> : null}
        {label}
        <ChevronDown className="h-4 w-4" aria-hidden />
      </button>
      <AnimatePresence>
        {isOpen === id && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-48 overflow-hidden rounded-2xl border border-lime-700 bg-[#224004] p-2 shadow-xl"
          >
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2 text-sm text-white hover:bg-lime-900/60"
                onClick={() => setIsOpen(null)}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-[#224004]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <a href="/" className="group inline-flex items-center gap-3">
  {/* Logo image */}
  <img
    src={logo}
    alt="Furious Frogs Logo"
    className="h-10 w-10 rounded-2xl object-contain shadow"
  />

  {/* Text */}
  <div className="flex flex-col leading-tight">
    <span className="text-sm font-bold tracking-wide text-white group-hover:text-lime-300">
      Furious Frogs
    </span>
    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-lime-200">
      FTC 26025
    </span>
  </div>
</a>

        <div className="hidden items-center gap-1 md:flex">
          <NavItem href={links.home.href} icon={Home}>{links.home.label}</NavItem>
          <NavItem href={links.about.href} icon={Info}>{links.about.label}</NavItem>
          <Dropdown id="build" label="Build" items={buildItems} icon={Wrench} isOpen={openMenu} setIsOpen={setOpenMenu} refEl={buildRef} />
          <Dropdown id="code" label="Code" items={codeItems} icon={Code2} isOpen={openMenu} setIsOpen={setOpenMenu} refEl={codeRef} />

        </div>

        <button
          className="inline-flex items-center gap-2 rounded-xl p-2 text-white hover:bg-lime-900/60 focus:outline-none focus:ring-2 focus:ring-lime-400 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#224004]"
          >
            <div className="space-y-1 border-t border-lime-700 p-3">
              <a
                href={links.home.href}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white hover:bg-lime-900/60"
                onClick={() => setMobileOpen(false)}
              >
                <Home className="h-4 w-4" /> {links.home.label}
              </a>
              <a
                href={links.about.href}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white hover:bg-lime-900/60"
                onClick={() => setMobileOpen(false)}
              >
                <Info className="h-4 w-4" /> {links.about.label}
              </a>

              <details className="group rounded-xl">
                <summary className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white hover:bg-lime-900/60">
                  <Code2 className="h-4 w-4" /> Code
                </summary>
                <div className="mt-1 space-y-1 pl-9">
                  {codeItems.map((i) => (
                    <a
                      key={i.href}
                      href={i.href}
                      className="block rounded-lg px-3 py-2 text-sm text-white hover:bg-lime-900/60"
                      onClick={() => setMobileOpen(false)}
                    >
                      {i.label}
                    </a>
                  ))}
                </div>
              </details>

              <details className="group rounded-xl">
                <summary className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white hover:bg-lime-900/60">
                  <Wrench className="h-4 w-4" /> Build
                </summary>
                <div className="mt-1 space-y-1 pl-9">
                  {buildItems.map((i) => (
                    <a
                      key={i.href}
                      href={i.href}
                      className="block rounded-lg px-3 py-2 text-sm text-white hover:bg-lime-900/60"
                      onClick={() => setMobileOpen(false)}
                    >
                      {i.label}
                    </a>
                  ))}
                </div>
              </details>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
