# Vimeo Q's

Hello! This is Andrew Chen's Vimeo Internship Coding Challenge. This application allows
users to search for videos on Vimeo, create cues on specific video and store these cues
persistently

## Technologies

To create this application, I used the following technologies

*Frontend:*

- Pug.js: This is the templating engine that I opted to use for this assignment. It is a really nice abstraction to HTMl that is both easy to read and write.
- Vanilla Javascript: Normal client-side javascript as-per the assignment specifications

*Backend:*

- Express.js: A backend server library used to create Router endpoints and as an interface that connects the Database and Frontend together.
- MongoDB: The Database that I've opted to use. I choose to use MongoDB for the following reasons:

    1. There are many services that I can use to host a DB cluster for free
    2. The requirements of this assignment did not require strong relationships between objects (relatively simple data structures)
    3. MongoDB stores entries, called "documents" in a JSON-like way which works well with Javascript.

## Installation

To run this website on your machine, please follow these steps:

1. Clone this repository:

`git clone https://github.com/xChenny/Vimeo-Q-s.git`

2. Install Node dependencies:

`npm i`

3. Run the server:

`npm start`

3a. Or run the development server:

`npm run dev`