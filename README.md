# Pet Diver React/Rails API final project
Welcome to Pet Diver - a web-based game where you can create a character, purchase companions, and slay enemies in order to grow your team's strength!  Choose your own stats and pets from a variety of options in order to best increase your chances of reaching the top 10 scoreboard.

To view the current in-use web app, visit: https://pet-diver.onrender.com/

## General Use
Anyone is able to view a list of pet archetypes, enemy archetypes, and the all-time dive scoreboard. In order to join the fun and create your own character, log in by signing up with a username, password, and your email address.

### Build your own character
* When creating a character, you have a starting pool of 20 points to distribute among the various attributes. Choose a high defense to mitigate extra damage, or lean into speed to always have the initiative in a fight! If you change your mind, you can spend some of your character's money to reassign your stat points.  Don't forget to assign your bonus points every time you gain a level!

### Pets
* Choose from a number of different pet types, all with varying distributions of stats.  These stats will get combined with your character's stats and will help you get even further in your dives. Pets are upgradable once you make enough money, and will further increase their stats.  Only two pets can join you on any one dive.

## Demonstration
![Demonstration gif](demonstration.gif)

## Installation
Pet Diver utilizes a react front end and rails back end. To get started, uncomment the 'characters' and 'rules' data from the db/seeds.rb file, and then run:
bundle install
rails db:migrate db:seed
npm install --prefix client

To run the application, run:
rails s (backend server on http://localhost:3000)
npm start --prefix client (frontend server on http://localhost:4000)

To utilize the action mailer, the action mailer credentials will need to be updated to suit your needs.


## Resources
- This project was created using a template for a react/rails API found here : https://github.com/learn-co-curriculum/project-template-react-rails-api
- [Getting Started with Ruby on Rails on Render](https://render.com/docs/deploy-rails)
- [Render Databases Guide](https://render.com/docs/databases)
- All art is AI generated using DALL-E 2 from OpenAI