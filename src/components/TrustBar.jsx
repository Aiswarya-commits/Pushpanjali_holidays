import React from 'react';
import { ShieldCheck, Snowflake, Award, Clock } from 'lucide-react';

export default function TrustBar() {
  const pillars = [
    {
      icon: <Snowflake className="w-6 h-6 text-teal-600" />,
      title: "100% Chilled AC Fleet",
      desc: "Dual blower high-capacity AC tested for high humidity & hill climates."
    },
    {
      icon: <Award className="w-6 h-6 text-amber-600" />,
      title: "Kerala Hill Route Experts",
      desc: "Verified chauffeurs with 10+ years experience in Munnar, Wayanad & Ooty hairpins."
    },
    {
      icon: <Clock className="w-6 h-6 text-emerald-600" />,
      title: "Punctual Doorstep Pickup",
      desc: "Guaranteed on-time arrival at Cochin (COK), Calicut (CCJ) & Trivandrum (TRV) airports."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-600" />,
      title: "Zero Hidden Surcharges",
      desc: "Transparent per-km rate, clear driver bata, and honest toll policy upfront."
    }
  ];

  return (
    <div className="border-y border-slate-200 bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-0.5">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
