import type { Project } from '@/types/portfolio';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language } from '@/types/portfolio';
import { getPortfolioData } from '@/lib/data';
import { isLanguage } from '@/app/page';

export async function ProjectCard({ project, lang }: { project: Project; lang: Language }) {
  const currentLanguage: Language = isLanguage(lang) ? lang : 'en';
  const data = await getPortfolioData(currentLanguage);
  return (
    <Card className="flex flex-col overflow-hidden h-full group transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:border-primary/50">
      <CardHeader className="p-0">
        <div className="relative w-full h-48 overflow-hidden bg-black">
          <Image
            src={project.main_image}
            alt=""
            fill
            className="object-cover blur-md scale-110"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-blue-950/50" />
          <Image
            src={project.main_image}
            alt={project.title}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="flutter app"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <h3 className="text-xl font-bold font-headline">{project.title}</h3>
        <p className="mt-2 text-muted-foreground text-sm">{project.description_short}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="default">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link href={`/projects/${project.slug}?lang=${lang}`}>
            {data.static_strings['view_details']} <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
