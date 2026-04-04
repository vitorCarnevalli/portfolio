export interface Project {
  nameKey: string
  descriptionKey: string
  tags: string[]
  url?: string
  repo?: string
  coverGradient?: [string, string]
}

export const projects: Project[] = [
  {
    nameKey: 'projects.portfolio.name',
    descriptionKey: 'projects.portfolio.description',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    repo: 'https://github.com/vitorCarnevalli/portfolio',
    coverGradient: ['#1a1a2e', '#16213e'],
  },
  {
    nameKey: 'projects.andrea.name',
    descriptionKey: 'projects.andrea.description',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    coverGradient: ['#1a2e1a', '#162e20'],
  },
]
