import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import sprinklerImage from "../images/Sprinkler.jpg";
import { Page } from "../types";

export const AboutPage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white"
    >
      {/* Section 1: Introduction */}
      <section className="py-20 sm:py-28 lg:py-32 bg-brand-surface border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
          <div className="max-w-4xl">
            <div className="section-accent-header">Technical Foundation</div>
            <h1 className="mb-10 leading-[0.92] sm:leading-[0.88] lg:leading-[0.85]">
              Unique Engineering - <span className="text-brand-primary">Fire Bond</span>.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-brand-text-muted leading-relaxed font-light italic">
              A unified industrial force where legacy engineering meets modern operational safety innovation. We deliver end-to-end engineered systems for high-stakes environments, securing infrastructure with multi-layered protection.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Unique Engineering (Legacy) */}
      <section className="py-20 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="section-accent-header lg:mx-0">
              Operational Legacy (Est. 1996)
            </div>
            <h2 className="mb-8 leading-tight italic uppercase tracking-tighter">Precision <span className="text-red-600">Infrastructure</span> Engineering</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0 font-light italic">
              Founded in 1996 under the leadership of Mr. Sayyed Salim, Unique Engineering established its technical authority through the development of mission-critical industrial machinery. Our legacy is built on structural durability and high-precision execution.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {[
                { title: "Fly Press Units", icon: true },
                { title: "Precision Shears", icon: true },
                { title: "Hydraulic Loaders", icon: true },
                { title: "Machinery Systems", icon: true }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-[0.65rem] font-black text-gray-900 bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-red-600/20 hover:bg-white transition-all uppercase tracking-widest italic group">
                  <CheckCircle2 className="w-4 h-4 text-red-600 transition-transform group-hover:scale-125" />
                  {item.title}
                </li>
              ))}
            </ul>
            <div className="p-8 sm:p-10 bg-red-50/50 rounded-3xl border border-red-100/50 inline-block">
              <div className="text-4xl sm:text-5xl font-black text-red-600 mb-2 tracking-tighter italic">210+</div>
              <div className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-red-800">Operational Installations Deployed</div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-8 border-[1.5px] border-red-600/10 rounded-[2.5rem] -z-10 translate-x-8 translate-y-8 blur-[1px]"></div>
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl group grayscale hover:grayscale-0 transition-all duration-700 bg-black">
              <img 
                src="https://images.unsplash.com/photo-1541888941259-792739460273?q=80&w=2600&auto=format&fit=crop" 
                alt="Engineering Authority" 
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Fire Bond (Modern Division) */}
      <section className="py-20 sm:py-28 lg:py-32 bg-gray-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 mt-12 lg:mt-0"
          >
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.4)] group">
              <img
                src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2600&auto=format&fit=crop"
                alt="Modern Fire Bond Infrastructure"
                className="w-full h-full object-cover brightness-50 transition-transform duration-[2s] group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black via-transparent to-transparent">
                <span className="text-white text-[0.65rem] sm:text-xs tracking-[0.3em] font-black uppercase italic">
                  OPERATIONAL SAFETY LAYERS: DEPLOYED
                </span>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <div className="section-accent-header !text-red-500 lg:mx-0">
              Fire Safety Systems (Est. 2020)
            </div>
            <h2 className="mb-8 leading-tight text-white italic uppercase tracking-tighter">Engineered <span className="text-red-600">Protection</span> Networks</h2>
            <p className="text-gray-100 text-lg leading-relaxed mb-12 font-light italic opacity-95">
              Launched in 2020 to architect next-generation safety for modern industry, Fire Bond specializes in BIS/ISI compliant suppression networks. Our vertically integrated model ensures every system component is vetted for mission-critical performance.
            </p>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-12">
              {["Audit & Mapping", "Systems Design", "Execution", "Lifecycle AMC"].map((step, i) => (
                <div key={i} className="flex flex-col gap-3 p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-red-600/30 transition-all duration-300">
                  <div className="text-red-600 font-black italic text-2xl tracking-tighter">PHASE_0{i+1}</div>
                  <div className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-white italic truncate">{step}</div>
                </div>
              ))}
            </div>
            <div className="p-8 sm:p-12 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-between group overflow-hidden relative">
              <div className="absolute -right-8 -bottom-8 text-9xl font-black text-white/5 italic select-none group-hover:text-red-600/10 transition-colors pointer-events-none">10K</div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tighter italic">10,000+</div>
                <div className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-200 italic">Operational Modules Commissioned</div>
              </div>
              <CheckCircle2 className="w-16 h-16 text-red-600 opacity-20 relative z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Operational Synergy */}
      <section className="py-20 sm:py-28 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 lg:mb-24">
          <div className="section-accent-header mx-auto">
            Operational Synergy
          </div>
          <h2 className="mb-8 leading-none italic uppercase tracking-tighter">The <span className="text-red-600">Unified</span> Execution Model</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg sm:text-xl font-light leading-relaxed italic">
            By synthesizing legacy engineering strength with modern life safety networks, Unique Engineering - Fire Bond provides a high-authority technical partnership for industrial security.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Systemic Integration", desc: "From foundation hardware to electronic detection, we manage the entire asset lifecycle." },
            { title: "Accelerated Deployment", desc: "In-house manufacturing of critical components reduces lead times for complex installations." },
            { title: "Technical Verification", desc: "Every system is pressure-tested to exceed BIS/ISI, ISO, and NBC benchmarks." }
          ].map((item, i) => (
            <div key={i} className="p-10 sm:p-12 bg-gray-50/50 border border-transparent hover:border-red-600/20 hover:bg-white hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] group">
              <h3 className="text-lg sm:text-xl font-black mb-6 italic uppercase tracking-tight text-gray-900 group-hover:text-red-600 transition-colors leading-tight">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: The Mission */}
      <section className="py-20 sm:py-28 lg:py-32 bg-brand-surface border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="section-accent-header mx-auto">Operational Directive</div>
          <h2 className="mb-12 max-w-5xl mx-auto leading-[0.92] sm:leading-[0.88] italic uppercase tracking-tighter">
            PRESERVING <span className="text-brand-primary">INDUSTRIAL CONTINUITY</span> THROUGH ENGINEERING PRECISION.
          </h2>
          <button 
            className="industrial-btn mx-auto scale-110 sm:scale-125 !px-12 !py-6 shadow-2xl shadow-red-600/30" 
            onClick={() => setCurrentPage("contact")}
          >
            INITIATE TECHNICAL CONSULTATION
          </button>
        </div>
      </section>
    </motion.div>
  );
};
