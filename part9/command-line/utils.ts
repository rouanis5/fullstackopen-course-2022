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
