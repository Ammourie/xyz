'use client';

import { Briefcase, GraduationCap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import type { Education, Experience } from '@/types/portfolio';
import React from 'react';

const TimelineItem = ({
  icon,
  title,
  subtitle,
  date,
  description,
  isLast,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  isLast: boolean;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'relative pl-16 pb-12 transition-all duration-700 ease-out',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      )}
    >
      <div
        className={cn(
          'absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full bg-card border-2 transition-all duration-500',
          inView ? 'border-primary scale-100' : 'border-border scale-90'
        )}
      >
        {React.cloneElement(icon as React.ReactElement, {
          className: cn('w-6 h-6 transition-colors duration-500', inView ? 'text-primary' : 'text-muted-foreground'),
        })}
      </div>

      {!isLast && (
        <div className="absolute left-[22px] top-14 -bottom-4 w-0.5 bg-border" />
      )}

      <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-bold font-headline text-primary-foreground">{title}</h3>
        <p className="flex-shrink-0 text-sm font-medium text-muted-foreground">{date}</p>
      </div>
      <p className="mt-1 text-lg font-semibold text-primary">{subtitle}</p>
      <p className="mt-2 leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
};

export const ExperienceTimeline = ({ items }: { items: Experience[] }) => {
  if (!items?.length) return null;
  return (
    <div className="relative">
      {items.map((item, index) => (
        <TimelineItem
          key={item.company + item.title}
          icon={<Briefcase />}
          title={item.company}
          subtitle={item.title}
          date={item.date}
          description={item.description}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};

export const EducationTimeline = ({ items }: { items: Education[] }) => {
  if (!items?.length) return null;
  return (
    <div className="relative">
      {items.map((item, index) => (
        <TimelineItem
          key={item.institution + item.degree}
          icon={<GraduationCap />}
          title={item.institution}
          subtitle={item.degree}
          date={item.date}
          description={item.description}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};
