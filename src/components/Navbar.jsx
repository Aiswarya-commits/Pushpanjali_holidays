import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Car, Calendar, Compass, Lock, Navigation, User, LogOut, LogIn } from 'lucide-react';

export default function Navbar({ onOpenBooking, onOpenTrack, onOpenAuth, currentUser, onLogout, onOpenAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 transition-all shadow-xs">
      {/* Top announcement bar */}
      <div className="bg-slate-900 text-slate-300 py-1.5 px-3 sm:px-4 text-[11px] sm:text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              Kerala Govt Permitted
            </span>
            <span className="hidden md:inline text-slate-400">24x7 Tourist Fleet Services across Kerala, Tamil Nadu & Karnataka</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs ml-auto">
            <a href="tel:+919961477380" className="flex items-center gap-1 sm:gap-1.5 hover:text-emerald-400 transition-colors">
              <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="font-semibold">+91 99614 77380</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href="https://wa.me/919961477380?text=Hello%20Pushpanjali%20Holidays%2C%20I%20would%20like%20to%20enquire%20about%20vehicle%20booking" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 sm:gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3 h-3 fill-emerald-400/20 shrink-0" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 animate-pulse-soft" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <span className="text-base sm:text-xl md:text-2xl font-black tracking-tight text-slate-900 font-serif">
                  PUSHPANJALI
                </span>
                <span className="text-[9px] sm:text-xs font-bold uppercase tracking-widest px-1 sm:px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                  HOLIDAYS
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-emerald-700 font-medium tracking-wide hidden sm:block">
                Luxury Tourist Fleet & Tour Packages • Kerala
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-semibold text-slate-700">
            <a href="#fleet" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
              <Car className="w-4 h-4 text-emerald-600" />
              Our Fleet
            </a>
            <a href="#calculator" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
              <Calendar className="w-4 h-4 text-amber-600" />
              Fare Calculator
            </a>
            {/* <a href="#packages" className="hover:text-emerald-600 transition-colors">
              Tour Packages
            </a> */}
            <a href="#facilities" className="hover:text-emerald-600 transition-colors">
              Facilities
            </a>
            <a href="#testimonials" className="hover:text-emerald-600 transition-colors">
              Reviews
            </a>
            <a href="#contact" className="hover:text-emerald-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-2.5">
            {/* Track Trip Button */}
            <button
              onClick={() => onOpenTrack()}
              className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Track your personal trip status"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-600" />
              <span>{currentUser ? 'My Trips' : 'Track Trip'}</span>
            </button>

            {/* Single Unified Sign In Button (when not logged in) */}
            {!currentUser && (
              <button
                onClick={() => onOpenAuth('signin')}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 border border-slate-300 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Sign In / Register"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-600" />
                <span>Sign In</span>
              </button>
            )}

            {/* If Logged in as Admin: show Go to Admin Dashboard */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={onOpenAdmin}
                className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 transition flex items-center gap-1.5 cursor-pointer"
                title="Go to Admin Dashboard"
              >
                <Lock className="w-3.5 h-3.5 text-amber-600" />
                <span>Admin Dashboard</span>
              </button>
            )}

            {/* Book Vehicle Button */}
            <button
              onClick={() => onOpenBooking()}
              className="relative inline-flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Car className="w-4 h-4 mr-1.5" />
              <span>Book Vehicle</span>
            </button>

            {/* Logged in User Profile & Log Out */}
            {currentUser && (
              <div className="flex items-center gap-1.5 pl-1">
                <div className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="max-w-[80px] sm:max-w-[110px] truncate">{currentUser.name.split(' ')[0]}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Action Bar (Right side on mobile) */}
          <div className="flex sm:hidden items-center gap-1.5">
            {!currentUser ? (
              <button
                onClick={() => onOpenAuth('signin')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-800 bg-slate-100 border border-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <LogIn className="w-3 h-3 text-emerald-600" />
                <span>Sign In</span>
              </button>
            ) : (
              <button
                onClick={() => onOpenTrack()}
                className="px-2 py-1.5 rounded-lg text-emerald-800 bg-emerald-50 border border-emerald-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                title="My Trips"
              >
                <Navigation className="w-3 h-3 text-emerald-600" />
                <span>Trips</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 cursor-pointer transition focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Tablet (sm to lg) menu toggle */}
          <div className="hidden sm:flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 cursor-pointer transition focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in fade-in slide-in-from-top-3 duration-200 max-h-[85vh] overflow-y-auto">
          {/* User Status Bar */}
          {currentUser ? (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <div className="truncate max-w-[150px]">{currentUser.name}</div>
                  <div className="text-[10px] text-slate-500 font-normal truncate max-w-[150px]">{currentUser.email}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="text-xs text-rose-600 font-bold hover:underline px-2 py-1 rounded bg-rose-50 border border-rose-200"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
              <span className="text-xs text-slate-700 font-medium">Customer or Fleet Admin?</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signin');
                }}
                className="text-xs font-bold text-emerald-800 underline bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shadow-2xs"
              >
                Sign In Here
              </button>
            </div>
          )}

          {/* Nav links */}
          <div className="flex flex-col space-y-1 pt-1 pb-2 border-b border-slate-100 text-sm font-semibold">
            <a
              href="#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition flex items-center gap-2.5"
            >
              <Car className="w-4 h-4 text-emerald-600" />
              <span>Our Fleet (Amaze, Innova, Traveller)</span>
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition flex items-center gap-2.5"
            >
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Fare Calculator</span>
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition flex items-center gap-2.5"
            >
              <span>🌴 Tour Packages (Munnar, Wayanad)</span>
            </a>
            <a
              href="#facilities"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition flex items-center gap-2.5"
            >
              <span>✨ Fleet Facilities & Amenities</span>
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition flex items-center gap-2.5"
            >
              <span>⭐ Customer Reviews & Ratings</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 transition flex items-center gap-2.5"
            >
              <span>📞 Contact & 24/7 Helplines</span>
            </a>
          </div>

          {/* Action buttons inside drawer */}
          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrack();
              }}
              className="w-full py-3 rounded-xl font-bold text-center text-xs sm:text-sm text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Navigation className="w-4 h-4 text-emerald-600" />
              <span>{currentUser ? 'My Booked Trips & Driver Tracking' : 'Track Your Trip / Driver'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-xl font-bold text-center text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <Car className="w-4 h-4" />
              <span>Book a Vehicle Now</span>
            </button>

            {currentUser?.role === 'admin' && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 rounded-xl font-bold text-center text-xs text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-amber-600" />
                <span>Switch to Admin Dashboard</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
