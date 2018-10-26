const router = require("express").Router();

// default player route
router.get("/", (req, res) => {
  res.render("index", {
    view: "player",
    defaultPlayer: true,
    videoId: 19231868,
    sameSite: true
  });
});

/**
 * Video player for a video with id of :id
 */
router.get("/:id", (req, res) => {
  res.render("index", {
    view: "player",
    defaultPlayer: false,
    videoId: req.params.id
  });
});

module.exports = router;
