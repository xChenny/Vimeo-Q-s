var options = {
  id: 59777392,
  width: 640,
  loop: true
};

var player = new Vimeo.Player("player", options);

player.setVolume(0);

player.on("play", function() {
  console.log("played the video!");
});

player.on("pause", function() {
  console.log("paused the video!");
});
