import { isNotNumber, errorHandler } from "./utils";

/**
 * calculates a BMI based on a given height 
 * (in centimeters) and weight (in kilograms) 
 * and then returns a message that suits the results.
 *  */

export default function calculateBmi(height: number, weight: number) {
  if (height === 0) throw new Error('Provided height is 0!');
  const bmi = weight / (height / 100) ** 2;
  if (bmi >= 30) return 'Obese';
  if (bmi >= 25) return 'Overweight';
  if (bmi >= 18.5) return 'Normal (healthy weight)';
  return 'underweight';
}

function parseArguments(args: string[]) {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('too many arguments');

  const [,,height, weight] = process.argv;

  if(!isNotNumber(height) && !isNotNumber(weight)) {
    return {
      height: Number(height),
      weight: Number(weight)
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

errorHandler(() => {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
});
