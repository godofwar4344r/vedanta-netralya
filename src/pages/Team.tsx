import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Phone, ArrowUpRight, Users } from 'lucide-react';
import FooterCTA from '../components/FooterCTA';
import { MEDICAL_SPECIALISTS, SUPPORT_TEAM, TeamMember } from '../data/team';

const HELPDESK_TEL = 'tel:05946223616';

type TabKey = 'specialists' | 'support';

const initialsOf = (name: string) =>
  name.replace(/^Dr\.?\s+(Maj\.?\s+)?/i, '').split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();

const MemberCard: React.FC<{ member: TeamMember; isSpecialist: boolean; index: number }> = ({ member, isSpecialist, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: Math.min(index * 0.05, 0.4), duration: 0.5 }}
    whileHover={{ y: -6 }}
    className="bg-brand-navy text-cream rounded-[2rem] border border-cream/10 shadow-xl overflow-hidden flex flex-col h-full"
  >
    <div className="px-5 pt-4 pb-3 flex items-center justify-between gap-2 border-b border-cream/10">
      <span className="text-[9px] tracking-[0.2em] uppercase font-black text-brand-teal truncate">
        {member.department}
      </span>
      {member.extension && (
        <span className="text-[9px] tracking-widest uppercase font-black text-cream/50 shrink-0">
          Ext. {member.extension}
        </span>
      )}
    </div>

    <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-navy-deep">
      {member.image ? (
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover object-top opacity-90"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-4xl font-black text-brand-teal/40 font-body">{initialsOf(member.name)}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent pointer-events-none" />
    </div>

    <div className="p-5 flex flex-col gap-1 flex-1">
      <h3 className="text-base font-black font-body leading-tight">{member.name}</h3>
      <p className="text-[10px] tracking-[0.18em] uppercase font-black text-brand-teal">{member.designation}</p>
      {member.specialty && (
        <p className="text-xs text-cream/70 font-lora italic mt-1 leading-snug">{member.specialty}</p>
      )}

      <div className="mt-auto pt-4">
        {isSpecialist ? (
          <Link
            to="/doctors"
            className="group bg-brand-teal text-brand-navy hover:bg-cream px-4 py-3 rounded-full text-[10px] tracking-[0.22em] uppercase font-black transition-all flex items-center justify-between w-full"
          >
            View Profile
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
          </Link>
        ) : (
          <a
            href={HELPDESK_TEL}
            className="bg-brand-teal/15 border border-brand-teal/40 text-brand-teal hover:bg-brand-teal hover:text-brand-navy px-4 py-3 rounded-full text-[10px] tracking-[0.22em] uppercase font-black transition-all flex items-center justify-center gap-2 w-full"
          >
            <Phone className="w-3.5 h-3.5" />
            {member.extension ? `Call Ext. ${member.extension}` : 'Call Helpdesk'}
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

const Team: React.FC = () => {
  const [tab, setTab] = useState<TabKey>('specialists');
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('All');

  const roster = tab === 'specialists' ? MEDICAL_SPECIALISTS : SUPPORT_TEAM;

  // Chips come from the data itself, so adding a member with a new department just works
  const departments = useMemo(
    () => ['All', ...Array.from(new Set(roster.map(m => m.department)))],
    [roster]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return roster.filter(m => {
      const matchesDept = department === 'All' || m.department === department;
      const matchesQuery =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.designation.toLowerCase().includes(q) ||
        m.department.toLowerCase().includes(q);
      return matchesDept && matchesQuery;
    });
  }, [roster, query, department]);

  const switchTab = (next: TabKey) => {
    setTab(next);
    setDepartment('All');   // chips differ per tab, so reset to avoid an empty grid
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-cream min-h-screen font-body">
      <div className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4">Our People</p>
          <h1 className="section-text text-brand-navy mb-6">The Vedanta Netralya Team</h1>
          <p className="text-base text-brand-navy/60 font-lora leading-relaxed">
            Meet our dedicated team of medical specialists, clinicians, support staff and administrators —
            committed to ethical, precise eye care.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {([
            { key: 'specialists' as TabKey, label: 'Medical Specialists' },
            { key: 'support' as TabKey, label: 'Support & Administrative Team' },
          ]).map(t => (
            <button
              key={t.key}
              onClick={() => switchTab(t.key)}
              aria-pressed={tab === t.key}
              className={`px-6 py-3.5 rounded-full text-[10px] tracking-[0.2em] uppercase font-black transition-all border ${
                tab === t.key
                  ? 'bg-brand-navy text-cream border-brand-navy shadow-lg'
                  : 'bg-white text-brand-navy/70 border-brand-navy/15 hover:border-brand-teal hover:text-brand-navy'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search + department chips */}
        <div className="bg-white border border-brand-navy/10 rounded-[2rem] p-4 md:p-5 shadow-sm mb-6 flex flex-col lg:flex-row gap-4 lg:items-center">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-brand-navy/40 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name or designation…"
              aria-label="Search team members"
              className="w-full bg-cream/60 border border-brand-navy/10 rounded-full pl-11 pr-4 py-3 text-sm text-brand-navy placeholder-brand-navy/40 focus:outline-none focus:border-brand-teal"
            />
          </div>

          {departments.length > 1 && (
            <div className="flex gap-2 overflow-x-auto lg:overflow-visible lg:flex-wrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setDepartment(dept)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] tracking-widest uppercase font-black transition-all border ${
                    department === dept
                      ? 'bg-brand-teal text-brand-navy border-brand-teal'
                      : 'bg-transparent text-brand-navy/60 border-brand-navy/15 hover:border-brand-teal hover:text-brand-navy'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="text-xs text-brand-navy/50 font-lora mb-6">
          Showing {filtered.length} of {roster.length}{' '}
          {tab === 'specialists' ? 'medical specialists' : 'team members'}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {filtered.map((member, i) => (
              <MemberCard key={member.id} member={member} isSpecialist={tab === 'specialists'} index={i} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-brand-navy/10 rounded-[2.5rem] p-10 md:p-14 text-center shadow-sm mb-16">
            <Users className="w-8 h-8 text-brand-teal mx-auto mb-4" />
            <h2 className="text-xl font-black text-brand-navy mb-2">
              {roster.length === 0 ? 'Directory being updated' : 'No matches found'}
            </h2>
            <p className="text-sm text-brand-navy/60 font-lora max-w-md mx-auto">
              {roster.length === 0
                ? 'Our support and administrative team directory is being prepared. In the meantime, our helpdesk will connect you to the right person.'
                : 'Try a different name, designation or department.'}
            </p>
            <a
              href={HELPDESK_TEL}
              className="inline-flex items-center gap-2 mt-6 bg-brand-navy text-cream hover:bg-brand-teal hover:text-brand-navy px-6 py-3.5 rounded-full text-[10px] tracking-[0.22em] uppercase font-black transition-all"
            >
              <Phone className="w-3.5 h-3.5" /> Call 05946-223616
            </a>
          </div>
        )}
      </div>

      <FooterCTA />
    </motion.div>
  );
};

export default Team;
