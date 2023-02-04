const URLs = {
  fullstackopen: 'https://fullstackopen.com/',
  sourceCode: 'https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'
}

const Footer = () => {
  return (
    <div>
      Anecdote app for <a href={URLs.fullstackopen}>Full Stack Open</a>.
      See <a href={URLs.sourceCode}>{URLs.sourceCode}</a> for the source code.
    </div>
  )
}

export default Footer
