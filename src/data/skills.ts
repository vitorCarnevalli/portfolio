export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Skill {
  name: string
  level: SkillLevel
  color: string
  icon: string
}


export const skills: Skill[] = [
  { name: 'JavaScript', level: 'intermediate', color: '#f7df1e', icon: 'devicon-javascript-plain colored' },
  { name: 'React',      level: 'intermediate', color: '#61dafb', icon: 'devicon-react-original colored' },
  { name: 'C',          level: 'beginner',     color: '#a8b9cc', icon: 'devicon-c-plain colored' },
  { name: 'Python',     level: 'beginner',     color: '#3776ab', icon: 'devicon-python-plain colored' },
  { name: 'Kotlin',     level: 'beginner',     color: '#7f52ff', icon: 'devicon-kotlin-plain colored' },
  { name: 'MongoDB',    level: 'beginner',     color: '#47a248', icon: 'devicon-mongodb-plain colored' },
]

export const tools = [
  'Git', 'GitHub', 'Claude Code', 'VS Code',
]
