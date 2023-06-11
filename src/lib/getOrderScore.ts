const SCORE_DB: { [key: string]: number } = {
  'email,password,passwordCheck,nextButton': 100,
  'email,password,nextButton,passwordCheck': 75,
  'email,passwordCheck,password,nextButton': 70,
  'email,passwordCheck,nextButton,password': 50,
  'email,nextButton,password,passwordCheck': 60,
  'email,nextButton,passwordCheck,password': 40,
  'password,email,passwordCheck,nextButton': 60,
  'password,email,nextButton,passwordCheck': 40,
  'password,passwordCheck,email,nextButton': 50,
  'password,passwordCheck,nextButton,email': 30,
  'password,nextButton,email,passwordCheck': 40,
  'password,nextButton,passwordCheck,email': 20,
  'passwordCheck,email,password,nextButton': 50,
  'passwordCheck,email,nextButton,password': 30,
  'passwordCheck,password,email,nextButton': 60,
  'passwordCheck,password,nextButton,email': 40,
  'passwordCheck,nextButton,email,password': 40,
  'passwordCheck,nextButton,password,email': 20,
  'nextButton,email,password,passwordCheck': 40,
  'nextButton,email,passwordCheck,password': 20,
  'nextButton,password,email,passwordCheck': 40,
  'nextButton,password,passwordCheck,email': 20,
  'nextButton,passwordCheck,email,password': 30,
  'nextButton,passwordCheck,password,email': 10,
}

export default function getOrderScore(arr: string[]) {
  const str = arr.join(',')
  if (str in SCORE_DB) return SCORE_DB[str]
  return 0
}
