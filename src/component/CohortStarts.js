import React from 'react';

export default function MarqueeBanner() {
  return (
    <div className="w-full  text-amber-800 overflow-hidden py-2 relative">
      <div className="marquee whitespace-nowrap font-medium text-sm sm:text-base">
        <span className="mx-4">📢 Our 2nd Sprints Cohort Starts 30th September. Do not sleep on this</span>
      </div>

      <style>
        {`
          .marquee {
            display: inline-block;
            min-width: 100%;
            white-space: nowrap;
            position: relative;
            animation: marquee 15s linear infinite;
          }

          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
}
