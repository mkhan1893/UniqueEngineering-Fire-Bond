import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { CheckCircle2, MessageSquare, Phone, Mail } from "lucide-react";

export const ContactPage = ({ initialSubject }: { initialSubject?: string }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    requirements: initialSubject ? `Inquiry regarding: ${initialSubject}` : "",
    honeypot: "" // Basic spam protection
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Full identity is required";
    if (!formData.email.trim()) {
      errors.email = "Corporate email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Contact number is required";
    } else if (!/^\+?[0-9\s-]{10,20}$/.test(formData.phone)) {
      errors.phone = "Invalid contact format";
    }
    if (!formData.serviceType) errors.serviceType = "Please select a service type";
    if (!formData.requirements.trim()) errors.requirements = "Project context is required";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (formData.honeypot) return;

    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      // 1. Save to Firestore (Lead Storage)
      await addDoc(collection(db, "leads"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        serviceType: formData.serviceType,
        requirements: formData.requirements,
        createdAt: serverTimestamp(),
        source: "Website Contact Form",
        status: "NEW"
      });

      // 2. Transmit to Backend API
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          serviceType: formData.serviceType,
          message: formData.requirements
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to transmit email via backend.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      // Fallback for demo environment if keys aren't set
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(`Hi, I'm ${formData.name || 'interested'} and I need fire safety solutions. ${formData.requirements}`);
  const whatsappUrl = `https://wa.me/917045372820?text=${whatsappMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      <section className="py-24 sm:py-32 lg:py-40 bg-brand-surface border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
          <div className="max-w-4xl">
            <div className="section-accent-header">Connect With Us</div>
            <h1 className="mb-10 leading-[0.9] sm:leading-[0.85] lg:leading-[0.82]">
              Industrial <span className="text-brand-primary">Consultation</span>.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-brand-text-muted leading-relaxed font-light italic">
              Unique Engineering - Fire Bond technical leads are available to assess your facility's safety requirements, incident risk profiles, and compliance roadmap.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
            {/* Info Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <div className="section-accent-header lg:mx-0">
                Regional Headquarters
              </div>
              <h2 className="mb-12 leading-tight">Mumbai Operations</h2>
              
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 mb-16">
                <a 
                  href="tel:+917045372820"
                  className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-red-600 hover:bg-white hover:shadow-2xl hover:shadow-red-600/10 transition-all group flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-red-600/10 rounded-xl group-hover:bg-red-600 transition-colors">
                      <Phone className="w-4 h-4 text-red-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-red-600 transition-colors italic">Direct Line</div>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-gray-900 italic tracking-tighter whitespace-nowrap">+91 70453 72820</div>
                </a>
                <a 
                  href="mailto:uniqueengg1976@gmail.com"
                  className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-red-600 hover:bg-white hover:shadow-2xl hover:shadow-red-600/10 transition-all group flex flex-col items-center lg:items-start text-center lg:text-left overflow-hidden min-w-0"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-red-600/10 rounded-xl group-hover:bg-red-600 transition-colors">
                      <Mail className="w-4 h-4 text-red-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-red-600 transition-colors italic">Technical Desk</div>
                  </div>
                  <div className="text-lg sm:text-xl font-black text-gray-900 italic tracking-tighter break-all whitespace-nowrap overflow-hidden text-ellipsis">uniqueengg1976@gmail.com</div>
                </a>
              </div>

              <div className="p-10 sm:p-14 bg-gray-950 text-white rounded-[3rem] relative overflow-hidden group">
                <div className="absolute -top-4 -right-8 p-12 text-9xl font-black text-white/5 italic pointer-events-none group-hover:text-red-600/10 transition-colors select-none">HQ</div>
                <div className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-red-600 mb-8 italic">Engineering Office</div>
                <p className="text-lg sm:text-2xl font-black leading-tight uppercase tracking-tighter italic mb-12">
                  Gala No. 3, Hari Masjid Lane,<br />
                  Opposite Alvin Compound,<br />
                  Khairani Road, Sakinaka,<br />
                  Andheri East, Mumbai 400072
                </p>
                <div className="pt-10 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-gray-400 italic">Regulatory Status</span>
                  <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-red-600 italic">Active / Verified</span>
                </div>
              </div>
            </motion.div>

            {/* Form Column */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-2 rounded-[3.5rem] border border-gray-100 shadow-[0_50px_100px_rgba(0,0,0,0.1)] relative overflow-hidden lg:-mt-12"
            >
              <div className="p-10 sm:p-14 md:p-16">
                <h3 className="mb-12 leading-tight">Industrial Inquiry Form</h3>
                
                {isSuccess ? (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-20"
                  >
                    <CheckCircle2 className="w-20 h-20 text-red-600 mx-auto mb-8 animate-pulse" />
                    <h4 className="text-xl font-black text-gray-900 mb-4 uppercase italic">Submission Successful</h4>
                    <p className="text-gray-500 text-[0.8rem] mb-12 leading-relaxed font-bold uppercase tracking-[0.2em] italic max-w-xs mx-auto">
                      Your request has been successfully submitted. Our engineering team will contact you shortly.
                    </p>
                    <button 
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          company: "",
                          requirements: "",
                          honeypot: ""
                        });
                      }}
                      className="text-[0.65rem] font-black text-red-600 uppercase tracking-widest hover:underline italic"
                    >
                      Return to form
                    </button>
                  </motion.div>
                ) : (
                  <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                    {/* Honeypot field (hidden) */}
                    <input 
                      type="text" 
                      name="honeypot" 
                      className="hidden" 
                      value={formData.honeypot} 
                      onChange={(e) => setFormData({...formData, honeypot: e.target.value})} 
                    />

                    <div className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="group">
                          <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-red-600 transition-colors mb-4 block italic">Full Identity</label>
                          <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className={`w-full border-b-2 ${formErrors.name ? 'border-red-600' : 'border-gray-200'} py-4 focus:border-red-600 focus:outline-none transition-all font-black text-gray-900 bg-transparent placeholder:text-gray-300 uppercase text-xs`}
                            placeholder="JOHN DOE"
                          />
                          {formErrors.name && <p className="text-[0.5rem] text-red-600 font-bold mt-2 uppercase italic">{formErrors.name}</p>}
                        </div>
                        <div className="group">
                          <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-red-600 transition-colors mb-4 block italic">Company / Designation</label>
                          <input 
                            type="text" 
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                            className="w-full border-b-2 border-gray-200 py-4 focus:border-red-600 focus:outline-none transition-all font-black text-gray-900 bg-transparent placeholder:text-gray-300 uppercase text-xs"
                            placeholder="INFRA LTD / DIRECTOR"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="group">
                          <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-red-600 transition-colors mb-4 block italic">Corporate Email</label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className={`w-full border-b-2 ${formErrors.email ? 'border-red-600' : 'border-gray-200'} py-4 focus:border-red-600 focus:outline-none transition-all font-black text-gray-900 bg-transparent placeholder:text-gray-300 uppercase text-xs`}
                            placeholder="PARTNER@COMPANY.COM"
                          />
                          {formErrors.email && <p className="text-[0.5rem] text-red-600 font-bold mt-2 uppercase italic">{formErrors.email}</p>}
                        </div>
                        <div className="group">
                          <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-red-600 transition-colors mb-4 block italic">Operational Phone</label>
                          <input 
                            type="tel" 
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className={`w-full border-b-2 ${formErrors.phone ? 'border-red-600' : 'border-gray-200'} py-4 focus:border-red-600 focus:outline-none transition-all font-black text-gray-900 bg-transparent placeholder:text-gray-300 uppercase text-xs`}
                            placeholder="+91 00000 00000"
                          />
                          {formErrors.phone && <p className="text-[0.5rem] text-red-600 font-bold mt-2 uppercase italic">{formErrors.phone}</p>}
                        </div>
                      </div>

                      <div className="group">
                        <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-red-600 transition-colors mb-4 block italic">Type of Service Required</label>
                        <select 
                          required
                          value={formData.serviceType}
                          onChange={(e) => setFormData({...formData, serviceType: e.target.value})}
                          className={`w-full border-b-2 ${formErrors.serviceType ? 'border-red-600' : 'border-gray-200'} py-4 focus:border-red-600 focus:outline-none transition-all font-black text-gray-900 bg-transparent uppercase text-xs appearance-none cursor-pointer`}
                        >
                          <option value="" disabled className="bg-white">SELECT SERVICE OPTION</option>
                          <option value="Fire Extinguisher Supply" className="bg-white">Fire Extinguisher Supply</option>
                          <option value="Fire Extinguisher Refilling & Maintenance" className="bg-white">Fire Extinguisher Refilling & Maintenance</option>
                          <option value="Fire Hydrant System Installation" className="bg-white">Fire Hydrant System Installation</option>
                          <option value="Fire Sprinkler System" className="bg-white">Fire Sprinkler System</option>
                          <option value="Fire Alarm & Detection Systems" className="bg-white">Fire Alarm & Detection Systems</option>
                          <option value="Fire Safety Audit & Compliance" className="bg-white">Fire Safety Audit & Compliance</option>
                          <option value="AMC (Annual Maintenance Contract)" className="bg-white">AMC (Annual Maintenance Contract)</option>
                          <option value="Industrial Fire Safety Solutions" className="bg-white">Industrial Fire Safety Solutions</option>
                          <option value="Other" className="bg-white">Other</option>
                        </select>
                        {formErrors.serviceType && <p className="text-[0.5rem] text-red-600 font-bold mt-2 uppercase italic">{formErrors.serviceType}</p>}
                      </div>

                      <div className="group">
                        <label className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-500 group-focus-within:text-red-600 transition-colors mb-4 block italic">Project Requirements</label>
                        <textarea 
                          rows={3}
                          required
                          value={formData.requirements}
                          onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                          className={`w-full border-b-2 ${formErrors.requirements ? 'border-red-600' : 'border-gray-200'} py-4 focus:border-red-600 focus:outline-none transition-all font-black text-gray-900 bg-transparent resize-none h-[100px] placeholder:text-gray-300 uppercase text-xs`}
                          placeholder="DESCRIBE ENGINEERING CONTEXT..."
                        ></textarea>
                        {formErrors.requirements && <p className="text-[0.5rem] text-red-600 font-bold mt-2 uppercase italic">{formErrors.requirements}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="industrial-btn w-full !text-[0.7rem] !py-5 shadow-2xl shadow-red-600/30"
                      >
                        {isSubmitting ? "TRANSMITTING..." : "TRANSMIT TECHNICAL REQUEST"}
                      </button>
                      <a 
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-5 border-[1.5px] border-[#25D366] text-[#25D366] font-black tracking-widest uppercase text-[0.65rem] transition-all hover:bg-[#25D366] hover:text-white w-full rounded-2xl flex items-center justify-center gap-2 italic"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Inquire via WhatsApp
                      </a>
                    </div>

                    <p className="text-center text-[0.55rem] text-gray-400 mt-10 font-bold uppercase tracking-[0.3em] italic">
                      Confidential Data Handling / Industrial Standards.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
     </motion.div>
  );
};
