// create the player class object
const p = new Player(59777392, 640, true, 5);
// add event binding to form element to add cues
const form = document.getElementById("form--cue");
form.addEventListener("submit", e => {
  e.preventDefault();
  p.addCue(e.target.cue.value);
  e.target.cue.value = "";
});
