<script>
  import { get_all_dirty_from_scope } from "svelte/internal";
  import { resetLetterStorage } from "./lib/helpers.js";
  import Modal from "./lib/Modal.svelte";

  let inputValue = null;
  let answer = 0;
  let letter = "?";
  const manual =
    "Guess the number of the letter above. The training is less effective if you count.";
  let feedback = manual;
  let keystrokes = 0;
  let lastLetter;
  let displayModal;

  // return random number between 0 and 25
  function getRandomLetNum() {
    return Math.floor(Math.random() * 26);
  }

  // replace the current letter with a new one
  function replaceLetter() {
    console.groupEnd();
    answer = getRandomLetNum() + 1;
    lastLetter = letter;
    letter = String.fromCharCode(96 + answer);
    console.group(answer, letter);
    feedback = manual;
    // account for the change in input value in the next line, which triggers keystrokes to be incremented to 0
    keystrokes = -1;
    inputValue = null;
  }

  // check if the input value is correct and provide appropriate feedback
  function checkAnswer(input) {
    // increment keystrokes every time the user changes the input
    keystrokes++;
    console.log(keystrokes);
    // convert input to letter
    let letter = String.fromCharCode(96 + answer);
    // get current knows (first tries in a row)
    // knows are saved in local storage, by the key of their letter
    let currentKnows = Number(localStorage.getItem(letter));
    let updatedKnows = currentKnows;
    if (currentKnows >= 3 || lastLetter === letter) {
      replaceLetter();
      console.warn("replaced letter", currentKnows, lastLetter, letter);
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

  function openModal() {
    displayModal = true;
  }

  console.log(localStorage);
  if (localStorage.getItem("showAlert") !== "false") {
    displayModal = true;
  }
  replaceLetter();
  // check answer every time the number input changes
  $: checkAnswer(inputValue);
</script>

<Modal buttonText="OK" {displayModal}>
  <h1 slot="header">Alphabet Trainer</h1>
  <p>
    This game is meant to help you navigate dictionaries more effectively. Every
    letter of the alphabet is assosiated with a number (a=1, b=2, c=...). By
    learning these numbers you can compare the number of the letter you are
    searching for to the number of the current letter. <br /> By closing this
    popup, you agree to the permanent storage of game data in the browser's
    local storage. This is needed so that you do not train letters you already
    know. If you like the concept, feel free to check out the
    <a href="https://home.in.tum.de/~obermeis/alphabet.html">Alphabet Trainer</a
    > by Stefan Obermeier!
  </p>
</Modal>
<main>
  <h2>{letter.toLocaleUpperCase()}</h2>

  <input id="numput" type="number" bind:value={inputValue} min="1" max="26" />

  <p id="feedback">{feedback}</p>

  <button id="instructionsButton" on:click={openModal}
    >revisit instructions</button
  >
  <button id="resetButton" on:click={resetLetterStorage}>reset game</button>
</main>

<style>
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 3.2em;
    line-height: 1.1;
    margin-bottom: 0;
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
    h2 {
      font-size: 8rem;
    }

    #feedback {
      font-size: 2rem;
      line-height: normal;
    }

    #numput {
      font-size: 4rem;
    }
  }
</style>
