import React, { useState } from 'react';
import { 
  Compass, Lock, Mail, User, Phone, ArrowRight, ShieldCheck, 
  Sparkles, CheckCircle2, Car, KeyRound, AlertCircle, Eye, EyeOff
} from 'lucide-react';
import { login, signup } from '../data/authService';
import { fleetData } from '../data/fleetData';

export default function AuthScreen({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      } else {
        setErrorMsg(res.message);
      }
    } else {
      if (!email || !password) {
        setErrorMsg('Please enter both email and password.');
        return;
      }
      const res = login(email, password);
      if (res.success) {
        onLoginSuccess(res.user);
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/40 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid lg:grid-cols-12">
        
        {/* Left Column: Brand & Fleet Showcase (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Brand */}
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Compass className="w-7 h-7 text-emerald-400 animate-pulse-soft" />
                </div>
              </div>
              <div>
                <span className="text-xl font-black tracking-tight font-serif text-white">
                  PUSHPANJALI
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 ml-1.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  HOLIDAYS
                </span>
                <p className="text-[10px] text-emerald-400 font-medium tracking-wide">
                  God's Own Country Premier Tourist Fleet
                </p>
              </div>
            </div>

            <div className="pt-4">
              <h2 className="text-2xl font-black text-white leading-tight">
                Kerala's Most Trusted Tourist Vehicle Booking Portal
              </h2>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Log in to book real Kerala fleet vehicles, calculate exact route fares, and track your chauffeur live.
              </p>
            </div>
          </div>

          {/* Fleet Mini Cards Preview */}
          <div className="my-6 space-y-2.5 relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Verified Commercial Fleet
            </span>
            {fleetData.map((v) => (
              <div 
                key={v.id}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 backdrop-blur-sm"
              >
                <img 
                  src={v.image} 
                  alt={v.name}
                  className="w-12 h-10 object-cover rounded-lg shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white truncate">{v.name}</h4>
                    <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-yellow-400 text-slate-950 font-bold">
                      {v.registration}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-medium">₹{v.startingRate}/km • {v.passengers} Seats</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust Tag */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              Kerala Govt Permitted
            </span>
            <span>24x7 Helpline Active</span>
          </div>
        </div>

        {/* Right Column: Authentication Form (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Tab Switcher: Sign In vs Create Account */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold w-64">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(false);
                    setErrorMsg('');
                  }}
                  className={`py-2 rounded-lg transition cursor-pointer ${
                    !isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
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
                    isSignUp ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <span className="text-[11px] text-emerald-700 font-semibold hidden sm:inline">
                Instant Access
              </span>
            </div>

            {/* Form Title */}
            <div className="py-4 space-y-1 text-left">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                {isSignUp ? 'Join Pushpanjali Holidays' : 'Welcome to Pushpanjali Holidays'}
              </h3>
              <p className="text-xs text-slate-500">
                {isSignUp 
                  ? 'Sign up to reserve vehicles, manage your trips, and get direct driver updates.'
                  : 'Enter your credentials to access the tourist website or admin dashboard.'}
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              
              {/* Full Name & Phone (Sign Up only) */}
              {isSignUp && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Suresh Menon"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-sm text-slate-900 bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp / Mobile Phone *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 99614 77380"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-sm text-slate-900 bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address {isSignUp ? '*' : '(or Admin Username)'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isSignUp ? "suresh@gmail.com" : "admin@gmail.com or email"}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-sm text-slate-900 bg-slate-50 focus:bg-white"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-sm text-slate-900 bg-slate-50 focus:bg-white"
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

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 shadow-md shadow-emerald-600/25 transition duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSignUp ? 'Create Traveler Account & Enter' : 'Sign In & Access Website'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Login Badges for Instant Testing */}
            <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-left">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                1-Click Quick Testing Credentials:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Admin Quick Fill */}
                <button
                  type="button"
                  onClick={handleAdminQuickFill}
                  className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-left transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                      Admin Login
                    </span>
                    <span className="text-[10px] text-amber-700 font-semibold group-hover:underline">Fill</span>
                  </div>
                  <div className="text-[11px] text-amber-800 font-mono mt-0.5">admin@gmail.com</div>
                  <div className="text-[10px] text-slate-500">PIN / Pass: admin123</div>
                </button>

                {/* Traveler Quick Fill */}
                <button
                  type="button"
                  onClick={handleTravelerQuickFill}
                  className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-left transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      Traveler Demo
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold group-hover:underline">Fill</span>
                  </div>
                  <div className="text-[11px] text-emerald-800 font-mono mt-0.5">suresh@gmail.com</div>
                  <div className="text-[10px] text-slate-500">Pass: password123</div>
                </button>
              </div>
            </div>

          </div>

          {/* Footer note */}
          <div className="pt-6 text-center text-[11px] text-slate-400">
            Pushpanjali Holidays Private Limited • 24x7 Customer Support
          </div>

        </div>

      </div>

    </div>
  );
}
