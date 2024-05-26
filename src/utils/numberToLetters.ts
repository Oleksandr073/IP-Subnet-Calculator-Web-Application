export const numberToLetters = (num: number) => {
  let i = num;
  let letters = '';
  while (i > 0) {
    i = i - 1;
    const remainder = i % 26;
    letters = String.fromCharCode(65 + remainder) + letters;
    i = Math.floor(i / 26);
  }
  return letters;
};
