import React, { useState } from 'react';
import { Users, Luggage, Wind, Music, Check, ArrowRight, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import { fleetData } from '../data/fleetData';

export default function FleetSection({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredVehicles = activeTab === 'all'
    ? fleetData
    : fleetData.filter(v => {
        if (activeTab === 'sedan') return v.category === 'Sedan';
        if (activeTab === 'mpv') return v.category === 'Luxury MPV';
        if (activeTab === 'traveller') return v.category === 'Tempo Traveller';
        return true;
      });

  return (
    <section id="fleet" className="py-12 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Actual Photos of Pushpanjali Fleet</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Our Premium Tourist Vehicles
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg">
            Choose from our meticulously maintained fleet. All vehicles carry valid Kerala tourism commercial permits, chilled dual-AC, pushback seats, and audio entertainment.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 pt-3 sm:pt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Vehicles ({fleetData.length})
            </button>
            <button
              onClick={() => setActiveTab('sedan')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'sedan'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Sedans (4 Seater)
            </button>
            <button
              onClick={() => setActiveTab('mpv')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'mpv'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Luxury MPVs (7 Seater)
            </button>
            <button
              onClick={() => setActiveTab('traveller')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'traveller'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tempo Travellers (17 Seater)
            </button>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col group border border-slate-200 shadow-md hover:shadow-2xl hover:border-emerald-400 transition-all duration-300"
            >
              {/* Vehicle Photo Container */}
              <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-slate-100">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                {/* Top Badge (License Plate + Category) */}
                <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg bg-yellow-400 text-slate-950 font-black text-[11px] sm:text-xs tracking-wider shadow-md border border-yellow-500 font-mono">
                    <span className="text-[9px] opacity-75">IND</span>
                    <span>{vehicle.registration}</span>
                  </div>

                  <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-bold text-white bg-gradient-to-r ${vehicle.badgeColor} shadow-md`}>
                    {vehicle.badge}
                  </span>
                </div>

                {/* Bottom Quick Tag */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-xs text-white">
                  <span className="px-2 py-0.5 rounded bg-slate-900/80 backdrop-blur-sm font-medium text-[11px]">
                    {vehicle.category}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-300 font-semibold bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Available</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Details */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-4 sm:space-y-5">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {vehicle.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {vehicle.tagline}
                  </p>

                  {/* Spec Icons Grid */}
                  <div className="grid grid-cols-2 gap-2 my-3 sm:my-4 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                    <div className="flex items-center gap-1.5 truncate">
                      <Users className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{vehicle.passengers} Passengers</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Luggage className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{vehicle.luggage}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Wind className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="truncate">{vehicle.acType}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Music className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                      <span className="truncate">Bluetooth Audio</span>
                    </div>
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-1 text-xs text-slate-600 font-medium">
                    {vehicle.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Booking Actions */}
                <div className="pt-3 sm:pt-4 border-t border-slate-200 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Outstation Rate</span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-700">₹{vehicle.startingRate}</span>
                      <span className="text-xs text-slate-500"> / km</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 block">Day Package from</span>
                      <span className="text-sm sm:text-base font-bold text-amber-700">₹{vehicle.dayPackageRate}</span>
                      <span className="text-[10px] text-slate-500"> / day</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => onOpenBooking({ vehicleId: vehicle.id })}
                      className="py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Book Vehicle</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <a
                      href={`https://wa.me/919961477380?text=Hello%20Pushpanjali%20Holidays%2C%20I%20am%20interested%20in%20booking%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.registration})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-2 rounded-xl font-bold text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition flex items-center justify-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Banner below fleet */}
        <div className="mt-10 sm:mt-14 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left shadow-xs">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Need multiple vehicles for a Wedding or College Group?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              We provide combo fleet packages (Force Traveller + Toyota Innova + Sedan) with coordinated dispatch & driver support.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking({ tripType: 'package', note: 'Group / Wedding Charter fleet enquiry' })}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-md whitespace-nowrap cursor-pointer transition"
          >
            Enquire Wedding Fleet
          </button>
        </div>

      </div>
    </section>
  );
}
