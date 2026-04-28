import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Page } from "../types";
import { 
  ShieldCheck, 
  FileText, 
  Droplets, 
  FlameKindling, 
  Settings, 
  AlertTriangle,
  CheckSquare,
  XCircle,
  ExternalLink,
  ChevronRight,
  Search,
  Filter,
  Calendar,
  BadgeCheck,
  Building2,
  Factory,
  Zap,
  Info
} from "lucide-react";

type Topic = {
  id: string;
  title: string;
  category: "NBC Guidelines" | "BIS Standards" | "Fire NOC Process" | "Industrial Compliance" | "State Rules";
  icon: any;
  summary: string;
  explanation: string;
  practicalImpact: string;
  requirements: string[];
  checklist: string[];
  mistakes: string[];
  risks: string;
  cta: string;
  lastUpdated: string;
};

const KNOWLEDGE_TOPICS: Topic[] = [
  {
    id: "noc",
    title: "Fire NOC Requirements",
    category: "Fire NOC Process",
    icon: FileText,
    summary: "Essential certification for building occupancy and legal compliance.",
    explanation: "A Fire No Objection Certificate (NOC) is a mandatory document issued by the Fire Department, certifying that a building is equipped with required safety measures as per the National Building Code (NBC).",
    practicalImpact: "Without a valid NOC, your facility cannot legally operate, and insurance providers will typically reject any fire-related claims. It is your primary shield against legal liability.",
    requirements: [
      "Building plan approval from local municipal corporation.",
      "Installation of fire extinguishing systems (hydrants, extinguishers, sprinklers).",
      "Clear emergency exit pathways and fire-resistant doors.",
      "Current electrical stability certificate from a licensed auditor."
    ],
    checklist: [
      "Submit application with detailed building architect drawings.",
      "Verify all safety systems are in working 'Auto' mode.",
      "Schedule inspection with the local Fire Officer.",
      "Obtain the Provisional NOC before construction and Final NOC before occupancy."
    ],
    mistakes: [
      "Blocking fire exits with inventory or structural changes.",
      "Failing to renew the NOC annually or bi-annually as per local state laws.",
      "Mismatch between submitted plans and actual site installation."
    ],
    risks: "Non-compliance leads to hefty legal penalties, sealing of the building, and total rejection of insurance claims in case of an incident.",
    cta: "Request a Compliance Audit",
    lastUpdated: "April 15, 2026"
  },
  {
    id: "nbc-2016",
    title: "NBC 2016 Part 4",
    category: "NBC Guidelines",
    icon: ShieldCheck,
    summary: "The definitive standard for fire and life safety in India.",
    explanation: "The National Building Code of India 2016, Part 4, outlines strictly enforced requirements for fire prevention, life safety, and fire protection. It classifies buildings by hazard levels and specifies exact equipment needed.",
    practicalImpact: "Engineering designs must strictly adhere to these calculations. Even a 5% deviation in pipeline pressure or exit width can result in non-compliance during government audits.",
    requirements: [
      "Mandatory classification of occupancy (Group A to J).",
      "Calculated number of exits based on travel distance.",
      "Automatic fire detection in all high-hazard zones.",
      "Fire lift installation for buildings above 15m height."
    ],
    checklist: [
      "Verify building classification under Group G (Industrial) or J (Hazardous).",
      "Calculate 'Occupant Load' to determine staircase capacity.",
      "Install smoke-sealed escape routes.",
      "Conduct baseline fire safety audit twice a year."
    ],
    mistakes: [
      "Assuming high-rise norms don't apply to large-footprint industrial sheds.",
      "Using non-fire-rated glass for cabin partitions.",
      "Installing detection only in common areas while ignoring production floors."
    ],
    risks: "Critical failure of life safety systems during mass evacuation. Severe criminal liability for facility owners.",
    cta: "Download NBC Summary Guide",
    lastUpdated: "January 10, 2026"
  },
  {
    id: "hydrant-bis",
    title: "Fire Hydrant Systems (IS 13039)",
    category: "BIS Standards",
    icon: Droplets,
    summary: "Technical benchmarks for high-pressure industrial hydrant networks.",
    explanation: "IS 13039:2014 specifies the criteria for selection, operation, and maintenance of hydrant systems. It defines the flow rates and pressure requirements (usually 7kg/cm² at the furthest point).",
    practicalImpact: "A hydrant system is useless without pressure. This standard ensures that even if several hydrants are opened simultaneously, the pumps can deliver the required water volume to suppress a major conflagration.",
    requirements: [
      "BIS certified landing valves and hose couplings.",
      "Minimum pipe diameter of 150mm for industrial hydrant mains.",
      "External hydrants spaced at 30m intervals along the ring main.",
      "Main fire pump capable of delivering 2850 liters per minute."
    ],
    checklist: [
      "Check pump set batteries and fuel level daily.",
      "Run the diesel pump for 15 minutes weekly to prevent engine seizure.",
      "Inspect hose boxes for presence of nozzles and functional hose pipes.",
      "Clean strainer and foot valve once every 3 months."
    ],
    mistakes: [
      "Installing low-grade pipes that corrode and burst under high pressure.",
      "Over-relying on electric pumps without a robust diesel backup.",
      "Connecting non-fire usage pipelines (garden/cleaning) to the fire main."
    ],
    risks: "Loss of fire control due to pipeline burst or engine failure during a crisis. Total facility loss.",
    cta: "Request Hydrant Maintenance",
    lastUpdated: "March 22, 2026"
  },
  {
    id: "industrial-safety",
    title: "Hazardous Materials Handling",
    category: "Industrial Compliance",
    icon: Factory,
    summary: "Storage and suppression standards for flammable chemicals and gases.",
    explanation: "Industrial sites storing hazardous materials must implement localized suppression (CO2 flooding or Clean Agent) and specialized foam-based systems for liquid fire hazards.",
    practicalImpact: "Standard water-based systems can worsen chemical fires. Correct classification of your hazard type prevents your suppression system from becoming a liability during an incident.",
    requirements: [
      "Explosion-proof electrical fittings in solvent storage zones.",
      "Automatic CO2 flooding for enclosed generator sets.",
      "Double-walled storage for highly flammable liquids.",
      "Emergency grounding for all static-prone machinery."
    ],
    checklist: [
      "Review Material Safety Data Sheets (MSDS) for fire response types.",
      "Verify automated shutdown triggers for gas-flow valves.",
      "Conduct monthly leak detection for stored chemical pressure vessels.",
      "Ensure spill containment trays are empty and functional."
    ],
    mistakes: [
      "Storing incompatible chemicals in the same fire compartment.",
      "Lack of remote-activated suppression for remote storage sheds.",
      "Ignoring the maintenance of fire-break walls between production units."
    ],
    risks: "Chemical explosions causing large-scale collateral damage and long-term environmental contamination legal cases.",
    cta: "Industrial Risk Mapping",
    lastUpdated: "December 05, 2025"
  },
  {
    id: "maharashtra-rules",
    title: "Maharashtra Fire Safety Act",
    category: "State Rules",
    icon: Building2,
    summary: "Specific amendments and enforcement rules for Maharashtra-based facilities.",
    explanation: "The Maharashtra Fire Prevention and Life Safety Measures Act, 2006, mandates that owners must provide a 'Form B' certificate twice a year (January & July) from a licensed agency.",
    practicalImpact: "This is a recurring compliance task. Missing a 'Form B' submission can lead to electricity/water disconnection and legal notices from the municipal corporation.",
    requirements: [
      "Compulsory Form B submission every 6 months.",
      "Audit by a Licensed Agency approved by Maharashtra Fire Services.",
      "Payment of fire cess for high-rise or high-hazard structures.",
      "Local language (Marathi) signage for fire escapes where required."
    ],
    checklist: [
      "Engage a licensed agency (like Unique Engineering) for audit.",
      "Resolve all internal defects before the inspection date.",
      "Upload digital copy of Form B to the state portal.",
      "Maintain hard copy at the security cabin for immediate inspection."
    ],
    mistakes: [
      "Delaying audit until after the January/July deadlines.",
      "Assuming a Fire NOC replaces the need for Form B.",
      "Hiring agencies not listed on the Maharashtra Fire Service portal."
    ],
    risks: "Sealing of premises by local fire authority and massive fines for non-submission of Form B.",
    cta: "Get Form B Compliance Audit",
    lastUpdated: "Feb 15, 2026"
  }
];

