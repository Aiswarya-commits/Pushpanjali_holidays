import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    route: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const msg = `Enquiry from Pushpanjali Website: Name: ${formData.name}, Phone: ${formData.phone}, Route: ${formData.route}, Note: ${formData.message}`;
    const url = `https://wa.me/919961477380?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Always At Your Service</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Connect with Pushpanjali Holidays
          </h2>
          <p className="text-slate-600 text-sm sm:text-base lg:text-lg">
            Have a custom itinerary or special charter requirement? Reach out anytime via call, WhatsApp, or the quick form below.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Contact Cards (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-3.5 sm:space-y-4">
            
            {/* Phone Hotline */}
            <a
              href="tel:+91 99614 77380"
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md flex items-start gap-3 sm:gap-4 transition-all group block"
            >
              <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 group-hover:scale-110 transition-transform shrink-0">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Direct Booking Helpline (24x7)</span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors break-words">
                  +91 99614 77380 / +91 9961903318
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Call directly for instant vehicle allotment</p>
              </div>
            </a>

            {/* WhatsApp Support */}
            <a
              href="https://wa.me/919961477380?text=Hi%20Pushpanjali%20Holidays%2C%20I%20want%20to%20enquire%20about%20a%20vehicle%20booking"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-500 hover:shadow-md flex items-start gap-3 sm:gap-4 transition-all group block"
            >
              <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 group-hover:scale-110 transition-transform shrink-0">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Official WhatsApp Desk</span>
                <h4 className="text-base sm:text-lg font-bold text-emerald-700">
                  +91 99614 77380
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Instant quote, vehicle photos & live driver location</p>
              </div>
            </a>

            {/* Hub Location */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Central Garage & Fleet Office</span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">
                  Pushpanjali Holidays Fleet Hub
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">
                  Kerala, India (Pickup hubs across Kochi Airport, Thrissur, Calicut & Trivandrum)
                </p>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 shrink-0">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Working Hours</span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900">24 Hours / 7 Days a Week</h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Emergency roadside support team always active</p>
              </div>
            </div>

          </div>

          {/* Quick Inquiry Form (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xl">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">Send a Fast Trip Enquiry</h3>
              <p className="text-xs text-slate-500 mb-5 sm:mb-6">Our trip coordinator responds within 10 minutes.</p>

              {formSubmitted ? (
                <div className="p-6 sm:p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">Enquiry Sent to WhatsApp!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    We've opened WhatsApp with your journey inquiry. A Pushpanjali fleet manager is ready to confirm your quote.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-emerald-700 font-bold underline cursor-pointer"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Anand Varma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-emerald-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">WhatsApp / Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 99614 77380"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-emerald-500 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Proposed Route / Destinations *</label>
                    <input
                      type="text"
                      required
                      value={formData.route}
                      onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                      placeholder="e.g. Cochin Airport to Munnar & Alleppey (4 Days)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-emerald-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">Special Requirements (Optional)</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="e.g. Need roof luggage carrier, child seat, senior citizen assistance..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-emerald-500 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/25 transition duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Connect Direct on WhatsApp</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
