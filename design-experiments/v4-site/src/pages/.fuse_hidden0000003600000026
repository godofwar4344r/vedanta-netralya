import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Heart, MessageCircle, Share2, Music, Volume2, VolumeX } from 'lucide-react';
import FooterCTA from '../components/FooterCTA';
import Logo from '../components/Logo';
import { useEdit } from '../context/EditContext';
import { EditableContainer, EditableText, EditableList } from '../components/Editable';

// Assets
import introVideo from '../assets/about-video.mp4';
import eyeDropVideo from '../assets/eye-drop-bottle.mp4';
import cataractVideo from '../assets/reel-cataract.mp4';

interface ReelData {
  src: string;
  title: string;
  caption: string;
  likes: string;
  comments: string;
  shares: string;
}

const ReelCard: React.FC<{ 
  reel: ReelData & { id: string }; 
  isMuted: boolean; 
  toggleMute: () => void;
  onUpdateVideo: (newSrc: string) => void;
}> = ({ reel, isMuted, toggleMute, onUpdateVideo }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(parseInt(String(reel.likes).replace(/[^0-9]/g, '')) || 124);
  const { isEditMode } = useEdit();

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(err => console.log('Autoplay failed:', err));
      setIsPlaying(true);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasLiked(!hasLiked);
    setLikesCount(prev => hasLiked ? prev - 1 : prev + 1);
  };

  return (
    <div 
      onClick={handlePlayPause}
      className="relative aspect-[9/16] w-full max-w-[360px] bg-brand-navy rounded-[2.5rem] overflow-hidden border border-cream/10 shadow-2xl group cursor-pointer"
    >
      <video
        ref={videoRef}
        src={reel.src}
        className="w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
        autoPlay
      />

      {/* Mute and Play State Indicators */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: isPlaying ? 0.8 : 1, opacity: isPlaying ? 0 : 0.8 }}
          transition={{ duration: 0.2 }}
          className="w-16 h-16 bg-brand-navy/60 backdrop-blur-md rounded-full flex items-center justify-center text-brand-teal"
        >
          {isPlaying ? <Play className="w-8 h-8 fill-brand-teal" /> : <Pause className="w-8 h-8 fill-brand-teal" />}
        </motion.div>
      </div>

      {/* Floating Mute Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleMute();
        }}
        className="absolute top-6 right-6 p-3 bg-brand-navy/40 backdrop-blur-md hover:bg-brand-navy/60 text-cream rounded-full border border-cream/10 z-20 transition-all hover:scale-105"
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>

      {isEditMode && (
        <div className="absolute top-6 left-6 z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              const newSrc = prompt("Enter new Video URL or path (e.g., /src/assets/video.mp4):", reel.src);
              if (newSrc !== null) {
                onUpdateVideo(newSrc);
              }
            }}
            className="bg-brand-teal text-brand-navy font-black text-[9px] uppercase px-2.5 py-1.5 rounded-lg border border-brand-teal/30 hover:scale-105 transition-all shadow-lg pointer-events-auto"
            title="Change Video File/URL"
          >
            Change Video
          </button>
        </div>
      )}

      {/* Bottom Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep via-brand-navy/20 to-transparent pointer-events-none z-0" />

      {/* Social action sidebar */}
      <div className="absolute right-4 bottom-24 flex flex-col gap-5 items-center z-10 text-cream">
        <button 
          onClick={handleLike}
          className="flex flex-col items-center gap-1 group/btn focus:outline-none"
        >
          <div className={`p-3 rounded-full border border-cream/10 backdrop-blur-md transition-all ${
            hasLiked ? 'bg-red-500 border-red-500 text-cream scale-110 shadow-lg' : 'bg-brand-navy/40 group-hover/btn:bg-brand-navy/60 hover:scale-105'
          }`}>
            <Heart className={`w-5 h-5 ${hasLiked ? 'fill-cream' : ''}`} />
          </div>
          <span className="text-[10px] tracking-wider font-black font-body">
            <EditableText id={`reel-likes-${reel.id}`}>{hasLiked ? likesCount.toString() : reel.likes}</EditableText>
          </span>
        </button>

        <button 
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col items-center gap-1 group/btn focus:outline-none"
        >
          <div className="p-3 bg-brand-navy/40 backdrop-blur-md border border-cream/10 rounded-full group-hover/btn:bg-brand-navy/60 transition-all hover:scale-105">
            <MessageCircle className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-wider font-black font-body">
            <EditableText id={`reel-comments-${reel.id}`}>{reel.comments}</EditableText>
          </span>
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(window.location.href);
            alert('Reel link copied to clipboard!');
          }}
          className="flex flex-col items-center gap-1 group/btn focus:outline-none"
        >
          <div className="p-3 bg-brand-navy/40 backdrop-blur-md border border-cream/10 rounded-full group-hover/btn:bg-brand-navy/60 transition-all hover:scale-105">
            <Share2 className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-wider font-black font-body">
            <EditableText id={`reel-shares-${reel.id}`}>{reel.shares}</EditableText>
          </span>
        </button>
      </div>

      {/* User and Caption details overlay */}
      <div className="absolute left-6 right-20 bottom-8 z-10 text-cream flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-brand-teal/40 overflow-hidden flex items-center justify-center bg-cream/10">
            <Logo className="h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black tracking-wider text-cream font-body">
              <EditableText id={`reel-handle-${reel.id}`}>vedanta_netralya</EditableText>
            </h4>
            <span className="text-[9px] text-brand-teal uppercase font-black tracking-widest font-body">
              <EditableText id={`reel-verified-${reel.id}`}>Verified expert</EditableText>
            </span>
          </div>
        </div>

        <p className="text-xs leading-relaxed font-lora text-cream/90 line-clamp-3">
          <EditableText id={`reel-caption-${reel.id}`}>{reel.caption}</EditableText>
        </p>

        <div className="flex items-center gap-1.5 text-[9px] text-brand-teal tracking-widest font-black uppercase font-body mt-1">
          <Music className="w-3 h-3 animate-pulse text-brand-teal" />
          <span className="truncate max-w-[150px]">
            <EditableText id={`reel-audio-${reel.id}`}>Original Audio - Vedanta Netralya</EditableText>
          </span>
        </div>
      </div>
    </div>
  );
};

