function predictSnowfall(temperatures, humidity) {
  const avgTemp = temperatures.reduce((a, b) => a + b, 0) / temperatures.length;
  const probability = (avgTemp < 0 ? 35 : 0) + (humidity > 80 ? 40 : 0);
  const willSnow = probability > 70;

  return {
    willSnow: willSnow,
    probability: probability,
    expectedDepth: willSnow
      ? Math.round(((100 - avgTemp) * humidity) / 100)
      : 0,
  };
}

let prediction1 = predictSnowfall(
  [
    -6.8, -7.1, -6.9, -6.2, -5.4, -4.8, -4.1, -3.9, -3.5, -3.2, -3.0, -3.3,
    -3.7, -4.2, -4.9, -5.3, -5.8, -6.2, -6.5, -6.8, -7.0, -7.2, -7.1, -6.9,
  ],
  88,
);

let prediction2 = predictSnowfall(
  [
    -1.5, -1.3, -1.0, -0.8, -0.7, -0.9, -1.2, -1.4, -1.7, -2.0, -2.2, -2.4,
    -2.5, -2.3, -2.1, -1.8, -1.6, -1.4, -1.3, -1.5, -1.8, -2.1, -2.3, -2.4,
  ],
  60,
);
console.log(prediction1); //output: { willSnow: true, probability: 75, expectedDepth: 93 }
console.log(prediction2); // output: { willSnow: false, probability: 35, expectedDepth: 0 }
