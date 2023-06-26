import { Metadata } from 'next'

export const BASEURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''

export const IMAGE = {
  fox: 'https://ndavhlqivyieuaehsnne.supabase.co/storage/v1/object/public/image/fox.png',
  penguin: 'https://ndavhlqivyieuaehsnne.supabase.co/storage/v1/object/public/image/penguin.png',
  cat: 'https://ndavhlqivyieuaehsnne.supabase.co/storage/v1/object/public/image/cat.png',
  bad: 'https://ndavhlqivyieuaehsnne.supabase.co/storage/v1/object/public/image/bad.png',
  munji: 'https://ndavhlqivyieuaehsnne.supabase.co/storage/v1/object/public/image/munji.png',
  heart: 'https://ndavhlqivyieuaehsnne.supabase.co/storage/v1/object/public/image/heart.gif',
  banner: 'https://ndavhlqivyieuaehsnne.supabase.co/storage/v1/object/public/image/banner.png',
  good: 'https://ndavhlqivyieuaehsnne.supabase.co/storage/v1/object/public/image/good.png',
  star: 'https://ndavhlqivyieuaehsnne.supabase.co/storage/v1/object/public/image/star.png',
}

export const METADATA: Metadata = {
  generator: 'Next.js',
  applicationName: '회원가입 UX 테스트',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'UI/UX'],
  authors: [{ name: '@jaewoong2', url: 'https://github.com/jaewoong2/ux-tester' }],
  creator: '@jaewoong2',
  title: '나의 회원가입 UX 테스트',
  description: '나만의 회원가입 UX 를 만들고 점수를 확인 해보세요 :)',
  openGraph: {
    title: '나만의 회원가입 UX 테스트',
    description: '나만의 회원가입 UX 를 만들고 점수를 확인 해보세요 :)',
    images: 'https://ndavhlqivyieuaehsnne.supabase.co/storage/v1/object/public/image/thumbnail.png',
  },
  twitter: {
    card: 'summary_large_image',
    images: 'https://ndavhlqivyieuaehsnne.supabase.co/storage/v1/object/public/image/thumbnail.png',
    site: '',
    title: '나만의 회원가입 UX 테스트',
    description: '나만의 회원가입 UX 를 만들고 점수를 확인 해보세요 :)',
  },
}
