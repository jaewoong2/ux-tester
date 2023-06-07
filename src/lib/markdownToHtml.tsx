export default function markdownToHtml(str: string) {
  const boldRegExp = /\*\*(.*?)\*\*/g
  const value = str.split(boldRegExp)

  if (value.length > 1) {
    return (
      <div className='flex'>
        {value
          .splice(1)
          .map((text, index) => (index % 2 === 0 ? <strong key={text}>{text}</strong> : <p key={text}>{text}</p>))}
      </div>
    )
  }

  return str
}
