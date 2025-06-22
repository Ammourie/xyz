import { getPortfolioData } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Download } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ProjectCard } from '@/components/project-card';
import { EducationTimeline, ExperienceTimeline } from '@/components/timeline';
import { AnimatedSection } from '@/components/animated-section';
import { BackgroundDecorations } from '@/components/background-decorations';
import { ClientPageWrapper } from '@/components/client-page-wrapper';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaTelegram
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Language } from '@/types/portfolio';

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

function isLanguage(lang: any): lang is Language {
  return lang === 'en' || lang === 'ar';
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const langParam = params?.lang; // Safely access lang
  const currentLanguage: Language = isLanguage(langParam) ? langParam : 'en';
  const data = await getPortfolioData(currentLanguage);
  return (
    <ClientPageWrapper initialLanguage={currentLanguage} navigation={data.navigation}>
      <div className="relative flex flex-col min-h-screen bg-background overflow-x-hidden">
        <BackgroundDecorations />

        <main className="flex-1 container mx-auto px-4 py-8 md:py-16 mt-16 md:mt-20">
          {/* Hero Section */}
          <AnimatedSection id="hero" className="text-center flex flex-col items-center min-h-[80vh] justify-center">
            <div className="relative mb-8">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-primary shadow-2xl">
                <AvatarImage src={data.personal.avatar} alt={data.personal.name} />
                <AvatarFallback className="text-2xl font-bold">{data.personal.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-xl opacity-50"></div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary-foreground mb-4">
              {data.personal.name}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              {data.personal.title}
            </p>
            <div className="flex gap-4 mb-8">
              <Button asChild variant="ghost" size="icon" className="h-12 w-12 hover:bg-primary/10 hover:text-primary transition-all duration-200">
                <Link href={data.personal.social.github} target="_blank" aria-label="GitHub">
                  <FaGithub className="h-6 w-6" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-12 w-12 hover:bg-primary/10 hover:text-primary transition-all duration-200">
                <Link href={data.personal.social.linkedin} target="_blank" aria-label="LinkedIn">
                  <FaLinkedin className="h-6 w-6" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-12 w-12 hover:bg-primary/10 hover:text-primary transition-all duration-200">
                <Link href={data.personal.social.twitter} target="_blank" aria-label="Twitter">
                  <FaTwitter className="h-6 w-6" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-12 w-12 hover:bg-primary/10 hover:text-primary transition-all duration-200">
                <Link href={`mailto:${data.personal.email}`} aria-label="Email">
                  <MdEmail className="h-6 w-6" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="h-12 w-12 hover:bg-primary/10 hover:text-primary transition-all duration-200">
                <Link href={data.personal.social.telegram} target="_blank" aria-label="Telegram">
                  <FaTelegram className="h-6 w-6" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>

          {/* About Section */}
          <AnimatedSection id="about" className="mt-24 max-w-4xl mx-auto" delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-8 text-primary">
              {data.about.title}
            </h2>
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg">
              <p className="text-lg text-center text-muted-foreground leading-relaxed">
                {data.about.description}
              </p>
            </div>
          </AnimatedSection>

          {/* Experience Section */}
          <AnimatedSection id="experience" className="mt-24 max-w-4xl mx-auto" delay={200}>
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12 text-primary">
              {data.sections.experience.title}
            </h2>
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg">
              <ExperienceTimeline items={data.experience || []} />
            </div>
          </AnimatedSection>

          {/* Education Section */}
          <AnimatedSection id="education" className="mt-24 max-w-4xl mx-auto" delay={300}>
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12 text-primary">
              {data.sections.education.title}
            </h2>
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg">
              <EducationTimeline items={data.education || []} />
            </div>
          </AnimatedSection>

          {/* Skills Section */}
          <AnimatedSection id="skills" className="mt-24" delay={400}>
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12 text-primary">
              {data.sections.skills.title}
            </h2>
            <div className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(data.skills || []).map((skill) => (
                  <div key={skill.name} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-foreground">{skill.name}</h3>
                      <span className="text-sm font-medium text-primary">{skill.level}%</span>
                    </div>
                    <div className="relative">
                      <Progress
                        value={skill.level}
                        className="h-3 bg-background/50"
                        aria-label={`${skill.name} proficiency`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full opacity-50"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Projects Section */}
          <AnimatedSection id="projects" className="mt-24" delay={500}>
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12 text-primary">
              {data.sections.projects.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(data.projects || []).map((project) => (
                <ProjectCard key={project.slug} project={project} lang={currentLanguage} />
              ))}
            </div>
          </AnimatedSection>
        </main>

        {/* Footer
        <footer className="w-full py-12 bg-card/50 backdrop-blur-sm border-t border-border/50 mt-24">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground text-sm">
              &copy; {new Date().getFullYear()} {data.personal.name}. {data.footer.copyright}
            </p>
            <div className="flex items-center gap-4">
              <Button asChild variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                <a href="/portfolio-data.json" download="portfolio-config.json">
                  <Download className="mr-2 h-4 w-4" />
                  {data.footer.downloadJson}
                </a>
              </Button>
              <div className="flex gap-2">
                <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-all duration-200">
                  <Link href={data.personal.social.github} target="_blank" aria-label="GitHub">
                    <FaGithub />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-all duration-200">
                  <Link href={data.personal.social.linkedin} target="_blank" aria-label="LinkedIn">
                    <FaLinkedin />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-all duration-200">
                  <Link href={`mailto:${data.personal.email}`} aria-label="Email">
                    <MdEmail />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </footer> */}
      </div>
    </ClientPageWrapper>
  );
}
