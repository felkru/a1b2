<script>
  let inputValue = null;
  let randomNum = 0;
  let letter = "?";
  const manual =
    "Guess the number of the letter above. The training is less effective if you count.";
  let feedback = manual;

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
  }

  // check if the input value is correct and provide appropriate feedback
  function checkAnswer(input) {
    // convert number to letter
    let letter = String.fromCharCode(96 + randomNum);
    let currentCount = Number(localStorage.getItem(letter));
    let updatedCount = currentCount;
    if (currentCount > 3) {
      replaceLetter();
    }
    localStorage.setItem(letter, updatedCount.toString());
    if (input === randomNum) {
      feedback = "✅";
      updatedCount++;
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
      "This game is meant to help you navigate dictionaries more effectively. Every letter of the alphabet is assosiated with a number (a=1, b=2, c=...). By learning theses numbers you can compare the number of the letter you are searching for to the number of the current letter."
    );
  }

  showAlert();
  replaceLetter();
  // check answer every time the number input changes
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
