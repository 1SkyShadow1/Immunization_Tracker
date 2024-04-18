# Immunization_Tracker

Github repository for our Immunization tracker app

# Immunization Tracker App

## Overview

The Immunization Tracker App is a tool designed to help parents easily track their children's immunization schedules. It allows users to view existing records, add new immunization details, and update information. The application follows a client-server architecture, with a web server processing requests and interacting with a database to retrieve or store data.

## Frameworks

We used React For the front end UI alongside Node.js with express js for the backend

## Architecture

The user interacts with the application's UI ( web app) to view existing records, add new immunization details, or update information. The UI sends requests and receives data from the web server using APIs. The web server processes these requests, interacts with the database to retrieve or store data, and sends responses back to the UI. The database stores all immunization records for users, including details like child information, vaccine names, dates administered, and next due dates.

## APIs and Methods

The application uses NodeJS and MySQL to implement API routes for communication between the web client and the server. The server-side implementation utilizes Express.js to build the web server and handle API requests. The API routes include GET, POST, PUT, and DELETE methods for retrieving, creating, updating, and deleting immunization records respectively.

## Data Model

The data model includes three tables: Users, Children, and Immunizations. The Users table stores user information, the Children table stores child information, and the Immunizations table stores immunization records.

## User Stories

1. As a parent, I want to add my child's immunization records to the app, so that I can easily track their immunization schedule.
2. As a parent, I want to view a list of all my child's past and upcoming immunizations, so that I can stay informed and prepared.
3. As a parent, I want to edit or delete existing immunization records, so that I can keep my child's information accurate and up-to-date.

## Future Enhancements

Future enhancements may include integration with external vaccine schedule databases, educational resources on childhood immunizations, reminder notifications for upcoming vaccinations, user accounts for multiple children and caregivers, and secure data export options.

## Authors

- Jonathan Ndawula
- Evans Ncube
