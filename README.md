# Twitter Automation Project
> Note-: currently this project is used by running locally as some issues persist(due to testing many times twitter account is demanding opt on login , but this happing only in on account which in mine that was used while testing so in this repo the logs may get errors for mine specific username and password otherwise project is good to go.)
> 
This project is designed to automate the process of reposting content on Twitter. It uses a combination of AI technologies to generate image descriptions and write captions for the posts that need to be requoted.

## Features
- Automated Reposting: The script automatically reposts content on Twitter, saving you the time and effort of manual reposting.
- Image Descriptions: The script uses Blip AI to generate descriptions for images, making your posts more accessible and informative.
- AI-Powered Captions: The script uses the OpenAI API KEY provided by Naga AI to generate meaningful and relevant captions for the posts.

## Technologies Used
- Node.js: The script is written in Node.js, a JavaScript runtime built on Chrome's V8 JavaScript engine.
- OpenAI API (Naga AI): The script uses the OpenAI API provided by Naga AI to generate captions for the posts.
- Blip AI: The script uses Blip AI to generate descriptions for images.

## How to Install and Run
- Clone the repository to your local machine.
- Install the necessary dependencies with npm install.
- Set the NAGA_API_KEY,Twitter username,password environment variable in your local environment or in a .env file.
- Run the script with node script.js.

## Github Actions
It uses github action to run script at specific time everyday

### To prevent this from bot like behvaiour it also scrolls down then select the post to quote it.
