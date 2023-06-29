'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '@chakra-ui/react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import { RefHandles } from 'react-spring-bottom-sheet/dist/types'
import styled from '@emotion/styled'

import Loading from '../atoms/Loading'
import { useAppSelector } from '../../../../store/hooks'
import OptionBlockContents from './OptionBlockContents'

import 'react-spring-bottom-sheet/dist/style.css'

const OptionBlock = () => {
  const [isMobile] = useMediaQuery('(max-height: 700px)', {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  })
  const { status } = useAppSelector((state) => state.signup)
  const [optionStatus, setOptionStauts] = useState<
    'normal' | 'animate-fade-out-up' | 'hidden' | 'animate-fade-in-down'
  >('normal')
  const ref = useRef<RefHandles>(null)

  useEffect(() => {
    if (status === '결과') {
      setOptionStauts('animate-fade-out-up')

      setTimeout(() => {
        setOptionStauts('hidden')
      }, 500)
    } else {
      setOptionStauts('animate-fade-in-down')
    }
  }, [status])

  useEffect(() => {
    if (!ref.current) return

    if (ref.current?.height <= 1) {
      ref.current.snapTo((state) => state.snapPoints[2])
    }
  }, [ref])

  if (status === '순서' || status === '완료') {
    return null
  }

  return (
    <StyledBottomSheet
      open
      ref={ref}
      className={`mx-auto h-fit w-full ${optionStatus}`}
      blocking={false}
      expandOnContentDrag
      scrollLocking
      defaultSnap={({ maxHeight }) => (isMobile ? maxHeight * 0.5 : maxHeight * 0.4)}
      snapPoints={({ maxHeight }) => [isMobile ? maxHeight * 0.5 : maxHeight * 0.4, 0.5, 40]}
      onSpringEnd={() => {
        if (ref.current && ref.current.height <= 1) {
          ref.current?.snapTo(40)
        }
      }}
    >
      <Suspense fallback={<Loading />}>
        <OptionBlockContents />
      </Suspense>
    </StyledBottomSheet>
  )
}

export default OptionBlock

const StyledBottomSheet = styled(BottomSheet)`
  div[role='dialog'] {
    border: 2px solid black;
    border-bottom: 0px;
  }
`
