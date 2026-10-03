import React, { useState } from 'react';
import { Calendar, Phone, MessageCircle, MapPin, CheckCircle2, X } from 'lucide-react';
import { Reservation } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationSectionProps {
  onAddReservation: (res: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => Reservation;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ onAddReservation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('20:00');
  const [guests, setGuests] = useState(2);
  const [note, setNote] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date || !time) return;

    const newRes = onAddReservation({
      name: name.trim(),
      phone: phone.trim(),
      date,
      time,
      guests,
      note: note.trim() || undefined,
    });

    setConfirmedReservation(newRes);
    setName('');
    setPhone('');
    setNote('');
  };

  const sendWhatsAppConfirmation = (res: Reservation) => {
    const text = `Salam Al Madina Restaurant! I would like to confirm my table reservation request:\n\nReference: ${res.id}\nName: ${res.name}\nPhone: ${res.phone}\nDate: ${res.date}\nTime: ${res.time}\nGuests: ${res.guests} people\nSpecial Request: ${res.note || 'None'}`;
    const url = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="reserve" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#f0ede3] rounded-3xl overflow-hidden border border-[#ded8c9] shadow-sm grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* Left Dark Info Panel (Matching Screenshot) */}
        <div className="lg:col-span-5 bg-[#171b19] text-[#e8eee9] p-8 sm:p-12 flex flex-col justify-between">
          <div className="space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#a8b3ac] block">
              YOUR TABLE
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight leading-tight">
              Planning a{' '}
              <span className="italic font-serif font-normal text-amber-200">
                meal together?
              </span>
            </h2>

            <p className="text-sm text-[#d4ded6] leading-relaxed">
              Send a table request. The restaurant can confirm availability by phone.
            </p>
          </div>

          {/* Contact Details */}
          <div className="pt-10 space-y-4 text-xs sm:text-sm">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-3 text-[#e2eae4] hover:text-white transition-colors focus-visible:ring-2 rounded p-1"
            >
              <Phone size={16} className="text-amber-300" aria-hidden="true" />
              <span className="font-medium">{RESTAURANT_INFO.phoneFormatted}</span>
            </a>

            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#e2eae4] hover:text-white transition-colors focus-visible:ring-2 rounded p-1"
            >
              <MessageCircle size={16} className="text-emerald-400" aria-hidden="true" />
              <span className="font-medium">WhatsApp</span>
            </a>

            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#e2eae4] hover:text-white transition-colors focus-visible:ring-2 rounded p-1"
            >
              <MapPin size={16} className="text-amber-300" aria-hidden="true" />
              <span className="font-medium">Get directions</span>
            </a>
          </div>
        </div>

        {/* Right Form Card (Matching Screenshot) */}
        <div className="lg:col-span-7 p-8 sm:p-12 bg-[#ece8dc]">
          <form onSubmit={handleSubmit} className="space-y-5" aria-label="Table reservation request form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label htmlFor="res-name-input" className="block text-xs font-semibold text-[#282f28] mb-1.5">
                  Name
                </label>
                <input
                  id="res-name-input"
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#fcfbf8] text-sm px-4 py-3 min-h-[44px] rounded-2xl border border-[#d2cbba] placeholder-[#636c61] text-[#161a18] focus:outline-none focus:ring-2 focus:ring-[#181c1a]"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="res-phone-input" className="block text-xs font-semibold text-[#282f28] mb-1.5">
                  Phone
                </label>
                <input
                  id="res-phone-input"
                  type="tel"
                  required
                  placeholder="+92 3..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#fcfbf8] text-sm px-4 py-3 min-h-[44px] rounded-2xl border border-[#d2cbba] placeholder-[#636c61] text-[#161a18] focus:outline-none focus:ring-2 focus:ring-[#181c1a]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Date */}
              <div>
                <label htmlFor="res-date-input" className="block text-xs font-semibold text-[#282f28] mb-1.5">
                  Date
                </label>
                <input
                  id="res-date-input"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#fcfbf8] text-sm px-4 py-3 min-h-[44px] rounded-2xl border border-[#d2cbba] text-[#161a18] focus:outline-none focus:ring-2 focus:ring-[#181c1a]"
                />
              </div>

              {/* Time */}
              <div>
                <label htmlFor="res-time-input" className="block text-xs font-semibold text-[#282f28] mb-1.5">
                  Time
                </label>
                <input
                  id="res-time-input"
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#fcfbf8] text-sm px-4 py-3 min-h-[44px] rounded-2xl border border-[#d2cbba] text-[#161a18] focus:outline-none focus:ring-2 focus:ring-[#181c1a]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Guests */}
              <div>
                <label htmlFor="res-guests-select" className="block text-xs font-semibold text-[#282f28] mb-1.5">
                  Guests
                </label>
                <select
                  id="res-guests-select"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-[#fcfbf8] text-sm px-4 py-3 min-h-[44px] rounded-2xl border border-[#d2cbba] text-[#161a18] focus:outline-none focus:ring-2 focus:ring-[#181c1a]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 16, 20].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Note */}
              <div>
                <label htmlFor="res-note-input" className="block text-xs font-semibold text-[#282f28] mb-1.5">
                  Note
                </label>
                <input
                  id="res-note-input"
                  type="text"
                  placeholder="Optional (e.g. family hall, baby chair)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full bg-[#fcfbf8] text-sm px-4 py-3 min-h-[44px] rounded-2xl border border-[#d2cbba] placeholder-[#636c61] text-[#161a18] focus:outline-none focus:ring-2 focus:ring-[#181c1a]"
                />
              </div>
            </div>

            {/* Request a Table Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 min-h-[48px] bg-[#181c1a] hover:bg-[#2e3531] text-white font-semibold text-sm rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-sm active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#181c1a]"
              >
                <Calendar size={18} className="text-amber-200" aria-hidden="true" />
                <span>Request a table</span>
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Confirmation Modal */}
      {confirmedReservation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#fcfbf8] border border-[#dcd6c5] rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95">
            <button
              onClick={() => setConfirmedReservation(null)}
              className="absolute top-5 right-5 text-[#6f766e] hover:text-[#181c1a]"
            >
              <X size={20} />
            </button>

            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#727a72]">
                  REQUEST RECEIVED · #{confirmedReservation.id}
                </span>
                <h3 className="text-2xl font-serif text-[#161a18] mt-1">
                  Table Request Confirmed!
                </h3>
              </div>

              <div className="bg-[#f4efe4] rounded-2xl p-4 text-xs text-left space-y-2 border border-[#dfd9c7]">
                <div className="flex justify-between">
                  <span className="text-[#6d746b]">Guest Name:</span>
                  <span className="font-semibold text-[#181c1a]">{confirmedReservation.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6d746b]">Date & Time:</span>
                  <span className="font-semibold text-[#181c1a]">
                    {confirmedReservation.date} at {confirmedReservation.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6d746b]">Party Size:</span>
                  <span className="font-semibold text-[#181c1a]">{confirmedReservation.guests} Persons</span>
                </div>
                {confirmedReservation.note && (
                  <div className="flex justify-between">
                    <span className="text-[#6d746b]">Note:</span>
                    <span className="font-semibold text-[#181c1a]">{confirmedReservation.note}</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-[#5f655e]">
                We have registered your booking request in the restaurant system. Click below to also notify the captain on WhatsApp.
              </p>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => sendWhatsAppConfirmation(confirmedReservation)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle size={15} />
                  <span>Notify via WhatsApp</span>
                </button>

                <button
                  onClick={() => setConfirmedReservation(null)}
                  className="w-full py-2.5 bg-[#ece7da] hover:bg-[#e1dbcc] text-[#181c1a] text-xs font-medium rounded-xl transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
