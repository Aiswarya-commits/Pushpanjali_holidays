import React from 'react';
import { Star, Quote, CheckCircle, MapPin } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: "Suresh Menon & Family",
      location: "Bangalore, Karnataka",
      trip: "Cochin Airport to Munnar 4D/3N Tour",
      vehicle: "Toyota Innova (KL 70 H 7498)",
      rating: 5,
      date: "August 2026",
      text: "We booked the Toyota Innova for our family trip to Munnar and Thekkady. The vehicle was spotless, AC was great on steep climbs, and our driver was an absolute gem! Very safe driving along the hairpin curves."
    },
    {
      name: "Dr. Ananya Sharma",
      location: "Mumbai, Maharashtra",
      trip: "Alleppey & Fort Kochi Sightseeing",
      vehicle: "Honda Amaze (KL 52 F 7263)",
      rating: 5,
      date: "July 2026",
      text: "Pushpanjali Holidays provided prompt airport pickup at COK. The Honda Amaze was extremely comfortable for my husband and me. The driver gave great local dining tips and the fare was exactly what was quoted on WhatsApp."
    },
    {
      name: "Rahul & College Reunion Group",
      location: "Chennai, Tamil Nadu",
      trip: "Wayanad Group Adventure Trip",
      vehicle: "Pushpanjali Force Luxury Traveller (KL 63 F 6674)",
      rating: 5,
      date: "September 2026",
      text: "We were 14 friends traveling together. The Pushpanjali Traveller with its pushback seats, chilled dual AC, and killer sound system made the road trip unforgettable! Enough luggage room for all our backpacks. Highly recommended!"
    }
  ];

  return (
    <section id="testimonials" className="py-12 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Trusted by Thousands</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Traveler Stories & Feedback
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Over 3,800+ successful holiday trips across Kerala, Tamil Nadu, and Karnataka. Here is what our guests have to say.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl flex flex-col justify-between group hover:border-emerald-400 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Star rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{r.date}</span>
                </div>

                <Quote className="w-8 h-8 text-emerald-200" />

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{r.text}"
                </p>
              </div>

              {/* Reviewer details */}
              <div className="pt-6 border-t border-slate-100 mt-6 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{r.name}</h4>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    Verified Guest
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{r.location}</span>
                </div>
                <div className="text-[11px] text-amber-800 font-semibold pt-1">
                  Ride: {r.vehicle}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
