/**
 * calculates a BMI based on a given height 
 * (in centimeters) and weight (in kilograms) 
 * and then returns a message that suits the results.
 *  */

function calculateBmi(height: number, weight: number) {
  const bmi: any = weight / (height / 100) ** 2
  if (bmi >= 30) return 'Obese'
  if (bmi >= 25) return 'Overwight'
  if (bmi >= 18.5) return 'Normal (healthy weight)'
  return 'underweight'
}

console.log(calculateBmi(180, 74))

