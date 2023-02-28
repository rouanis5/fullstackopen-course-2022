import { CoursePart } from '../types'

const Part = ({ course }: { course: CoursePart }) => {
  const Body = () => {
    switch (course.kind) {
      case 'basic':
        return <>{course.description}</>
      case 'background':
        return (
          <>
            {course.description} <br />
            Submit to {course.backroundMaterial}
          </>
        )
      case 'group':
        return <>Project exercices {course.groupProjectCount}</>
      case 'special':
        return (
          <>
            {course.description} <br />
            Required skills: {course.requirements.join(', ')}
          </>
        )
      default:
        throw new Error(`unknow course kind`)
    }
  }
  return (
    <p>
      <b>
        {course.name} {course.exerciseCount}
      </b>
      <br />
      <Body />
    </p>
  )
}

export default Part
