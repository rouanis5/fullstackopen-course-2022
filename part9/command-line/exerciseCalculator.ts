/* eslint-disable @typescript-eslint/no-unsafe-call */
import { isNotNumber, errorHandler, calculateExercises } from "./utils";

function parseArguments(args: string[]) {
  if (args.length < 4) throw new Error('Not enough arguments');
  const [,,firstParam,...restParams] = process.argv;

  if(!isNotNumber(firstParam) && !restParams.find(param => isNotNumber(param))) {
    return {
      target: Number(firstParam),
      hoursPerDay: restParams.map(param => Number(param))
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

errorHandler(() => {
  const { target, hoursPerDay } = parseArguments(process.argv);
  console.log(calculateExercises(hoursPerDay, target));
});
