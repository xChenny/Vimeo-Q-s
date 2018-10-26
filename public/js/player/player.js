// Custom class definition for player and its related methods

class Player {
  /**
   * constructor method for the Vimeo Player
   * @param {number} id - vimeo video id
   * @param {number} width - width of player element
   * @param {boolean} loop - whether we want the video to loop
   * @param {number} defaultCueLen - default Cue duration
   */
  constructor(id, width, loop, defaultCueLen, cues = {}) {
    //video id
    this.id = id;

    // current time
    this.seconds = -1;

    // data structure that stores cues (We're using sessionStorage)
    this.cues = cues;
    // timer that tells us when a cue is done
    this.cueTimer = 0;
    this.defaultCueLen = defaultCueLen;

    // the player
    this.player = new Vimeo.Player("player", { id, width, loop });
    // player events
    this.player.on("timeupdate", timeObject => this.showCue(timeObject));
    this.player.on("seeked", timeObject =>
      this.loadClosestCue(Math.floor(timeObject.seconds))
    );
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
   * append to the video player the closest previous cue if it is still available
   * ie: if you seek to 0:10, and there was a cue that goes from 0:08 to 0:13, then
   * load that one
   * @param {number} currTime - the time that the video is currently on
   */
  loadClosestCue(currTime) {
    let index = currTime,
      lastCueExists = true;
    while (!this.cues[index] && index >= 0) {
      if (index < 0) lastCueExists = false;
      index--;
    }
    if (lastCueExists) {
      const oldCue = document.getElementById("cue--background");
      if (oldCue) oldCue.remove();
      const closestCue = this.cues[index];
      // if the last cue's duration includes the current time
      if (index + closestCue.duration > currTime) {
        this.timer = closestCue.duration - (currTime - index);

        const cue = createCueElement(closestCue["text"]);
        cue.id = "cue--background";
        const player = document.getElementById("player");
        player.appendChild(cue);
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

    // get the cues div from html
    const cues = document.getElementById("cues");
    // create new html element for new cue
    let cue = document.createElement("div");
    cue.className = "cue";
    cue.id = time;

    const cueContent = document.createTextNode(
      `${formatSeconds(time)}: ${text}`
    );
    cue.appendChild(cueContent);

    // add new cue to the cues div element
    cues.appendChild(cue);

    cue.addEventListener("click", e => {
      this.deleteCue(e.target.id);
    });

    // TODO: implement server-side cookie storage
    // stringify body to send to server
    // const body = JSON.stringify({
    //   videoId: this.id,
    //   timestamp: time,
    //   cue: {
    //     ...this.cues[time]
    //   }
    // });

    // send cue to server for storage
    // fetch("/player", {
    //   method: "POST",
    //   body,
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });
  }

  /**
   * Removes cue from memory.
   * @param {number} timestamp - timestamp of the cue that we want to remove
   */
  deleteCue(timestamp) {
    delete this.cues[timestamp];
    const nodeToRemove = document.getElementById(timestamp);
    nodeToRemove.parentElement.removeChild(nodeToRemove);
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

/**
 * converts a number of seconds to a time format
 * @param {number} secs
 */
const formatSeconds = secs => {
  if (secs > 3600) {
    return moment.utc(secs * 1000).format("HH:mm:ss");
  }
  return moment.utc(secs * 1000).format("mm:ss");
};
