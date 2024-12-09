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
