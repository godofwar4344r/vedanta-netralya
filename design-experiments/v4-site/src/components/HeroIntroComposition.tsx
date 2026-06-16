import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import logoSrc from '../assets/logo.png';

/* ─── Brand tokens ─── */
const NAVY       = '#0a2640';
const NAVY_DEEP  = '#061829';
const TEAL       = '#00abc0';
const TEAL_LIGHT = '#2dd4e6';
const CREAM      = '#f5f1ea';

/* ─── Shared spring factory ─── */
const makeSpring = (frame: number, fps: number, delay = 0, damping = 18, stiffness = 120) =>
  spring({ frame: frame - delay, fps, config: { damping, stiffness, mass: 0.9 } });

/* ─── Stats data ─── */
const STATS = [
  { label: 'Years of care',    value: '20+',     },
  { label: 'Eye surgeries',    value: '25,000+', },
  { label: 'Patients treated', value: '1.2L+',   },
  { label: 'Publications',     value: '25+',     },
];

/* ─── Headline words ─── */
const WORDS_LINE1 = ['The', 'Clarity'];
const WORDS_LINE2 = ['You', 'Deserve.'];

/* ══════════════════════════════════════════
   Ambient background orbs
══════════════════════════════════════════ */
const OrbLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const globalAlpha = interpolate(frame, [0, fps * 0.4], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Slow gentle pulse
  const pulse = Math.sin((frame / fps) * Math.PI * 0.4) * 0.12 + 0.88;

  return (
    <AbsoluteFill style={{ opacity: globalAlpha, pointerEvents: 'none' }}>
      {/* Left orb */}
      <div style={{
        position: 'absolute',
        left: '-12%', top: '10%',
        width: 700, height: 700,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${TEAL}22 0%, transparent 70%)`,
        transform: `scale(${pulse})`,
        filter: 'blur(1px)',
      }} />
      {/* Right orb */}
      <div style={{
        position: 'absolute',
        right: '-8%', bottom: '5%',
        width: 600, height: 600,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${TEAL}18 0%, transparent 70%)`,
        transform: `scale(${1.1 - pulse * 0.1})`,
        filter: 'blur(2px)',
      }} />
      {/* Centre glow */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        width: 400, height: 400,
        marginLeft: -200, marginTop: -200,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${TEAL}12 0%, transparent 65%)`,
        transform: `scale(${pulse * 1.05})`,
      }} />
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════
   Horizontal grid lines (editorial feel)
══════════════════════════════════════════ */
const GridLines: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const scaleX = interpolate(frame, [fps * 0.5, fps * 1.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {[0.32, 0.68].map((yFrac, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: 0, top: `${yFrac * 100}%`,
          width, height: 1,
          background: `${TEAL}28`,
          transformOrigin: 'left center',
          transform: `scaleX(${scaleX})`,
        }} />
      ))}
    </AbsoluteFill>
  );
};

/* ══════════════════════════════════════════
   Logo
══════════════════════════════════════════ */
const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = makeSpring(frame, fps, 0, 22, 110);
  const opacity = interpolate(frame, [0, fps * 0.5], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div style={{
      position: 'absolute',
      top: 56, left: 64,
      opacity,
      transform: `translateY(${interpolate(s, [0, 1], [24, 0])}px) scale(${interpolate(s, [0, 1], [0.8, 1])})`,
    }}>
      <Img
        src={logoSrc}
        style={{ height: 52, objectFit: 'contain' }}
      />
    </div>
  );
};

/* ══════════════════════════════════════════
   Eyebrow label
══════════════════════════════════════════ */
const EyebrowLabel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = makeSpring(frame, fps, fps * 0.55, 20, 130);

  return (
    <div style={{
      position: 'absolute',
      bottom: 280, left: 72,
      opacity: s,
      transform: `translateY(${interpolate(s, [0, 1], [16, 0])}px)`,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    }}>
      {/* Teal tick line */}
      <div style={{
        width: interpolate(s, [0, 1], [0, 28]),
        height: 1.5,
        background: TEAL,
        borderRadius: 2,
      }} />
      <span style={{
        fontFamily: "'General Sans', system-ui, sans-serif",
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: '0.38em',
        textTransform: 'uppercase',
        color: TEAL,
      }}>
        Vedanta Netralya · Est. 2003
      </span>
    </div>
  );
};

/* ══════════════════════════════════════════
   Headline — word-by-word spring entrance
══════════════════════════════════════════ */
const HeadlineWord: React.FC<{
  word: string;
  delay: number;          // frames
  isItalic?: boolean;
}> = ({ word, delay, isItalic }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = makeSpring(frame, fps, delay, 16, 100);
  const opacity = interpolate(frame - delay, [0, fps * 0.45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <span style={{
      display: 'inline-block',
      marginRight: '0.28em',
      opacity,
      transform: `translateY(${interpolate(s, [0, 1], [52, 0])}px)`,
      color: isItalic ? TEAL_LIGHT : CREAM,
      fontStyle: isItalic ? 'italic' : 'normal',
      fontWeight: isItalic ? 300 : 800,
    }}>
      {word}
    </span>
  );
};

const Headline: React.FC = () => {
  const { fps } = useVideoConfig();

  const allWords = [
    ...WORDS_LINE1.map((w, i) => ({ word: w, delay: fps * 0.8 + i * (fps * 0.14), isItalic: false })),
    ...WORDS_LINE2.map((w, i) => ({ word: w, delay: fps * 0.8 + (WORDS_LINE1.length + i) * (fps * 0.14), isItalic: true })),
  ];

  return (
    <div style={{
      position: 'absolute',
      bottom: 184,
      left: 68,
      right: 80,
      lineHeight: 1.0,
      letterSpacing: '-0.025em',
      overflow: 'hidden',
    }}>
      <div style={{ display: 'block', marginBottom: 2 }}>
        {allWords.slice(0, WORDS_LINE1.length).map((w, i) => (
          <HeadlineWord key={i} {...w} />
        ))}
      </div>
      <div style={{ display: 'block' }}>
        {allWords.slice(WORDS_LINE1.length).map((w, i) => (
          <HeadlineWord key={i} {...w} />
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════
   Sub-tagline
══════════════════════════════════════════ */
const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = fps * 1.7;
  const opacity = interpolate(frame - delay, [0, fps * 0.6], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const y = interpolate(frame - delay, [0, fps * 0.6], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div style={{
      position: 'absolute',
      bottom: 140,
      left: 72,
      opacity,
      transform: `translateY(${y}px)`,
      fontFamily: "'General Sans', system-ui, sans-serif",
      fontSize: 14.5,
      fontWeight: 500,
      color: `${CREAM}88`,
      letterSpacing: '0.01em',
    }}>
      Robotic-laser precision · Unhurried, human care · North India
    </div>
  );
};

/* ══════════════════════════════════════════
   Stats strip — each stat spring-in staggered
══════════════════════════════════════════ */
const StatItem: React.FC<{
  value: string;
  label: string;
  delay: number;
  showDivider: boolean;
}> = ({ value, label, delay, showDivider }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = makeSpring(frame, fps, delay, 20, 130);
  const opacity = interpolate(frame - delay, [0, fps * 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const dividerScale = interpolate(frame - delay, [0, fps * 0.4], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
      {showDivider && (
        <div style={{
          width: 1,
          height: 36,
          background: `${CREAM}22`,
          transformOrigin: 'top center',
          transform: `scaleY(${dividerScale})`,
        }} />
      )}
      <div style={{
        opacity,
        transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)`,
      }}>
        <div style={{
          fontFamily: "'General Sans', system-ui, sans-serif",
          fontSize: 26,
          fontWeight: 800,
          color: TEAL,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          {value}
        </div>
        <div style={{
          fontFamily: "'General Sans', system-ui, sans-serif",
          fontSize: 9,
          fontWeight: 800,
          color: `${CREAM}50`,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          marginTop: 5,
        }}>
          {label}
        </div>
      </div>
    </div>
  );
};

