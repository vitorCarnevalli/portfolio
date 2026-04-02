export interface Project {
  nameKey: string
  descriptionKey: string
  tags: string[]
  url?: string
  repo?: string
}

export const projects: Project[] = [
  {
    nameKey: 'projects.portfolio.name',
    descriptionKey: 'projects.portfolio.description',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    repo: 'https://github.com/vitorCarnevalli',
  },
]
