<script>
  import { resetLetterStorage } from "./lib/helpers.js";

  let inputValue = null;
  let randomNum = 0;
  let letter = "?";
  const manual =
    "Guess the number of the letter above. The training is less effective if you count.";
  let feedback = manual;
  let tries = 0;

  // return random number between 0 and 25
  function getRandomLetter() {
    return Math.floor(Math.random() * 26);
  }

  // replace the current letter with a new one
  function replaceLetter() {
    randomNum = getRandomLetter() + 1;
    letter = String.fromCharCode(96 + randomNum);
    console.log(randomNum + letter);
    feedback = manual;
    inputValue = null;
    tries = 0;
  }

  // check if the input value is correct and provide appropriate feedback
  function checkAnswer(input) {
    // increment tries every time the user submits an answer
    tries++;
    // convert input to letter
    let letter = String.fromCharCode(96 + randomNum);
    let currentKnows = Number(localStorage.getItem(letter));
    let updatedKnows = currentKnows;
    if (currentKnows > 3) {
      replaceLetter();
    }
    if (input === randomNum) {
      // when the user guesses correctly tell him so
      feedback = "✅";
      // check if user did it first try, if so add 1 to its knows in localstorage
      if (tries === 1 && randomNum < 10) {
        updatedKnows++;
        localStorage.setItem(letter, updatedKnows.toString());
      } else if (tries < 3 && randomNum < 9) {
        updatedKnows++;
        localStorage.setItem(letter, updatedKnows.toString());
      }
      // after half a second replace the letter with a new one
      setTimeout(replaceLetter, 500);
    } else if (input == null) {
      feedback = manual;
    } else if (input > randomNum) {
      feedback = "➖";
    } else if (input < randomNum) {
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
    alert(
      "This game is meant to help you navigate dictionaries more effectively. Every letter of the alphabet is assosiated with a number (a=1, b=2, c=...). By learning theses numbers you can compare the number of the letter you are searching for to the number of the current letter. By closing this popup you agree to the permanent storage of game data in the browsers local Storage. This is needed so that you do not train letters you already know."
    );
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
</style>
