                         
<br/>
<div align="center">
<a href="https://depablosm.com">
<img src="https://depablosm.com/wp-content/uploads/2024/05/helloMe.png" alt="Logo" width="80" height="80">
</a>
<h3 align="center">Full Stack Software Engineer</h3>
<h4 align="center">Orlando Depablos</h4>
<p align="center">
This is a demo e-commerce site built using Shopify Hydrogen. Users can mark products as their favorites, which are managed by a Node.js microservice.
<br/>
<br/>
</p>
<a href="https://depablosm.com"><strong>Explore my web page »</strong></a>
<br/>
<br/>
<a href="https://hydrogen.shopify.dev/"><strong>Explore Hydrogen »</strong></a>
</div>

 ## About The Project
 
![work video](https://github.com/orlandoDe/hydrogen-demo-store/assets/141243932/fb82f1b7-a94a-4e99-bd3a-62495b67af41)

The task was to build a demo e-commerce site using Shopify Hydrogen that allows users to
mark products as their favorites. These favorites will be managed by a Node.js
microservice, which interacts with a database to store and retrieve the favorite items.

 ### Design

We maintained the clean and slick design provided by the Shopify framework to ensure a consistent and professional appearance. In line with this theme, we designed the buttons to have a sharp, minimalist look with a border. Upon clicking, the buttons seamlessly transition to a black background with white text, creating a striking contrast. This effect is achieved using pure CSS for optimal performance and ease of maintenance.

 #### Button Design Details
Default State: The buttons have a border with no background, keeping the design clean and unobtrusive.
<p>
Active State: On click, the buttons transition to a black background with white text, providing clear visual feedback to the user.

 ### Built With

This section lists major frameworks/libraries used in the project.


- [Hydrogen](https://hydrogen.shopify.dev/)
- [React](https://reactjs.org)
- [Docker](https://docs.docker.com/compose/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Axios](https://axios-http.com/docs/intro)
- [Jest](https://jestjs.io/)

 ## Getting started

Setting up your project locally.
To get a local copy up and running, follow these simple steps.
 ### Prerequisites

Node.js v16.20+ 
<br>
npm v8.19+
<br>
Docker Compose 4.24+
<br>
This is how to check the list of things you need to use and how to install them.

To check your Node.js version, run this command on your terminal or CMD:

- node
  ```sh
  node -v
  ```
If you don't see any version, here are some instructions to install [node](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

- npm
  ```sh
  npm -v
  ```
If not, you can run this command or get more details on how to do it [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

- npm
  ```sh
  npm install -g npm
  ```
You need to have Docker for the backend, so depending on your computer's OS, you can see the instructions [here](https://docs.docker.com/engine/install/)

 ### Installation

_Installing and setting up your app._

1. Make sure you have all the prerequisites and docker running in the backend.
2. Clone the repo in your favorite working folder
- git
   ```sh
   git clone https://github.com/orlandoDe/hydrogen-demo-store.git
   ```
you will have 2 folders, one is for the frontend and the other is for the backend
<br>
3. Now we need to install all the dependecies and packages for backend & frontend
- npm
   ```sh
   cd hydrogen-demo-store/hydrogen-quickstart/ && npm install
   ```
after finish go back to microservice folder and run the install
- npm
   ```sh
   cd ../microservice/ && npm install
   ```
we are going to start with building the backend and make some tests first.
<br>
4. In microservice folder
- docker-compose
   ```sh
   docker-compose build
   ```
![docker-compose-build](https://depablosm.com/wp-content/uploads/2024/05/step5.png)
5. After building, start your containers.
- docker-compose
   ```sh
   docker-compose up -d
   ```
Make sure they are up and running
![docker-compose-build](https://depablosm.com/wp-content/uploads/2024/05/step1.png)
<br>
6. Now let's make a little test of the REST API to make sure we get a response, you can make this request from [Postman](https://www.postman.com/downloads/) or in your shell, if you have a custom url for your localhost, please update the command. For example http://127.0.0.1:8085
- curl
   ```sh
   curl http://localhost:8085/api/current-user
   ```
you should get a '{"userId":"1111"}' response.
<br>
7. Now that we have the back running let's start the front, before that we are going to check if we have a .env VITE_BACKEND_MONGO_URL with the correct url, If not, you can update the .env with the nano command, assuming you are inside microservice folder
- tail
   ```sh
   tail ../hydrogen-quickstart/.env
   ```
![tail-command](https://depablosm.com/wp-content/uploads/2024/05/step3.png)
<br>
8. After we check we have the VITE_BACKEND_MONGO_URL in .env we can continue with
- cd
   ```sh
   cd ../hydrogen-quickstart/ && npm run dev
   ```
![run-dev](https://depablosm.com/wp-content/uploads/2024/05/step6.png)

 ## Usage

You now have a demo store with all the basic components with a Favorite button in every product page and a new page with all your favorite items. Now you can start adding product to your favorite list

You have a default user 1111 but you can change this within a new shell window by making a GET command or with [Postman](https://www.postman.com/downloads/)
- curl
   ```sh
   curl http://localhost:8085/api/current-user?userId=1112
   ```
now you can add favorite items to this new user.

You can see all the favorite items for specific user
- curl 
   ```sh
   curl http://localhost:8085/api/favorites/1111
   ```

You can see all favorite products from the store
- curl 
   ```sh
   curl http://localhost:8085/api/global-favorites
   ```

You can run a unit test for the backend inside microservice/ folder by running this command
- npm
   ```sh
   npm run test
   ```
![test-command](https://depablosm.com/wp-content/uploads/2024/05/step4.png)


_Al the task in this challange_
 ## Roadmap

- [x] Frontend:
	- [x] Set up a new Shopify Hydrogen project demo store.
	- [x] On the Product Detail page, add a "Favorite" button.
	- [x] When clicked, the button should send the product ID to the backend microservice to mark the product as a favorite.
	- [x] Update the button's appearance based on whether the product is already favorited.
	- [x] This page should fetch the list of favorites from the backend microservice.
- [x] Backend:
	- [x] Develop a simple Node.js microservice using frameworks like Express or NestJS.
	- [x] This service should handle requests to add or remove favorites and fetch the list of favorite products.
- [x] Database Integration:
	- [x] Choose any database (SQL or NoSQL) to store the user's favorite products.
	- [x] Ensure the database is properly connected to your microservice for querying and updating data.
- [x] API Endpoints (REST or GraphQL):
	- [x] /api/favorites: GET method to retrieve all favorite products.
	- [x] /api/favorite: POST method to add a product to favorites.
	- [x] /api/favorite: DELETE method to remove a product from favorites.
- [ ] Hydrogen Unit Tests:
	- [ ] Write unit tests for your Hydrogen components using a suitable testing framework.
	- [ ] Ensure tests cover key functionalities such as rendering components and interacting with backend services.
- [x] Node.js Unit Tests:
	- [x] Write unit tests for your Node.js microservice.
	- [x] Tests should cover all API endpoints and database interactions.
	- [x] Utilize frameworks like Jest or Mocha for writing these tests.
- [x] Additional Considerations
	- [x] Authentication.
	- [x] Error Handling.
	- [x] Responsiveness.
- [x] Submission
	- [x] Provide a GitHub repository link containing the project with a README.md.
	- [x] Instructions on how to set up and run the project.
	- [x] A brief explanation of your design choices and technologies used.
	- [x] Any credentials or environment variables needed to run the project in a local environment.
	- [x] A short video demonstrating your work.


 ## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
 ## License

Distributed under the MIT License. See [MIT License](https://opensource.org/licenses/MIT) for more information.
 ## Contact

Orlando Depablos - [@mc_bosc](https://twitter.com/mc_bosc)