const VideoGallery: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const { state, updateList } = useEdit();

  const defaultReels: (ReelData & { id: string })[] = [
    {
      id: 'reel-cataract',
      src: cataractVideo,
      title: 'Cataract Flacs Technology',
      caption: 'Experience blade-free Femtosecond Laser-Assisted Cataract Surgery (FLACS). The most precise cataract solution in modern ophthalmology. 👁️⚡ #cataract #eyecare #flacs #microphaco #lasersurgery',
      likes: '1.2K',
      comments: '42',
      shares: '188'
    },
    {
      id: 'reel-intro',
      src: introVideo,
      title: 'NABH Certified Surgical Wing Tour',
      caption: 'Step inside our clinical operations block. We maintain strict infection control protocols and zero bacteria environment in our advanced operating rooms. 🏥💙 #super_specialty #hospital #safety #eyehospital',
      likes: '840',
      comments: '29',
      shares: '105'
    },
    {
      id: 'reel-eyedrop',
      src: eyeDropVideo,
      title: 'Correct Way to Dispense Eye Drops',
      caption: 'Are you instilling eye drops properly? Our senior specialists demonstrate the correct procedure for optimal safety and efficacy. 🧴👁️ #eyetips #healthcare #instructional #doctoradvice',
      likes: '620',
      comments: '18',
      shares: '94'
    }
  ];

  const reelsList = state.lists['reels-list'] || defaultReels;

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleUpdateVideo = (id: string, newSrc: string) => {
    const updated = reelsList.map((r: any) => r.id === id ? { ...r, src: newSrc } : r);
    updateList('reels-list', updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-transparent"
    >
      <EditableContainer id="gallery-reels-section">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-16 py-20">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <EditableText id="reels-eyebrow" className="text-brand-teal text-[10px] tracking-[0.4em] uppercase font-black mb-4 font-body block">
              Clinical Socials
            </EditableText>
            <EditableText id="reels-title" as="h1" className="section-text text-brand-navy mb-6 font-body block">
              Video Reels Gallery
            </EditableText>
            <EditableText id="reels-desc" as="p" className="text-base text-brand-navy/60 font-lora block">
              Follow our Instagram Reels feed for real-time surgical explanations, safety tips from AIIMS experts, and quick tours of our super-specialty chambers.
            </EditableText>
          </div>

          {/* Reels Horizontal/Vertical Grid */}
          <EditableList
            id="reels-list"
            defaultItems={defaultReels}
            newItemTemplate={{
              src: cataractVideo,
              title: 'New Reel Title',
              caption: 'Enter caption here... #eyecare',
              likes: '100',
              comments: '5',
              shares: '10'
            }}
            className="flex flex-col md:flex-row gap-8 justify-center items-center max-w-5xl mx-auto mb-20"
            itemAs="div"
          >
            {(reel, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="w-full flex justify-center"
              >
                <ReelCard 
                  reel={reel} 
                  isMuted={isMuted} 
                  toggleMute={toggleMute} 
                  onUpdateVideo={(newSrc) => handleUpdateVideo(reel.id, newSrc)}
                />
              </motion.div>
            )}
          </EditableList>
        </div>

        {/* Shared Footer CTA */}
        <FooterCTA />
      </EditableContainer>
    </motion.div>
  );
};

export default VideoGallery;
