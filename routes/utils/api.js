// create a vimeo api client
const Vimeo = require("vimeo").Vimeo;
const vimeoClient = new Vimeo(
  process.env.VIMEO_CLIENT_ID,
  process.env.VIMEO_CLIENT_SECRET,
  process.env.VIMEO_ACCESS_TOKEN
);

/**
 * A function to get 12 videos from vimeo that relate to the search query
 * @param {string} query - search query string that we use to search videos on vimeo
 */
const getVideos = query => {
  return new Promise((resolve, reject) => {
    vimeoClient.request(
      {
        method: "GET",
        path: "/videos",
        query: {
          page: 1,
          per_page: 12,
          fields: "uri,name",
          sort: "relevant",
          direction: "asc",
          query
        }
      },
      (error, body) => {
        if (error) reject(error);
        else {
          resolve(body);
        }
      }
    );
  });
};

module.exports = {
  getVideos
};
