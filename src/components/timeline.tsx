'use client';

import { Briefcase, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Education, Experience } from '@/types/portfolio';
import React from 'react';

const TimelineItem = ({
  icon,
  title,
  subtitle,
  period,
  description,
  isLast,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  isLast: boolean;
}) => {
  return (
    <div
      className={cn(
        'relative pl-16 pb-12'
      )}
    >
      <div
        className={cn(
          'absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full bg-card border-2 border-primary shadow-lg'
        )}
      >
        {React.cloneElement(icon as React.ReactElement, {
          className: cn('w-6 h-6 text-primary'),
        })}
      </div>

      {!isLast && (
        <div className="absolute left-[22px] top-14 -bottom-4 w-0.5 bg-border" />
      )}

      <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-xl font-bold font-headline text-primary-foreground">{title}</h3>
        <p className="flex-shrink-0 text-sm font-medium text-muted-foreground">{period}</p>
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
          period={item.period}
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
          period={item.period}
          description={item.description}
          isLast={index === items.length - 1}
        />
      ))}
    </div>
  );
};
