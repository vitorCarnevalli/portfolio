export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Skill {
  name: string
  level: SkillLevel
  percentage: number
  color: string
  icon: string
}

export const skills: Skill[] = [
  { name: 'JavaScript', level: 'intermediate', percentage: 65, color: '#f7df1e', icon: 'devicon-javascript-plain colored' },
  { name: 'TypeScript', level: 'beginner', percentage: 40, color: '#3178c6', icon: 'devicon-typescript-plain colored' },
  { name: 'React', level: 'intermediate', percentage: 60, color: '#61dafb', icon: 'devicon-react-original colored' },
  { name: 'Python', level: 'beginner', percentage: 35, color: '#3776ab', icon: 'devicon-python-plain colored' },
  { name: 'Java', level: 'beginner', percentage: 35, color: '#ed8b00', icon: 'devicon-java-plain colored' },
  { name: 'C / C++', level: 'beginner', percentage: 30, color: '#00599c', icon: 'devicon-cplusplus-plain colored' },
  { name: 'Flutter', level: 'beginner', percentage: 30, color: '#02569b', icon: 'devicon-flutter-plain colored' },
  { name: 'Kotlin', level: 'beginner', percentage: 25, color: '#7f52ff', icon: 'devicon-kotlin-plain colored' },
]

export const tools = [
  'Vite', 'Tailwind CSS', 'HTML', 'CSS', 'Git', 'MySQL', 'MongoDB', 'SQL',
]
