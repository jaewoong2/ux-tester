'use client'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { nextCurrent, prevCurrent, setStatus } from '@/store/slices/signupSlice'
import { Button, FormLabel, Input, Radio, RadioGroup } from '@chakra-ui/react'
import React from 'react'

const Options = () => {
  const { selected, status, currentIndex } = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()

  const target = selected[currentIndex]

  if (status !== '설정') return <div />

  return (
    <aside className='absolute right-full top-0 flex w-full max-w-md justify-center p-10'>
      <div className='flex h-fit w-full flex-col gap-2 rounded-xl border px-5 py-10'>
        <h4 className='font-bold'>{target?.content.title} 옵션 설정</h4>
        {target.options.map((option, index) => (
          <>
            {option.type === 'radio' && (
              <RadioGroup
                name='form-name'
                className='flex flex-col gap-2'
                key={`${option.title}-${index}`}
                value={target.form.options[option.option]}
              >
                <h4 className='text-sm font-semibold'>{option.title}</h4>
                {option.values?.map(({ key, value, node }) => (
                  <Radio key={key} value={value} size={'sm'}>
                    {node}
                  </Radio>
                ))}
              </RadioGroup>
            )}
            {option.type === 'input' && (
              <>
                <FormLabel>{option.title}</FormLabel>
                <Input
                  name='form-name'
                  className='flex flex-col gap-2'
                  key={`${option.title}-${index}`}
                  value={target.form.options[option.option]}
                />
              </>
            )}
          </>
        ))}
        <div className='flex w-full gap-4'>
          {currentIndex > 0 && (
            <Button colorScheme='blue' className='mt-10 w-full bg-blue-600' onClick={() => dispatch(prevCurrent())}>
              이전
            </Button>
          )}
          {currentIndex < selected.length - 1 && (
            <Button colorScheme='blue' className='mt-10 w-full bg-blue-600' onClick={() => dispatch(nextCurrent())}>
              다음
            </Button>
          )}
          {currentIndex === selected.length - 1 && (
            <Button
              colorScheme='blackAlpha'
              className='mt-10 w-full bg-stone-400'
              onClick={() => dispatch(setStatus({ status: '완료' }))}
            >
              확인
            </Button>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Options
