import { useState, useEffect, FormEvent, useMemo } from "react";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import { motion, AnimatePresence } from "motion/react";
import { Product } from "../types";
import { Search, PackageOpen, X, MessageSquare, CheckCircle2, Loader2, Send, Phone } from "lucide-react";

const CATEGORIES = [
  "All Assets",
  "Fire Extinguishers",
  "Hydrant Systems",
  "Sprinkler Systems",
  "Fire Alarm & Detection",
  "Suppression Systems",
  "Safety Logistics & PPE",
  "Monitoring & Sensors"
];

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Assets");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Inquiry Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [inquiryData, setInquiryData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchProducts = async (category: string) => {
    setLoading(true);
    try {
      let q;
      if (category === "All Assets") {
        q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      } else {
        q = query(
          collection(db, "products"),
          where("category", "==", category),
          orderBy("createdAt", "desc")
        );
      }

      const snapshot = await getDocs(q);
      const newProducts = snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as any) } as Product));
      setProducts(newProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(activeCategory);
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;
    const term = searchTerm.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.category.toLowerCase().includes(term) || 
      (p.subcategory || "").toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  const groupedProducts = useMemo(() => {
    return filteredProducts.reduce((acc, product) => {
      const sub = product.subcategory || "Other";
      if (!acc[sub]) acc[sub] = [];
      acc[sub].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  }, [filteredProducts]);

  const handleInquirySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone,
          product: selectedProduct.name,
          message: inquiryData.message
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to transmit product inquiry via backend.");
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedProduct(null);
        setInquiryData({ name: "", email: "", phone: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Inquiry failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppUrl = (productName: string) => {
    const text = encodeURIComponent(`Hi, I'm interested in the product: ${productName}. Please share more details.`);
    return `https://wa.me/917045372820?text=${text}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      {/* Compact Header Section */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 bg-brand-surface border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="section-accent-header">Inventory Desk</div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter leading-none mb-4">
                Certified <span className="text-red-600">Assets</span>
              </h1>
              <p className="text-sm sm:text-base text-brand-text-muted font-bold uppercase tracking-widest italic leading-tight">
                Specialized fire safety & suppression technology.
              </p>
            </div>
            
            {/* Search Engine */}
            <div className="w-full md:w-80 lg:w-96 relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-red-600 transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text"
                placeholder="Search fire safety products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border-2 border-brand-border rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-red-600 focus:shadow-lg focus:shadow-red-600/10 transition-all font-bold text-gray-900 placeholder:text-gray-300 text-sm uppercase tracking-widest"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="sticky top-[72px] sm:top-[88px] z-40 bg-white/95 backdrop-blur-md border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex overflow-x-auto no-scrollbar gap-2 py-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchTerm("");
                }}
                className={`px-5 py-2.5 rounded-full text-[0.6rem] sm:text-[0.65rem] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                  activeCategory === cat 
                    ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20" 
                    : "bg-gray-50 text-gray-500 border-gray-100 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading ? (
             <div className="py-20 flex flex-col items-center justify-center gap-4">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
               <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-gray-400 italic">Syncing Inventory...</p>
             </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-surface p-12 sm:p-24 border border-brand-border text-center rounded-[3rem] shadow-sm max-w-2xl mx-auto"
            >
              <PackageOpen className="w-16 h-16 text-gray-200 mx-auto mb-8" />
              <h2 className="mb-4 leading-none italic uppercase tracking-tighter text-3xl">No records <span className="text-red-600">Discovered</span></h2>
              <p className="text-brand-text-muted text-sm font-bold uppercase tracking-widest italic max-w-sm mx-auto">
                {searchTerm 
                  ? `No hardware found matching "${searchTerm}" in current classification.`
                  : `Our certified assets for "${activeCategory}" are currently being updated.`}
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-10 px-8 py-3 border-2 border-red-600 text-red-600 rounded-full text-[0.65rem] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-lg shadow-red-600/10"
                >
                  Reset Search Protocols
                </button>
              )}
            </motion.div>
          ) : (
            <div className="space-y-24">
              {Object.keys(groupedProducts).sort().map((subcategory) => (
                <div key={subcategory} className="space-y-10">
                  <div className="flex items-center gap-6">
                    <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-tighter text-gray-900 border-l-4 border-red-600 pl-6 shrink-0">
                      {subcategory}
                    </h2>
                    <div className="h-[1px] bg-gray-100 w-full"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                    {groupedProducts[subcategory].map((product) => (
                      <motion.div 
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-brand-surface p-6 sm:p-7 rounded-[2rem] border border-brand-border hover:border-red-600/30 hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col group overflow-hidden relative"
                      >
                        <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-inner border border-brand-border relative mb-6">
                          <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-red-600 text-white text-[0.5rem] font-black uppercase tracking-widest rounded-full shadow-lg italic">Certified</div>
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale group-hover:grayscale-0"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-col flex-1">
                          <h3 className="text-base font-black mb-3 group-hover:text-red-600 transition-colors line-clamp-2 italic uppercase tracking-tighter leading-tight h-10">
                            {product.name}
                          </h3>
                          <p className="text-[0.7rem] text-brand-text-muted leading-relaxed font-bold flex-1 line-clamp-3 mb-6 italic uppercase tracking-tight">
                            {product.description}
                          </p>
                          
                          <div className="space-y-2 mt-auto">
                            <button 
                              onClick={() => setSelectedProduct(product)}
                              className="industrial-btn w-full !text-[0.6rem] !py-3 flex items-center justify-center gap-2"
                            >
                              <Send className="w-3 h-3" />
                              <span>Request Specification</span>
                            </button>
                            <a 
                              href={getWhatsAppUrl(product.name)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full py-3 border border-[#25D366] text-[#25D366] text-[0.6rem] font-black uppercase tracking-widest rounded-xl hover:bg-[#25D366] hover:text-white transition-all italic"
                            >
                              <MessageSquare className="w-3 h-3" />
                              WhatsApp
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setSelectedProduct(null)}
              className="absolute inset-0 bg-gray-950/80 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-brand-border"
            >
              <div className="p-8 sm:p-12 md:p-16">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-8 right-8 p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {isSuccess ? (
                  <div className="text-center py-10">
                    <CheckCircle2 className="w-20 h-20 text-red-600 mx-auto mb-8 animate-bounce" />
                    <h2 className="mb-6 uppercase italic text-2xl font-black tracking-tighter">Inquiry <span className="text-red-600">Transmitted</span></h2>
                    <p className="text-brand-text-muted font-bold italic text-[0.7rem] tracking-[0.2em] uppercase">Our engineering lead will contact you shortly.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-10">
                      <div className="section-accent-header">Inquiry Specification</div>
                      <h2 className="leading-tight text-3xl sm:text-4xl italic uppercase tracking-tighter font-black">
                        Request <span className="text-red-600">Assets</span>
                      </h2>
                      <div className="mt-4 inline-block px-4 py-2 bg-red-50 text-red-600 text-[0.6rem] font-black uppercase tracking-widest rounded-lg border border-red-100 italic">
                        Item: {selectedProduct.name}
                      </div>
                    </div>

                    <form onSubmit={handleInquirySubmit} className="space-y-6">
                      <div className="space-y-5">
                        <div className="group">
                          <label className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-red-600 transition-colors mb-2 block italic">Full Identity</label>
                          <input 
                            type="text"
                            required
                            value={inquiryData.name}
                            onChange={(e) => setInquiryData({...inquiryData, name: e.target.value})}
                            className="w-full border-b-2 border-gray-100 py-3 focus:border-red-600 focus:outline-none transition-all font-black text-[0.75rem] text-gray-900 bg-transparent placeholder:text-gray-200 uppercase"
                            placeholder="JOHN DOE / SITE LEAD"
                          />
                        </div>
                        <div className="group">
                          <label className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-red-600 transition-colors mb-2 block italic">Corporate Email</label>
                          <input 
                            type="email"
                            required
                            value={inquiryData.email}
                            onChange={(e) => setInquiryData({...inquiryData, email: e.target.value})}
                            className="w-full border-b-2 border-gray-100 py-3 focus:border-red-600 focus:outline-none transition-all font-black text-[0.75rem] text-gray-900 bg-transparent placeholder:text-gray-200 uppercase"
                            placeholder="PARTNER@COMPANY.COM"
                          />
                        </div>
                        <div className="group">
                          <label className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-red-600 transition-colors mb-2 block italic">Contact Stream (Phone)</label>
                          <input 
                            type="tel"
                            required
                            value={inquiryData.phone}
                            onChange={(e) => setInquiryData({...inquiryData, phone: e.target.value})}
                            className="w-full border-b-2 border-gray-100 py-3 focus:border-red-600 focus:outline-none transition-all font-black text-[0.75rem] text-gray-900 bg-transparent placeholder:text-gray-200 uppercase"
                            placeholder="+91 00000 00000"
                          />
                        </div>
                        <div className="group">
                          <label className="text-[0.55rem] font-black uppercase tracking-[0.2em] text-gray-400 group-focus-within:text-red-600 transition-colors mb-2 block italic">Technical Requirements</label>
                          <textarea 
                            rows={3}
                            required
                            value={inquiryData.message}
                            onChange={(e) => setInquiryData({...inquiryData, message: e.target.value})}
                            className="w-full border-b-2 border-gray-100 py-3 focus:border-red-600 focus:outline-none transition-all font-black text-[0.75rem] text-gray-900 bg-transparent resize-none h-[80px] placeholder:text-gray-200 uppercase"
                            placeholder="DESCRIBE SCOPE OR QUANTITY..."
                          ></textarea>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="industrial-btn w-full !text-[0.65rem] !py-4 shadow-2xl shadow-red-600/20 flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            TRANSMITTING...
                          </>
                        ) : (
                          <>
                            <Phone className="w-4 h-4" />
                            DEPLOY INQUIRY REQUEST
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
