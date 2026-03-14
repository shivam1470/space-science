import React from 'react';

interface MarsPlanetProps {
  size?: number;
}

/**
 * Mars3D Component - SVG/CSS Fallback Version
 * Provides a 2D Mars visualization while we debug Three.js issues
 */
export const Mars3D: React.FC<MarsPlanetProps> = ({ size = 2 }) => {
  const sizePixels = (size * 100);

  return (
    <div className="w-full h-96 bg-gradient-to-b from-black via-slate-900 to-indigo-950 rounded-lg overflow-hidden border-2 border-purple-500/50 shadow-2xl flex items-center justify-center relative">
      {/* Starfield background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Mars Planet */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <svg
          width={sizePixels}
          height={sizePixels}
          viewBox="0 0 200 200"
          className="animate-spin"
          style={{ animationDuration: '20s' }}
        >
          {/* Mars sphere with gradient */}
          <defs>
            <radialGradient id="marsGradient">
              <stop offset="0%" stopColor="#ff8c42" />
              <stop offset="50%" stopColor="#cd5c5c" />
              <stop offset="100%" stopColor="#8b3a3a" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glow effect */}
          <circle cx="100" cy="100" r="105" fill="none" stroke="#ff6347" strokeWidth="2" opacity="0.3" />

          {/* Mars planet */}
          <circle cx="100" cy="100" r="100" fill="url(#marsGradient)" filter="url(#glow)" />

          {/* Surface details - craters */}
          <circle cx="70" cy="60" r="8" fill="#8b3a3a" opacity="0.6" />
          <circle cx="120" cy="90" r="6" fill="#8b3a3a" opacity="0.5" />
          <circle cx="80" cy="130" r="7" fill="#8b3a3a" opacity="0.5" />
          <circle cx="140" cy="110" r="5" fill="#8b3a3a" opacity="0.6" />

          {/* Light reflection */}
          <ellipse cx="60" cy="50" rx="30" ry="25" fill="#ff8c42" opacity="0.2" />
        </svg>

        {/* Label */}
        <p className="mt-6 text-red-400 font-bold text-lg">Mars</p>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
};

export default Mars3D;
