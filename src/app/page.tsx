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
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaTelegram 
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <div className="relative flex flex-col min-h-screen bg-background overflow-x-hidden">
      <BackgroundDecorations />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <AnimatedSection id="hero" className="text-center flex flex-col items-center">
          <Avatar className="w-32 h-32 mb-4 border-4 border-primary">
            <AvatarImage src={data.personal.avatar} alt={data.personal.name} data-ai-hint="professional headshot" />
            <AvatarFallback>{data.personal.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary-foreground">
            {data.personal.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mt-2">
            {data.personal.title}
          </p>
          <div className="flex gap-4 mt-6">
            <Button asChild variant="ghost" size="icon">
              <Link href={data.personal.social.github} target="_blank" aria-label="GitHub">
                <FaGithub />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link href={data.personal.social.linkedin} target="_blank" aria-label="LinkedIn">
                <FaLinkedin />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link href={data.personal.social.twitter} target="_blank" aria-label="Twitter">
                <FaTwitter />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link href={`mailto:${data.personal.email}`} aria-label="Email">
                <MdEmail />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link href={data.personal.social.telegram} target="_blank" aria-label="Telegram">
                <FaTelegram />
              </Link>
            </Button>
          </div>
        </AnimatedSection>

        {/* About Section */}
        <AnimatedSection id="about" className="mt-24 max-w-3xl mx-auto" delay={100}>
          <h2 className="text-3xl font-bold text-center font-headline mb-8">About Me</h2>
          <p className="text-lg text-center text-muted-foreground leading-relaxed">
            {data.about}
          </p>
        </AnimatedSection>

        {/* Experience Section */}
        <AnimatedSection id="experience" className="mt-24 max-w-3xl mx-auto" delay={200}>
          <h2 className="text-3xl font-bold text-center font-headline mb-12">Work Experience</h2>
          <ExperienceTimeline items={data.experience} />
        </AnimatedSection>

        {/* Education Section */}
        <AnimatedSection id="education" className="mt-24 max-w-3xl mx-auto" delay={300}>
          <h2 className="text-3xl font-bold text-center font-headline mb-12">Education</h2>
          <EducationTimeline items={data.education} />
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection id="skills" className="mt-24" delay={400}>
          <h2 className="text-3xl font-bold text-center font-headline mb-12">Skills</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{skill.name}</h3>
                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                </div>
                <Progress value={skill.level} aria-label={`${skill.name} proficiency`} />
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection id="projects" className="mt-24" delay={500}>
          <h2 className="text-3xl font-bold text-center font-headline mb-12">My Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 bg-card border-t">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} {data.personal.name}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Button asChild variant="default">
              <a href="/portfolio-data.json" download="portfolio-config.json">
                <Download className="mr-2 h-4 w-4" />
                Download JSON
              </a>
            </Button>
            <div className="flex gap-2">
              <Button asChild variant="ghost" size="icon">
                <Link href={data.personal.social.github} target="_blank" aria-label="GitHub">
                  <FaGithub />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href={data.personal.social.linkedin} target="_blank" aria-label="LinkedIn">
                  <FaLinkedin />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon">
                <Link href={`mailto:${data.personal.email}`} aria-label="Email">
                  <MdEmail />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
