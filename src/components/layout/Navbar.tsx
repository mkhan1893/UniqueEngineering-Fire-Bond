import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Page } from "../../types";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import logo from "../../images/logo.svg";

export const Navbar = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const navLinks: { label: string; id: Page }[] = [
    { label: "Home", id: "home" },
    { label: "About Us", id: "about" },
    { label: "Products", id: "products" },
    { label: "Services", id: "services" },
    { label: "Knowledge Hub", id: "knowledge" },
    { label: "Contact", id: "contact" },
  ];

  const isAdminPage = currentPage === "admin" || currentPage === "login" || currentPage === "access-denied";

  const handleLogout = async () => {
    await signOut(auth);
    window.location.hash = ""; // Clear hash on logout
    setCurrentPage("home");
  };

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 border-b ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md h-[72px] shadow-md border-gray-100" 
        : "bg-white h-[88px] border-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center">
          <div 
            className="flex items-center cursor-pointer group gap-3 sm:gap-4"
            onClick={() => {
              setCurrentPage("home");
              if (isAdminPage) window.location.hash = "";
            }}
          >
            <img 
              src={logo} 
              alt="Unique Engineering - Fire Bond Logo" 
              referrerPolicy="no-referrer"
              className="h-10 sm:h-12 lg:h-15 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col justify-center">
              <div className="text-[1rem] sm:text-lg lg:text-2xl font-black text-gray-900 leading-tight tracking-tighter uppercase italic max-w-[200px] sm:max-w-none">
                Unique Engineering - <span className="text-red-600">Fire Bond</span>
              </div>
              <div className="text-[0.6rem] sm:text-[0.7rem] font-black text-red-600 leading-none mt-1 tracking-[0.15em] uppercase italic opacity-90">Engineering Trust Since 1996</div>
            </div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setCurrentPage(link.id);
                if (isAdminPage) window.location.hash = "";
              }}
              className={`text-[0.7rem] font-bold tracking-[0.1em] uppercase transition-colors duration-200 nav-link-underline py-2 ${
                currentPage === link.id ? "text-red-600 after:w-full" : "text-gray-500 hover:text-red-600"
              }`}
            >
              {link.label}
            </button>
          ))}
          
          {user && isAdminPage && (
            <>
              <div className="h-4 w-[1px] bg-gray-200"></div>
              <button
                onClick={handleLogout}
                className="text-[0.7rem] font-bold tracking-[0.1em] uppercase py-2 text-gray-500 hover:text-red-600 transition-colors"
              >
                LOGOUT
              </button>
            </>
          )}
        </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-text-muted hover:text-brand-primary p-2 transition-transform active:scale-90"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`lg:hidden bg-white border-t border-brand-border overflow-hidden fixed left-0 right-0 z-50 shadow-2xl ${isScrolled ? "top-[70px]" : "top-[90px]"}`}
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link, idx) => (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.id}
                  onClick={() => {
                    setCurrentPage(link.id);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-5 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${
                    currentPage === link.id ? "bg-red-50 text-red-600 border-l-4 border-red-600" : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}
              {user && isAdminPage && (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-5 py-4 text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  LOGOUT
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
