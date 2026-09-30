import React, { useState, useEffect } from 'react';
import { 
  Search, X, CheckCircle2, Clock, Car, Phone, MessageCircle, 
  MapPin, Calendar, Users, ShieldCheck, AlertCircle, ArrowRight, 
  Compass, UserCheck, RefreshCw, Printer, Navigation, Lock, LogIn,
  Sparkles, ChevronRight
} from 'lucide-react';
import { getStoredBookings } from '../data/bookingStorage';
import { fleetData } from '../data/fleetData';

export default function TrackBookingModal({ 
  isOpen, 
  onClose, 
  initialBookingId = '', 
  currentUser, 
  onOpenAuth, 
  onOpenBooking,
  onOpenAdmin 
}) {
  const [allBookings, setAllBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [guestLookupQuery, setGuestLookupQuery] = useState('');
  const [showGuestLookup, setShowGuestLookup] = useState(false);
  const [guestSearchResult, setGuestSearchResult] = useState(null);
  const [guestSearchAttempted, setGuestSearchAttempted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const list = getStoredBookings();
      setAllBookings(list);
      setGuestSearchAttempted(false);
      setGuestSearchResult(null);

      // Determine default selected booking
      if (initialBookingId) {
        setSelectedBookingId(initialBookingId);
      } else if (currentUser) {
        const userEmail = (currentUser.email || '').trim().toLowerCase();
        const userPhone = (currentUser.phone || '').replace(/[^0-9]/g, '');

        const userTrips = list.filter(b => {
          const bEmail = (b.email || '').trim().toLowerCase();
          const bPhone = (b.phone || '').replace(/[^0-9]/g, '');
          if (bEmail && userEmail) {
            if (bEmail === userEmail) return true;
            if (bEmail.startsWith('suresh') && userEmail.startsWith('suresh')) return true;
          }
          if (userPhone && bPhone && userPhone.length >= 8 && bPhone.endsWith(userPhone.slice(-8))) {
            return true;
          }
          return false;
        });

        if (userTrips.length > 0) {
          setSelectedBookingId(userTrips[0].id);
        } else {
          setSelectedBookingId('');
        }
      }
    }
  }, [isOpen, initialBookingId, currentUser]);

  if (!isOpen) return null;

  const refreshStatus = () => {
    const freshList = getStoredBookings();
    setAllBookings(freshList);
  };

  // If user is logged in, filter their specific bookings
  const userEmail = (currentUser?.email || '').trim().toLowerCase();
  const userPhone = (currentUser?.phone || '').replace(/[^0-9]/g, '');

  const myBookings = currentUser ? (
    currentUser.role === 'admin' 
      ? allBookings 
      : allBookings.filter(b => {
          const bEmail = (b.email || '').trim().toLowerCase();
          const bPhone = (b.phone || '').replace(/[^0-9]/g, '');
          if (bEmail && userEmail) {
            if (bEmail === userEmail) return true;
            if (bEmail.startsWith('suresh') && userEmail.startsWith('suresh')) return true;
          }
          if (userPhone && bPhone && userPhone.length >= 8 && bPhone.endsWith(userPhone.slice(-8))) {
            return true;
          }
          return false;
        })
  ) : [];

  // Active booking to display
  let currentActiveBooking = null;
  if (currentUser) {
    if (selectedBookingId) {
      currentActiveBooking = myBookings.find(b => b.id === selectedBookingId) || myBookings[0] || null;
    } else if (myBookings.length > 0) {
      currentActiveBooking = myBookings[0];
    }
  } else if (guestSearchResult) {
    currentActiveBooking = guestSearchResult;
  }

  // Handle Guest Lookup by ID or phone
  const handleGuestSearch = (e) => {
    e.preventDefault();
    setGuestSearchAttempted(true);
    const q = (guestLookupQuery || '').trim().toLowerCase();
    if (!q) {
      setGuestSearchResult(null);
      return;
    }
    const found = allBookings.find(b => 
      (b.id || '').toLowerCase() === q ||
      (b.id || '').toLowerCase().replace(/[^a-z0-9]/g, '') === q.replace(/[^a-z0-9]/g, '') ||
      (b.phone || '').replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, ''))
    );
    setGuestSearchResult(found || null);
  };

  // Find vehicle details from fleet data
  const vehicleObj = currentActiveBooking 
    ? fleetData.find(v => v.id === currentActiveBooking.vehicleId) || fleetData[0]
    : null;

  // Timeline Step Status Calculation
  const getTimelineSteps = (status) => {
    const steps = [
      { id: 1, title: 'Booking Received', desc: 'Logged with Pushpanjali fleet desk' },
      { id: 2, title: 'Trip Confirmed', desc: 'Fleet availability verified' },
      { id: 3, title: 'Chauffeur Assigned', desc: 'Driver contact & vehicle allocated' },
      { id: 4, title: 'Trip In Progress', desc: 'On the road in God’s Own Country' },
      { id: 5, title: 'Completed', desc: 'Safe drop at destination' }
    ];

    let currentStep = 1;
    if (status === 'Confirmed') currentStep = 2;
    else if (status === 'Chauffeur Assigned') currentStep = 3;
    else if (status === 'In Transit') currentStep = 4;
    else if (status === 'Completed') currentStep = 5;
    else if (status === 'Cancelled') currentStep = -1;

    return { steps, currentStep };
  };

  const { steps, currentStep } = currentActiveBooking 
    ? getTimelineSteps(currentActiveBooking.status) 
    : { steps: [], currentStep: 1 };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-8 text-slate-900 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-800 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            <span className="font-serif font-black text-white tracking-wide text-xs sm:text-sm">PUSHPANJALI HOLIDAYS</span>
            <span className="text-[9px] sm:text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
              {currentUser ? 'My Booked Trips' : 'Trip Tracking'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ============================================================ */}
        {/* STATE 1: USER IS NOT SIGNED IN -> PROMPT SIGN IN            */}
        {/* ============================================================ */}
        {!currentUser && !currentActiveBooking && (
          <div className="p-5 sm:p-9 text-center space-y-5 sm:space-y-6 overflow-y-auto flex-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <div className="space-y-1.5 max-w-md mx-auto">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Sign In to View Your Bookings
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For passenger privacy and security, live vehicle allocations, driver contact details, and trip tracking updates are accessible to your registered email account.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenAuth('signin');
                }}
                className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Your Account</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenAuth('signup');
                }}
                className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition cursor-pointer"
              >
                Create New Account
              </button>
            </div>

            {/* Quick Demo Helper Hint */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 max-w-md mx-auto text-left flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Instant Demo: </span>
                Click Sign In and select <b>Traveler Demo</b> (<code className="bg-amber-100 px-1 py-0.5 rounded text-[11px]">suresh@gmail.com</code>) to see an active Munnar Innova trip with chauffeur assignment!
              </div>
            </div>

            {/* Guest Reference ID Expander */}
            <div className="pt-3 border-t border-slate-200 text-left max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setShowGuestLookup(!showGuestLookup)}
                className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{showGuestLookup ? '▼ Hide' : '▶ Track using Booking ID & Phone'}</span>
              </button>

              {showGuestLookup && (
                <form onSubmit={handleGuestSearch} className="mt-3 flex flex-col xs:flex-row gap-2">
                  <input
                    type="text"
                    required
                    value={guestLookupQuery}
                    onChange={(e) => setGuestLookupQuery(e.target.value)}
                    placeholder="e.g. PH-782419 or Phone"
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition cursor-pointer"
                  >
                    Search
                  </button>
                </form>
              )}

              {guestSearchAttempted && !guestSearchResult && (
                <p className="text-xs text-rose-600 mt-2">
                  No booking found with "{guestLookupQuery}". Please sign in or check your ID.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STATE 2: SIGNED IN USER HAS NO BOOKINGS YET                 */}
        {/* ============================================================ */}
        {currentUser && myBookings.length === 0 && (
          <div className="p-6 sm:p-10 text-center space-y-5 sm:space-y-6 overflow-y-auto flex-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
              <Car className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-700 truncate max-w-full">
                <span>Account:</span>
                <span className="font-bold text-slate-900 truncate">{currentUser.email}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 pt-1">
                No Trips Booked Yet
              </h3>
              
              <p className="text-xs text-slate-600 leading-relaxed">
                We couldn't find any vehicle bookings registered under your email (<b>{currentUser.email}</b>).
              </p>
              
              <p className="text-xs text-slate-500 leading-relaxed">
                Ready to explore Kerala? Reserve our Honda Amaze, Toyota Innova, or luxury Pushpanjali Traveller for your next trip!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 pt-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 transition duration-300 hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
              >
                <Car className="w-4 h-4" />
                <span>Book a Vehicle Now</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition cursor-pointer"
              >
                Browse Fleet
              </button>
            </div>

            <p className="text-[11px] text-slate-400 pt-1">
              Booked through an agent or different email? Reach our 24/7 fleet manager at <b>+91 99614 77380</b>.
            </p>
          </div>
        )}

        {/* ============================================================ */}
        {/* STATE 3: USER HAS BOOKED TRIPS (OR GUEST FOUND A TRIP)      */}
        {/* ============================================================ */}
        {currentActiveBooking && (
          <div className="flex-1 overflow-y-auto flex flex-col">
            
            {/* Header / Trip Switcher */}
            <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 shrink-0">
              <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2 sm:mb-3">
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                    {currentUser ? `Welcome, ${currentUser.name}` : 'Trip Status'}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-500 truncate">
                    {currentUser 
                      ? `Showing trips for ${currentUser.email}`
                      : `Tracking reference ${currentActiveBooking.id}`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {currentUser?.role === 'admin' && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAdmin();
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-amber-100 text-amber-900 text-xs font-bold hover:bg-amber-200 border border-amber-300 transition cursor-pointer"
                    >
                      Admin Desk
                    </button>
                  )}
                  <button
                    onClick={refreshStatus}
                    className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-300 hover:border-emerald-500 text-xs font-semibold text-slate-700 flex items-center gap-1 shadow-2xs transition cursor-pointer"
                    title="Check for live updates"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              {/* Multiple Trips Tabs (if user has more than 1 booking) */}
              {myBookings.length > 1 && (
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Select Your Booked Trip:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {myBookings.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setSelectedBookingId(b.id)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 border ${
                          (currentActiveBooking.id === b.id)
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                        }`}
                      >
                        <span className="font-mono font-bold text-[11px]">{b.id}</span>
                        <span>•</span>
                        <span className="truncate max-w-[100px] sm:max-w-[130px]">{b.drop.split('(')[0]}</span>
                        <span className={`text-[9px] px-1 py-0.2 rounded font-bold ${
                          (currentActiveBooking.id === b.id)
                            ? 'bg-emerald-700 text-emerald-100'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {b.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Trip Detailed Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 flex-1">
              
              {/* Trip Top Status Banner */}
              <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 p-3.5 sm:p-5 rounded-2xl border border-emerald-200 flex flex-wrap items-center justify-between gap-2.5">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm sm:text-base font-bold text-slate-900">{currentActiveBooking.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      currentActiveBooking.status === 'New'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : currentActiveBooking.status === 'Confirmed'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : currentActiveBooking.status === 'Chauffeur Assigned'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : currentActiveBooking.status === 'In Transit'
                        ? 'bg-purple-100 text-purple-800 border border-purple-300'
                        : currentActiveBooking.status === 'Completed'
                        ? 'bg-slate-200 text-slate-800 border border-slate-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      ● {currentActiveBooking.status}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600">
                    Guest: <b>{currentActiveBooking.fullName}</b> ({currentActiveBooking.passengerCount} Passengers)
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Estimated Fare</span>
                  <span className="font-serif font-black text-emerald-800 text-sm sm:text-base">
                    ₹{Number(currentActiveBooking.estimatedFare || 0).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Visual Multi-step Timeline */}
              <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3.5 sm:space-y-4">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Trip Progress Tracker
                </span>

                <div className="relative pl-5 sm:pl-6 space-y-4 sm:space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {steps.map((st) => {
                    const isDone = currentStep >= st.id;
                    const isCurrent = currentStep === st.id;

                    return (
                      <div key={st.id} className="relative flex items-start gap-2.5 sm:gap-3">
                        <div className={`absolute -left-5 sm:-left-6 top-0.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold border-2 transition-all ${
                          isDone 
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-2xs' 
                            : 'bg-white border-slate-300 text-slate-400'
                        }`}>
                          {isDone ? '✓' : st.id}
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <h5 className={`text-xs sm:text-sm font-bold ${
                              isDone ? 'text-slate-900' : 'text-slate-400'
                            }`}>
                              {st.title}
                            </h5>
                            {isCurrent && (
                              <span className="text-[9px] sm:text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] sm:text-[11px] text-slate-500">{st.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chauffeur & Vehicle Allocation Card */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>Allocated Fleet & Chauffeur</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-400 text-slate-950 font-bold font-mono">
                    {currentActiveBooking.vehicleReg}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-center">
                  {/* Vehicle details */}
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    {vehicleObj && (
                      <img 
                        src={vehicleObj.image} 
                        alt={vehicleObj.name}
                        className="w-16 h-14 sm:w-20 sm:h-16 object-cover rounded-xl border border-slate-200 shadow-2xs shrink-0" 
                      />
                    )}
                    <div className="min-w-0">
                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm truncate">{currentActiveBooking.vehicleName}</h5>
                      <span className="text-[10px] sm:text-[11px] text-slate-500 block truncate">Climate Dual AC • Pushback</span>
                      <span className="text-[10px] sm:text-[11px] text-emerald-700 font-bold">GPS Verified Vehicle</span>
                    </div>
                  </div>

                  {/* Chauffeur details */}
                  <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
                    <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Assigned Chauffeur</span>
                    {currentActiveBooking.assignedDriver ? (
                      <div className="space-y-1.5">
                        <div className="font-bold text-slate-900 text-xs truncate">
                          {currentActiveBooking.assignedDriver}
                        </div>
                        {currentActiveBooking.driverNotes && (
                          <p className="text-[10px] text-slate-500 italic truncate">
                            "{currentActiveBooking.driverNotes}"
                          </p>
                        )}
                        <div className="pt-1">
                          <a
                            href={`tel:${currentActiveBooking.assignedDriver.replace(/[^0-9]/g, '')}`}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-[11px] font-bold"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Call Driver</span>
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200 font-medium">
                        Driver assigned 2h prior to pickup. You will receive SMS/WhatsApp alert.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Trip Route & Date Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 text-slate-700">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Pickup Location:</span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">{currentActiveBooking.pickup}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Destination:</span>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">{currentActiveBooking.drop}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Date & Time:</span>
                  <span className="font-bold text-slate-900">{currentActiveBooking.travelDate} at {currentActiveBooking.pickupTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Trip Type:</span>
                  <span className="font-bold text-slate-900 capitalize">{currentActiveBooking.tripType}</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                <a
                  href="tel:+919961477380"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>24x7 Helpline: +91 99614 77380</span>
                </a>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1 transition cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onOpenBooking();
                    }}
                    className="flex-1 sm:flex-initial px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition cursor-pointer text-center"
                  >
                    + Book Another
                  </button>

                  <button
                    onClick={onClose}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs cursor-pointer text-center"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
