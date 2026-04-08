import andreaNovo from '../assets/andrea-novo.webp'
import andreaAntigo from '../assets/andrea-antigo.webp'
import portfolioPreview from '../assets/portfolio-preview.webp'

export interface Project {
  nameKey: string
  descriptionKey: string
  tags: string[]
  url?: string
  repo?: string
  coverGradient?: [string, string]
  coverImage?: string
  beforeImage?: string
}

export const projects: Project[] = [
  {
    nameKey: 'projects.andrea.name',
    descriptionKey: 'projects.andrea.description',
    tags: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    coverImage: andreaNovo,
    beforeImage: andreaAntigo,
  },
  {
    nameKey: 'projects.portfolio.name',
    descriptionKey: 'projects.portfolio.description',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    repo: 'https://github.com/vitorCarnevalli/portfolio',
    coverImage: portfolioPreview,
  },
]
