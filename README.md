# Immunization Tracker App

![App Screenshot](link-to-your-app-screenshot)

## Overview

The Immunization Tracker App is a tool designed to help parents easily track their children's immunization schedules. It allows users to view existing records, add new immunization details, and update information. The application follows a client-server architecture, with a web server processing requests and interacting with a database to retrieve or store data.

Evans' Blog
https://www.linkedin.com/pulse/immunization-tracker-web-app-healthier-future-evans-ncube-opw0c/?trackingId=ycF5ZlrHSxqtiZwtRdUYLg%3D%3D.

Jonathan's Blog
https://www.linkedin.com/posts/jonathan-ndawula-baa819137_introduction-to-our-immunization-tracker-activity-7183855900313423872-YGVM?utm_source=share&utm_medium=member_desktop
## Frameworks

We used React for the front-end UI alongside Node.js with Express.js for the backend.

## Architecture

The user interacts with the application's UI (web app) to view existing records, add new immunization details, or update information. The UI sends requests and receives data from the web server using APIs. The web server processes these requests, interacts with the database to retrieve or store data, and sends responses back to the UI. The database stores all immunization records for users, including details like child information, vaccine names, dates administered, and next due dates.

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

## Installation

Just visit the URL for the app.

## Usage

The Immunization Tracker App is very simple to use, with no instructions necessary.

## Contributing

Not necessary at this point

## Related Projects

None at all

## Licensing

Copyright © 2024 Immunization Tracker

## Authors

- [Jonathan Ndawula](www.linkedin.com/in/jonathan-ndawula-baa819137)
- [Evans Ncube](https://www.linkedin.com/in/evans-ncube-b3a4a322a/)