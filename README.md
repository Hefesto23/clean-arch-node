# **Harvey-Nichols - Technical Test**

![alt text](./public/img/CleanArchitecture.jpg "Clean Code Chart")

---

## Description

This project represents my solution of Harvey Nichols Technical Test. It is an attempt to build clean Node.js/Typescript Api with good standards of coding. Best practices, SOLID design principles, separation of responsibilities, and code decoupling were the main concepts that guided the development process in order to improve code internal quality.


## Principles

* Single Responsibility Principle (SRP)
* Open Closed Principle (OCP)
* Liskov Substitution Principle (LSP)
* Interface Segregation Principle (ISP)
* Dependency Inversion Principle (DIP)
* Separation of Concerns (SOC)
* Don't Repeat Yourself (DRY)
* Keep It Simple, Silly (KISS)
* Small Commits

## Methodologies and Designs

* TDD
* Clean Architecture
* Conventional Commits
* Modular Design
* Use Cases
* CI/CD

## How it Works?

When you run this app, it exposes 2 endpoints:

1. GET / : Once the application is running, open your browser and navigate to http://localhost:3030 or http://localhost:<API_PORT>, the port we are using by default is 3030. You should see a message 'Server is Up!'.

2. GET /product/:id(or http://localhost:3030/product/id) : This endpoint should return a structure that describes one product. Input data should follow this structure:


You can check tests to understand better how it works.

## Prerequisites

Please make sure that Node.js is installed on your operating system.
The first thing you **NEED** in order to run this app, is to set all the necessaries environment variables!
There is one .env file in the root of this project.

```
# Server Port
API_PORT= <YOUR_API_PORT>

# BigCommerce env variables
BC_HASH= <YOUR_API_PORT>
BC_AUTH_CLIENT= <YOUR_BC_AUTH_CLIENT>
BC_AUTH_TOKEN= <YOUR_BC_AUTH_TOKEN>
```

## Running with Docker

To make use of scripts, you **need** to have shell script in your machine.

run:

```bash
#deploy prod in docker container
sh .\scripts\deploy.prod.sh

#to stop containers and remove containers, networks
sh .\scripts\down.prod.sh
```

to check container image:

```bash
#check containers
docker ps

#create new sh process inside the container and connect to the terminal
docker exec -it <container name|id> sh

#print the last 100 lines and follow app logs
docker logs -f --tail 100 <container id>
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test:unit

# integration tests
$ npm run test:integration

# test coverage
$ npm run test:cov
```

## Author

Vinicius Raszl
