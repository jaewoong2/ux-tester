export default function validateEmail(input: string) {
  if (input.trim() === '') return null

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (input.match(validRegex)) {
    return true
  } else {
    return false
  }
}
