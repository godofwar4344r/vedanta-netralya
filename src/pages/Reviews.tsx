import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, CheckCircle2, Loader2, ArrowUpRight, QrCode } from 'lucide-react';
import { submitReview, fetchApprovedReviews, ApprovedReview } from '../lib/reviews';

// Always-on featured reviews so the page never looks empty.
const FEATURED: ApprovedReview[] = [
  {
    name: 'Rajesh Singhal',
    location: 'Haldwani, Nainital',
    treatment: 'Cataract Surgery (MICS)',
    rating: 5,
    review:
      "My cataract surgery at Vedanta was completely painless. I was back home within hours, and the next morning my vision was perfectly clear. Dr. Sameer Varma explained everything beautifully.",
  },
  {
    name: 'Priyanka Sharma',
    location: 'Kichha, Udham Singh Nagar',
    treatment: 'LASIK Vision Correction',
    rating: 5,
    review:
      "Getting rid of my specs after 12 years feels like a miracle! The procedure took less than 15 minutes and the team made me feel extremely safe throughout.",
  },
  {
    name: 'Harbhajan Singh',
    location: 'Tallital, Nainital',
    treatment: 'Glaucoma Management',
    rating: 5,
    review:
      "The laser therapy did not hurt at all and successfully reduced my eye pressure, preserving my vision. Extremely grateful to the whole Vedanta Netralya team.",
  },
];

const TREATMENTS = [
  'General Eye Checkup',
  'Cataract Surgery',
  'Refractive / LASIK / ICL',
  'Retina & VR Surgery',
  'Glaucoma Management',
  'Oculoplasty',
  'Paediatric / Squint',
  'Optical / Spectacles',
  'Other',
];

