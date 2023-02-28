import { CourseEntry } from '../types'

const Content = ({ courses }: { courses: CourseEntry[] }) => {
  return (
    <div>
      {courses.map(({ name, exerciseCount }) => (
        <p key={name}>
          {name} {exerciseCount}
        </p>
      ))}
    </div>
  )
}

export default Content
