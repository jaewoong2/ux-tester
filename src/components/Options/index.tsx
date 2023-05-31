'use client'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { handleChangeOptions, nextCurrent, prevCurrent, setStatus } from '@/store/slices/signupSlice'
import { Button, FormLabel, Input, Radio, RadioGroup } from '@chakra-ui/react'
import React from 'react'

function markdownToHtml(str: string) {
  const boldRegExp = /\*\*(.*?)\*\*/g
  const value = str.split(boldRegExp)

  if (value.length > 1) {
    return (
      <div className='flex gap-1'>
        {value
          .splice(1)
          .map((text, index) => (index % 2 === 0 ? <strong key={text}>{text}</strong> : <p key={text}>{text}</p>))}
      </div>
    )
  }

  return str
}

const Options = () => {
  const { selected, status, currentIndex } = useAppSelector((state) => state.signup)
  const dispatch = useAppDispatch()

  const target = selected[currentIndex]

  if (status !== '설정') return <div />

  return (
    <aside className='absolute right-full top-0 flex w-full max-w-md justify-center p-10'>
      <div className='flex h-fit w-full flex-col gap-2 rounded-xl border px-5 py-10'>
        <h4 className='font-bold'>{target?.content.title} 옵션 설정</h4>
        {target.options?.map((option, index) => (
          <React.Fragment key={option.title + `${index}`}>
            {option.type === 'radio' && (
              <RadioGroup
                onChange={(value) => dispatch(handleChangeOptions({ value, key: option.option }))}
                name='form-name'
                className='flex flex-col gap-2'
                key={`${option.title}-${index}`}
                value={target.form.options[option.option]}
              >
                <h4 className='text-sm font-semibold'>{option.title}</h4>
                {option.values?.map(({ key, value, node }) => (
                  <Radio key={key} value={value} size={'sm'}>
                    {markdownToHtml(node)}
                  </Radio>
                ))}
              </RadioGroup>
            )}
            {option.type === 'input' && (
              <>
                <FormLabel>{option.title}</FormLabel>
                <Input
                  onChange={(e) => dispatch(handleChangeOptions({ value: e.target.value, key: option.option }))}
                  name='form-name'
                  className='flex flex-col gap-2'
                  key={`${option.title}-${index}`}
                  placeholder={option.placeholder}
                  value={target.form.options[option.option]}
                />
              </>
            )}
          </React.Fragment>
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
