export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Skill {
  name: string
  level: SkillLevel
  color: string
  icon: string
}

export const levelPercentage: Record<SkillLevel, number> = {
  beginner: 33,
  intermediate: 66,
  advanced: 100,
}

export const skills: Skill[] = [
  { name: 'JavaScript', level: 'intermediate', color: '#f7df1e', icon: 'devicon-javascript-plain colored' },
  { name: 'TypeScript', level: 'beginner',     color: '#3178c6', icon: 'devicon-typescript-plain colored' },
  { name: 'React',      level: 'intermediate', color: '#61dafb', icon: 'devicon-react-original colored' },
  { name: 'Python',     level: 'beginner',     color: '#3776ab', icon: 'devicon-python-plain colored' },
  { name: 'Java',       level: 'beginner',     color: '#ed8b00', icon: 'devicon-java-plain colored' },
  { name: 'C / C++',    level: 'beginner',     color: '#00599c', icon: 'devicon-cplusplus-plain colored' },
  { name: 'Flutter',    level: 'beginner',     color: '#02569b', icon: 'devicon-flutter-plain colored' },
  { name: 'Kotlin',     level: 'beginner',     color: '#7f52ff', icon: 'devicon-kotlin-plain colored' },
]

export const tools = [
  'Vite', 'Tailwind CSS', 'HTML', 'CSS', 'Git', 'MySQL', 'MongoDB', 'SQL',
]
