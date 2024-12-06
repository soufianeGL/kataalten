# Backend Project

This project implements an e-commerce backend with functionalities for product management, cart, and wishlist features. The backend uses **NestJS**, **MongoDB**, and **Typegoose**.

## Features

- Product CRUD operations
- JWT-based authentication
- Cart and Wishlist management
- Pagination and Filtering for products
- Swagger API documentation
- Data seeding for development
- Comprehensive tests (Unit and E2E)

## Prerequisites

- Node.js (>= 16.x)
- npm (>= 8.x)
- MongoDB (>= 6.x)
- Docker and Docker Compose (Optional for containerized setup)

## Setup Instructions

## Install dependencies

npm install

Environment Variables Create a .env file in the root directory and configure it as follows:

MONGO_URI=mongodb://localhost:27017/kataalten
JWT_SECRET=your_jwt_secret
PORT=3000

## Run MongoDB (Optional with Docker) If MongoDB is not installed locally, you can run it using Docker:

docker-compose up


## Start the Server Run the development server:

npm run start:dev

## Run Tests

    Unit Tests: npm run test
    E2E Tests: npm run test:e2e

## Access the API

    Swagger Documentation: http://localhost:3000/api/docs

## Project Structure

  src/
├── modules/
│   ├── auth/           # Authentication Module
│   ├── product/        # Product Management Module
│   ├── cart/           # Cart Management Module
│   ├── wishlist/       # Wishlist Management Module
├── main.ts             # Application Entry Point
├── app.module.ts       # Root Module
tests/                  # Unit and E2E Tests


# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
