"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/public/LE-01.png";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpportunitiesOpen, setIsOpportunitiesOpen] = useState(false);

  const navItems = [
    { id: 1, name: "Home", href: "home" },
    { id: 2, name: "About Us", href: "about" },
    { id: 4, name: "Memberships", href: "membership" },
    { id: 5, name: "Contact Us", href: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (sectionId) => {
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* HEADER */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white border-b shadow-sm"
            : "bg-transparent border-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => router.push("/")}
              className="flex items-center relative"
            >
              <Image src={logo} alt="Logo" height={55} />
            </button>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollToSection(item.href)}
                  className={`relative font-medium cursor-pointer hover:text-primary transition-colors duration-300 ${
                    scrolled ? "text-gray-900" : "text-white"
                  } after:absolute after:-bottom-[2px] after:left-1/2 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full hover:after:left-0`}
                >
                  {item.name}
                </button>
              ))}

              {/* Opportunities Dropdown */}
              <div className="relative group">
                <button
                  className={`flex items-center gap-1 font-medium transition ${
                    scrolled ? "text-gray-900" : "text-white"
                  } hover:text-primary`}
                >
                  Opportunities
                  <ChevronDown className="h-4 w-4" />
                </button>

                <div className="absolute top-full left-0 mt-2 w-48 rounded-xl overflow-hidden bg-white border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {[
                    { name: "Internships", path: "/internships" },
                    { name: "Careers", path: "/careers" },
                    { name: "Webinars", path: "/webinars" },
                    { name: "Partnerships", path: "/partnership" },
                  ].map((link) => (
                    <button
                      key={link.name}
                      onClick={() => router.push(link.path)}
                      className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50/50 hover:text-primary"
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            {/* Mobile Toggle */}
            <button
              className={`md:hidden ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
        />

        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleScrollToSection(item.href)}
                className="block w-full text-left px-4 py-3 text-lg font-medium hover:bg-gray-100"
              >
                {item.name}
              </button>
            ))}

            {/* Mobile Opportunities */}
            <div>
              <button
                onClick={() => setIsOpportunitiesOpen(!isOpportunitiesOpen)}
                className="w-full flex items-center gap-1 px-4 py-3 text-lg font-medium hover:bg-red-50/50"
              >
                Opportunities <ChevronDown className="h-4 w-4" />
              </button>

              {isOpportunitiesOpen && (
                <div className="ml-10 flex flex-col gap-4 items-start space-y-2">
                  <button onClick={() => router.push("/internships")}>
                    Internships
                  </button>
                  <button onClick={() => router.push("/careers")}>
                    Careers
                  </button>
                  <button onClick={() => router.push("/webinars")}>
                    Webinars
                  </button>
                  <button onClick={() => router.push("/partnership")}>
                    Partnerships
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
