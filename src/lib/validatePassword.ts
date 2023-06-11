export default function validatePassword(input: string | null) {
  if (input === null) return null
  if (input.trim() === '') return null
  return input.length >= 8
}
