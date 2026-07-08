import { PORTFOLIO_DATA } from "@/lib/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function ProjectCaseStudyPage({ params }: { params: { slug: string } }) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === params.slug)
  
  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-32 max-w-4xl">
      <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Portfolio
      </Link>
      
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
          {project.title}
        </h1>
        
        <div className="flex flex-wrap gap-2">
          {project.techStack.map(tech => (
            <Badge key={tech} variant="secondary" className="text-sm px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-4 mt-2">
          {project.demoUrl && project.demoUrl !== "#" && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "default" }))}>
              <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "outline" }))}>
              <FaGithub className="w-4 h-4 mr-2" /> View Source
            </a>
          )}
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none mt-8">
          <h2>Overview</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          
          {project.challenge && (
            <>
              <h2>The Challenge</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {project.challenge}
              </p>
            </>
          )}

          <h2>My Role & Implementation</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            As the lead developer on this project, I was responsible for designing the architecture and implementing both the frontend and backend systems. The primary focus was on ensuring code quality, maintainability, and scalability.
          </p>
          
          <h3>Key Features Built:</h3>
          <ul>
            <li>Responsive UI components tailored for an optimal user experience across all devices.</li>
            <li>Integration with third-party APIs and services for extended functionality.</li>
            <li>Robust state management and optimized data fetching strategies.</li>
            <li>Implementation of modern security practices and performance optimization techniques.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
