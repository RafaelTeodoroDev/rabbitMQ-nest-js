# Overview
This is an application that performs the following tasks:

* Create a user in a MongoDB database
* Send an email using the provided email service
* Publish an event to a RabbitMQ message broker
* Fetch a user from an external API (https://reqres.in/api/users)
* Fetch the user's avatar from the external API
* Delete the user's avatar from the external API
* The application requires a running RabbitMQ instance, which can be started using Docker Compose.

# Setup
Before running the application, make sure to set the following environment variables:

* MONGODB_URI: The URI for the MongoDB instance
* RABBITMQ_DEFAULT_USER: The username for the RabbitMQ instance
* RABBITMQ_DEFAULT_PASS: The password for the RabbitMQ instance
Usage
To start the application, run the following command:
```
docker compose up
```
```
yarn install
```
```
yarn start
```

This will start the application and run all the tasks listed above.

# Testing
To run the tests for the application, run the following command:
```
yarn test
```
This will run the test suite using Jest.