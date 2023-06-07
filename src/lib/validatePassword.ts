export default function validatePassword(input: string) {
  if (input.trim() === '') return null
  return input.length >= 8
}
