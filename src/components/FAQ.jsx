import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "How do I confirm my vehicle booking with Pushpanjali Holidays?",
      a: "You can book directly via our online booking form or via WhatsApp at +91 99614 77380. Once you submit your trip details, our team immediately confirms vehicle availability, chauffeur contact, and sends your digital trip confirmation voucher."
    },
    {
      q: "Can I choose the specific vehicle shown on the website?",
      a: "Yes, absolutely! The photos on our website are actual photos of our fleet: Honda Amaze (KL 52 F 7263), Toyota Innova (KL 70 H 7498), and Pushpanjali Force Luxury Traveller (KL 63 F 6674). You will be allocated the exact vehicle you choose."
    },
    {
      q: "Are the vehicle rates inclusive of Toll, Parking, and Driver Allowance?",
      a: "Our rate quotation clearly separates the base distance running rate, daily driver bata, and toll estimates. There are zero hidden surcharges or surprise fees at the end of your trip."
    },
    {
      q: "Do your drivers have experience with Kerala ghat roads and hill stations?",
      a: "Yes! All our chauffeurs have at least 8 to 15 years of driving experience across the scenic and demanding hairpin bends of Munnar, Wayanad, Nelliyampathy, and Ooty. They are courteous, defensive drivers who prioritize family safety."
    },
    {
      q: "What is your cancellation or rescheduling policy?",
      a: "We understand travel plans can shift. We offer flexible free rescheduling and zero cancellation charges if informed at least 24 hours prior to scheduled pickup."
    },
    {
      q: "Do you provide interstate permits for Ooty, Kodaikanal, Mysore, or Bangalore trips?",
      a: "Yes, our vehicles possess valid All-India Tourist Permits and we can easily arrange interstate tax endorsements for Tamil Nadu, Karnataka, and Pondicherry."
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 space-y-2.5 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base">
            Everything you need to know about vehicle rentals, holiday packages, and driver guidelines.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition"
              >
                <span className="font-bold text-sm sm:text-base text-slate-900">
                  {faq.q}
                </span>
                <span className="p-1 rounded-lg bg-slate-100 text-emerald-700 shrink-0">
                  {openIdx === i ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {openIdx === i && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
