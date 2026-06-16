import React, { useEffect, useRef, useState } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { HeroIntroComposition } from './HeroIntroComposition';

const FPS            = 30;
const DURATION_FRAMES = 105;     // 3.5 seconds of animation
const FADE_OUT_MS    = 700;      // overlay fades up after done

interface Props {
  onDone: () => void;
}

const HeroIntroPlayer: React.FC<Props> = ({ onDone }) => {
  const playerRef   = useRef<PlayerRef>(null);
  const [phase, setPhase] = useState<'playing' | 'fading' | 'done'>('playing');

  /* Auto-play as soon as mounted */
  useEffect(() => {
    const t = setTimeout(() => {
      playerRef.current?.play();
    }, 80);
    return () => clearTimeout(t);
  }, []);

  /* When Remotion player ends → start fade-out */
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;

    const handle = () => {
      setPhase('fading');
      setTimeout(() => {
        setPhase('done');
        onDone();
      }, FADE_OUT_MS);
    };

    p.addEventListener('ended', handle);
    return () => p.removeEventListener('ended', handle);
  }, [onDone]);

  /* Skip on click/tap */
  const skip = () => {
    playerRef.current?.pause();
    setPhase('fading');
    setTimeout(() => {
      setPhase('done');
      onDone();
    }, FADE_OUT_MS);
  };

  if (phase === 'done') return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        /* Slide UP and fade as it exits */
        transition: `opacity ${FADE_OUT_MS}ms cubic-bezier(0.16,1,0.3,1),
                     transform ${FADE_OUT_MS}ms cubic-bezier(0.16,1,0.3,1)`,
        opacity:   phase === 'fading' ? 0 : 1,
        transform: phase === 'fading' ? 'translateY(-40px)' : 'translateY(0)',
        pointerEvents: phase === 'fading' ? 'none' : 'auto',
      }}
    >
      {/* Remotion Player — fills the entire viewport */}
      <Player
        ref={playerRef}
        component={HeroIntroComposition}
        durationInFrames={DURATION_FRAMES}
        fps={FPS}
        compositionWidth={1280}
        compositionHeight={720}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
        }}
        controls={false}
        loop={false}
        clickToPlay={false}
        showPosterWhenUnplayed={false}
        showPosterWhenPaused={false}
        showPosterWhenEnded={false}
        initiallyMuted
      />

      {/* Skip button — bottom right */}
      <button
        onClick={skip}
        style={{
          position: 'absolute',
          bottom: 28,
          right: 36,
          background: 'rgba(245,241,234,0.10)',
          border: '1px solid rgba(245,241,234,0.18)',
          borderRadius: 9999,
          color: 'rgba(245,241,234,0.55)',
          fontFamily: "'General Sans', system-ui, sans-serif",
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          padding: '8px 20px',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'color 0.2s, border-color 0.2s',
          userSelect: 'none',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.color = '#00abc0';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,171,192,0.4)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.color = 'rgba(245,241,234,0.55)';
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(245,241,234,0.18)';
        }}
      >
        Skip ↗
      </button>
    </div>
  );
};

export default HeroIntroPlayer;
