import React, { useState } from 'react';
import { Calculator, Gauge, ArrowRight } from 'lucide-react';
import { fleetData } from '../data/fleetData';
import { popularRoutes } from '../data/popularRoutes';

export default function FareCalculator({ onOpenBooking }) {
  const [selectedRouteIdx, setSelectedRouteIdx] = useState(0);
  const [customDistance, setCustomDistance] = useState(popularRoutes[0].distance);
  const [tripDays, setTripDays] = useState(1);
  const [selectedVehicleId, setSelectedVehicleId] = useState('toyota-innova');
  const [isRoundTrip, setIsRoundTrip] = useState(true);

  const selectedVehicle = fleetData.find(v => v.id === selectedVehicleId) || fleetData[1];

  const totalKm = (isRoundTrip ? customDistance * 2 : customDistance);
  const distanceFare = totalKm * selectedVehicle.startingRate;
  const driverBata = tripDays * selectedVehicle.driverBata;
  const estTolls = Math.round(totalKm * 0.95);
  const grandTotal = distanceFare + driverBata + estTolls;

  const handleRouteChange = (idx) => {
    setSelectedRouteIdx(idx);
    setCustomDistance(popularRoutes[idx].distance);
  };

  return (
    <section id="calculator" className="py-12 sm:py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>100% Transparent Rate Engine</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Kerala Route Fare Estimator
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select popular Kerala destinations or type your customized route distance. Get instant estimated trip budgets with zero surprises.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 border border-slate-200 shadow-xl max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Controls (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              
              {/* Popular Routes Quick Buttons */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Popular Kerala Destination:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {popularRoutes.slice(0, 6).map((route, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleRouteChange(i)}
                      className={`text-left p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-xs transition-all cursor-pointer ${
                        selectedRouteIdx === i
                          ? 'bg-emerald-50 border-emerald-500 text-slate-900 shadow-2xs font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold text-slate-800 text-xs sm:text-sm">{route.to}</div>
                      <div className="text-[10px] sm:text-[11px] text-emerald-700 flex items-center justify-between mt-0.5">
                        <span>from {route.from.split('(')[0]}</span>
                        <span className="font-bold">{route.distance} km</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Distance Slider / Custom Input */}
              <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200 space-y-2.5 sm:space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Gauge className="w-4 h-4 text-emerald-600" />
                    <span>One-Way Distance:</span>
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 bg-white px-2.5 sm:px-3 py-1 rounded-lg border border-slate-300 shadow-2xs">
                    {customDistance} KM
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="600"
                  step="5"
                  value={customDistance}
                  onChange={(e) => {
                    setSelectedRouteIdx(-1);
                    setCustomDistance(Number(e.target.value));
                  }}
                  className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[9px] sm:text-[10px] text-slate-500 font-medium">
                  <span>20 km (Local)</span>
                  <span>150 km (Munnar)</span>
                  <span>350 km (Kerala)</span>
                  <span>600 km (Interstate)</span>
                </div>
              </div>

              {/* Trip Parameters (Days + Roundtrip) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Trip Duration (Days)
                  </label>
                  <select
                    value={tripDays}
                    onChange={(e) => setTripDays(Number(e.target.value))}
                    className="w-full px-3 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:border-emerald-500 cursor-pointer"
                  >
                    <option value={1}>1 Day Trip</option>
                    <option value={2}>2 Days / 1 Night</option>
                    <option value={3}>3 Days / 2 Nights</option>
                    <option value={4}>4 Days / 3 Nights</option>
                    <option value={5}>5 Days / 4 Nights</option>
                    <option value={7}>7 Days Complete Tour</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Journey Type
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setIsRoundTrip(true)}
                      className={`py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        isRoundTrip ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      Round Trip
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsRoundTrip(false)}
                      className={`py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        !isRoundTrip ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-600'
                      }`}
                    >
                      Drop Only
                    </button>
                  </div>
                </div>
              </div>

              {/* Choose Vehicle */}
              <div>
                <label className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Vehicle from Pushpanjali Fleet:
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                  {fleetData.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVehicleId(v.id)}
                      className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl border text-center transition-all cursor-pointer ${
                        selectedVehicleId === v.id
                          ? 'bg-emerald-50 border-emerald-500 text-slate-900 ring-2 ring-emerald-500/20 shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <div className="font-bold text-[11px] sm:text-xs truncate text-slate-900">{v.category}</div>
                      <div className="text-[10px] sm:text-[11px] text-emerald-700 font-bold mt-0.5">₹{v.startingRate}/km</div>
                      <div className="text-[9px] sm:text-[10px] text-slate-500">{v.passengers} Seats</div>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Fare Summary Receipt (Right 5 Cols - Crisp Dark Receipt) */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-emerald-400">Pushpanjali Fare Estimate</span>
                    <h4 className="text-base sm:text-lg font-black text-white">{selectedVehicle.name}</h4>
                  </div>
                  <span className="text-[11px] sm:text-xs px-2 py-0.5 rounded bg-yellow-400 text-slate-950 font-bold font-mono">
                    {selectedVehicle.registration}
                  </span>
                </div>

                {/* Calculation Rows */}
                <div className="py-3 sm:py-4 space-y-2.5 sm:space-y-3 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Total KM ({isRoundTrip ? 'Round Trip' : 'One Way'}):</span>
                    <span className="font-bold text-white">{totalKm} KM</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Base Fare (@ ₹{selectedVehicle.startingRate}/km):</span>
                    <span className="font-bold text-white">₹{distanceFare.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Driver Bata ({tripDays} Day{tripDays > 1 ? 's' : ''}):</span>
                    <span className="font-bold text-white">₹{driverBata.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Est. Tolls & Fastag:</span>
                    <span className="font-bold text-white">~₹{estTolls.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="pt-2 sm:pt-3 border-t border-dashed border-white/10 flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Dual AC Comfort:</span>
                    <span className="text-emerald-400 font-semibold">Included</span>
                  </div>
                </div>

                {/* Grand Total Box */}
                <div className="mt-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-center">
                  <span className="text-[11px] sm:text-xs text-emerald-300 uppercase tracking-wider font-semibold block">
                    Estimated Total Trip Fare
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-white mt-1">
                    ₹{grandTotal.toLocaleString('en-IN')}*
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    *Approx. estimate based on standard road conditions
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-5">
                <button
                  type="button"
                  onClick={() => onOpenBooking({
                    vehicleId: selectedVehicle.id,
                    tripType: isRoundTrip ? 'round' : 'oneway',
                    estimatedFare: grandTotal,
                    pickup: popularRoutes[selectedRouteIdx >= 0 ? selectedRouteIdx : 0]?.from || 'Cochin Airport',
                    drop: popularRoutes[selectedRouteIdx >= 0 ? selectedRouteIdx : 0]?.to || 'Custom Route'
                  })}
                  className="w-full py-3 sm:py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md transition duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book This Vehicle Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
