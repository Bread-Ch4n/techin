const morseCodeMap = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  0: "-----",
  " ": "/",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  _: "..--.-",
  '"': ".-..-.",
  $: "...-..-",
  "@": ".--.-.",
};

const elfMorse = (text) =>
  text
    .toUpperCase()
    .split("")
    .map((char) => {
      return morseCodeMap[char] || "";
    })
    .join(" ")
    .replaceAll(".", "ho ")
    .replaceAll("-", "hoho ");

const reverseMorseCodeMap = Object.fromEntries(
  Object.entries(morseCodeMap).map(([char, morse]) => [morse, char]),
);

function undoElfMorse(elfMorse) {
  const morseCode = elfMorse
    .replaceAll("hoho ", "-")
    .replaceAll("ho ", ".")
    .replace(/ {2,}/g, " / ")
    .trim();

  return morseCode
    .split(" ")
    .map((morse) => reverseMorseCodeMap[morse] || "")
    .join("")
    .replace(/\//g, " ");
}

const elfMorseResult = elfMorse("MERRY");
console.log(elfMorseResult);
console.log(undoElfMorse(elfMorseResult));
