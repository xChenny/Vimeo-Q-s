class Player {
  constructor(id, width, loop) {
    this.seconds = -1;
    this.cues = {};
    this.player = new Vimeo.Player("player", { id, width, loop });
    this.player.on("timeupdate", timeObject => this.showCue(timeObject));
  }

  showCue(timeObject) {
    const currTime = Math.floor(timeObject["seconds"]);
    // only check for updates once per second
    if (currTime !== this.seconds) {
      // check if there's an old cue
      const oldCue = document.getElementById("cue--background");
      if (oldCue) {
        console.log("removing old cue...");
        oldCue.remove();
      }

      this.seconds = currTime;
      console.log(currTime);
      if (currTime in this.cues) {
        // console.log(this.cues[currTime]);
        console.log("creating a new cue");
        const cue = createCueElement(this.cues[currTime]);
        cue.id = "cue--background";
        document.body.appendChild(cue);
      }
    }
  }

  async addCue(value) {
    const currTime = await this.player.getCurrentTime();
    const time = Math.ceil(currTime);
    this.cues[time] = value;
  }
}

/**
 * Creates the html for cues to be appended to the player
 * @param {string} content: the string you want to go inside of the video's cue
 */
const createCueElement = content => {
  let cue = document.createElement("div", { id: "cue--background" });
  const text = document.createTextNode(content);
  cue.appendChild(text);
  return cue;
};

// create the player class object
const p = new Player(59777392, 640, true);
// add event binding to form element to add cues
const form = document.getElementById("form--cue");
form.addEventListener("submit", e => {
  e.preventDefault();
  p.addCue(e.target.cue.value);
  e.target.cue.value = "";
});
