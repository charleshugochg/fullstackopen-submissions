interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Arguments {
  dailyHours: Array<number>;
  target: number;
}

const anyNaN = (strings: Array<string>): boolean => strings.reduce((a, s) => {
  return a || isNaN(
    Number(s)
  );
}, false);

const parseArguments = (args: Array<string>): Arguments => {
  if (args.length < 2) throw new Error('not enough arguments');
  if (anyNaN(args)) throw new Error('provided values were not numbers');
  return {
    dailyHours: args.filter((_a, i) => i > 0).map(a => Number(a)),
    target: Number(args[0])
  };
};

const calculateExercises = (dailyHours: Array<number>, target: number): Result => {
  const average = dailyHours.reduce((a, h) => a + h)/dailyHours.length;
  const rating = average >= target ? 3 : (average >= target - 1 ? 2 : 1);
  const ratingDescription = rating === 3 ? 'the best' : ( rating === 2 ? 'not bad but should better' : 'poor loser');

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter(h => h !== 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const args = process.argv.filter((_a, i) => i > 1);
  const { dailyHours, target } = parseArguments(args);
  console.log(calculateExercises(dailyHours, target));
} catch (err) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.error('Opps, something bad happened, message: ', err.message);
}

export default calculateExercises;
