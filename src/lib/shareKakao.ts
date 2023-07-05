import { BASEURL, IMAGE } from '@/constants'

export const shareKakao = (options?: {
  route?: string
  title?: string
  description?: string
  imageUrl?: string
  width?: number
  height?: number
}) => {
  // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
  if (window && 'Kakao' in window) {
    const kakao = window.Kakao as any
    if (!kakao.isInitialized()) {
      kakao.init(process.env.NEXT_PUBLIC_SHARE_KAKAO_LINK_KEY)
    }

    kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: options?.title ? options?.title : '회원가입 UX 테스트',
        description: options?.description ?? '| 회원가입 UX 테스트를 해보세요!',
        imageUrl: options?.imageUrl ? options?.imageUrl : IMAGE.thumbnail,
        link: {
          mobileWebUrl: options?.route ? BASEURL + '/' + options?.route : BASEURL,
          webUrl: options?.route ? BASEURL + '/' + options?.route : BASEURL,
        },
        imageWidth: options?.width ? options.width : 800,
        imageHeight: options?.height ? options.height : 400,
      },
      buttons: [
        {
          title: 'UX 테스트 하러가기',
          link: {
            mobileWebUrl: options?.route ? BASEURL + '/' + options?.route : BASEURL,
            webUrl: options?.route ? BASEURL + '/' + options?.route : BASEURL,
          },
        },
      ],
    })
  }
}
