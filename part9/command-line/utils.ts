export const isNotNumber = (argument: unknown): boolean =>
  isNaN(Number(argument));

export const errorHandler = (callback: () => void) => {
  try {
    callback();
  } catch (error: unknown) {
    let msg = 'something went wrong';
    if (error instanceof Error) {
      msg += ` Error: ${error.message}`;
    }
    console.error(msg);
  }
};

interface exercisesReport {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

type rateInterface = 1 | 2 | 3;
function rate(target: number, average: number):rateInterface {
  if(average >= target) return 3;
  if(average >= target * .5) return 2;
  return 1;
}

const describeRating = (rating: rateInterface):string => {
  switch (rating) {
    case 1:
      return 'you failed';
    case 2:
      return 'not too bad but could be better';
    case 3:
      return 'goal achieved';
  }
};

export function calculateExercises(hoursPerDay: number[], target: number): exercisesReport {
  const periodLength = hoursPerDay.length;
  const trainingDays = hoursPerDay.filter(day => day !== 0 ).length;
  const totalHours = hoursPerDay.reduce((a,b) => a + b , 0);
  const average = totalHours / periodLength;
  const success = average >= target; 
  const rating = rate(target, average);
  const ratingDescription = describeRating(rating);
  
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
}

/**
 * calculates a BMI based on a given height 
 * (in centimeters) and weight (in kilograms) 
 * and then returns a message that suits the results.
 *  */

export function calculateBmi(height: number, weight: number) {
  if (height === 0) throw new Error('Provided height is 0!');
  const bmi = weight / (height / 100) ** 2;
  if (bmi >= 30) return 'Obese';
  if (bmi >= 25) return 'Overweight';
  if (bmi >= 18.5) return 'Normal (healthy weight)';
  return 'underweight';
}
