import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import FleetSection from './components/FleetSection';
import FareCalculator from './components/FareCalculator';
import TourPackages from './components/TourPackages';
import Facilities from './components/Facilities';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import FloatingActions from './components/FloatingActions';
import AdminPortal from './components/AdminPortal';
import TrackBookingModal from './components/TrackBookingModal';
import AuthModal from './components/AuthModal';
import { getCurrentUser, logout } from './data/authService';
import { Lock, LogOut } from 'lucide-react';

export default function App() {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  
  // View State: 'site' | 'admin' (defaults to 'site' so the website is always shown initially!)
  const [viewMode, setViewMode] = useState('site');

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin'); // 'signin' | 'signup'
  const [authIsAdminIntent, setAuthIsAdminIntent] = useState(false);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState({});
  const [pendingBookingData, setPendingBookingData] = useState(null);

  const [isTrackOpen, setIsTrackOpen] = useState(false);
  const [trackingBookingId, setTrackingBookingId] = useState('');

  // Check URL query parameters (e.g. ?track=PH-782419 or ?admin=true)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const trackParam = params.get('track');
      const adminParam = params.get('admin');

      if (trackParam) {
        setTrackingBookingId(trackParam);
        setIsTrackOpen(true);
      } else if (adminParam === 'true') {
        if (currentUser?.role === 'admin') {
          setViewMode('admin');
        } else {
          setAuthIsAdminIntent(true);
          setIsAuthModalOpen(true);
        }
      }
    } catch (err) {}
  }, [currentUser]);

  // Auth Modal Triggers
  const handleOpenAuth = (mode = 'signin', isAdmin = false) => {
    setAuthModalMode(mode);
    setAuthIsAdminIntent(isAdmin);
    setIsAuthModalOpen(true);
  };

  const handleOpenAdmin = () => {
    if (currentUser?.role === 'admin') {
      setViewMode('admin');
    } else {
      handleOpenAuth('signin', true);
    }
  };

  // Called when login or signup succeeds
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);

    if (user.role === 'admin') {
      // Admin goes straight to Admin Dashboard
      setViewMode('admin');
    } else {
      // If user was attempting to book, open the booking modal now!
      if (pendingBookingData) {
        setBookingInitialData(pendingBookingData);
        setIsBookingOpen(true);
        setPendingBookingData(null);
      }
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setViewMode('site');
  };

  // Vehicle Booking Trigger
  const handleOpenBooking = (prefill = {}) => {
    // If not logged in, prompt sign in / create account first!
    if (!currentUser) {
      setPendingBookingData(prefill);
      handleOpenAuth('signup', false);
    } else {
      setBookingInitialData(prefill);
      setIsBookingOpen(true);
    }
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setPendingBookingData(null);
  };

  const handleOpenTrack = (bookingId = '') => {
    setTrackingBookingId(bookingId);
    setIsTrackOpen(true);
  };

  const handleCloseTrack = () => {
    setIsTrackOpen(false);
  };

  // If in Admin view mode, render Admin Portal
  if (currentUser?.role === 'admin' && viewMode === 'admin') {
    return (
      <AdminPortal 
        onBackToSite={() => setViewMode('site')} 
        onLogout={handleLogout}
        currentUser={currentUser}
      />
    );
  }

  // Otherwise, render the complete Customer Website!
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Banner if logged in as Admin and previewing website */}
      {currentUser?.role === 'admin' && (
        <div className="bg-amber-500 text-slate-950 px-3 sm:px-4 py-2 text-xs font-bold flex flex-wrap items-center justify-between gap-2 sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
            <span className="truncate max-w-[200px] sm:max-w-none">👑 Admin Preview: {currentUser.name}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <button
              onClick={() => setViewMode('admin')}
              className="px-2.5 sm:px-3 py-1 rounded-lg bg-slate-950 text-white hover:bg-slate-800 transition cursor-pointer flex items-center gap-1.5 text-xs"
            >
              <Lock className="w-3 h-3" />
              <span className="hidden xs:inline sm:inline">Return to Admin Dashboard</span>
              <span className="xs:hidden">Admin Desk</span>
            </button>
            <button
              onClick={handleLogout}
              className="text-slate-950 hover:underline flex items-center gap-1 cursor-pointer font-bold text-xs"
            >
              <LogOut className="w-3 h-3" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar 
        onOpenBooking={handleOpenBooking} 
        onOpenAdmin={handleOpenAdmin}
        onOpenTrack={handleOpenTrack}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section with Quick Booking Widget */}
        <Hero 
          onOpenBooking={handleOpenBooking}
          onOpenTrack={handleOpenTrack}
        />

        {/* Key Guarantees Trust Bar */}
        <TrustBar />

        {/* Real Vehicle Fleet Showcase (Honda Amaze, Toyota Innova, Pushpanjali Traveller) */}
        <FleetSection 
          onOpenBooking={handleOpenBooking}
        />

        {/* Interactive Route Fare Calculator */}
        <FareCalculator 
          onOpenBooking={handleOpenBooking}
        />

        {/* Popular Kerala Holiday Tour Packages */}
        {/* <TourPackages 
          onOpenBooking={handleOpenBooking}
        /> */}

        {/* Pushpanjali Amenities & Facilities */}
        <Facilities />

        {/* Traveler Testimonials & Reviews */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQ />

        {/* Direct Contact & Inquiry Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenTrack={handleOpenTrack}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
      />

      {/* Interactive Step-by-Step Vehicle Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialData={bookingInitialData}
        onOpenTrack={handleOpenTrack}
        currentUser={currentUser}
      />

      {/* Auth Modal (Sign In / Register / Admin Login) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setPendingBookingData(null);
        }}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
        isAdminIntent={authIsAdminIntent}
      />

      {/* Real-Time Customer Trip Tracking Modal */}
      <TrackBookingModal
        isOpen={isTrackOpen}
        onClose={handleCloseTrack}
        initialBookingId={trackingBookingId}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onOpenBooking={handleOpenBooking}
        onOpenAdmin={() => setViewMode('admin')}
      />

      {/* Persistent Floating Quick Actions (WhatsApp + Call) */}
      <FloatingActions onOpenBooking={handleOpenBooking} />
    </div>
  );
}
