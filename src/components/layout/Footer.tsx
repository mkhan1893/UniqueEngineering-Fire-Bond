import { Page } from "../../types";
import logo from "../../images/logo.svg";

export const Footer = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  return (
    <footer className="bg-gray-950 text-white pt-24 pb-12 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-20">
          <div className="col-span-1">
            <div 
              className="flex items-center gap-5 mb-8 cursor-pointer group"
              onClick={() => setCurrentPage("home")}
            >
              <img
                src={logo}
                alt="Unique Engineering - Fire Bond Logo"
                className="h-20 w-auto transition-transform group-hover:scale-105"
              />
              <div>
                <h3 className="text-white font-black text-xl leading-tight uppercase italic tracking-tighter">
                  Unique Engineering <br /> <span className="text-red-600">Fire Bond</span>
                </h3>
              </div>
            </div>
            <p className="text-gray-400 text-[0.7rem] leading-relaxed font-bold uppercase tracking-widest italic max-w-xs opacity-90">
              Engineering legacy since 1996 + specialized fire safety execution launched in 2020. Providing mission-critical life safety infrastructure with verified endurance.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-10 text-red-600 italic">Core Navigator</h4>
            <ul className="space-y-4">
              {[
                { label: "Home", id: "home" },
                { label: "About Us", id: "about" },
                { label: "Systems & Services", id: "services" },
                { label: "Product Portfolio", id: "products" },
                { label: "Knowledge Hub", id: "knowledge" },
                { label: "Contact Execution", id: "contact" }
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => setCurrentPage(link.id as Page)}
                    className="text-gray-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-10 text-red-600 italic">Compliance Desk</h4>
            <ul className="space-y-4 text-gray-500 text-[0.65rem] font-bold uppercase tracking-widest leading-loose">
              <li>ISO 9001:2015 Registered</li>
              <li>BIS / ISI Certified Output</li>
              <li>NBC 2016 Compliant Systems</li>
              <li>NFPA Member Firm</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-10 text-red-600 italic">Regional HQ</h4>
            <div className="space-y-6">
              <p className="text-gray-500 text-[0.65rem] font-bold leading-relaxed tracking-widest uppercase italic">
                Gala No. 3, Hari Masjid Lane,<br />
                Khairani Road, Sakinaka,<br />
                Andheri East, Mumbai 400072
              </p>
              <div className="flex flex-col gap-3">
                <a 
                  href="tel:+917045372820"
                  className="inline-flex items-center gap-2 text-gray-500 text-[0.65rem] font-black uppercase tracking-widest hover:text-red-500 italic transition-colors"
                >
                  DIAL: +91 70453 72820
                </a>
                <a 
                  href="mailto:uniqueengg1976@gmail.com"
                  className="inline-flex items-center gap-2 text-gray-500 text-[0.65rem] font-black uppercase tracking-widest hover:text-red-500 italic transition-colors"
                >
                  MAIL: uniqueengg1976@gmail.com
                </a>
                <a 
                  href="https://wa.me/917045372820?text=Hi%2C%20I%20need%20fire%20safety%20solutions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#25D366] text-[0.65rem] font-black uppercase tracking-widest hover:underline italic mt-2"
                >
                  WhatsApp Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[0.6rem] font-bold uppercase tracking-[0.3em] text-gray-700">
            &copy; {new Date().getFullYear()} Unique Engineering - Fire Bond. Verified Industrial Operations.
          </div>
          <div className="flex gap-10">
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gray-700 cursor-pointer hover:text-red-600 transition-colors" onClick={() => window.location.hash = "/control-panel-firebond-1976"}>System Access</span>
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gray-700 cursor-pointer hover:text-red-600 transition-colors">Privacy Protocols</span>
            <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gray-700 cursor-pointer hover:text-red-600 transition-colors">Safety Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
