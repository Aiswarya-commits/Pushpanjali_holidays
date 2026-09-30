import React from 'react';
import { Snowflake, Armchair, Navigation, Radio, Luggage, Clock, UserCheck, HeartHandshake, Sparkles } from 'lucide-react';

export default function Facilities() {
  const facilities = [
    {
      icon: <Snowflake className="w-7 h-7 text-teal-600" />,
      title: "Powerful Dual AC Cooling",
      desc: "All vehicles feature high-grade climate control systems that keep you cool even during intense humid coastal heat or winding hill-station climbs."
    },
    {
      icon: <Armchair className="w-7 h-7 text-amber-600" />,
      title: "Pushback & Captain Recliners",
      desc: "Plush, ergonomic seats with adjustable recline and spacious legroom ensure zero body ache on long Munnar, Wayanad or Ooty journeys."
    },
    {
      icon: <UserCheck className="w-7 h-7 text-emerald-600" />,
      title: "Expert Bilingual Chauffeurs",
      desc: "Courteous, verified drivers fluent in Malayalam, English, Hindi & Tamil who know the best viewpoints, spice farms, and authentic eateries."
    },
    {
      icon: <Navigation className="w-7 h-7 text-cyan-600" />,
      title: "Real-time GPS & Road Safety",
      desc: "Commercial tourist registered fleet fitted with GPS tracking, speed-governors, emergency SOS, and first-aid safety kits."
    },
    {
      icon: <Radio className="w-7 h-7 text-pink-600" />,
      title: "Entertainment & Fast Charging",
      desc: "High-clarity Bluetooth surround sound systems and individual multi-port USB chargers to keep your music playing and phones charged."
    },
    {
      icon: <Luggage className="w-7 h-7 text-yellow-600" />,
      title: "Massive Boot Space & Roof Racks",
      desc: "Generous luggage trunks plus secure roof luggage carrier cages for large family suitcases, airport trollies, or pilgrim bags."
    },
    {
      icon: <Clock className="w-7 h-7 text-blue-600" />,
      title: "24/7 Airport & Emergency Standby",
      desc: "Round-the-clock dispatch at Cochin (COK), Calicut (CCJ), and Trivandrum (TRV) airports with guaranteed on-time airport arrivals."
    },
    {
      icon: <HeartHandshake className="w-7 h-7 text-rose-600" />,
      title: "Cleanliness & Daily Sanitization",
      desc: "Thorough deep interior vacuuming, fresh upholstery, and fragrance before every single customer pickup."
    }
  ];

  return (
    <section id="facilities" className="py-12 sm:py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comfort & Safety First</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Facilities Built for Memorable Journeys
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg">
            At Pushpanjali Holidays, we treat every traveler like family. Here are the premium amenities that make our rides standard, smooth, and relaxing.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                {f.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