const ReviewCard: React.FC<{ rev: ApprovedReview }> = ({ rev }) => (
  <div className="bg-brand-navy text-cream rounded-[2.5rem] p-8 border border-cream/5 shadow-xl flex flex-col justify-between relative overflow-hidden">
    <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-brand-teal/5 blur-xl" />
    <div>
      <Quote className="w-10 h-10 text-brand-teal/30 mb-6" />
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, idx) => (
          <Star
            key={idx}
            className={`w-4 h-4 ${
              idx < rev.rating ? 'fill-brand-teal text-brand-teal' : 'text-cream/20'
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-cream/80 font-lora leading-relaxed mb-8">"{rev.review}"</p>
    </div>
    <div className="border-t border-cream/10 pt-4 flex justify-between items-center gap-3">
      <div className="min-w-0">
        <h3 className="font-bold text-sm text-cream truncate">{rev.name}</h3>
        {rev.location && (
          <p className="text-[10px] text-cream/50 tracking-wider font-lora truncate">{rev.location}</p>
        )}
      </div>
      {rev.treatment && (
        <span className="text-[9px] tracking-wider uppercase text-brand-teal font-black bg-brand-teal/10 px-3 py-1 rounded-full border border-brand-teal/20 shrink-0">
          {rev.treatment.split(' ')[0]}
        </span>
      )}
    </div>
  </div>
);

const Reviews: React.FC = () => {
  const [approved, setApproved] = useState<ApprovedReview[]>([]);
  const [form, setForm] = useState({
    name: '',
    location: '',
    treatment: '',
    rating: 0,
    review: '',
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApprovedReviews().then(setApproved);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.rating || !form.review.trim()) {
      setError('Please add your name, a star rating, and your review.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await submitReview(form);
      setSubmitted(true);
    } catch {
      setError(
        'We could not save your review just now. Please try again in a moment, or call us at 05946-223616.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Show approved (newest first) followed by the featured baseline.
  const displayReviews = [...approved, ...FEATURED];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20"
    >
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">
          Patient Reviews
        </p>
        <h1 className="section-text text-brand-navy mb-6">What Our Patients Say</h1>
        <p className="text-base text-brand-navy/60 font-lora">
          Real experiences from the people who matter most. Read their stories, review us on Google,
          or share your feedback below.
        </p>
      </div>

      {/* Google Review QR Hero Card */}
      <div className="max-w-4xl mx-auto mb-14 bg-gradient-to-br from-brand-navy via-brand-navy-deep to-brand-navy rounded-[3rem] p-8 md:p-12 border border-brand-teal/30 shadow-2xl relative overflow-hidden text-cream">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="md:col-span-8 flex flex-col gap-4 text-left">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-400 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest self-start">
              <span>★★★★★</span>
              <span>Google Verified Reviews</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black leading-tight">
              Review Us On Google Maps
            </h2>
            <p className="text-sm text-cream/80 font-lora leading-relaxed">
              Your review helps families across Haldwani and Uttarakhand discover trusted, advanced eye care. Scan the QR code with your phone camera or tap below to post your review on Google.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="https://www.google.com/maps?cid=14754978886231398408"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-teal text-brand-navy hover:bg-cream hover:text-brand-navy px-6 py-3.5 rounded-full text-[10px] tracking-widest uppercase font-black transition-all shadow-lg hover:scale-105"
              >
                Open Google Maps Review <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] text-cream/60 font-lora">4.9 ★ Average · 500+ Reviews</span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center">
            <a
              href="https://www.google.com/maps?cid=14754978886231398408"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-navy-deep/80 p-2.5 rounded-3xl shadow-2xl border-2 border-brand-teal/40 flex flex-col items-center group transition-transform hover:scale-105 max-w-[210px]"
              title="Click to open Google Review page or scan with phone"
            >
              <img 
                src="/qr-review-card.png" 
                alt="Scan to review Vedanta Netralya on Google" 
                className="w-full h-auto object-contain rounded-2xl shadow-inner"
              />
              <span className="text-[9px] font-black tracking-widest uppercase text-brand-teal mt-2 font-body flex items-center gap-1">
                <QrCode className="w-3 h-3 text-brand-teal" /> Tap or Scan with Phone
              </span>
            </a>
          </div>

        </div>
      </div>

      {/* Review submission form */}
      <div className="max-w-4xl mx-auto bg-brand-navy text-cream rounded-[3.5rem] border border-cream/10 p-10 md:p-16 shadow-2xl relative overflow-hidden mb-24">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl" />

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 flex flex-col items-center gap-6 relative z-10"
          >
            <div className="w-20 h-20 bg-brand-teal/20 text-brand-teal border border-brand-teal/30 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-3xl font-black mb-2">Thank You!</h2>
              <p className="text-sm text-cream/70 font-lora leading-relaxed max-w-md mx-auto">
                Thank you, <strong>{form.name}</strong>, for sharing your experience. Our team will
                review it shortly, and once approved it will appear on this page. 💙
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setForm({ name: '', location: '', treatment: '', rating: 0, review: '' });
              }}
              className="bg-cream/10 border border-cream/25 hover:bg-cream hover:text-brand-navy text-cream px-8 py-4 rounded-full text-[10px] tracking-widest uppercase font-black transition-all mt-2"
            >
              Write Another Review
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <h2 className="text-2xl font-black mb-2">Share Your Experience</h2>

            {/* Star rating */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">
                Your Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, rating: star }))}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110"
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoverRating || form.rating)
                          ? 'fill-brand-teal text-brand-teal'
                          : 'text-cream/25'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Anita Rawat"
                  className="bg-cream/5 border border-cream/15 rounded-2xl px-5 py-4 text-sm text-cream focus:outline-none focus:border-brand-teal"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">
                  City / Town (Optional)
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Haldwani, Nainital"
                  className="bg-cream/5 border border-cream/15 rounded-2xl px-5 py-4 text-sm text-cream focus:outline-none focus:border-brand-teal"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">
                Treatment / Service (Optional)
              </label>
              <select
                name="treatment"
                value={form.treatment}
                onChange={handleChange}
                className="bg-cream/5 border border-cream/15 rounded-2xl px-5 py-4 text-sm text-cream focus:outline-none focus:border-brand-teal"
              >
                <option value="" className="text-brand-navy">
                  Choose a treatment...
                </option>
                {TREATMENTS.map(t => (
                  <option key={t} value={t} className="text-brand-navy">
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] tracking-widest uppercase font-black text-brand-teal">
                Your Review
              </label>
              <textarea
                name="review"
                value={form.review}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about your visit, the doctors, and your experience..."
                className="bg-cream/5 border border-cream/15 rounded-2xl px-5 py-4 text-sm text-cream focus:outline-none focus:border-brand-teal font-lora"
              />
            </div>

            {error && (
              <p className="text-xs text-red-300 bg-red-500/10 border border-red-400/30 rounded-2xl px-5 py-4 font-lora">
                {error}
              </p>
            )}

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="bg-brand-teal text-brand-navy px-8 py-4 rounded-full text-[10px] tracking-widest uppercase font-black hover:bg-cream hover:text-brand-navy transition-all shadow-md flex items-center gap-2 disabled:opacity-60"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>

            <p className="text-[10px] text-cream/40 font-lora leading-relaxed">
              Reviews are checked by our team before they appear on the site.
            </p>
          </form>
        )}
      </div>

      {/* Approved + featured reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {displayReviews.map((rev, i) => (
          <ReviewCard key={i} rev={rev} />
        ))}
      </div>
    </motion.div>
  );
};

export default Reviews;
