export default function markdownToHtml(str: string) {
  const boldRegExp = /\*\*(.*?)\*\*/g
  const value = str.split(boldRegExp)

  if (value.length > 1) {
    return (
      <span className='flex'>
        {value.splice(1).map((text, index) =>
          index % 2 === 0 ? (
            <span className='w-fit font-bold' key={text}>
              {text}
            </span>
          ) : (
            <span key={text}>{text}</span>
          )
        )}
      </span>
    )
  }

  return str
}
