interface VedantaLogoProps {
  className?: string;
  height?: number;
  showText?: boolean;
  variant?: 'default' | 'white';
}

export default function VedantaLogo({
  className = '',
  height = 42,
  showText = true,
  variant = 'default',
}: VedantaLogoProps) {
  const logoSrc = `${import.meta.env.BASE_URL}assets/vedanta-logo.png`;
  const width = showText ? height * 3.45 : height * 1.2;

  return (
    <span
      className={`vedanta-logo vedanta-logo--${variant} ${className}`}
      style={{ height, width }}
      aria-label="Vedanta Netralya"
    >
      <img src={logoSrc} alt="Vedanta Netralya" />
    </span>
  );
}
