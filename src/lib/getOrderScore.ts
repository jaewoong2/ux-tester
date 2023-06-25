const SCORE_DB: { [key: string]: number } = {
  'email,password,passwordCheck,nextButton': 50,
  'email,password,nextButton,passwordCheck': 37.5,
  'email,passwordCheck,password,nextButton': 35,
  'email,passwordCheck,nextButton,password': 25,
  'email,nextButton,password,passwordCheck': 30,
  'email,nextButton,passwordCheck,password': 20,
  'password,email,passwordCheck,nextButton': 30,
  'password,email,nextButton,passwordCheck': 20,
  'password,passwordCheck,email,nextButton': 25,
  'password,passwordCheck,nextButton,email': 15,
  'password,nextButton,email,passwordCheck': 20,
  'password,nextButton,passwordCheck,email': 10,
  'passwordCheck,email,password,nextButton': 25,
  'passwordCheck,email,nextButton,password': 15,
  'passwordCheck,password,email,nextButton': 30,
  'passwordCheck,password,nextButton,email': 20,
  'passwordCheck,nextButton,email,password': 20,
  'passwordCheck,nextButton,password,email': 10,
  'nextButton,email,password,passwordCheck': 20,
  'nextButton,email,passwordCheck,password': 10,
  'nextButton,password,email,passwordCheck': 20,
  'nextButton,password,passwordCheck,email': 10,
  'nextButton,passwordCheck,email,password': 15,
  'nextButton,passwordCheck,password,email': 5,
}

export default function getOrderScore(arr: string[]) {
  const str = arr.join(',')
  if (str in SCORE_DB) return SCORE_DB[str]
  return 0
}