const COMPLIANCE_REQUIREMENTS = {
  industrial: [
    "High-Pressure Hydrant Ring Main (IS 13039)",
    "Automatic Sprinkler System for Warehousing",
    "Diesel Backed Main Fire Pumps",
    "Localized CO2 Flooding for Server/Electrical Rooms",
    "Manual Call Points and PA System"
  ],
  commercial: [
    "Addressable Smoke Detection System",
    "Wired Fire Alarm Networks",
    "Emergency Battery-Backed Exit Signage",
    "Fire-Rated Doors for Stairwell Enclosures",
    "ABC Type Extinguishers (IS 15683)"
  ],
  residential: [
    "Wet Riser / Downcomer System",
    "Hose Reel Stations on each floor",
    "Smoke Detection in Common Areas",
    "Fire Lift with Dedicated Power Source",
    "Staff Training for Resident Fire Safety"
  ]
};

const ComplianceChecker = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  const [facilityType, setFacilityType] = useState<keyof typeof COMPLIANCE_REQUIREMENTS | null>(null);

  return (
    <div className="bg-gray-950 p-10 sm:p-14 rounded-[3rem] border border-white/10 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-12 opacity-5">
        <ShieldCheck className="w-48 h-48 text-white rotate-12" />
      </div>

      <div className="relative z-10">
        <div className="section-accent-header !text-red-500 lg:mx-0">Self-Diagnostic Tool</div>
        <h3 className="text-3xl sm:text-4xl font-black italic text-white uppercase tracking-tighter mb-8">Check Your <span className="text-red-600">Compliance</span></h3>
        
        <p className="text-gray-400 text-sm mb-10 max-w-xl italic">
          Select your facility category to view the baseline engineering requirements mandated by the National Building Code (NBC 2016).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {(Object.keys(COMPLIANCE_REQUIREMENTS) as Array<keyof typeof COMPLIANCE_REQUIREMENTS>).map((type) => (
            <button
              key={type}
              onClick={() => setFacilityType(type)}
              className={`p-6 rounded-2xl border transition-all text-center group/btn ${
                facilityType === type 
                ? "bg-red-600 border-red-600 text-white" 
                : "bg-white/5 border-white/10 text-gray-400 hover:border-red-600/30 hover:text-white"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                {type === "industrial" && <Factory className="w-6 h-6" />}
                {type === "commercial" && <Building2 className="w-6 h-6" />}
                {type === "residential" && <Zap className="w-6 h-6" />}
                <span className="text-[0.65rem] font-black uppercase tracking-widest">{type}</span>
              </div>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {facilityType ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key={facilityType}
              className="bg-white/5 border border-white/10 rounded-3xl p-8"
            >
              <h4 className="text-red-500 text-[0.6rem] font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2 italic">
                <CheckSquare className="w-4 h-4" /> Baseline Mandates for {facilityType.toUpperCase()}
              </h4>
              <ul className="grid sm:grid-cols-2 gap-4">
                {COMPLIANCE_REQUIREMENTS[facilityType].map((req, i) => (
                  <li key={i} className="flex gap-4 text-xs text-gray-300 font-bold uppercase tracking-tight italic">
                    <span className="text-red-600">»</span>
                    {req}
                  </li>
                ))}
              </ul>
              <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                <p className="text-gray-500 text-[0.6rem] font-medium max-w-sm italic">
                  Note: Actual requirements may vary based on exact square footage, height, and specific hazard activity within {facilityType} zones.
                </p>
                <button 
                  onClick={() => setCurrentPage("contact")}
                  className="bg-white text-gray-950 px-8 py-3 rounded-full text-[0.6rem] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-xl shadow-white/5"
                >
                  Request Onsite Audit
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center py-10 border-2 border-dashed border-white/5 rounded-3xl">
              <span className="text-gray-600 text-[0.7rem] font-bold uppercase tracking-widest italic flex items-center gap-3">
                <Info className="w-4 h-4" /> Select category to scan compliance
              </span>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const KnowledgeHub = ({ setCurrentPage }: { setCurrentPage: (page: Page) => void }) => {
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All Domains");
  const contentRef = useRef<HTMLElement>(null);

  const categories = ["All Domains", "NBC Guidelines", "BIS Standards", "Fire NOC Process", "Industrial Compliance", "State Rules"];

  const filteredTopics = useMemo(() => {
    return KNOWLEDGE_TOPICS.filter(t => {
      const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            t.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            t.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All Domains" || t.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const activeTopic = KNOWLEDGE_TOPICS.find(t => t.id === activeTopicId);

  const handleTopicView = (id: string) => {
    setActiveTopicId(id);
    if (contentRef.current) {
      window.scrollTo({ top: contentRef.current.offsetTop - 100, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white"
    >
      {/* Premium Header */}
      <section className="py-24 sm:py-32 lg:py-40 bg-gray-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 z-0">
          <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '60px 60px' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-6 mb-10">
              <div className="section-accent-header !text-red-500 !m-0">Technical Intelligence</div>
              <div className="flex items-center gap-2 text-gray-500 text-[0.6rem] font-bold uppercase tracking-[0.2em]">
                <Calendar className="w-3 h-3 text-red-600" />
                Last Updated: April 23, 2026
              </div>
            </div>
            
            <h1 className="mb-10 leading-[0.92] sm:leading-[0.88] lg:leading-[0.85] italic uppercase tracking-tighter text-white">
              Fire Safety <span className="text-red-600">Knowledge Hub</span>.
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed font-light italic max-w-3xl">
              High-authority intelligence on National Building Code (NBC), BIS hardware standards, and state-specific operational safety rules for industrial infrastructure.
            </p>

            {/* Credibility Badges */}
            <div className="flex flex-wrap gap-8 mt-12 pt-12 border-t border-white/5">
              <div className="flex items-center gap-3">
                <BadgeCheck className="w-6 h-6 text-red-600" />
                <span className="text-[0.65rem] font-black uppercase tracking-widest text-white italic">Verified by Chartered Fire Engineers</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-red-600" />
                <span className="text-[0.65rem] font-black uppercase tracking-widest text-white italic">Aligned with NBC 2016 & BIS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates Section (Visually Prominent) */}
      <section className="bg-red-600 text-white py-12 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-xl">
                 <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter italic">Regulatory Alert: Q2 Update</h3>
                <p className="text-[0.7rem] font-bold uppercase tracking-widest opacity-90 mt-1">Recent changes in Maharashtra Fire Safety Act Form-B portal.</p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-x-12 gap-y-2 text-[0.65rem] font-black uppercase tracking-widest">
               <li className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                 Digitization of Form B submission
               </li>
               <li className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                 Mandatory sprinkler density increase for Tier-1 Warehousing
               </li>
            </ul>
         </div>
      </section>

      {/* Main Resource Search & Grid */}
      <section ref={contentRef} className="py-24 sm:py-32 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-10 justify-between items-start lg:items-end mb-20 shadow-sm border border-gray-50 p-10 rounded-[3rem]">
             <div className="w-full lg:w-1/2">
               <h3 className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-red-600 mb-8 italic">Search & Filtering</h3>
               <div className="relative">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Search regulations, standards, or processes..."
                   className="w-full pl-16 pr-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-red-600/30 font-bold text-gray-900 transition-all"
                 />
               </div>
             </div>

             <div className="flex flex-wrap gap-2">
               {categories.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setActiveCategory(cat)}
                   className={`px-6 py-3 rounded-full text-[0.65rem] font-black uppercase tracking-widest transition-all ${
                     activeCategory === cat 
                     ? "bg-gray-950 text-white shadow-xl shadow-gray-950/20" 
                     : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                   }`}
                 >
                   {cat}
                 </button>
               ))}
             </div>
          </div>

          <AnimatePresence mode="popLayout">
            {activeTopicId ? (
              // Detailed View
              <motion.div
                key="detail"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="max-w-5xl mx-auto"
              >
                <button 
                  onClick={() => setActiveTopicId(null)}
                  className="mb-12 flex items-center gap-3 text-red-600 font-extrabold uppercase tracking-widest text-[0.65rem] italic hover:-translate-x-2 transition-transform"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" /> Back to Intelligence Index
                </button>

                <div className="space-y-20 lg:space-y-32">
                  <div className="grid lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-8">
                       <div className="flex items-center gap-4 text-red-600 font-extrabold uppercase tracking-[0.4em] text-[0.6rem] mb-6">
                         <span className="w-10 h-[1.5px] bg-red-600"></span>
                         COMPLIANCE_DOMAIN: {activeTopic!.category.toUpperCase()}
                       </div>
                       <h2 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter text-gray-950 mb-10 leading-[0.9]">
                         {activeTopic!.title}
                       </h2>
                       <p className="text-gray-600 text-lg sm:text-xl font-light italic leading-relaxed pl-10 border-l-4 border-red-600">
                         {activeTopic!.explanation}
                       </p>
                    </div>
                    <div className="lg:col-span-4 bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100">
                       <h4 className="text-gray-950 font-black uppercase tracking-widest text-[0.7rem] mb-6 italic flex items-center gap-3">
                         <Info className="w-4 h-4 text-red-600" /> Practical Impact
                       </h4>
                       <p className="text-gray-500 text-sm font-medium italic leading-relaxed">
                         {activeTopic!.practicalImpact}
                       </p>
                    </div>
                  </div>

                  {/* Requirements & Checklist Grid */}
                  <div className="grid sm:grid-cols-2 gap-12">
                     <div>
                       <h4 className="flex items-center gap-3 text-[0.7rem] font-black uppercase tracking-[0.2em] text-gray-900 mb-8 italic">
                         <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                         Engineering Requirements
                       </h4>
                       <ul className="space-y-6">
                         {activeTopic!.requirements.map((req, i) => (
                           <li key={i} className="flex gap-4 text-sm font-medium text-gray-600 leading-relaxed group">
                             <span className="text-red-600 font-black italic transition-transform group-hover:scale-110">/</span>
                             {req}
                           </li>
                         ))}
                       </ul>
                     </div>
                     <div>
                       <h4 className="flex items-center gap-3 text-[0.7rem] font-black uppercase tracking-[0.2em] text-gray-900 mb-8 italic">
                         <CheckSquare className="w-4 h-4 text-red-600" /> Action Checklist
                       </h4>
                       <div className="bg-gray-50 border border-gray-100 rounded-3xl p-10 space-y-8">
                         {activeTopic!.checklist.map((item, i) => (
                           <div key={i} className="flex items-start gap-4">
                             <div className="w-5 h-5 rounded-full border-2 border-red-600 flex-shrink-0 mt-0.5 flex items-center justify-center">
                                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                             </div>
                             <span className="text-[0.75rem] font-bold text-gray-800 italic uppercase tracking-tight leading-snug">{item}</span>
                           </div>
                         ))}
                       </div>
                     </div>
                  </div>

                  {/* Risk Section */}
                  <div className="bg-red-50/50 p-12 sm:p-20 rounded-[4rem] relative overflow-hidden group">
                     <AlertTriangle className="absolute -right-8 -bottom-8 w-64 h-64 opacity-[0.03] -rotate-12 group-hover:rotate-0 transition-transform duration-1000" />
                     <div className="max-w-2xl">
                        <h4 className="flex items-center gap-3 text-red-600 font-black uppercase tracking-[0.2em] text-[0.8rem] mb-10 italic">
                          Catastrophic Exposure Risk
                        </h4>
                        <p className="text-xl sm:text-2xl font-black text-red-900 italic leading-snug uppercase tracking-tight">
                          {activeTopic!.risks}
                        </p>
                        <button 
                          onClick={() => setCurrentPage("contact")}
                          className="mt-12 bg-red-600 text-white px-10 py-5 rounded-full text-[0.65rem] font-black uppercase tracking-[0.2em] hover:bg-gray-950 transition-all shadow-2xl shadow-red-600/30"
                        >
                          Initiate Safety Audit
                        </button>
                     </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              // Card Grid
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredTopics.map((t, idx) => {
                  const Icon = t.icon;
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      key={t.id}
                      className="group bg-white p-10 border border-gray-100 hover:border-red-600/20 rounded-[2.5rem] hover:shadow-2xl transition-all duration-500 relative flex flex-col"
                    >
                      <div className="flex justify-between items-start mb-10">
                        <div className="p-4 bg-gray-50 rounded-2xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[0.55rem] font-black uppercase tracking-widest text-gray-400 group-hover:text-red-600 transition-colors">
                          {t.category}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-black italic uppercase tracking-tighter mb-4 leading-tight group-hover:text-red-600 transition-colors">
                        {t.title}
                      </h3>
                      
                      <p className="text-[0.75rem] font-medium text-gray-500 leading-relaxed mb-10 uppercase tracking-tight line-clamp-3">
                        {t.summary}
                      </p>

                      <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                         <span className="text-[0.5rem] font-black uppercase tracking-[0.1em] text-gray-300">Updated: {t.lastUpdated}</span>
                         <button 
                           onClick={() => handleTopicView(t.id)}
                           className="flex items-center gap-2 text-gray-950 font-black uppercase tracking-widest text-[0.6rem] group hover:text-red-600 transition-colors"
                         >
                           Access Analysis <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                         </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Interactive Compliance Section */}
      <section className="py-24 sm:py-32 lg:py-40 bg-brand-surface">
         <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <ComplianceChecker setCurrentPage={setCurrentPage} />
         </div>
      </section>

      {/* Leads / CTA Section */}
      <section className="py-24 sm:py-32 lg:py-40 bg-white border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
           <div className="max-w-3xl mx-auto">
             <div className="section-accent-header mx-auto">Direct Engineering Support</div>
             <h2 className="mb-10 italic uppercase tracking-tighter">Your Facility is a <span className="text-red-600">Zero-Failure</span> Zone.</h2>
             <p className="text-gray-500 text-lg sm:text-xl font-light italic leading-relaxed mb-12">
               Navigating complex NBC and BIS regulations requires technical authority. Our team of compliance engineers provides mission-critical audits to verify your lifecycle safety.
             </p>
             <button 
               onClick={() => setCurrentPage("contact")}
               className="industrial-btn !px-12 !py-6 text-[0.8rem] !tracking-[0.3em] shadow-2xl shadow-red-600/30"
             >
               REQUEST COMPREHENSIVE SAFETY AUDIT
             </button>
             <p className="mt-10 text-[0.55rem] font-black uppercase tracking-[0.4em] text-gray-300 italic">
               Unique Engineering - Fire Bond | Internal Compliance Desk
             </p>
           </div>
        </div>
      </section>
    </motion.div>
  );
};
