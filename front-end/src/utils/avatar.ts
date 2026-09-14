const avatarColors = [
  '#7C3AED',
  '#2563EB',
  '#0F766E',
  '#DB2777',
  '#EA580C',
  '#CA8A04',
  '#059669',
  '#4F46E5'
]

export function getAvatarColor(userId: number) {
  return avatarColors[userId % avatarColors.length]
}

export function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase()
}