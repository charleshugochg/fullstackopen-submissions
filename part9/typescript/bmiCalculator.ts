interface WeightHeight {
  weight: number,
  height: number
}

const anyNaN = (strings: Array<string>): boolean => strings.reduce((a, s) => {
  return a || isNaN(
    Number(s)
  )
}, false)

const parseWeightHeight = (args: Array<string>): WeightHeight=> {
  if (args.length < 2) throw new Error('not enough arguments');
  if (args.length > 2) throw new Error('too many arguments');
  if (anyNaN(args)) throw new Error('provided values were not numbers');
  return {
    weight: Number(args[0]),
    height: Number(args[1])
  }
}

const bmiCalculator = (weight: number, heightInCm: number): string => {
  const heightInM = heightInCm / 100;
  const bmi = weight/Math.pow(heightInM, 2);
  switch (true) {
    case bmi < 25:
      return 'Normal (Healthy weight)';
    case bmi >= 25 && bmi <= 29:
      return 'Overweight';
    case bmi > 29:
      return 'Obese';
    default:
      return '';
  }
}

try {
  const args = process.argv.filter((_a,i) => i > 1)
  const { weight, height } = parseWeightHeight(args)
  console.log(bmiCalculator(weight, height))
} catch (err) {
  console.error('Opps, something bad happend, message: ', err.message)
}

export default bmiCalculator
