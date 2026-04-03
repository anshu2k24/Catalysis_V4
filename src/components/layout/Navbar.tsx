"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Events", id: "events" },
  { label: "Timeline", id: "timeline" },
  { label: "Gallery", id: "gallery" },
  { label: "FAQ", id: "faq" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  // ✅ Scroll behavior
  useEffect(() => {
    const onScroll = () => {
      if (isOpen) return;

      const y = window.scrollY;

      if (y < lastScrollY.current || y < 50) {
        setIsVisible(true);
      } else if (y > lastScrollY.current && y > 50) {
        setIsVisible(false);
      }

      lastScrollY.current = y;

      if (isHome) {
        const mid = y + window.innerHeight * 0.4;
        for (let i = navItems.length - 1; i >= 0; i--) {
          const el = document.getElementById(navItems[i].id);
          if (el && el.offsetTop <= mid) {
            setActiveSection(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, isOpen]);

  // ✅ Lock background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (pathname?.startsWith("/admin")) return null;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const handleNavClick = (id: string) => {
    if (isHome) scrollTo(id);
    else {
      router.push(`/#${id}`);
      setIsOpen(false);
    }
  };

  const handleRegister = () => {
    if (isHome) scrollTo("cta");
    else router.push("/register");
    setIsOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        } bg-transparent`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <div
            className="cursor-pointer flex-shrink-0 z-[110]"
            onClick={() => handleNavClick("hero")}
          >
            <Image
              src="/catalysis.png"
              alt="Catalysis"
              width={110}
              height={40}
              className="h-auto w-auto"
            />
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = isHome && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                    isActive
                      ? "text-[#DD273E]"
                      : "text-black/70 hover:text-black"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Desktop button */}
          <button
            onClick={handleRegister}
            className="hidden md:flex bg-[#DD273E] text-white px-6 py-2.5 rounded-xl border-2 border-black shadow-[4px_4px_0px_black] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_black] active:translate-y-0.5 active:shadow-[2px_2px_0px_black] transition-all"
          >
            Register Now
          </button>

          {/* Hamburger Menu - Fixed position to stay above overlay */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 cursor-pointer z-[110] bg-white border-2 border-black rounded-lg shadow-[3px_3px_0px_black] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-5">
              <span className={`absolute block w-6 h-[3px] bg-black transition-all duration-300 ${isOpen ? "top-2 rotate-45" : "top-0"}`} />
              <span className={`absolute block w-6 h-[3px] bg-black transition-all duration-200 top-2 ${isOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute block w-6 h-[3px] bg-black transition-all duration-300 ${isOpen ? "top-2 -rotate-45" : "top-4"}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`md:hidden fixed inset-0 z-[105] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE MENU PANEL */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-[80%] max-w-[320px] z-[108] bg-[#FFEEF0] border-l-4 border-black shadow-[-10px_0px_30px_rgba(0,0,0,0.1)] transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button Inside Panel */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-[#DD273E] text-white border-2 border-black rounded-full shadow-[3px_3px_0px_black] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all duration-200 group"
          aria-label="Close Menu"
        >
          <div className="relative w-5 h-5">
            <span className="absolute top-1/2 left-0 w-5 h-[2px] bg-white rotate-45 transition-transform group-hover:rotate-[135deg]" />
            <span className="absolute top-1/2 left-0 w-5 h-[2px] bg-white -rotate-45 transition-transform group-hover:rotate-[45deg]" />
          </div>
        </button>

        <div className="flex flex-col h-full pt-28 px-8 pb-10">
          <div className="flex flex-col gap-6">
            {navItems.map((item, index) => {
              const isActive = isHome && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{ transitionDelay: isOpen ? `${index * 50}ms` : '0ms' }}
                  className={`text-left text-3xl font-black italic uppercase transition-all flex items-center gap-3 ${
                    isOpen ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                  } ${
                    isActive ? "text-[#DD273E]" : "text-[#3A001D]"
                  }`}
                >
                  {isActive && <span className="w-2 h-2 bg-[#DD273E] rounded-full" />}
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className={`mt-auto transition-all duration-500 delay-300 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <button
              onClick={handleRegister}
              className="w-full bg-[#DD273E] text-white text-xl font-bold px-8 py-5 rounded-2xl border-4 border-black shadow-[6px_6px_0px_black] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              REGISTER NOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
}