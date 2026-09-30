import React, { useState } from 'react';
import { ShieldCheck, MapPin, Calendar, Users, ArrowRight, Sparkles, CheckCircle2, Navigation } from 'lucide-react';
import { popularRoutes } from '../data/popularRoutes';

export default function Hero({ onOpenBooking, onOpenTrack }) {
  const [tripType, setTripType] = useState('round');
  const [pickup, setPickup] = useState('Cochin International Airport (COK)');
  const [drop, setDrop] = useState('Munnar Hill Station');
  const [selectedVehicle, setSelectedVehicle] = useState('toyota-innova');
  const [travelDate, setTravelDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    onOpenBooking({
      tripType,
      pickup,
      drop,
      vehicleId: selectedVehicle,
      date: travelDate
    });
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50/60">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute top-32 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-amber-200/25 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 left-1/3 w-64 sm:w-80 h-64 sm:h-80 bg-teal-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headlines & Value Propositions */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            
            {/* Kerala Tag */}
            {/* <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] sm:text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>God's Own Country Premier Tourist Fleet</span>
            </div> */}

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.18] sm:leading-[1.12]">
              Journey in Comfort with{' '}
              <span className="bg-gradient-to-r from-emerald-700 via-teal-600 to-amber-600 bg-clip-text text-transparent">
                Pushpanjali Holidays
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Book our authentic Kerala fleet featuring pristine{' '}
              <span className="text-slate-900 font-bold underline decoration-emerald-500/60">Honda Sedans</span>,{' '}
              <span className="text-slate-900 font-bold underline decoration-teal-500/60">Toyota Innova MPVs</span>, and our flagship{' '}
              <span className="text-slate-900 font-bold underline decoration-amber-500/60">Pushpanjali Force Luxury Travellers</span>. 
              Clean, sanitized, chilled dual AC, and piloted by seasoned Kerala hill-route chauffeurs.
            </p>

            {/* Feature Highlights Pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 pt-1 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                <span>Zero Hidden Charges</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                <span>24/7 Roadside Assistance</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                <span>Uniformed Verified Drivers</span>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-7 py-3 sm:px-8 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Your Vehicle Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenTrack()}
                className="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-2xs transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-emerald-600" />
                <span>Track Existing Trip</span>
              </button>
            </div>

            {/* Fleet Mini Badges */}
            <div className="pt-3 sm:pt-4 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-[11px] sm:text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>Honda Amaze (KL 52)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>Toyota Innova (KL 70)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                <span>Pushpanjali Traveller (KL 63)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick Booking & Estimate Widget */}
          <div className="lg:col-span-5 w-full">
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl border border-slate-200">
              
              {/* Header inside widget */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Quick Fare Quote & Booking</span>
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500">Instant rates with zero advance obligation</p>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Instant
                </span>
              </div>

              {/* Trip Type Tabs */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl my-3 sm:my-4 text-[11px] sm:text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setTripType('round')}
                  className={`py-1.5 sm:py-2 rounded-lg transition-all cursor-pointer ${
                    tripType === 'round'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Round Trip
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('oneway')}
                  className={`py-1.5 sm:py-2 rounded-lg transition-all cursor-pointer ${
                    tripType === 'oneway'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  One-Way
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('package')}
                  className={`py-1.5 sm:py-2 rounded-lg transition-all cursor-pointer ${
                    tripType === 'package'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Holiday Tour
                </button>
              </div>

              <form onSubmit={handleQuickSubmit} className="space-y-3 sm:space-y-4 text-left">
                {/* Pickup Location */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Pickup Location (Airport / City / Hotel)</span>
                  </label>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="e.g. Cochin Airport (COK), Calicut"
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition"
                    required
                  />
                </div>

                {/* Drop Location */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Destination / Drop Location</span>
                  </label>
                  <input
                    type="text"
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    placeholder="e.g. Munnar, Wayanad, Alleppey"
                    className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 text-xs sm:text-sm text-slate-900 placeholder-slate-400 transition"
                    required
                  />
                </div>

                {/* Date & Vehicle Select */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>Travel Date</span>
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 text-xs sm:text-sm text-slate-900 transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Vehicle Choice</span>
                    </label>
                    <select
                      value={selectedVehicle}
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                      className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-emerald-500 text-xs sm:text-sm text-slate-900 transition cursor-pointer"
                    >
                      <option value="honda-amaze">Honda Amaze (4 Seater)</option>
                      <option value="toyota-innova">Toyota Innova (7 Seater)</option>
                      <option value="force-traveller">Pushpanjali Traveller (17 Seater)</option>
                    </select>
                  </div>
                </div>

                {/* Popular Route Fast Select */}
                <div className="pt-1">
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mb-1 font-semibold">Popular Kerala Routes:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {popularRoutes.slice(0, 3).map((r, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setPickup(r.from);
                          setDrop(r.to);
                        }}
                        className="text-[10px] px-2 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 transition font-medium cursor-pointer"
                      >
                        {r.to.split(' ')[0]} ({r.distance} km)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full mt-2 py-3 sm:py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 shadow-md shadow-emerald-600/25 transition duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Check Availability & Book</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Shortcut to track booking */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500">
                <span>Already reserved a ride?</span>
                <button
                  type="button"
                  onClick={() => onOpenTrack()}
                  className="text-emerald-700 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Navigation className="w-3 h-3 text-emerald-600" />
                  <span>Track Status Here →</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
