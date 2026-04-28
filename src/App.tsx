import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./lib/firebase";
import { Page } from "./types";

// Components
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { WhatsAppFloating } from "./components/ui/WhatsAppFloating";

// Pages
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ContactPage } from "./pages/ContactPage";
import { ProductsPage } from "./pages/ProductsPage";
import { AdminProductsPage } from "./pages/AdminProductsPage";
import { LoginPage } from "./pages/LoginPage";
import { KnowledgeHub } from "./pages/KnowledgeHub";

const ADMIN_EMAIL = "uniqueengg1976@gmail.com";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [user, setUser] = useState<User | null>(null);
  const [initialSubject, setInitialSubject] = useState<string | undefined>(undefined);
  const [authLoading, setAuthLoading] = useState(true);

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Route Guarding & Initial Route Detection
  useEffect(() => {
    // Check URL hash for admin/login paths
    const handleLocationChange = () => {
      const hash = window.location.hash;
      if (hash === "#/control-panel-firebond-1976") {
        setCurrentPage("admin");
      } else if (hash === "#/login") {
        setCurrentPage("login");
      }
    };

    handleLocationChange();
    window.addEventListener("hashchange", handleLocationChange);
    return () => window.removeEventListener("hashchange", handleLocationChange);
  }, []);

  useEffect(() => {
    if (authLoading) return;

    const isAdmin = user && user.email === ADMIN_EMAIL;

    if (currentPage === "admin") {
      if (!user) {
        setCurrentPage("login");
      } else if (!isAdmin) {
        setCurrentPage("access-denied");
      }
    }
    
    if (currentPage === "login" && user) {
      if (isAdmin) {
        setCurrentPage("admin");
      } else {
        setCurrentPage("access-denied");
      }
    }
  }, [currentPage, user, authLoading]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleInquire = (productName: string) => {
    setInitialSubject(productName);
    setCurrentPage("contact");
  };

  const renderPage = () => {
    if (authLoading) {
      return (
        <div className="min-h-[80vh] flex items-center justify-center bg-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        </div>
      );
    }

    const isAdmin = user && user.email === ADMIN_EMAIL;

    switch (currentPage) {
      case "home": return <HomePage setCurrentPage={setCurrentPage} />;
      case "about": return <AboutPage setCurrentPage={setCurrentPage} />;
      case "services": return <ServicesPage setCurrentPage={setCurrentPage} />;
      case "products": return <ProductsPage onInquire={handleInquire} />;
      case "contact": return <ContactPage initialSubject={initialSubject} />;
      case "knowledge": return <KnowledgeHub setCurrentPage={setCurrentPage} />;
      case "login": return <LoginPage onLoginSuccess={() => setCurrentPage("admin")} />;
      case "admin": return isAdmin ? <AdminProductsPage /> : <LoginPage onLoginSuccess={() => setCurrentPage("admin")} />;
      case "access-denied": return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-white p-6 text-center">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m4-9a4 4 0 11-8 0 4 4 0 018 0zM15 17h.01M9 17h.01M12 12V9m0 0a1 1 0 00-1-1H9.414a1 1 0 00-.707.293L7 10.586m5-1.586a1 1 0 011-1h1.586a1 1 0 01.707.293L17 10.586" />
            </svg>
          </div>
          <h2 className="text-3xl font-black italic uppercase text-gray-900 mb-4 tracking-tighter transition-all">Security Protocol Activated</h2>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mb-10 max-w-md italic">Unauthorized login detected. Your credentials do not match administrative identification. Access to the control panel is restricted.</p>
          <button 
            onClick={() => setCurrentPage("home")}
            className="px-8 py-4 bg-gray-950 text-white font-bold tracking-widest uppercase text-[0.65rem] hover:bg-red-600 transition-all"
          >
            RETURN TO OPERATIONAL BASE
          </button>
        </div>
      );
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-red-100 selection:text-red-900 relative">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main>
        {renderPage()}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
      <WhatsAppFloating />
      
      {/* Global Accent Box */}
      <div className="absolute right-0 top-[70px] w-[5px] h-[150px] bg-red-600 hidden lg:block pointer-events-none z-[60]"></div>
    </div>
  );
}
