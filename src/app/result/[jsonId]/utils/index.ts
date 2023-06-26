import { IMAGE } from '@/constants'

export const getArticles = (score: number) => {
  if (score >= 65) {
    return {
      image: IMAGE.fox,
      imageCaption: '금메달을 받아서 기쁜 여우',
      description: '당신은 UX 고수! 대단 하시네요',
      medal: '🥇',
    }
  }

  if (score >= 40) {
    return {
      image: IMAGE.penguin,
      imageCaption: '은메달 이지만, 자신과 비슷한 색이라 신난 펭귄',
      description: '당신은 UX 중수 잘했어요!',
      medal: '🥈',
    }
  }

  return {
    image: IMAGE.cat,
    imageCaption: '메달을 못받았지만 행복한 고양이',
    description: '고생했어요',
    medal: '🥉',
  }
}

export const ORDER_DESCRIPTION =
  '사용자들이 회원가입 과정에서 일반적으로 기대하는 순서는 "이메일" → "비밀번호" → "비밀번호 확인" → "회원 가입 버튼"입니다. 이러한 순서는 각 단계가 직관적으로 이어지도록 하고, 사용자가 이 과정에서 혼동되거나 불편을 느끼지 않도록 합니다.'

export function getOrderName(order: string[]) {
  return order.map((text) => {
    switch (text) {
      case 'passwordCheck':
        return '"비밀번호 확인"'
      case 'password':
        return '"비밀번호"'
      case 'nextButton':
        return '"회원가입 버튼"'
      case 'email':
        return '"이메일"'
      default:
        return '알 수 없는 이름'
    }
  })
}
