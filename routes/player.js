const router = require("express").Router();

/**
 * Video player for a video with id of :id
 */
router.get("/:id", (req, res) => {
  res.render("index", {
    view: "player",
    videoId: req.params.id
  });
});

module.exports = router;