const StatsStrip: React.FC = () => {
  const { fps } = useVideoConfig();
  const baseDelay = fps * 2.0;

  return (
    <div style={{
      position: 'absolute',
      bottom: 56,
      left: 68,
      right: 68,
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      borderTop: `1px solid ${CREAM}14`,
      paddingTop: 22,
    }}>
      {STATS.map((stat, i) => (
        <StatItem
          key={i}
          value={stat.value}
          label={stat.label}
          delay={baseDelay + i * (fps * 0.12)}
          showDivider={i > 0}
        />
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════
   Teal accent bar (left edge)
══════════════════════════════════════════ */
const AccentBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  const scaleY = interpolate(frame, [fps * 0.3, fps * 1.1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div style={{
      position: 'absolute',
      left: 0, top: 0,
      width: 3,
      height,
      background: `linear-gradient(to bottom, ${TEAL} 0%, ${TEAL_LIGHT}44 100%)`,
      transformOrigin: 'top center',
      transform: `scaleY(${scaleY})`,
      borderRadius: '0 2px 2px 0',
    }} />
  );
};

/* ══════════════════════════════════════════
   ROOT COMPOSITION
══════════════════════════════════════════ */
export const HeroIntroComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${NAVY_DEEP} 0%, ${NAVY} 60%, #0d3355 100%)`,
      fontFamily: "'General Sans', system-ui, sans-serif",
      overflow: 'hidden',
    }}>
      {/* Layers in z-order */}
      <Sequence><OrbLayer /></Sequence>
      <Sequence from={15}><GridLines /></Sequence>
      <Sequence from={0}><AccentBar /></Sequence>
      <Sequence from={0}><LogoReveal /></Sequence>
      <Sequence from={0}><EyebrowLabel /></Sequence>
      <Sequence from={0}><Headline /></Sequence>
      <Sequence from={0}><Tagline /></Sequence>
      <Sequence from={0}><StatsStrip /></Sequence>
    </AbsoluteFill>
  );
};

// Need React in scope for JSX
import React from 'react';
