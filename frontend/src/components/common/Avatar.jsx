const palettes = [
  'from-indigo-500 to-violet-600',
  'from-sky-500 to-blue-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-fuchsia-500 to-purple-600',
]

const Avatar = ({ name = '?', size = 'md', ring = false }) => {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  const gradient = palettes[(name.charCodeAt(0) + name.length) % palettes.length]

  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  }

  return (
    <span
      className={`flex shrink-0 select-none items-center justify-center rounded-full bg-gradient-to-br ${gradient} font-bold text-white ${
        sizes[size] || sizes.md
      } ${ring ? 'ring-2 ring-white/20' : ''}`}
      title={name}
    >
      {initials || '?'}
    </span>
  )
}

export default Avatar
