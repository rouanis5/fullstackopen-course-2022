/* eslint-disable @typescript-eslint/no-unsafe-call */
import { isNotNumber, errorHandler, calculateBmi } from "./utils";

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
