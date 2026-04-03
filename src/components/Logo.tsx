import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {showText && (
        <span className="text-lg font-bold tracking-tight text-foreground">
          Intl<span className="text-primary">Bridges</span>
        </span>
      )}
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9 shrink-0"
      >
        {/* Globe circle */}
        <circle cx="24" cy="24" r="21" stroke="hsl(var(--primary))" strokeWidth="2.2" fill="none" />
        {/* Meridian ellipse */}
        <ellipse cx="24" cy="24" rx="9" ry="21" stroke="hsl(var(--primary))" strokeWidth="1.6" fill="none" opacity="0.7" />
        {/* Latitude lines */}
        <line x1="5" y1="16" x2="43" y2="16" stroke="hsl(var(--primary))" strokeWidth="1.3" opacity="0.5" />
        <line x1="5" y1="32" x2="43" y2="32" stroke="hsl(var(--primary))" strokeWidth="1.3" opacity="0.5" />
        {/* Bridge arc */}
        <path
          d="M8 36 Q18 18 24 18 Q30 18 40 36"
          stroke="hsl(var(--accent-foreground))"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Bridge pillars */}
        <line x1="14" y1="28" x2="14" y2="36" stroke="hsl(var(--accent-foreground))" strokeWidth="2" strokeLinecap="round" />
        <line x1="34" y1="28" x2="34" y2="36" stroke="hsl(var(--accent-foreground))" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
