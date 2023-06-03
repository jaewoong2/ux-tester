import React from 'react'

type Props = {}

const Contents = (props: Props) => {
  return (
    <>
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
        </React.Fragment>
      ))}
    </>
  )
}

export default Contents
