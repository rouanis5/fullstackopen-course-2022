import { CoursePart } from '../types'
import Part from './Part'

const Content = ({ courses }: { courses: CoursePart[] }) => {
  return (
    <div>
      {courses.map((course, index) => (
        <Part key={index} course={course} />
      ))}
    </div>
  )
}

export default Content
