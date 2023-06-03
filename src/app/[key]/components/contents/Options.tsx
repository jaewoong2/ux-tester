import React from 'react'
import OptionBlock from '../blocks/OptionBlock'

type Props = {
  itemId: number
}

const options = {
  data: [
    {
      id: 1,
      item_id: 1,
      key: 'duplicate',
      type: 'radio',
      created_at: '2023-06-03T04:00:30.527704+00:00',
      title: '중복 확인 버튼을 사용 할까요?',
      description: '동일한 아이디는 사용 할 수 없어요',
      values: [
        {
          content: '네, 중복 확인 해야죠!',
          value: 'yes',
          key: 'duplicate-0',
        },
        {
          content: '아니요, 입력 받으면서 확인 하면 되요',
          value: 'no',
          key: 'duplicate-1',
        },
      ],
    },
    {
      id: 2,
      item_id: 1,
      key: 'placeholder',
      type: 'radio',
      created_at: '2023-06-03T04:03:26.634895+00:00',
      title: '플레이스홀더 값은 무엇으로 할까요?',
      description: '예시로 어떤 값을 넣는지 알려주는 것 이에요',
      values: [
        {
          content: '이메일을 입력해주세요...',
          value: 'email',
          key: 'placeholder-0',
        },
        {
          content: 'example@naver.com',
          value: 'example',
          key: 'placeholder-1',
        },
      ],
    },
    {
      id: 4,
      item_id: 1,
      key: 'email',
      type: 'radio',
      created_at: '2023-06-03T04:19:04.757403+00:00',
      title: '이메일 입력은 어떻게 받을까요?',
      description: '어떤것이 좋을지 같이 고민해봐요',
      values: [
        {
          content: '그냥 내비둔다',
          value: 'normal',
          key: 'email-0',
        },
        {
          content: '도메인을 **입력** 할 수 있는 공간을 만든다',
          value: 'domain',
          key: 'email-1',
        },
        {
          content: '도메인을 **선택** 할 수 있는 공간을 만든다',
          value: 'domain-select',
          key: 'email-2',
        },
      ],
    },
    {
      id: 3,
      item_id: 1,
      key: 'rule',
      type: 'radio',
      created_at: '2023-06-03T04:16:47.970473+00:00',
      title: '규칙은 언제 확인 할까요?',
      description: '아이디가 이메일 인지 확인해요',
      values: [
        {
          content: '**다음** 버튼을 누른 후 규칙 확인',
          value: 'button',
          key: 'rule-0',
        },
        {
          content: '**입력**과 동시에 규칙 확인',
          value: 'input',
          key: 'rule-1',
        },
      ],
    },
  ],
} as const

const Options = async ({ itemId }: Props) => {
  return <OptionBlock options={options} />
}

export default Options
