"use client";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import logo from "@/public/LE-01.png";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpportunitiesOpen, setIsOpportunitiesOpen] = useState(false);

  const { data: session } = useSession();
  const userName = session?.user?.name || "User";
  const isToken = Boolean(session?.user);

  const navItems = [
    { id: 1, name: "Home", href: "home" },
    { id: 2, name: "About Us", href: "about" },
    { id: 4, name: "Memberships", href: "membership" },
    { id: 5, name: "Contact Us", href: "contact" },
  ];

  const externalLinks = [
    {
      name: "Careers",
      url: "https://docs.google.com/spreadsheets/d/1D-Jqn31vxNOFYR2IQhlmSZYqlXla_pcRTTT_AxG3cbo/edit?usp=sharing",
    },
    {
      name: "Partnerships",
      url: "https://docs.google.com/spreadsheets/d/1GIXb2XQGpzl_7ghjy6PqKg-Pd9Svdl7l5fzGq6-ZZy4/edit?usp=sharing",
    },
  ];

  // 🔹 Scroll logic only for Home page
  useEffect(() => {
    if (!isHome) {
      setScrolled(true); // Always solid header on other routes
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

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

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };

  return (
    <>
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
            <a href="/" className="relative flex items-center h-14 w-40">
              <Image
                src={logo}
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </a>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScrollToSection(item.href)}
                  className={`relative font-medium cursor-pointer transition-colors duration-300 ${
                    scrolled ? "text-gray-900" : "text-white"
                  } hover:text-primary after:absolute after:-bottom-[2px] after:left-1/2 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full hover:after:left-0`}
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
                    // { name: "Careers", path: "/careers" },
                    { name: "Webinars", path: "/webinars" },
                    // { name: "Partnerships", path: "/partnership" },
                  ].map((link) => (
                    <button
                      key={link.name}
                      onClick={() => router.push(link.path)}
                      className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50/50 hover:text-primary"
                    >
                      {link.name}
                    </button>
                  ))}
                  {externalLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() =>
                        window.open(link.url, "_blank", "noopener,noreferrer")
                      }
                      className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50/50 hover:text-primary"
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            {/* DESKTOP AUTH */}
            <div className="hidden md:flex items-center space-x-4">
              {!isToken ? (
                <>
                  <button
                    onClick={() => router.push("/login")}
                    className={`px-4 py-2 font-medium transition-colors rounded-lg  bg-white/10 ${
                      scrolled
                        ? "text-gray-900 hover:bg-gray-100"
                        : "text-white"
                    }`}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => router.push("/signup")}
                    className="px-4 py-2 font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div className="relative group">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors">
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-bold">
                      {userName.charAt(0)}
                    </div>
                    <span
                      className={`font-medium ${
                        scrolled ? "text-gray-900" : "text-white"
                      }`}
                    >
                      {userName}
                    </span>
                  </button>

                  <div className="absolute top-full right-0 mt-2 w-48 rounded-lg overflow-hidden bg-white border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50/50 flex items-center gap-2 border-t"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>

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
                <div className="ml-4 space-y-2">
                  <button
                    onClick={() => {
                      router.push("/internships");
                      setIsMenuOpen(false);
                    }}
                    className="block px-4 py-2"
                  >
                    Internships
                  </button>
                  <button
                    onClick={() => {
                      router.push("/webinars");
                      setIsMenuOpen(false);
                    }}
                    className="block px-4 py-2"
                  >
                    Webinars
                  </button>
                  {externalLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() =>
                        window.open(link.url, "_blank", "noopener,noreferrer")
                      }
                      className="block px-4 py-2"
                    >
                      {link.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Auth */}
            <div className="pt-4 border-t">
              {!isToken ? (
                <div className="grid gap-3">
                  <button
                    onClick={() => {
                      router.push("/login");
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-3 text-gray-900 font-semibold border border-gray-300 rounded-xl hover:bg-white transition-all"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      router.push("/signup");
                      setIsMenuOpen(false);
                    }}
                    className="px-4 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 shadow-md shadow-red-200 transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white border rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                      {userName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{userName}</p>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                        Account Active
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={async () => {
                      await handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-6 bg-primary"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
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
