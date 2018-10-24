class Player {
  /**
   * constructor method for the Vimeo Player
   * @param {number} id - vimeo video id
   * @param {number} width - width of player element
   * @param {boolean} loop - whether we want the video to loop
   * @param {number} defaultCueLen - default Cue duration
   */
  constructor(id, width, loop, defaultCueLen) {
    // current time
    this.seconds = -1;

    // data structure that stores cues
    this.cues = {};
    // timer that tells us when a cue is done
    this.cueTimer = 0;
    this.defaultCueLen = defaultCueLen;

    // the player
    this.player = new Vimeo.Player("player", { id, width, loop });
    // player events
    this.player.on("timeupdate", timeObject => this.showCue(timeObject));
    this.player.setVolume(0);
  }

  /**
   * func that runs every timeupdate (only does work when timeupdate is diff from
   * this.seconds
   *
   * checks if a cue within the db matches the current time and appends to the DOM
   * the cue HTML element
   *
   * @param {object} timeObject - the output of the player.getCurrentTime method
   */
  showCue(timeObject) {
    const currTime = Math.floor(timeObject["seconds"]);
    // only check for updates once per second
    if (currTime !== this.seconds) {
      // update timer for any currently active cues
      if (this.timer) {
        this.timer--;
        if (this.timer === 0) {
          // check if there's an old cue and remove it
          const oldCue = document.getElementById("cue--background");
          if (oldCue) oldCue.remove();
        }
      }

      this.seconds = currTime;
      if (currTime in this.cues) {
        // check if there's an active cue and remove it if there is one
        const oldCue = document.getElementById("cue--background");
        if (oldCue) oldCue.remove();

        // replace old cue with new one even if the timer hasn't run out
        const timeObj = this.cues[currTime];
        const cue = createCueElement(timeObj["text"]);
        cue.id = "cue--background";
        const player = document.getElementById("player");
        player.appendChild(cue);
        this.timer = timeObj["duration"];
      }
    }
  }

  /**
   * Add a cue to memory for this video at current time.
   * @param {string} value - the desired text that we want to show at current time
   */
  async addCue(text, duration = this.defaultCueLen) {
    const currTime = await this.player.getCurrentTime();
    const time = Math.ceil(currTime);
    this.cues[time] = { text, duration };
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
const p = new Player(59777392, 640, true, 5);
// add event binding to form element to add cues
const form = document.getElementById("form--cue");
form.addEventListener("submit", e => {
  e.preventDefault();
  p.addCue(e.target.cue.value);
  e.target.cue.value = "";
});
