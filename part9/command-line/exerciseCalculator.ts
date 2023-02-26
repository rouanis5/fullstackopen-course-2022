interface lakaka {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

type rateInterface = 1 | 2 | 3
function rate(target: number, average: number):rateInterface {
  if(average >= target) return 3
  if(average >= target * .5) return 2
  return 1
}

const describeRating = (rating: rateInterface):string => {
  switch (rating) {
    case 1:
      return 'you failed'
    case 2:
      return 'not too bad but could be better'
    case 3:
      return 'goal achieved'
  }
}

function calculateExercises(hoursPerDay: number[], target: number): lakaka {
  const periodLength = hoursPerDay.length
  const trainingDays = hoursPerDay.filter(day => day !== 0 ).length
  const totalHours = hoursPerDay.reduce((a,b) => a + b , 0)
  const average = totalHours / periodLength
  const success = average >= target 
  const rating = rate(target, average)
  const ratingDescription = describeRating(rating)
  
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
