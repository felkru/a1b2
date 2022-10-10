<script>
  import { resetLetterStorage } from "./lib/helpers.js";

  let inputValue = null;
  let answer = 0;
  let letter = "?";
  const manual =
    "Guess the number of the letter above. The training is less effective if you count.";
  let feedback = manual;
  let keystrokes = 0;
  // TODO: remeber the last letter and replace letter, when it's identical to the last one

  // return random number between 0 and 25
  function getRandomLetter() {
    return Math.floor(Math.random() * 26);
  }

  // replace the current letter with a new one
  function replaceLetter() {
    answer = getRandomLetter() + 1;
    letter = String.fromCharCode(96 + answer);
    console.log(answer + letter);
    feedback = manual;
    inputValue = null;
    keystrokes = -1;
  }

  // check if the input value is correct and provide appropriate feedback
  function checkAnswer(input) {
    // increment keystrokes every time the user changes the input
    keystrokes++;
    // convert input to letter
    let letter = String.fromCharCode(96 + answer);
    // get current knows (first tries in a row)
    // knows are saved in local storage, by the key of their letter
    let currentKnows = Number(localStorage.getItem(letter));
    let updatedKnows = currentKnows;
    if (currentKnows > 3) {
      replaceLetter();
    }
    if (input === answer) {
      // when the user guesses correctly tell him so
      feedback = "✅";
      // check if user did it first try, if so add 1 to its knows & tell him, if not reset knows to 0
      if (keystrokes === 1 && answer < 10) {
        feedback = "First try 🎉";
        updatedKnows++;
        localStorage.setItem(letter, updatedKnows.toString());
      } else if (keystrokes < 3 && answer > 9) {
        feedback = "First try 🎉";
        updatedKnows++;
        localStorage.setItem(letter, updatedKnows.toString());
      } else {
        localStorage.setItem(letter, "0");
      }
      console.log(localStorage);
      // after half a second replace the letter with a new one
      setTimeout(replaceLetter, 500);
    } else if (input == null) {
      feedback = manual;
    } else if (input > answer) {
      feedback = "➖";
    } else if (input < answer) {
      feedback = "➕";
    }
  }

  // provide the user with a manual to understand the game
  function showAlert() {
    alert(
      "This game is meant to help you navigate dictionaries more effectively. Every letter of the alphabet is assosiated with a number (a=1, b=2, c=...). By learning theses numbers you can compare the number of the letter you are searching for to the number of the current letter. By closing this popup you agree to the permanent storage of game data in the browsers local Storage. This is needed so that you do not train letters you already know."
    );
    localStorage.setItem("showAlert", "false");
  }

  console.log(localStorage);
  if (localStorage.getItem("showAlert") === null) {
    showAlert();
  }
  replaceLetter();
  // check answer every time the number input changes
  $: checkAnswer(inputValue);
</script>

<main>
  <h1>{letter.toLocaleUpperCase()}</h1>

  <input id="numput" type="number" bind:value={inputValue} min="1" max="26" />

  <p>{feedback}</p>

  <button id="instructionsButton" on:click={showAlert}
    >revisit instructions</button
  >
  <button id="resetButton" on:click={resetLetterStorage}>reset game</button>
</main>

<style>
  h1 {
    margin: 0;
  }

  #numput {
    padding: 1rem;
    font-size: 2rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  #resetButton {
    position: fixed;
    bottom: 5px;
    right: 5px;
  }

  #instructionsButton {
    position: fixed;
    bottom: 5px;
    left: 5px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  /* styles for tablet and desktop */
  @media (min-width: 768px) {
    h1 {
      font-size: 10rem;
    }

    p {
      font-size: 3rem;
      line-height: normal;
    }

    #numput {
      font-size: 5rem;
    }
  }
</style>
