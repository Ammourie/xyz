import React from 'react';

export function BackgroundDecorations() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute top-[10%] left-[5%] text-primary/5 text-9xl font-code -translate-x-1/2 -translate-y-1/2 rotate-12">
        {'</>'}
      </div>
      <div className="absolute bottom-[10%] right-[5%] text-accent/5 text-9xl font-code translate-x-1/2 translate-y-1/2 -rotate-12">
        {'{...}'}
      </div>
      <div className="absolute top-[5%] right-[20%] text-primary/5 text-8xl font-code rotate-[25deg]">
        {'()=>'}
      </div>
      <div className="absolute bottom-[15%] left-[25%] text-accent/5 text-8xl font-code rotate-[-35deg]">
        {'useEffect'}
      </div>
    </div>
  );
}
