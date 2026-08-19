import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Plus, Megaphone, Calendar, X, Loader2, AlertCircle, Trash2 } from 'lucide-react';
import FooterCTA from '../components/FooterCTA';
import { ClinicUpdate, fetchUpdates, postUpdate, deleteUpdate, getUpdateKey, verifyUpdateCode, normalizeImageUrl, getInitialUpdates } from '../lib/updates';

const CATEGORIES = ['Offer', 'Announcement', 'OPD Schedule', 'Camp', 'Notice', 'General'];

const formatDate = (iso: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const Updates: React.FC = () => {
  const [updates, setUpdates] = useState<ClinicUpdate[]>(() => getInitialUpdates());

  // Posting gate
  const [showGate, setShowGate] = useState(false);
  const [code, setCode] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [gateError, setGateError] = useState('');

  // Composer
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [posting, setPosting] = useState(false);
  const [postError, setPostError] = useState('');

  const load = async () => {
    const list = await fetchUpdates();
    setUpdates(list || []);
  };

  useEffect(() => { load(); }, []);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setGateError('');
    setChecking(true);
    const ok = await verifyUpdateCode(code);
    setChecking(false);
    if (ok) {
      setUnlocked(true);
      setShowGate(false);
    } else {
      setGateError('That code was not accepted. Please check and try again.');
    }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostError('');
    setPosting(true);
    try {
      await postUpdate({ code, title, category, body, author, imageUrl });
      setTitle(''); setBody(''); setAuthor(''); setImageUrl(''); setCategory(CATEGORIES[0]);
      await load();
    } catch (err) {
      setPostError(err instanceof Error ? err.message : 'Your update could not be saved.');
    } finally {
      setPosting(false);
    }
  };

  const [deletingKey, setDeletingKey] = useState<string | null>(null);

  const handleDelete = async (u: ClinicUpdate) => {
    if (!window.confirm(`Are you sure you want to delete "${u.title}"?`)) {
      return;
    }
    const key = getUpdateKey(u);
    setDeletingKey(key);
    try {
      await deleteUpdate(u, code);
      setUpdates(prev => prev.filter(item => getUpdateKey(item) !== key));
    } catch {
      alert('Could not delete update. Please try again.');
    } finally {
      setDeletingKey(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-cream min-h-screen font-body">
      <div className="max-w-5xl mx-auto px-6 lg:px-16 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Notice Board</p>
          <h1 className="section-text text-brand-navy mb-6">Offers &amp; Updates</h1>
          <p className="text-base text-brand-navy/60 font-lora leading-relaxed">
            Current offers, camps, OPD schedule changes and announcements from Vedanta Netralya.
          </p>
        </div>

        {/* Post control — the code is checked by the server, never stored in this page */}
        <div className="flex justify-center mb-12">
          {unlocked ? (
            <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand-teal/15 border border-brand-teal/40 text-brand-teal text-[10px] tracking-[0.2em] uppercase font-black">
              <Plus className="w-3.5 h-3.5" /> Posting unlocked
            </span>
          ) : (
            <button
              onClick={() => setShowGate(v => !v)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-brand-navy/15 text-brand-navy/70 hover:border-brand-teal hover:text-brand-navy text-[10px] tracking-[0.2em] uppercase font-black transition-all"
            >
              <Lock className="w-3.5 h-3.5" /> Staff: post an update
            </button>
          )}
        </div>

        {showGate && !unlocked && (
          <form onSubmit={handleUnlock} className="bg-white border border-brand-navy/10 rounded-[2rem] p-6 md:p-8 shadow-sm max-w-md mx-auto mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black text-brand-navy tracking-wide">Enter posting code</h2>
              <button type="button" onClick={() => setShowGate(false)} aria-label="Close" className="text-brand-navy/40 hover:text-brand-navy">
                <X className="w-4 h-4" />
              </button>
            </div>
            <input
              type="password"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Posting code"
              aria-label="Posting code"
              className="w-full bg-cream/60 border border-brand-navy/10 rounded-full px-5 py-3 text-sm text-brand-navy placeholder-brand-navy/40 focus:outline-none focus:border-brand-teal mb-3"
            />
            {gateError && (
              <p className="text-xs text-rose-600 font-lora mb-3 flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {gateError}
              </p>
            )}
            <button
              type="submit"
              disabled={checking || !code.trim()}
              className="w-full bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy disabled:opacity-40 px-6 py-3.5 rounded-full text-[10px] tracking-[0.22em] uppercase font-black transition-all flex items-center justify-center gap-2"
            >
              {checking ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Checking…</> : 'Unlock'}
            </button>
          </form>
        )}

        {unlocked && (
          <form onSubmit={handlePost} className="bg-white border border-brand-navy/10 rounded-[2rem] p-6 md:p-8 shadow-sm mb-12 space-y-4">
            <h2 className="text-sm font-black text-brand-navy tracking-wide">New update</h2>
            <input
              type="text" value={title} onChange={e => setTitle(e.target.value)}
              placeholder="Title" aria-label="Update title" required
              className="w-full bg-cream/60 border border-brand-navy/10 rounded-2xl px-5 py-3 text-sm text-brand-navy placeholder-brand-navy/40 focus:outline-none focus:border-brand-teal"
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={category} onChange={e => setCategory(e.target.value)} aria-label="Category"
                className="flex-1 bg-cream/60 border border-brand-navy/10 rounded-2xl px-5 py-3 text-sm text-brand-navy focus:outline-none focus:border-brand-teal"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input
                type="text" value={author} onChange={e => setAuthor(e.target.value)}
                placeholder="Posted by (optional)" aria-label="Posted by"
                className="flex-1 bg-cream/60 border border-brand-navy/10 rounded-2xl px-5 py-3 text-sm text-brand-navy placeholder-brand-navy/40 focus:outline-none focus:border-brand-teal"
              />
            </div>
            <textarea
              value={body} onChange={e => setBody(e.target.value)} rows={5}
              placeholder="Write the offer or update…" aria-label="Update content" required
              className="w-full bg-cream/60 border border-brand-navy/10 rounded-2xl px-5 py-3 text-sm text-brand-navy placeholder-brand-navy/40 focus:outline-none focus:border-brand-teal resize-y"
            />
            <div>
              <input
                type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)}
                placeholder="Poster image link (optional)" aria-label="Poster image link"
                className="w-full bg-cream/60 border border-brand-navy/10 rounded-2xl px-5 py-3 text-sm text-brand-navy placeholder-brand-navy/40 focus:outline-none focus:border-brand-teal"
              />
              <p className="text-[11px] text-brand-navy/45 font-lora mt-1.5 px-1">
                Paste a direct image link (ending in .jpg, .png or Google Drive image) to show a poster above the text.
              </p>
              {imageUrl.trim() && imageUrl.includes('share.icloud.com') && (
                <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200/80 rounded-xl p-2.5 mt-2 font-lora">
                  💡 <strong>Note on iCloud links:</strong> iCloud sharing links are web pages that require visiting in a browser and cannot be displayed inline as images. For a poster photo, paste a direct image URL (from Google Drive, Imgur, PostImages, or hospital media).
                </p>
              )}
              {imageUrl.trim() && (
                <img
                  src={normalizeImageUrl(imageUrl)}
                  alt="Poster preview"
                  className="mt-3 max-h-56 rounded-2xl border border-brand-navy/10 object-contain bg-cream/40"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              )}
            </div>
            {postError && (
              <p className="text-xs text-rose-600 font-lora flex items-start gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {postError}
              </p>
            )}
            <button
              type="submit" disabled={posting || !title.trim() || !body.trim()}
              className="bg-brand-teal text-brand-navy hover:bg-brand-navy hover:text-cream disabled:opacity-40 px-6 py-3.5 rounded-full text-[10px] tracking-[0.22em] uppercase font-black transition-all flex items-center justify-center gap-2 w-full sm:w-auto sm:px-10"
            >
              {posting ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Publishing…</> : 'Publish update'}
            </button>
          </form>
        )}

        {/* Feed */}
        {updates.length > 0 ? (
          <div className="space-y-5">
            {updates.map((u, i) => (
              <motion.article
                key={`${u.date}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.05, 0.3) }}
                className="bg-brand-navy text-cream rounded-[2rem] p-6 md:p-8 border border-cream/10 shadow-xl"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[9px] tracking-[0.2em] uppercase font-black text-brand-teal px-3 py-1 bg-brand-teal/15 rounded-full">
                      {u.category}
                    </span>
                    {u.date && (
                      <span className="text-[10px] text-cream/50 font-lora flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" /> {formatDate(u.date)}
                      </span>
                    )}
                  </div>
                  {unlocked && (
                    <button
                      type="button"
                      onClick={() => handleDelete(u)}
                      disabled={deletingKey === getUpdateKey(u)}
                      title="Delete this update"
                      aria-label="Delete this update"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 hover:bg-rose-600 border border-rose-400/40 text-rose-200 hover:text-white text-[10px] font-black uppercase tracking-wider transition-all disabled:opacity-50"
                    >
                      {deletingKey === getUpdateKey(u) ? (
                        <><Loader2 className="w-3 h-3 animate-spin" /> Deleting…</>
                      ) : (
                        <><Trash2 className="w-3 h-3" /> Delete</>
                      )}
                    </button>
                  )}
                </div>
                {u.imageUrl && (
                  <img
                    src={normalizeImageUrl(u.imageUrl)}
                    alt={u.title}
                    loading="lazy"
                    className="w-full max-h-[26rem] object-contain rounded-2xl border border-cream/10 bg-brand-navy-deep mb-4"
                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                )}
                <h2 className="text-lg md:text-xl font-black mb-2 font-body">{u.title}</h2>
                <p className="text-sm text-cream/75 font-lora leading-relaxed whitespace-pre-line">{u.body}</p>
                {u.author && (
                  <p className="text-[10px] text-cream/40 font-lora mt-4">— {u.author}</p>
                )}
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-10 md:p-14 text-center shadow-sm">
            <Megaphone className="w-8 h-8 text-brand-teal mx-auto mb-4" />
            <h2 className="text-xl font-black text-brand-navy mb-2">No updates yet</h2>
            <p className="text-sm text-brand-navy/60 font-lora max-w-md mx-auto">
              Announcements from the clinic will appear here as they're posted.
            </p>
          </div>
        )}
      </div>

      <FooterCTA />
    </motion.div>
  );
};

export default Updates;
