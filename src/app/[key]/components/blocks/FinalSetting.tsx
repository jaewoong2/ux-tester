import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@chakra-ui/react'

import Form from '../../components/contents/Form'
import useSignupForm from '../../hooks/useSignupForm'

const FinalSetting = () => {
  const { selected, handleSubmit } = useSignupForm()
  const navigator = useRouter()

  return (
    <section className='flex h-full w-full flex-col justify-between'>
      <div>
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
      </div>
      <div className='flex w-full items-center justify-center border-t-2 border-black p-4'>
        <Button onClick={() => navigator.back()} className='border-2 border-black bg-slate-200 p-6'>
          결과보기
        </Button>
      </div>
    </section>
  )
}

export default FinalSetting
