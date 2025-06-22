import {
  getProjectBySlug,
  getAllProjectSlugs,
  getAvailableLocales,
} from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { ImageViewer, ImageGallery } from '@/components/image-viewer';
import type { Metadata } from 'next';
import { Language } from '@/types/portfolio';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
): Promise<Metadata> {
  const lang = (searchParams.lang as Language) || 'en';
  const project = await getProjectBySlug(params.slug, lang);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Darkfolio`,
    description: project.description_short,
  };
}

export async function generateStaticParams() {
  const locales = await getAvailableLocales();
  const params: { slug: string; lang: string }[] = [];

  for (const lang of locales) {
    const slugs = await getAllProjectSlugs(lang as Language);
    slugs.forEach(s => {
      params.push({ slug: s.slug, lang: lang });
    });
  }

  return params;
}

export default async function ProjectPage({ params, searchParams }: Props) {
  const lang = (searchParams.lang as Language) || 'en';
  const project = await getProjectBySlug(params.slug, lang);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Button asChild variant="ghost" className="mb-8">
            <Link href={`/?lang=${lang}#projects`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>

          <article>
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary-foreground mb-4">{project.title}</h1>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </header>

            <ImageViewer 
              src={project.main_image} 
              alt={`Main image for ${project.title}`}
              className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-8 bg-black"
            >
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
                alt={`Main image for ${project.title}`} 
                fill 
                className="object-contain" 
                data-ai-hint="app mockup"
                priority
              />
            </ImageViewer>
            
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="prose prose-invert max-w-none text-muted-foreground text-lg leading-relaxed flex-1">
                    <p>{project.description_long}</p>
                </div>
                {(project.live_url || project.source_code_url) && (
                    <div className="md:w-1/3 flex flex-col gap-4">
                        {project.live_url && (
                        <Button asChild size="lg" className="w-full">
                            <Link href={project.live_url} target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Live Demo
                            </Link>
                        </Button>
                        )}
                        {project.source_code_url && (
                        <Button asChild variant="outline" size="lg" className="w-full">
                            <Link href={project.source_code_url} target="_blank">
                                <Github className="mr-2 h-4 w-4" />
                                Source Code
                            </Link>
                        </Button>
                        )}
                    </div>
                )}
            </div>

            {project.gallery_images && project.gallery_images.length > 0 && (
              <section id="gallery">
                <h2 className="text-3xl font-bold font-headline mb-6 mt-12">Gallery</h2>
                <ImageGallery 
                  images={project.gallery_images}
                  altPrefix={`Gallery image for ${project.title}`}
                />
              </section>
            )}
          </article>
        </div>
      </main>
    </div>
  );
}
