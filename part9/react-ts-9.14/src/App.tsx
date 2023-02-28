import { courseParts, courseName } from './data/courses'
import Header from './components/Header'
import Content from './components/Content'
import Total from './components/Total'

const App = () => {
  return (
    <div>
      <Header name={courseName} />
      <Content courses={courseParts} />
      <Total courses={courseParts} />
    </div>
  )
}

export default App
