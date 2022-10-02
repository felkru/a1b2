<script>
  import svelteLogo from "./assets/svelte.svg";
  import Counter from "./lib/Counter.svelte";

  let inputValue = null;
  let randomNum = 0;
  let letter = "?";
  const manual =
    "Guess the number of the letter above. The training is less effective if you count.";
  let feedback = manual;

  function getRandomLetter(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function replaceLetter() {
    randomNum = getRandomLetter(1, 27);
    letter = String.fromCharCode(96 + randomNum);
    console.log(randomNum + letter);
    feedback = manual;
  }

  function checkAnswer(input) {
    if (input === randomNum) {
      feedback = "✅";
      setTimeout(replaceLetter, 500);
    } else if (input == null) {
      feedback = manual;
    } else if (input > randomNum) {
      feedback = "➖";
    } else if (input < randomNum) {
      feedback = "➕";
    }
  }

  function showAlert() {
    alert(
      "This game is meant to help you navigate dictionaries more effectively. Every letter of the alphabet is assosiated with a number (a=1, b=2, c=...). By learning theses numbers you can compare the number of the letter you are searching for to the number of the current letter."
    );
  }

  showAlert();
  replaceLetter();
  $: checkAnswer(inputValue);
</script>

<main>
  <h1>{letter.toLocaleUpperCase()}</h1>

  <input id="numput" type="number" bind:value={inputValue} min="1" max="26" />

  <p>{feedback}</p>
</main>

<style>
  h1 {
    margin: 0;
  }

  #numput {
    padding: 1rem;
    font-size: 2rem;
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
