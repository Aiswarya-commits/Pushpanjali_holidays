import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Unlock, Users, Car, Calendar, MapPin, Phone, 
  MessageCircle, Download, Search, Filter, RefreshCw, CheckCircle2, 
  Clock, AlertCircle, XCircle, ChevronRight, UserCheck, ArrowLeft, 
  Trash2, Edit3, ExternalLink, HelpCircle, FileSpreadsheet
} from 'lucide-react';
import { getStoredBookings, updateBooking, deleteBooking, exportBookingsToCSV } from '../data/bookingStorage';

export default function AdminPortal({ onBackToSite, onLogout, currentUser }) {
  // Authentication check
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (currentUser?.role === 'admin') return true;
    return localStorage.getItem('pushpanjali_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Bookings list state
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [vehicleFilter, setVehicleFilter] = useState('ALL');

  // Chauffeur assignment modal state
  const [editingBooking, setEditingBooking] = useState(null);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [driverNotes, setDriverNotes] = useState('');

  const loadBookings = () => {
    const list = getStoredBookings();
    setBookings(list);
  };

  useEffect(() => {
    if (currentUser?.role === 'admin') {
      setIsAuthenticated(true);
    }
  }, [currentUser]);

  useEffect(() => {
    if (isAuthenticated) {
      loadBookings();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === 'admin123' || pinInput === 'pushpanjali') {
      setIsAuthenticated(true);
      localStorage.setItem('pushpanjali_admin_auth', 'true');
      setPinError(false);
      loadBookings();
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('pushpanjali_admin_auth');
    if (onLogout) onLogout();
  };

  const handleStatusChange = (bookingId, newStatus) => {
    const updated = updateBooking(bookingId, { status: newStatus });
    setBookings(updated);
  };

  const handleDelete = (bookingId) => {
    if (window.confirm(`Are you sure you want to remove booking ${bookingId}?`)) {
      const updated = deleteBooking(bookingId);
      setBookings(updated);
    }
  };

  const openDriverModal = (b) => {
    setEditingBooking(b);
    setDriverName(b.assignedDriver ? b.assignedDriver.split('(')[0].trim() : '');
    setDriverPhone(b.assignedDriver && b.assignedDriver.includes('(') ? b.assignedDriver.split('(')[1].replace(')', '').trim() : '');
    setDriverNotes(b.driverNotes || '');
  };

  const saveDriverAssignment = (e) => {
    e.preventDefault();
    if (!editingBooking) return;
    const formattedDriver = driverName ? `${driverName} (${driverPhone})` : '';
    const updated = updateBooking(editingBooking.id, {
      assignedDriver: formattedDriver,
      driverNotes: driverNotes,
      status: formattedDriver ? 'Chauffeur Assigned' : editingBooking.status
    });
    setBookings(updated);
    setEditingBooking(null);
  };

  const sendWhatsAppUpdate = (b) => {
    const msg = `*PUSHPANJALI HOLIDAYS - TRIP UPDATE*
Dear ${b.fullName},
Your booking *${b.id}* for *${b.vehicleName} (${b.vehicleReg})* on *${b.travelDate}* is *${b.status.toUpperCase()}*.
Pickup: ${b.pickup} at ${b.pickupTime}
Destination: ${b.drop}
${b.assignedDriver ? `Assigned Chauffeur: *${b.assignedDriver}*\n` : ''}${b.driverNotes ? `Driver Note: ${b.driverNotes}\n` : ''}📍 Track your live trip on our website with Ref ID: *${b.id}*
For assistance, contact our 24/7 desk at +91 99614 77380. Have a wonderful journey!`;
    const cleanPhone = b.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const term = searchTerm.toLowerCase();
    const matchSearch = 
      (b.id || '').toLowerCase().includes(term) ||
      (b.fullName || '').toLowerCase().includes(term) ||
      (b.phone || '').includes(term) ||
      (b.drop || '').toLowerCase().includes(term) ||
      (b.pickup || '').toLowerCase().includes(term);

    const matchStatus = statusFilter === 'ALL' || b.status === statusFilter;
    const matchVehicle = vehicleFilter === 'ALL' || b.vehicleId === vehicleFilter;

    return matchSearch && matchStatus && matchVehicle;
  });

  // Calculate Metrics
  const totalCount = bookings.length;
  const newCount = bookings.filter(b => b.status === 'New').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Chauffeur Assigned').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (Number(b.estimatedFare) || 0), 0);

  // If NOT authenticated, show PIN Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-3 sm:p-4 text-slate-100">
        <div className="max-w-md w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl text-slate-900 space-y-5 sm:space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">Pushpanjali Fleet Admin</h2>
            <p className="text-xs text-slate-500">
              Authorized Personnel Portal for live fleet scheduling, status tracking, and chauffeur allocation.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 text-left">
                Enter Admin Access PIN
              </label>
              <input
                type="password"
                required
                autoFocus
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (Default: admin123)"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm text-slate-900 transition text-center tracking-widest font-mono text-lg"
              />
              {pinError && (
                <p className="text-xs text-rose-500 mt-1.5 font-medium text-center">
                  Incorrect PIN. Please use: <code className="bg-rose-50 px-1 py-0.5 rounded text-rose-700 font-bold">admin123</code>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition cursor-pointer"
            >
              Unlock Admin Portal
            </button>
          </form>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600">
            <span>Default PIN: </span>
            <span className="font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-slate-200">
              admin123
            </span>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onBackToSite}
              className="text-xs font-semibold text-slate-500 hover:text-emerald-700 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      
      {/* Admin Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-0 min-h-16 sm:h-20 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onBackToSite}
              className="p-1.5 sm:p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition cursor-pointer"
              title="Return to Website"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-xl font-black text-slate-900 tracking-tight font-serif">
                  PUSHPANJALI
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                  Admin Portal
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">Live Customer Bookings Management Desk</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <button
              onClick={onBackToSite}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 transition flex items-center gap-1.5 cursor-pointer"
              title="Preview Customer Website"
            >
              <span className="hidden sm:inline">View Customer Website</span>
              <span className="sm:hidden text-[11px]">Website</span>
            </button>
            <button
              onClick={loadBookings}
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
              title="Refresh Bookings"
            >
              <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => exportBookingsToCSV(filteredBookings)}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition flex items-center gap-1.5 cursor-pointer"
              title="Export Bookings to CSV / Excel"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Bookings</span>
              <div className="text-xl sm:text-3xl font-black text-slate-900 mt-1">{totalCount}</div>
              <span className="text-[10px] sm:text-[11px] text-emerald-600 font-medium">All recorded trips</span>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-amber-700 uppercase tracking-wider">New / Pending</span>
              <div className="text-xl sm:text-3xl font-black text-amber-700 mt-1">{newCount}</div>
              <span className="text-[10px] sm:text-[11px] text-amber-600 font-medium">Requires follow-up</span>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-700 uppercase tracking-wider">Confirmed & Active</span>
              <div className="text-xl sm:text-3xl font-black text-emerald-700 mt-1">{confirmedCount}</div>
              <span className="text-[10px] sm:text-[11px] text-emerald-600 font-medium">Drivers allocated/ready</span>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Estimated Revenue</span>
              <div className="text-xl sm:text-3xl font-black text-slate-900 mt-1">₹{totalRevenue.toLocaleString('en-IN')}</div>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium">Estimated trip values</span>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base sm:text-lg">
              ₹
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-3 items-center">
            
            {/* Search Input (6 cols) */}
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by customer name, phone, ID, destination..."
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 text-xs sm:text-sm text-slate-900 bg-slate-50"
              />
            </div>

            {/* Status Filter (3 cols) */}
            <div className="sm:col-span-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 bg-slate-50 focus:border-emerald-500 cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="New">New / Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Chauffeur Assigned">Chauffeur Assigned</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Vehicle Filter (3 cols) */}
            <div className="sm:col-span-3">
              <select
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
                className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-800 bg-slate-50 focus:border-emerald-500 cursor-pointer"
              >
                <option value="ALL">All Vehicles</option>
                <option value="honda-amaze">Honda Amaze (KL 52)</option>
                <option value="toyota-innova">Toyota Innova (KL 70)</option>
                <option value="force-traveller">Pushpanjali Traveller (KL 63)</option>
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Showing <b>{filteredBookings.length}</b> of {bookings.length} reservations</span>
            {(searchTerm || statusFilter !== 'ALL' || vehicleFilter !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('ALL');
                  setVehicleFilter('ALL');
                }}
                className="text-xs text-emerald-600 hover:underline font-semibold cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Bookings List / Cards */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">No reservations found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No customer bookings match your current search or filter criteria. Try adjusting the filter or test-book a ride on the public website.
              </p>
            </div>
          ) : (
            filteredBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-6 space-y-4 hover:border-emerald-300 transition"
              >
                {/* Header row: ID, Created, Status badge, Delete */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <span className="font-mono font-bold text-xs sm:text-sm text-emerald-800 bg-emerald-50 px-2 sm:px-2.5 py-1 rounded-lg border border-emerald-200">
                      {b.id}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-400">
                      Booked on {new Date(b.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Changer Select */}
                    <select
                      value={b.status}
                      onChange={(e) => handleStatusChange(b.id, e.target.value)}
                      className={`text-[11px] sm:text-xs font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer ${
                        b.status === 'New'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : b.status === 'Confirmed'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : b.status === 'Chauffeur Assigned'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : b.status === 'Completed'
                          ? 'bg-slate-100 text-slate-700 border-slate-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}
                    >
                      <option value="New">🟡 New / Pending</option>
                      <option value="Confirmed">🔵 Confirmed</option>
                      <option value="Chauffeur Assigned">🟢 Chauffeur Assigned</option>
                      <option value="In Transit">🟣 In Transit / On Road</option>
                      <option value="Completed">⚪ Completed</option>
                      <option value="Cancelled">🔴 Cancelled</option>
                    </select>

                    <button
                      onClick={() => handleDelete(b.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Main Booking Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
                  
                  {/* Customer Info (4 cols) */}
                  <div className="lg:col-span-4 space-y-1.5 text-xs">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Lead Passenger</span>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900">{b.fullName}</h4>
                    
                    <div className="space-y-1 pt-1 text-slate-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <a href={`tel:${b.phone}`} className="font-semibold hover:text-emerald-700">{b.phone}</a>
                      </div>
                      {b.email && (
                        <div className="text-slate-500 truncate max-w-full">{b.email}</div>
                      )}
                      <div className="text-slate-500">
                        Guests: <span className="font-semibold text-slate-800">{b.passengerCount} passengers</span>
                      </div>
                    </div>
                  </div>

                  {/* Route & Schedule (4 cols) */}
                  <div className="lg:col-span-4 space-y-1.5 text-xs">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Trip & Schedule</span>
                    <div className="space-y-1">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-bold text-slate-800">{b.pickup}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="font-bold text-slate-800">{b.drop}</span>
                      </div>
                    </div>
                    <div className="pt-1 text-slate-500 flex items-center gap-3">
                      <span>{b.travelDate} at {b.pickupTime}</span>
                      <span>•</span>
                      <span className="capitalize font-semibold text-slate-700">{b.tripType}</span>
                    </div>
                  </div>

                  {/* Vehicle & Chauffeur (4 cols) */}
                  <div className="lg:col-span-4 space-y-2 text-xs">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">Vehicle & Chauffeur</span>
                    
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{b.vehicleName}</span>
                        <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-yellow-400 text-slate-950">
                          {b.vehicleReg}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        Est. Fare: <b className="text-emerald-700">₹{Number(b.estimatedFare || 0).toLocaleString('en-IN')}</b>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-400 block font-medium">Chauffeur:</span>
                        <span className="font-semibold text-slate-800 text-xs truncate block max-w-[180px]">
                          {b.assignedDriver || <i className="text-slate-400 font-normal">Not assigned yet</i>}
                        </span>
                      </div>
                      <button
                        onClick={() => openDriverModal(b)}
                        className="text-[11px] text-emerald-700 hover:text-emerald-800 font-bold underline cursor-pointer shrink-0 ml-2"
                      >
                        {b.assignedDriver ? 'Change' : '+ Assign'}
                      </button>
                    </div>
                  </div>

                </div>

                {/* Special Request Notes (if any) */}
                {b.specialNote && (
                  <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Guest Request Note: </span>
                      <span>{b.specialNote}</span>
                    </div>
                  </div>
                )}

                {/* Action Toolbar */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2.5 text-xs">
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`tel:${b.phone}`}
                      className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Call Guest</span>
                    </a>

                    <button
                      onClick={() => sendWhatsAppUpdate(b)}
                      className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Send WhatsApp Update</span>
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-400">
                    Status: <b className="text-slate-700">{b.status}</b>
                  </span>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Chauffeur Assignment Modal */}
        {editingBooking && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 truncate">
                  Assign Chauffeur - {editingBooking.id}
                </h3>
                <button
                  onClick={() => setEditingBooking(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={saveDriverAssignment} className="space-y-3.5 text-left text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Chauffeur Full Name</label>
                  <input
                    type="text"
                    required
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Chauffeur Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    placeholder="e.g. +91 98471 55220"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Internal Instructions / Notes</label>
                  <textarea
                    rows="2"
                    value={driverNotes}
                    onChange={(e) => setDriverNotes(e.target.value)}
                    placeholder="e.g. Clean vehicle thoroughly, meet at Airport Pillar 4..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 focus:border-emerald-500"
                  ></textarea>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingBooking(null)}
                    className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md cursor-pointer"
                  >
                    Save Chauffeur
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
