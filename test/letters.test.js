function randomBetween0and25() {
  return Math.floor(Math.random() * 26);
}

function getRandomLetter() {
  let randomNum = randomBetween0and25() + 1;
  let character = String.fromCharCode(96 + randomNum);
  return [character, randomNum];
}

describe("Letter Test", () => {
  // repeat getRandomLetter x times and write the result to an array
  let alphabet = [];
  let repetitions = 100;
  let sumOfLetters = 0;
  for (let i = 0; i < repetitions; i++) {
    alphabet.push(getRandomLetter()[0]);
    sumOfLetters += getRandomLetter()[1];
  }
  // check if the array contains all letters of the alphabet
  let alphabetString = alphabet.join("");

  it("gives back only and all letters of the alphabet", () => {
    // expect only all alphabetical characters to be present
    expect(alphabetString).toMatch(/(?=.*a)/);
    expect(alphabetString).toMatch(/(?=.*b)/);
    expect(alphabetString).toMatch(/(?=.*c)/);
    expect(alphabetString).toMatch(/(?=.*d)/);
    expect(alphabetString).toMatch(/(?=.*e)/);
    expect(alphabetString).toMatch(/(?=.*f)/);
    expect(alphabetString).toMatch(/(?=.*g)/);
    expect(alphabetString).toMatch(/(?=.*h)/);
    expect(alphabetString).toMatch(/(?=.*i)/);
    expect(alphabetString).toMatch(/(?=.*j)/);
    expect(alphabetString).toMatch(/(?=.*k)/);
    expect(alphabetString).toMatch(/(?=.*l)/);
    expect(alphabetString).toMatch(/(?=.*m)/);
    expect(alphabetString).toMatch(/(?=.*n)/);
    expect(alphabetString).toMatch(/(?=.*o)/);
    expect(alphabetString).toMatch(/(?=.*p)/);
    expect(alphabetString).toMatch(/(?=.*q)/);
    expect(alphabetString).toMatch(/(?=.*r)/);
    expect(alphabetString).toMatch(/(?=.*s)/);
    expect(alphabetString).toMatch(/(?=.*t)/);
    expect(alphabetString).toMatch(/(?=.*u)/);
    expect(alphabetString).toMatch(/(?=.*v)/);
    expect(alphabetString).toMatch(/(?=.*w)/);
    expect(alphabetString).toMatch(/(?=.*x)/);
    expect(alphabetString).toMatch(/(?=.*y)/);
    expect(alphabetString).toMatch(/(?=.*z)/);
    expect(alphabetString).not.toMatch(/(?=.*`)/);
    expect(alphabetString).not.toMatch(/(?=.*{)/);
    expect(alphabetString).not.toMatch(/(?=.*![a-z])/);
  });

  it("gives back the letters with uniform distribution", () => {
    let averageLetter = sumOfLetters / repetitions;
    expect(averageLetter).toBeGreaterThan(13);
    expect(averageLetter).toBeLessThan(14);
  });
});
