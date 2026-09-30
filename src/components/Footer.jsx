import React from 'react';
import { Compass, Phone, MessageCircle, MapPin, Heart, ShieldCheck, Navigation, LogIn } from 'lucide-react';

export default function Footer({ onOpenTrack, onOpenAuth, currentUser }) {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-12 sm:pt-16 pb-8 sm:pb-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-slate-800">
          
          {/* Brand info (2 cols on desktop) */}
          <div className="sm:col-span-2 space-y-3.5 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-500 p-0.5 shrink-0">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                </div>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black text-white font-serif tracking-tight">PUSHPANJALI HOLIDAYS</span>
                <p className="text-[10px] text-emerald-400 font-medium tracking-wider uppercase">Kerala Luxury Tourist Fleet</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed pr-2 sm:pr-6">
              Pushpanjali Holidays is your trusted travel partner across Kerala, Tamil Nadu, and Karnataka. Offering premium Honda Sedans, Toyota Innovas, and luxury Force Travellers for families, pilgrimages, weddings, and hill station tours.
            </p>

            <div className="flex items-center gap-2 pt-1 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-[11px] text-emerald-400">Kerala Govt Commercial Tourism License Verified</span>
            </div>
          </div>

          {/* Quick Fleet Links */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Our Fleet</h4>
            <ul className="space-y-2">
              <li>
                <a href="#fleet" className="hover:text-emerald-400 transition">Honda Amaze Sedan (KL 52)</a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-emerald-400 transition">Toyota Innova MPV (KL 70)</a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-emerald-400 transition">Pushpanjali Traveller (KL 63)</a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-emerald-400 transition">Wedding Fleet Charter</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-emerald-400 transition">Fare Estimator Engine</a>
              </li>
            </ul>
          </div>

          {/* Tour Packages */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Popular Tours</h4>
            <ul className="space-y-2">
              <li>
                <a href="#packages" className="hover:text-emerald-400 transition">Munnar Hill Escapade (3D/2N)</a>
              </li>
              <li>
                <a href="#packages" className="hover:text-emerald-400 transition">Wayanad Adventure (3D/2N)</a>
              </li>
              <li>
                <a href="#packages" className="hover:text-emerald-400 transition">Alleppey Backwaters (2D/1N)</a>
              </li>
              <li>
                <a href="#packages" className="hover:text-emerald-400 transition">Sabarimala Pilgrimage Special</a>
              </li>
              <li>
                <a href="#packages" className="hover:text-emerald-400 transition">Grand Kerala Highlights</a>
              </li>
            </ul>
          </div>

          {/* Contact Direct & User Care */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="tel:+919961477380" className="text-white font-bold hover:text-emerald-400 transition">
                  +91 99614 77380
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="https://wa.me/919961477380" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition">
                  WhatsApp: +91 99614 77380
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Kerala, India (COK, CCJ, TRV)</span>
              </li>
              <li className="pt-2 flex flex-col gap-2">
                <button
                  onClick={onOpenTrack}
                  className="w-full px-3 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/40 flex items-center justify-center gap-1.5 cursor-pointer text-xs font-semibold shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{currentUser ? 'My Trips & Live Tracking' : 'Track Your Trip'}</span>
                </button>
                {!currentUser && (
                  <button
                    onClick={() => onOpenAuth('signin')}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                  >
                    <LogIn className="w-3.5 h-3.5 text-slate-400" />
                    <span>Sign In to Account</span>
                  </button>
                )}
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Pushpanjali Holidays. All rights reserved. Kerala, India.</p>
          <p className="flex items-center justify-center gap-1">
            Crafted for unforgettable journeys with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> in God's Own Country.
          </p>
        </div>
      </div>
    </footer>
  );
}
