export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Skill {
  name: string
  level: SkillLevel
  color: string
  icon: string
}


export const skills: Skill[] = [
  { name: 'C',          level: 'intermediate', color: '#a8b9cc', icon: 'devicon-c-plain colored' },
  { name: 'Java',       level: 'beginner',     color: '#f89820', icon: 'devicon-java-plain colored' },
  { name: 'Python',     level: 'intermediate', color: '#3776ab', icon: 'devicon-python-plain colored' },
  { name: 'JavaScript', level: 'intermediate', color: '#f7df1e', icon: 'devicon-javascript-plain colored' },
  { name: 'Kotlin',     level: 'beginner',     color: '#7f52ff', icon: 'devicon-kotlin-plain colored' },
  { name: 'SQL',        level: 'beginner',     color: '#4479a1', icon: 'devicon-mysql-plain colored' },
]

export const tools = [
  'Git', 'GitHub', 'VS Code',
]
