// add event binding to form element to add cues
const form = document.getElementById("form--search");
form.addEventListener("submit", async e => {
  const body = {
    query: e.target.query.value
  };
  e.preventDefault();
  await fetch("/search", {
    method: "POST",
    body
  });
  e.target.cue.value = "";
});
