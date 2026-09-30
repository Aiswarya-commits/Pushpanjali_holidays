import React from 'react';
import { Palmtree, Calendar, MapPin, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { packagesData } from '../data/packagesData';

export default function TourPackages({ onOpenBooking }) {
  return (
    <section id="packages" className="py-12 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <Palmtree className="w-3.5 h-3.5" />
            <span>Handcrafted Kerala Itineraries</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Popular Kerala Holiday Packages
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg">
            Discover God's Own Country with curated sightseeing routes, experienced mountain drivers, and complete vehicle charter packages.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {packagesData.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl hover:border-emerald-400 flex flex-col justify-between group transition-all duration-300"
            >
              <div className="p-5 sm:p-6 space-y-3.5 sm:space-y-4">
                {/* Header inside card */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r ${pkg.tagColor}`}>
                    {pkg.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {pkg.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Destinations Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {pkg.destinations.map((dest, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                    >
                      <MapPin className="w-2.5 h-2.5 text-emerald-600" />
                      <span>{dest}</span>
                    </span>
                  ))}
                </div>

                {/* Inclusions List */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600 font-medium">
                  <p className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Package Inclusions:</p>
                  {pkg.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>

                {/* Recommended Fleet */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700">
                  <span className="text-amber-700 font-bold">Recommended Fleet: </span>
                  <span>{pkg.recommendedVehicle}</span>
                </div>
              </div>

              {/* Card Footer & Action */}
              <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-2 sm:mt-4 space-y-3">
                <div className="flex items-baseline justify-between pt-3 sm:pt-4">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Package Starting At</span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-700">₹{pkg.startingPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">All-Inclusive Cab</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenBooking({
                      tripType: 'package',
                      drop: pkg.title,
                      note: `Inquiry for ${pkg.title} (${pkg.duration})`
                    })}
                    className="py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Book Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/919961477380?text=Hello%20Pushpanjali%20Holidays%2C%20I%20want%20to%20know%20more%20about%20the%20${encodeURIComponent(pkg.title)}%20package`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl font-bold text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
