'use client';

import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import React from 'react';

type AnimatedSectionProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  delay?: number;
};

export function AnimatedSection({ children, className, delay = 0, ...props }: AnimatedSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      {...props}
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        className
      )}
      style={{ transitionDelay: `${delay}ms`, ...props.style }}
    >
      {children}
    </section>
  );
}
