import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingActions() {
  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end gap-2.5 sm:gap-3 pointer-events-auto">
      
      {/* WhatsApp Floating Pill */}
      <a
        href="https://wa.me/919961477380?text=Hello%20Pushpanjali%20Holidays%2C%20I%20want%20to%20enquire%20about%20vehicle%20booking"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer border border-emerald-400/50"
        title="Chat with Pushpanjali Holidays on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 fill-slate-950" />
        <span className="hidden xs:inline sm:inline">WhatsApp Us</span>
      </a>

      {/* Direct Call Button */}
      <a
        href="tel:+919961477380"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-900 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-xl shadow-slate-950/40 hover:bg-emerald-500 hover:text-slate-950 hover:scale-110 transition-all duration-300 cursor-pointer"
        title="Call Pushpanjali Holidays: +91 99614 77380"
      >
        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>

    </div>
  );
}
