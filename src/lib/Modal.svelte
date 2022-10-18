<script>
  export let buttonText = "Close";
  export let displayModal = true;
  $: displayValue = displayModal ? "block" : "none";
  $: console.log(displayValue);

  function close() {
    displayModal = false;
    localStorage.setItem("showAlert", "false");
  }
</script>

<div
  id="modal-background"
  style:displayModal="display: none;"
  on:click={close}
  style="display: {displayValue};"
/>

<div
  id="modal"
  role="dialog"
  style:displayModal="display: none;"
  aria-modal="true"
  style="display: {displayValue};"
>
  <slot name="header" />
  <slot />

  <button on:click={close}>{buttonText}</button>
</div>

<style>
  #modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: white;
    background: rgba(0, 0, 0, 0.3);
    z-index: 100;
  }

  #modal {
    position: absolute;
    left: 50%;
    top: 50%;
    width: calc(100vw - 4em);
    max-width: 32em;
    max-height: calc(100vh - 4em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    border-radius: 0.2em;
    background: #242424;
    text-align: center;
    z-index: 200;
  }

  button {
    display: block;
    width: 100%;
  }
</style>
