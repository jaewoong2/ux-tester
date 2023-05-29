import { Item } from '@/types'

const SIGNUP_SELECTABLE_CARD_EMAIL: Item = {
  id: 'SIGNUP_SELECTABLE_CARD_1',
  content: { title: '이메일', description: '이메일을 입력 받아요' },
  form: {
    label: '이메일',
    type: 'email',
    rules: [
      {
        label: '동일한 이메일 여부',
        validator: (email) => {
          if (email) return true
          return false
        },
      },
    ],
    options: {
      placeholder: 'example',
      rule: 'button',
      domain: 'normal',
      duplicate: 'yes',
    },
  },
  options: [
    {
      type: 'radio',
      option: 'duplicate',
      title: '중복 확인 버튼은 필요 할까요?',
      values: [
        {
          value: 'yes',
          node: '네, 중복 확인 해야죠',
          key: '0',
        },
        {
          value: 'no',
          node: '아니요, 입력받으면서 확인하면 되요',
          key: '1',
        },
      ],
    },
    {
      type: 'radio',
      option: 'placeholder',
      title: '플레이스홀더 값은 무엇으로 할까요?',
      values: [
        {
          value: 'example',
          node: 'example@domain.com',
          key: '0',
        },
        {
          value: 'input',
          node: '이메일을 입력 해주세요...',
          key: '1',
        },
      ],
    },
    {
      type: 'radio',
      title: '규칙은 언제 확인 할까요?',
      option: 'rule',
      values: [
        {
          value: 'button',
          key: '0',
          node: (
            <p>
              <span className='font-bold'>다음</span>버튼을 누른 후 규칙 확인
            </p>
          ),
        },
        {
          value: 'input',
          node: (
            <p>
              <span className='font-bold'>입력</span>을 하며 규칙 확인
            </p>
          ),
          key: '1',
        },
      ],
    },
    {
      type: 'radio',
      title: '이메일 은 어떻게 표시해야 할까요?',
      option: 'domain',
      values: [
        {
          value: 'normal',
          key: '0',
          node: '그냥 내비둔다',
        },
        {
          value: 'domain',
          node: (
            <p>
              <span className='font-bold'>도메인</span>을 입력 할 수 있는 공간을 만든다
            </p>
          ),
          key: '1',
        },
        {
          value: 'domain-select',
          node: (
            <p>
              <span className='font-bold'>도메인</span>을 선택 할 수 있는 공간을 만든다
            </p>
          ),
          key: '2',
        },
      ],
    },
  ],
}

const SIGNUP_SELECTABLE_CARD_PASSWORD: Item = {
  id: 'SIGNUP_SELECTABLE_CARD_2',
  content: { title: '비밀번호', description: '비밀번호를 입력 받아요' },
  form: {
    label: '비밀번호',
    type: 'password',
    rules: [
      {
        label: '특수문자',
        validator(input) {
          const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g
          return reg.test(input)
        },
      },
      {
        label: '8자 이상',
        validator(input) {
          return input.length >= 8
        },
      },
    ],
    options: {
      placeholder: 'example',
      rule: 'button',
      password: 'yes',
    },
  },
  options: [
    {
      type: 'radio',
      option: 'placeholder',
      title: '플레이스홀더 값은 무엇으로 할까요?',
      values: [
        {
          value: 'example',
          node: 'example@domain.com',
          key: '0',
        },
        {
          value: 'input',
          node: '이메일을 입력 해주세요...',
          key: '1',
        },
      ],
    },
    {
      type: 'radio',
      title: '규칙은 언제 확인 할까요?',
      option: 'rule',
      values: [
        {
          value: 'button',
          key: '0',
          node: (
            <p>
              <span className='font-bold'>다음</span>버튼을 누른 후 규칙 확인
            </p>
          ),
        },
        {
          value: 'input',
          node: (
            <p>
              <span className='font-bold'>입력</span>을 하며 규칙 확인
            </p>
          ),
          key: '1',
        },
      ],
    },
    {
      type: 'radio',
      title: '비밀번호는 보일 수 있도록 할까요?',
      option: 'password',
      values: [
        {
          value: 'yes',
          key: '0',
          node: '네, 당연하죠',
        },
        {
          value: 'no',
          node: '아니요, 보안에 위험되요',
          key: '1',
        },
      ],
    },
  ],
}

const SIGNUP_SELECTABLE_CARD_PASSWORDCHECK: Item = {
  id: 'SIGNUP_SELECTABLE_CARD_3',
  content: { title: '비밀번호 확인', description: '비밀번호 확인을 위해 입력을 받아요' },
  form: {
    label: '비밀번호 확인',
    type: 'password',
    rules: [
      {
        label: '동일한 비밀번호',
        validator(input, password: string) {
          return password === input
        },
      },
    ],
    options: {
      placeholder: 'example',
      rule: 'button',
      password: 'yes',
    },
  },
  options: [
    {
      type: 'radio',
      option: 'placeholder',
      title: '플레이스홀더 값은 무엇으로 할까요?',
      values: [
        {
          value: 'example',
          node: 'example@domain.com',
          key: '0',
        },
        {
          value: 'input',
          node: '이메일을 입력 해주세요...',
          key: '1',
        },
      ],
    },
    {
      type: 'radio',
      title: '규칙은 언제 확인 할까요?',
      option: 'rule',
      values: [
        {
          value: 'button',
          key: '0',
          node: (
            <p>
              <span className='font-bold'>다음</span>버튼을 누른 후 규칙 확인
            </p>
          ),
        },
        {
          value: 'input',
          node: (
            <p>
              <span className='font-bold'>입력</span>을 하며 규칙 확인
            </p>
          ),
          key: '1',
        },
      ],
    },
    {
      type: 'radio',
      title: '비밀번호는 보일 수 있도록 할까요?',
      option: 'password',
      values: [
        {
          value: 'yes',
          key: '0',
          node: '네, 당연하죠',
        },
        {
          value: 'no',
          node: '아니요, 보안에 위험되요',
          key: '1',
        },
      ],
    },
  ],
}

const SIGNUP_SELECTABLE_CARD_NEXTBUTTON: Item = {
  id: 'SIGNUP_SELECTABLE_CARD_4',
  content: { title: '다음 버튼', description: '다음 절차로 넘어갈 버튼이에요' },
  form: {
    label: '다음 버튼',
    type: 'button',
    options: {
      label: '다음',
    },
  },
  options: [
    {
      type: 'input',
      title: '버튼 라벨 설정',
      option: 'label',
    },
  ],
}

export const SIGNUP_SELECTABLE_CARDS: Item[] = [
  SIGNUP_SELECTABLE_CARD_EMAIL,
  SIGNUP_SELECTABLE_CARD_PASSWORD,
  SIGNUP_SELECTABLE_CARD_PASSWORDCHECK,
  SIGNUP_SELECTABLE_CARD_NEXTBUTTON,
]
