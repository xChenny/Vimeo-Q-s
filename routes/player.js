const router = require("express").Router();

// default player route
router.get("/", (req, res) => {
  // if (!req.session.cues) req.session.cues = {};
  res.render("index", {
    view: "player",
    defaultPlayer: true,
    videoId: 19231868,
    sameSite: true
    // cues: req.session.cues[19231868]
  });
});

/**
 * Add a new cue to session storage
 */
// router.post("/", (req, res) => {
//   const { videoId, cue, timestamp } = req.body;
//   // init storage if it's your first time visiting site
//   if (!req.session[videoId]) req.session.cues[videoId] = {};
//   req.session.cues[videoId][timestamp] = cue;
// });

/**
 * Video player for a video with id of :id
 */
router.get("/:id", (req, res) => {
  // if (!req.session.cues) req.session.cues = {};
  res.render("index", {
    view: "player",
    defaultPlayer: false,
    videoId: req.params.id
    // cues: req.session.cues[req.params.id]
  });
});

module.exports = router;
