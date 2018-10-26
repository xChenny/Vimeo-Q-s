# Vimeo Q's

Hello! This is Andrew Chen's Vimeo Internship Coding Challenge. This application allows
users to search for videos on Vimeo, create cues on specific video and store these cues
persistently

You can check out a live version of this application [here](https://vimeo-qs.herokuapp.com/)

## Features

**Basic Features:**
- There is a user interface which allows users to add a cue at a specific point in the video
- There is a list view of all of the cues associated with the video
- Users can click each cue to remove the cue from the video

**Extra Feature(s):**
- Users can search for videos on Vimeo to find a video that they want to watch

## Technologies

To create this application, I used the following technologies

*Frontend:*

- Pug.js: This is the templating engine that I opted to use for this assignment. It is a really nice abstraction to HTMl that is both easy to read and write.
- Vanilla Javascript: Normal client-side javascript as-per the assignment specifications

*Backend:*

- Express.js: A backend server library used to create Router endpoints and as an interface that connects the Database and Frontend together.

## Installation

To run this website on your machine, please follow these steps:

1. Clone this repository:

    `git clone https://github.com/xChenny/Vimeo-Q-s.git`

2. Install Node dependencies:

    `npm i`

3. Enter the directory:

    `cd Vimeo-Q-s`

4. Run the server:

    `npm start`

4a. Or run the development server:

    `npm run dev`

5. To use the search functionality, you need Vimeo API credentials!

    1. Set up credentials and create a `.env` file in the root with the following structure:

    ```
    VIMEO_CLIENT_ID=<client_id>
    VIMEO_CLIENT_SECRET=<client_secret>
    VIMEO_ACCESS_TOKEN=<access_token>
    ```