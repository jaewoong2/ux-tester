import Form from '@/components/Contents/Form'
import CheckIcon from '@/components/Icons/CheckIcon'
import SimpleCircleIcon from '@/components/Icons/SimpleCircleIcon'
import { useAppSelector } from '@/store/hooks'
import React from 'react'

const OptionSetting = () => {
  const { selected, currentIndex } = useAppSelector((state) => state.signup)

  return (
    <>
      <h2 className='p-5 text-lg font-semibold'>회원가입</h2>
      {selected.map((item, index) => (
        <div className={'relative flex items-center overflow-hidden rounded-xl px-2'} key={item.id}>
          <div className='flex w-9 items-center justify-center px-1'>
            {currentIndex === index && <SimpleCircleIcon className=' h-5 w-5 fill-[#7ac142]' />}
            {currentIndex !== index && <CheckIcon className='h-5 w-5' isSuccess={currentIndex > index} />}
          </div>
          <form className='w-full'>
            <Form
              className='px-4'
              label={item.title ?? ''}
              type={item.type ?? 'text'}
              options={item.optionValue ?? {}}
              index={index}
            />
          </form>
        </div>
      ))}
    </>
  )
}

export default OptionSetting
