Slot Machine Web Application


Overview

This project is a slot machine game implemented as a web application. It consists of a frontend built with HTML, CSS, and JavaScript, and a backend API developed using Node.js and Express. The application allows users to deposit funds, place bets, spin the slots, and view their balance and winnings.


Features

    User can deposit funds.
    User can select the number of lines to bet on.
    User can place a bet amount.
    Slot machine spins and displays the results.
    Winnings are calculated based on symbols.
    Real-time updates of balance and winnings.

Technologies Used

    Frontend: HTML, CSS, JavaScript
    Backend: Node.js, Express
    Docker: For containerization

	Cloning the Repository

To get started with the project, clone the repository to your local machine:


	git clone https://github.com/aryansood1232/TryYourLuck.git


Prerequisites

Install Docker

	For running with Docker, ensure Docker is installed on your machine. Download Docker Desktop from Docker’s official site for Windows or macOS, or follow instructions for Linux.

Install Node.js and npm

	For running locally without Docker, ensure you have Node.js and npm installed on your machine.

Running Locally Without Docker

Navigate to the Project Directory

	cd TryYourLuck


Install the required dependencies using npm:

	npm install

Start the application using:

	npm start

This will start the server on port 3000 by default. Open your web browser and go to http://localhost:3000 to access the application.



Running the Application with Docker


Pull the Docker image from Docker Hub:

	docker pull aryan1232/slot-machine-app

Run the Docker Container by starting a Docker container from the pulled image and mapping port 3000 on your host to port 3000 in the container:

	docker run -p 3000:3000 aryan1232/slot-machine-app

Access the Application

Open your web browser and navigate to http://localhost:3000 to interact with the slot machine game.



To stop the Docker container running the application:


Find the container ID:

	docker ps


Stop the container using its ID:
   
	docker stop <container_id>

Replace <container_id> with the actual ID of your container.

Troubleshooting

    Port Issues: If you encounter port issues, ensure that no other application is using port 3000. You can change the port by modifying the -p option in the docker run command (e.g., -p 3001:3000).

    Docker Daemon: Ensure the Docker daemon is running. Restart Docker Desktop if necessary.

    Docker Login: If you encounter issues pulling the image, ensure you are logged in to Docker Hub with docker login. Recheck your credentials if facing authentication issues.


