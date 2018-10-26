const express = require("express");
const router = express.Router();
const { getVideos } = require("./utils/api");

router.get("/", (req, res) => {
  res.render("index", {
    view: "search"
  });
});

router.post("/", async (req, res) => {
  const { query } = req.body;
  const response = await getVideos(query);
  const videos = response.data.map(vid => {
    return {
      uri: `/player/${vid.uri.split("/").slice(-1)[0]}`,
      name: vid.name
    };
  });
  res.render("index", {
    view: "search",
    videos
  });
});

module.exports = router;
