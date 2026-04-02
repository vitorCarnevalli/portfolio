export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Skill {
  name: string
  level: SkillLevel
  percentage: number
  color: string
}

export const skills: Skill[] = [
  { name: 'JavaScript', level: 'intermediate', percentage: 65, color: '#f7df1e' },
  { name: 'TypeScript', level: 'beginner', percentage: 40, color: '#3178c6' },
  { name: 'React', level: 'intermediate', percentage: 60, color: '#61dafb' },
  { name: 'Python', level: 'beginner', percentage: 35, color: '#3776ab' },
  { name: 'Java', level: 'beginner', percentage: 35, color: '#ed8b00' },
  { name: 'C / C++', level: 'beginner', percentage: 30, color: '#00599c' },
  { name: 'Flutter', level: 'beginner', percentage: 30, color: '#02569b' },
  { name: 'Kotlin', level: 'beginner', percentage: 25, color: '#7f52ff' },
]

export const tools = [
  'Vite', 'Tailwind CSS', 'HTML', 'CSS', 'Git', 'MySQL', 'MongoDB', 'SQL',
]
