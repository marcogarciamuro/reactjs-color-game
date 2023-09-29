# reactjs-color-game

A ReactJS project that challenges users to combine RGB values to visually match a randomly generated target color.

[Play The Color Matching Game](matchthiscolor.netlify.app)

## Background

This project utilizes ReactJS, and Bootstrap to create an interactive, intuitive user interface.

When the web game loads, there is a "help" button that describes how the game works.

After every round played, the statistics are saved in the browser's local storage for the user to access from my interface at any time. These statistics include personal best score, average color accuracy, and the amount of games played.

There is a 30-second timer that counts down, during which the user must use the red, blue, and green color sliders to create the randomly generated target color. When the countdown finishes, the accuracy of the user's created color is calculated based on how close each of the color values is to the target color values.

My web game also features light/dark themes that dynamically change the look of the website. The currently selected theme is saved in the browser's local storage for future visits.

The website is fully responsive to any screen size using Bootstrap. Accessibility and usability drove the decisions behind the development of this project.

The development of the project was managed and controlled using Git and Github. I used Netlify to deploy my application and linked my Github repository to enable continuous integration deployment. Everytime a new commit is pushed to the main branch, Netlify will create a new build from the updated code.

## Visuals

<img src="visuals/color_matching_game_demo.gif">
