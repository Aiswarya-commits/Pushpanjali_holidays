import React, { useState, useEffect } from 'react';
import { 
  Compass, Lock, Mail, User, Phone, ArrowRight, 
  KeyRound, AlertCircle, Eye, EyeOff, X
} from 'lucide-react';
import { login, signup } from '../data/authService';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, initialMode = 'signin', isAdminIntent = false }) {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isOpen) {
      setErrorMsg('');
      setIsSignUp(initialMode === 'signup');
      if (isAdminIntent) {
        setEmail('admin@gmail.com');
        setPassword('admin123');
      }
    }
  }, [isOpen, initialMode, isAdminIntent]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (isSignUp) {
      if (!name || !phone || !email || !password) {
        setErrorMsg('Please complete all required fields.');
        return;
      }
      const res = signup({ name, phone, email, password });
      if (res.success) {
        onLoginSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.message);
      }
    } else {
      if (!email || !password) {
        setErrorMsg('Please enter both your email and password.');
        return;
      }
      const res = login(email, password);
      if (res.success) {
        onLoginSuccess(res.user);
        onClose();
      } else {
        setErrorMsg(res.message);
      }
    }
  };

  const handleAdminQuickFill = () => {
    setEmail('admin@gmail.com');
    setPassword('admin123');
    setIsSignUp(false);
    setErrorMsg('');
  };

  const handleTravelerQuickFill = () => {
    setEmail('suresh@gmail.com');
    setPassword('password123');
    setIsSignUp(false);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 text-slate-900 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-800 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <span className="font-serif font-black text-white tracking-wide text-xs sm:text-sm">PUSHPANJALI HOLIDAYS</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          
          {/* Header */}
          <div className="pb-3 sm:pb-4 text-left">
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSignUp ? 'Create Your Account' : 'Sign In to Pushpanjali'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              {isSignUp 
                ? 'Register your email to book vehicles and track your live driver updates.'
                : 'Enter your email & password to manage bookings or access the admin desk.'}
            </p>
          </div>

          {/* Tab Switcher: Sign In vs Create Account */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold mb-4">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setErrorMsg('');
              }}
              className={`py-2 rounded-lg transition cursor-pointer ${
                !isSignUp ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setErrorMsg('');
              }}
              className={`py-2 rounded-lg transition cursor-pointer ${
                isSignUp ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5 text-left">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">WhatsApp / Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 99614 77380"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-emerald-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/25 transition duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isSignUp ? 'Create Account & Continue' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick test credentials */}
          <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-slate-100 text-left space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Quick 1-Click Credentials:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={handleTravelerQuickFill}
                className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-left text-emerald-900 transition cursor-pointer"
              >
                <div className="font-bold flex items-center gap-1 text-[11px]">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Traveler Demo</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono truncate">suresh@gmail.com</div>
              </button>

              <button
                type="button"
                onClick={handleAdminQuickFill}
                className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-left text-amber-900 transition cursor-pointer"
              >
                <div className="font-bold flex items-center gap-1 text-[11px]">
                  <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                  <span>Admin Credentials</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono truncate">admin@gmail.com</div>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
