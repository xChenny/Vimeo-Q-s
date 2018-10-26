const express = require("express");
const router = express.Router();
const { getVideos } = require("./utils/api");

// default page. no search results yet
router.get("/", (req, res) => {
  res.render("index", {
    view: "search"
  });
});

// occurs when user submits search query
router.post("/", async (req, res) => {
  const { query } = req.body;
  // make api request to vimeo api
  const response = await getVideos(query);
  // reformat videos into appropriate format
  const videos = response.data.map(vid => {
    return {
      uri: `/player/${vid.uri.split("/").slice(-1)[0]}`,
      name: vid.name
    };
  });
  // render pug template with videos
  res.render("index", {
    view: "search",
    videos
  });
});

module.exports = router;
