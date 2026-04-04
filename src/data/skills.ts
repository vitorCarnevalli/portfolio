export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Skill {
  name: string
  level: SkillLevel
  color: string
  icon: string
}


export const skills: Skill[] = [
  { name: 'TypeScript', level: 'intermediate', color: '#3178c6', icon: 'devicon-typescript-plain colored' },
  { name: 'React',      level: 'intermediate', color: '#61dafb', icon: 'devicon-react-original colored' },
  { name: 'Java',       level: 'beginner',     color: '#ed8b00', icon: 'devicon-java-plain colored' },
  { name: 'Kotlin',     level: 'beginner',     color: '#7f52ff', icon: 'devicon-kotlin-plain colored' },
]

export const tools = [
  'Git', 'MongoDB', 'Claude Code', 'VS Code',
]
