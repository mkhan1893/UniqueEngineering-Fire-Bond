import { useState, FormEvent } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { motion } from "motion/react";
import logo from "../images/logo.svg";

export const LoginPage = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err: any) {
      setError("Invalid administrative credentials. Please verify your access protocols.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-surface p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 border border-brand-border shadow-2xl rounded-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 text-6xl font-black text-brand-surface italic pointer-events-none uppercase">Admin</div>
        
        <div className="mb-12 relative z-10">
          <img 
            src={logo} 
            alt="Logo" 
            referrerPolicy="no-referrer"
            className="h-12 w-auto mb-8 grayscale"
          />
          <h1 className="text-3xl font-black italic text-brand-secondary uppercase tracking-tighter">System Access</h1>
          <p className="text-brand-text-muted text-xs font-bold uppercase tracking-widest mt-2 italic">Institutional Portal</p>
        </div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-50 text-brand-primary text-[0.65rem] font-black uppercase tracking-widest p-4 mb-8 border-l-4 border-brand-primary rounded-r-md"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-8 relative z-10">
          <div className="group">
            <label className="block text-[0.6rem] font-black uppercase tracking-[0.2em] text-brand-text-muted mb-2 group-focus-within:text-brand-primary transition-colors italic">Authorization Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-surface border-b-2 border-brand-border py-4 focus:border-brand-primary focus:outline-none transition-all font-bold text-brand-secondary"
              placeholder="uniqueengg1976@gmail.com"
            />
          </div>
          <div className="group">
            <label className="block text-[0.6rem] font-black uppercase tracking-[0.2em] text-brand-text-muted mb-2 group-focus-within:text-brand-primary transition-colors italic">Access Key</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-surface border-b-2 border-brand-border py-4 focus:border-brand-primary focus:outline-none transition-all font-bold text-brand-secondary"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="industrial-btn w-full !py-6 group flex items-center justify-center gap-3"
          >
            <span>{loading ? "VERIFYING..." : "GRANT ACCESS"}</span>
          </button>
        </form>
      </motion.div>
    </div>
  );
};
