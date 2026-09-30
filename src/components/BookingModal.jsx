import React, { useState, useEffect } from 'react';
import { X, Check, Car, Calendar, Users, MapPin, ShieldCheck, ArrowRight, MessageCircle, Printer, Sparkles, Navigation } from 'lucide-react';
import confetti from 'canvas-confetti';
import { fleetData } from '../data/fleetData';
import { saveBooking } from '../data/bookingStorage';

export default function BookingModal({ isOpen, onClose, initialData = {}, onOpenTrack, currentUser }) {
  const [step, setStep] = useState(1);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Form State
  const [tripType, setTripType] = useState(initialData.tripType || 'round');
  const [pickup, setPickup] = useState(initialData.pickup || 'Cochin International Airport (COK)');
  const [drop, setDrop] = useState(initialData.drop || 'Munnar Hill Station');
  const [travelDate, setTravelDate] = useState(() => {
    if (initialData.date) return initialData.date;
    const tm = new Date();
    tm.setDate(tm.getDate() + 1);
    return tm.toISOString().split('T')[0];
  });
  const [pickupTime, setPickupTime] = useState('08:00 AM');
  const [selectedVehicleId, setSelectedVehicleId] = useState(initialData.vehicleId || 'toyota-innova');
  const [passengerCount, setPassengerCount] = useState('4');

  // Customer Contact - pre-populated from current user
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [specialNote, setSpecialNote] = useState(initialData.note || '');

  useEffect(() => {
    if (initialData.vehicleId) setSelectedVehicleId(initialData.vehicleId);
    if (initialData.pickup) setPickup(initialData.pickup);
    if (initialData.drop) setDrop(initialData.drop);
    if (initialData.tripType) setTripType(initialData.tripType);
    if (initialData.note) setSpecialNote(initialData.note);
    if (currentUser?.name && !fullName) setFullName(currentUser.name);
    if (currentUser?.phone && !phone) setPhone(currentUser.phone);
    if (currentUser?.email && !email) setEmail(currentUser.email);
  }, [initialData, currentUser]);

  if (!isOpen) return null;

  const selectedVehicle = fleetData.find(v => v.id === selectedVehicleId) || fleetData[1];

  const handleCompleteBooking = (e) => {
    e.preventDefault();
    const id = `PH-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(id);

    // Save into persistent local storage for Admin Portal!
    saveBooking({
      id: id,
      fullName: fullName,
      phone: phone,
      email: email,
      pickup: pickup,
      drop: drop,
      travelDate: travelDate,
      pickupTime: pickupTime,
      tripType: tripType,
      passengerCount: passengerCount,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      vehicleReg: selectedVehicle.registration,
      estimatedFare: initialData.estimatedFare || (selectedVehicle.startingRate * 120),
      specialNote: specialNote,
      status: 'New'
    });

    setBookingConfirmed(true);
    setStep(4);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  const getWhatsAppMessage = () => {
    return `*NEW BOOKING RESERVATION - PUSHPANJALI HOLIDAYS*
Ref ID: *${bookingId}*
Vehicle: *${selectedVehicle.name} (${selectedVehicle.registration})*
Trip Type: *${tripType === 'round' ? 'Round Trip' : tripType === 'oneway' ? 'One Way Drop' : 'Holiday Package'}*
Pickup: *${pickup}*
Destination: *${drop}*
Date: *${travelDate}* at *${pickupTime}*
Passengers: *${passengerCount}*

*GUEST DETAILS:*
Name: *${fullName}*
Phone: *${phone}*
${email ? `Email: ${email}\n` : ''}${specialNote ? `Notes: ${specialNote}\n` : ''}
Please confirm availability and provide driver assignment.`;
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(getWhatsAppMessage());
    window.open(`https://wa.me/919961477380?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 text-slate-900 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-800 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="font-serif font-black text-white tracking-wide text-xs sm:text-sm">PUSHPANJALI HOLIDAYS</span>
            <span className="text-[9px] sm:text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
              Instant Booking Desk
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar (when not finished) */}
        {!bookingConfirmed && (
          <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-[11px] sm:text-xs shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold ${
                step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>1</span>
              <span className={step >= 1 ? 'text-slate-900 font-bold' : 'text-slate-500'}>Trip Details</span>
            </div>
            <div className="w-4 sm:w-8 h-px bg-slate-300"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold ${
                step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>2</span>
              <span className={step >= 2 ? 'text-slate-900 font-bold' : 'text-slate-500'}>Select Fleet</span>
            </div>
            <div className="w-4 sm:w-8 h-px bg-slate-300"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold ${
                step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}>3</span>
              <span className={step >= 3 ? 'text-slate-900 font-bold' : 'text-slate-500'}>Passenger Info</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          
          {/* STEP 1: Trip Details */}
          {step === 1 && (
            <div className="space-y-4 text-left">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                <span>Step 1: Where & When are you traveling?</span>
              </h3>

              {/* Trip Type */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-[11px] sm:text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setTripType('round')}
                  className={`py-2 rounded-lg transition cursor-pointer ${tripType === 'round' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'}`}
                >
                  Round Trip
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('oneway')}
                  className={`py-2 rounded-lg transition cursor-pointer ${tripType === 'oneway' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'}`}
                >
                  One-Way Drop
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('package')}
                  className={`py-2 rounded-lg transition cursor-pointer ${tripType === 'package' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'}`}
                >
                  Holiday Tour
                </button>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Pickup Location</label>
                <input
                  type="text"
                  required
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="e.g. Cochin Airport (COK), Railway Station, Hotel"
                  className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Destination / Drop Location</label>
                <input
                  type="text"
                  required
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  placeholder="e.g. Munnar, Wayanad, Alleppey, Sabarimala"
                  className="w-full px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Travel Date</label>
                  <input
                    type="date"
                    required
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Pickup Time</label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 cursor-pointer"
                  >
                    <option value="05:00 AM">05:00 AM (Early)</option>
                    <option value="06:30 AM">06:30 AM</option>
                    <option value="08:00 AM">08:00 AM</option>
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="01:30 PM">01:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="10:30 PM">10:30 PM (Night)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Passenger Count</label>
                  <select
                    value={passengerCount}
                    onChange={(e) => setPassengerCount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm text-slate-900 cursor-pointer"
                  >
                    <option value="1">1-2 Guests</option>
                    <option value="4">3-4 Guests</option>
                    <option value="6">5-7 Guests</option>
                    <option value="10">8-12 Guests</option>
                    <option value="17">13-17 Guests</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Continue to Vehicle Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Vehicle Selection */}
          {step === 2 && (
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Car className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                  <span>Step 2: Choose Pushpanjali Fleet Vehicle</span>
                </h3>
                <span className="text-xs text-slate-500 hidden sm:inline">{passengerCount} passengers selected</span>
              </div>

              <div className="space-y-3">
                {fleetData.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicleId(v.id)}
                    className={`p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col xs:flex-row sm:flex-row items-start xs:items-center gap-3 sm:gap-4 ${
                      selectedVehicleId === v.id
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={v.image}
                      alt={v.name}
                      className="w-full xs:w-24 sm:w-28 h-28 xs:h-20 sm:h-20 object-cover rounded-xl shrink-0"
                    />

                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base truncate">{v.name}</h4>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-400 text-slate-900 border border-yellow-500 font-mono font-bold">
                          {v.registration}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{v.tagline}</p>
                      
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-700 mt-2 font-medium">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-emerald-600" />
                          {v.passengers} Seats
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-emerald-700 font-bold">₹{v.startingRate} / km</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-amber-700 font-bold">₹{v.dayPackageRate}/day</span>
                      </div>
                    </div>

                    <div className="shrink-0 self-end xs:self-center pr-1 sm:pr-2">
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                        selectedVehicleId === v.id
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 text-transparent'
                      }`}>
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 sm:pt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  ← Back to Details
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 transition flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-md"
                >
                  <span>Continue to Passenger Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Passenger Information */}
          {step === 3 && (
            <form onSubmit={handleCompleteBooking} className="space-y-4 text-left">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                <span>Step 3: Primary Traveler & Contact Information</span>
              </h3>

              <div className="p-3 sm:p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
                <div>
                  <span className="font-bold">Chosen Vehicle: </span>
                  <span>{selectedVehicle.name} ({selectedVehicle.registration})</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-300">
                  {tripType === 'round' ? 'Round Trip' : 'One Way'}
                </span>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Primary Guest Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Anand Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">WhatsApp / Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 99614 77380"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guest@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Flight Number or Special Notes (Optional)</label>
                <textarea
                  rows={2}
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="e.g. Flight AI-512 landing at 10 AM, need infant seat..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 sm:pt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="px-6 sm:px-8 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 hover:from-emerald-700 hover:to-amber-700 shadow-lg shadow-emerald-600/25 transition duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center gap-2 cursor-pointer"
                >
                  <span>Confirm Reservation</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Booking Confirmation Screen */}
          {bookingConfirmed && (
            <div className="text-center py-4 sm:py-6 space-y-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <Check className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-600">Booking Successfully Logged</span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">Your Pushpanjali Ride is Reserved!</h3>
                <p className="text-xs text-slate-500">Your reservation code has been generated and dispatched to our fleet control desk.</p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3 max-w-lg mx-auto text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Reference Booking ID:</span>
                  <span className="font-mono text-sm font-bold text-slate-900">{bookingId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Allocated Vehicle:</span>
                  <span className="font-bold text-slate-900">{selectedVehicle.name} ({selectedVehicle.registration})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Route:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[200px]">{pickup} → {drop}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Travel Date & Time:</span>
                  <span className="font-bold text-slate-900">{travelDate} at {pickupTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Primary Guest:</span>
                  <span className="font-bold text-slate-900">{fullName} ({phone})</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 max-w-lg mx-auto pt-2">
                <button
                  onClick={handleWhatsAppSend}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Voucher to Pushpanjali WhatsApp Desk</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      if (onOpenTrack) onOpenTrack(bookingId);
                    }}
                    className="py-2.5 px-3 rounded-xl font-bold text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Track Live Trip</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="py-2.5 px-3 rounded-xl font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition cursor-pointer"
                  >
                    Return to Website
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
