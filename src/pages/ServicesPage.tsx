import { motion } from "motion/react";
import { Page } from "../types";

export const ServicesPage = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white"
    >
      <section className="py-24 sm:py-32 lg:py-40 bg-brand-surface border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
          <div className="max-w-4xl">
            <div className="section-accent-header">Our Capabilities</div>
            <h1 className="mb-10 leading-[0.92] sm:leading-[0.88] lg:leading-[0.85] text-5xl sm:text-7xl lg:text-8xl italic uppercase tracking-tighter">
              Complete Fire Safety <span className="text-brand-primary">Products Supply</span>, Installation & Service.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-brand-text-muted leading-relaxed font-light italic">
              Unique Engineering - Fire Bond provides high-integrity risk mitigation through verified detection networks, high-volume suppression hardware, and precision engineering.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {[
              {
                title: "Suppression Hardware",
                desc: "Strategic deployment of BIS/ISI certified hardware, including high-capacity CO2 and clean agent suppression units for critical electrical and machinery assets."
              },
              {
                title: "Detection Networks",
                desc: "Sophisticated addressable detection systems engineered for millisecond response times in high-occupancy industrial environments."
              },
              {
                title: "Hydrant Engineering",
                desc: "Consultation and execution of high-pressure hydrant networks, arterial industrial pipelines, and multi-stage pumping configurations."
              },
              {
                title: "Automated Sprinklers",
                desc: "Precision-calculated automatic thermal response architectures designed for immediate activation in specialized logistics and pharma hubs."
              },
              {
                title: "Execution & Commissioning",
                desc: "Full-scale onsite installation managed by technical fire engineering leads, ensuring strict alignment with NBC 2016 mandates."
              },
              {
                title: "System Integrity (AMC)",
                desc: "Structured Annual Maintenance Contracts focused on predictive auditing, component fatigue analysis, and continuous regulatory compliance."
              }
            ].map((service, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="bg-gray-50/50 p-10 sm:p-14 border border-transparent hover:border-red-600/20 hover:bg-white hover:shadow-2xl transition-all duration-500 overflow-hidden group"
              >
                <div className="text-[0.65rem] sm:text-[0.7rem] font-black text-red-600 italic mb-8 tracking-[0.2em] uppercase">DOMAIN_0{idx + 1}</div>
                <h3 className="mb-6 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-[0.85rem] font-medium">
                  {service.desc}
                </p>
                <div className="w-12 h-[2px] bg-red-600 mt-10 transition-all duration-500 group-hover:w-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Grid Detail */}
      <section className="py-24 sm:py-32 lg:py-40 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <div className="text-center lg:text-left">
              <div className="section-accent-header !text-brand-primary lg:mx-0">Compliance First</div>
              <h2 className="mb-8 leading-tight text-white uppercase italic tracking-tighter">Rigorous Standards Implementation</h2>
              <p className="text-gray-100 text-lg sm:text-xl leading-relaxed font-light italic opacity-95">
                Our integration process follows a strict engineering checklist derived from NFPA benchmarks and local fire safety codes, ensuring every component performs under extreme pressure.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-12 lg:mt-0">
              {[
                "Hydraulic Modeling",
                "Computational Modeling",
                "Pressure Flow Analysis",
                "Compliance Auditing"
              ].map((tech, idx) => (
                <div key={idx} className="p-10 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-red-600/30 transition-all duration-300 flex items-center justify-center text-center rounded-[2rem]">
                  <span className="text-[0.6rem] sm:text-[0.65rem] font-black uppercase tracking-[0.2em] leading-tight italic">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 text-center">
            <button 
              onClick={() => setCurrentPage("contact")}
              className="industrial-btn !px-12 !py-6 shadow-2xl shadow-red-600/20"
            >
              REQUEST COMPLIANCE MAPPING
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
