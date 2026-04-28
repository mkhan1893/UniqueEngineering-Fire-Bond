import { motion } from "motion/react";
import fireHydrantImage from "../images/fire-hydrant.jpg";
import { Page } from "../types";

export const HomePage = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white"
    >
    {/* Hero Section */}
      <section className="bg-gradient-to-br from-black via-gray-950 to-red-950/20 text-white relative min-h-[95vh] flex items-center overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-10"></div>
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 5 }}
          src="https://images.unsplash.com/photo-1541888941259-792739460273?q=80&w=2600&auto=format&fit=crop" 
          alt="Deployed Infrastructure Background" 
          className="w-full h-full object-cover grayscale opacity-30"
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 z-20 w-full relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* LEFT: TEXT */}
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-[620px]"
          >

            <div className="flex items-center gap-4 text-red-600 font-extrabold uppercase tracking-[0.4em] text-[0.65rem] mb-6">
              <span className="w-10 h-[1.5px] bg-red-600"></span>
              ENGINEERING STATUS: ACTIVE
            </div>

            <h1 className="mb-6 leading-[1] text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold uppercase italic">
              <span className="text-white block">ENGINEERED</span>
              <span className="text-red-600 block">SYSTEMS</span>
              <span className="text-white block">FOR INFRASTRUCTURE</span>
            </h1>

            <p className="text-gray-300 text-base sm:text-lg max-w-lg leading-relaxed font-light mt-6">
              Unique Engineering - Fire Bond delivers high-integrity operational safety layers for high-stakes industrial environments across the Indian subcontinent.
            </p>

            <div className="mt-10">
              <button 
                onClick={() => setCurrentPage("contact")}
                className="px-8 py-4 bg-red-600 text-white font-bold tracking-widest uppercase text-[0.7rem] hover:bg-red-700 transition-all shadow-lg shadow-red-600/20"
              >
                SYSTEMS AUDIT INQUIRY
              </button>
            </div>
          </motion.div>

        {/* RIGHT: IMAGE */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[460px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">

            <img 
              src={fireHydrantImage} 
              alt="Industrial Fire System" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

            <div className="absolute bottom-6 left-6">
              <span className="bg-red-600 text-white text-[0.65rem] px-5 py-2 font-bold tracking-wider uppercase rounded-full">
                BIS COMPLIANT SYSTEMS
              </span>
            </div>

          </div>
        </motion.div>

      </div>
    </div>

    {/* Bottom Stats */}
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-xl border-t border-white/10"
    >
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-xl border-t border-white/10 py-8">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-0 text-center">

    {[
      { label: "Legacy", value: "1996", prefix: "EST." },
      { label: "Units Deployed", value: "10K+" },
      { label: "Installations", value: "210+" },
      { label: "Operational Reach", value: "Pan-India" }
    ].map((stat, i) => (
      
      <div key={i} className="relative group px-6 md:px-10">

        {/* Divider (desktop only) */}
        {i !== 0 && (
          <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-white/10"></div>
        )}

        {/* Label */}
        <div className="text-[0.65rem] tracking-[0.3em] uppercase text-red-500 mb-2 font-semibold">
          {stat.label}
        </div>

        {/* Value */}
        <div className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          {stat.prefix && <span className="text-gray-400 mr-1">{stat.prefix}</span>}
          {stat.value}
        </div>

        {/* Subtle hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-red-600/5 rounded-lg"></div>

      </div>
    ))}
    
  </div>
</div>
  </motion.div>

</section>

      {/* Strategic Decision Section */}
      <section className="py-20 sm:py-28 lg:py-32 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-4xl mx-auto mb-20 lg:mb-24">
            <div className="section-accent-header">Operational Mapping</div>
            <h2 className="mb-8 leading-tight italic uppercase tracking-tighter">Complete Fire Safety <span className="text-red-600">Products Supply</span>, Installation & Service</h2>
            <p className="text-gray-500 font-light text-lg italic">Identify your mission-critical requirements to initiate our integrated engineering workflow.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              { 
                id: "01", 
                title: "Compliance & Audit", 
                desc: "Full NBC 2016 and BIS regulatory mapping for existing infrastructure.",
                link: "services",
                accent: "REGULATORY"
              },
              { 
                id: "02", 
                title: "System Deployment", 
                desc: "Precision engineering and installation of advanced suppression networks.",
                link: "products",
                accent: "INSTALLATION"
              },
              { 
                id: "03", 
                title: "Lifecycle Maintenance", 
                desc: "Strategic AMC contracts ensuring constant operational readiness of core assets.",
                link: "services",
                accent: "CONTINUITY"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group p-10 lg:p-14 bg-gray-50/50 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
              >
                <div className="text-9xl font-black text-gray-200/40 absolute -top-4 -right-12 sm:-right-4 italic transition-colors group-hover:text-red-600/10 select-none pointer-events-none">{item.id}</div>
                <div className="relative z-10">
                  <div className="text-red-600 text-[0.6rem] font-black tracking-[0.3em] uppercase mb-6 italic">{item.accent}</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-6 uppercase italic tracking-tighter leading-none">{item.title}</h3>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed mb-10 max-w-[80%]">{item.desc}</p>
                  <button 
                    onClick={() => setCurrentPage("contact")}
                    className="flex items-center gap-4 text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-900 group-hover:text-red-600 transition-colors"
                  >
                    IDENTIFY SERVICE <div className="w-8 h-[1.5px] bg-gray-900 group-hover:bg-red-600 group-hover:w-16 transition-all"></div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    {/* Why Choose Us & Risk Section Container */}
    <section className="py-20 sm:py-28 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-accent-header">Technical Authority</div>
            <h2 className="mb-8 leading-none italic uppercase">
              Engineering Force <span className="text-red-600">Operational Safety</span> Layers
            </h2>
            <p className="text-gray-600 text-lg sm:text-xl font-light mb-12 italic">
              Unique Engineering - Fire Bond is built on decades of technical authority. We don't just assemble components; we engineer safety from the ground up, ensuring industrial-grade resilience for your most valuable assets.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {[
                { title: "Systemic Depth", desc: "Since 1996, our expertise in high-pressure infrastructure informs every safety design." },
                { title: "BIS Verification", desc: "Rigorous adherence to BIS/ISI and NBC standards in every deployment." },
                { title: "Structural Logic", desc: "Vertically integrated manufacturing ensures faster delivery and total quality control." },
                { title: "Lifecycle Strategy", desc: "From conceptual design to commissioning and multi-year maintenance audits." }
              ].map((reason, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="text-red-600 font-extrabold italic text-sm transition-transform duration-300 group-hover:scale-125">/0{i+1}</div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 uppercase tracking-widest text-[0.7rem] mb-2">{reason.title}</h4>
                    <p className="text-[0.8rem] text-gray-500 leading-relaxed font-medium">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-8 border-[1.5px] border-red-600/10 rounded-[2.5rem] -z-10 translate-x-8 translate-y-8 blur-[1px]"></div>
            <div className="rounded-[2.5rem] overflow-hidden shadow-[-40px_40px_80px_rgba(0,0,0,0.1)] group bg-black">
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2600&auto=format&fit=crop" 
                alt="Industrial Engineering System" 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-bottom p-12">
                 <div className="mt-auto">
                    <div className="text-red-600 text-[0.6rem] font-black uppercase tracking-[0.3em] mb-4">ENGINEERING LOG</div>
                    <div className="text-white text-xl font-black italic uppercase tracking-tighter">Precision Deployed: High-Scale Industrial Hydrant Integration</div>
                 </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Risk-Based Exposure Section */}
        <div className="mb-40 relative">
          <div className="absolute -left-12 top-0 bottom-0 w-1 bg-red-600/20"></div>
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="section-accent-header">Risk Mapping</div>
              <h2 className="mb-10 leading-[0.9] text-gray-950 uppercase italic tracking-tighter">Systemic Exposure: <span className="text-red-600">The Cost</span> of Failure.</h2>
              <p className="text-gray-500 text-lg sm:text-xl font-light mb-12 italic border-l-4 border-red-600 pl-8">
                In industrial infrastructure, fire safety is not an amenity—it is a survival layer. System failure triggers a cascade of catastrophic consequences.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
               {[
                 { title: "Operational Downtime", desc: "Total halt of manufacturing lines costing millions in lost output and supply chain breakage.", icon: "01" },
                 { title: "Asset Liquidation", desc: "Irreversible thermal damage to specialized machinery and high-value industrial inventory.", icon: "02" },
                 { title: "Regulatory Penalties", desc: "Cessation of operations due to non-compliance with NBC 2016 and BIS mandates.", icon: "03" },
                 { title: "Reputational Erosion", desc: "Permanent loss of partner trust and insurance coverage eligibility due to system negligence.", icon: "04" }
               ].map((risk, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="p-10 bg-brand-surface border border-brand-border rounded-3xl group hover:border-red-600/30 transition-all"
                 >
                   <div className="text-red-600 font-black text-4xl mb-6 italic opacity-20 group-hover:opacity-100 transition-opacity tracking-tighter">{risk.icon}</div>
                   <h4 className="text-gray-900 font-black uppercase text-sm mb-4 tracking-widest">{risk.title}</h4>
                   <p className="text-gray-500 text-[0.8rem] leading-relaxed font-medium">{risk.desc}</p>
                 </motion.div>
               ))}
            </div>
          </div>
        </div>

        {/* Process Visualization Component */}
        <div className="pt-20 border-t border-gray-100">
          <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32">
            <div className="section-accent-header">The Fire Bond Framework</div>
            <h2 className="mb-8 leading-tight uppercase italic tracking-tighter">Unified <span className="text-red-600">Execution</span> Pipeline</h2>
            <p className="text-gray-500 font-light text-lg">Our structured engineering workflow ensures every deployment is mission-ready.</p>
          </div>

          <div className="relative">
            {/* Connector Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-gray-100 -translate-y-1/2 hidden lg:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-1 relative z-10">
              {[
                { step: "01", title: "Technical Audit", desc: "Mapping industrial risk and existing compliance gaps." },
                { step: "02", title: "Systemic Design", desc: "Engineering the multi-layered suppression architecture." },
                { step: "03", title: "Deployment", desc: "Precision installation of BIS-certified hardware layers." },
                { step: "04", title: "Stress Testing", desc: "Simulated load testing to verify operational response." },
                { step: "05", title: "Continuity", desc: "Managed maintenance audits for total lifecycle safety." }
              ].map((phase, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-10 text-center lg:text-left hover:bg-gray-50 transition-all group"
                >
                  <div className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center font-black italic text-xl mx-auto lg:mx-0 mb-8 shadow-xl shadow-red-600/20 group-hover:scale-110 transition-transform">
                    {phase.step}
                  </div>
                  <h4 className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-gray-900 mb-4">{phase.title}</h4>
                  <p className="text-gray-500 text-[0.75rem] leading-relaxed font-bold italic group-hover:text-red-600 transition-colors uppercase tracking-tight">{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Sector Expertise Summary */}
    <section className="py-20 sm:py-28 lg:py-32 bg-gray-950 text-white overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <div className="section-accent-header !text-red-500 lg:mx-0">Market Reach</div>
            <h2 className="mb-10 leading-none italic uppercase tracking-tighter"><span className="text-white">Serving High-Density</span> <span className="text-red-600">Industrial</span> <span className="text-white">Assets</span></h2>
            <p className="text-gray-100 text-lg sm:text-xl font-light mb-12 max-w-lg mx-auto lg:mx-0 opacity-90 leading-relaxed italic">
              Our solutions are engineered for environments where failure is not a secondary thought. We secure infrastructure across the Indian subcontinent with verified endurance.
            </p>
            <div className="grid grid-cols-2 gap-4 lg:max-w-md">
              {[
                "Machinery Plants",
                "Pharma Facilities",
                "Logistics Hubs",
                "Commercial Hubs"
              ].map((sector, i) => (
                <div key={i} className="flex items-center justify-center lg:justify-start gap-4 bg-white/5 p-5 border border-white/10 text-[0.65rem] sm:text-[0.7rem] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-red-600/10 hover:border-red-600/30">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                  {sector}
                </div>
              ))}
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-6 sm:gap-10">
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="pt-12 lg:pt-20"
            >
               <div className="bg-red-600 p-8 sm:p-12 rounded-[2.5rem] mb-10 shadow-[0_50px_100px_rgba(220,38,38,0.2)]">
                  <div className="text-3xl sm:text-5xl font-black italic mb-3 tracking-tighter">10K+</div>
                  <div className="text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.2em]">Safety modules deployed</div>
               </div>
               <div className="rounded-[2.5rem] overflow-hidden aspect-[3/4] grayscale opacity-40">
                <img src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?q=80&w=2600&auto=format&fit=crop" referrerPolicy="no-referrer" alt="Facility" className="w-full h-full object-cover" />
               </div>
            </motion.div>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
               <div className="rounded-[2.5rem] overflow-hidden aspect-[3/4] grayscale opacity-40 mb-10">
                <img src="https://images.unsplash.com/photo-1541888941259-792739460273?q=80&w=2600&auto=format&fit=crop" referrerPolicy="no-referrer" alt="Testing" className="w-full h-full object-cover" />
               </div>
               <div className="bg-white/5 p-8 sm:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
                  <div className="text-3xl sm:text-5xl font-black italic mb-3 tracking-tighter text-red-600">210+</div>
                  <div className="text-[0.55rem] sm:text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gray-400">Engineering installs</div>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
    </motion.div>
  );
};
