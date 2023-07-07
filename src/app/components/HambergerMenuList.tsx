import React from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react'
import { shareKakao } from '@/lib/shareKakao'
import { BASEURL, IMAGE, METADATA } from '@/constants'
import KakaoIcon from '../[key]/components/Icons/KakaoIcon'
import { useCopyToClipboard } from '../result/[jsonId]/hooks/useCopyToClipboard'

const HambergerMenuList = () => {
  const copy = useCopyToClipboard()
  const toast = useToast()

  const handleShareButton = () => {
    copy(BASEURL)
    toast({ title: '링크 주소가 복사 되었습니다.', variant: 'solid' })
  }

  return (
    <Menu>
      <MenuButton transition='all 0.2s'>
        <HamburgerIcon />
      </MenuButton>
      <MenuList>
        <MenuItem className='transition-colors hover:bg-gray-100' onClick={handleShareButton}>
          공유하기
        </MenuItem>
        <MenuItem
          className='gap-2 transition-colors hover:bg-gray-100'
          onClick={() =>
            shareKakao({
              imageUrl: IMAGE.thumbnail,
              title: `${METADATA.title}`,
              description: `${METADATA.description}`,
              width: 192,
              height: 192,
            })
          }
        >
          <div className='rounded-full bg-yellow-500 p-1'>
            <KakaoIcon className='h-4 w-4 text-blue-400' />
          </div>
          카카오톡 공유하기
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

export default HambergerMenuList
