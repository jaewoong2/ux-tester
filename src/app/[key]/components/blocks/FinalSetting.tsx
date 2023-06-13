import React from 'react'
import Form from '@/app/[key]/components/Contents/Form'
import { FaArrowLeft } from 'react-icons/fa'
import useSignupForm from '../../hooks/useSignupForm'

const FinalSetting = () => {
  const { selected, handlePrevButton, handleSubmit } = useSignupForm()

  return (
    <>
      <span className='pl-5'>
        <FaArrowLeft className=' text-xl' onClick={handlePrevButton} cursor={'pointer'} />
      </span>
      <h2 className='p-5 text-lg font-semibold'>회원가입</h2>
      <form className='w-full' id='signup' onSubmit={handleSubmit}>
        {selected.map((item, index) => (
          <div className={'relative flex items-center overflow-hidden rounded-xl px-2'} key={item.id}>
            <Form
              className='px-4'
              label={item.title ?? ''}
              type={item.type ?? 'text'}
              itemKey={item.itemKey}
              options={item.optionValue ?? {}}
              index={index}
            />
          </div>
        ))}
      </form>
    </>
  )
}

export default FinalSetting
