## Async Race 🚗

Async Race - SPA, is a game for demonstrating skills in working with animations and REST API. It is an interface for managing a collection of cars and their engines, which can start a cars race, determine the winner and show race statistics. The application was created as part of the JavaScript/Frontend course from The Rolling Scopes School in March 2024.
### [Deploy Link](https://rolling-scopes-school.github.io/tetiana-ket-JSFE2023Q4/async-race/index.html#garage)
### [Task Link](https://github.com/rolling-scopes-school/tasks/blob/master/stage2/tasks/async-race/README.md)

![image](https://github.com/rolling-scopes-school/tetiana-ket-JSFE2023Q4/assets/99186560/379cd7b7-5e11-4847-bd97-fa07af338f1f)
![image](https://github.com/rolling-scopes-school/tetiana-ket-JSFE2023Q4/assets/99186560/340242a0-b8ab-4d35-9f73-dd9822d64416)

## Key Features:

- Two main views: "Garage" and "Winners", each with their name, page number, and a count of items in the database.
- Persistent view state between switches, maintaining user input and pagination.
 #### **Garage View**
- CRUD operations for cars with "name" and "color" attributes.
- Color selection from an RGB palette with a preview of the car in the chosen color.
- Pagination to display cars (7 per page) and a feature to generate 100 random cars at once.
 #### **Car Animation**
- Start/stop engine buttons with corresponding animations and handling of engine states.
- Adaptive animations that work on screens as small as 500px.
 #### **Race Animation**
- A button to start a race for all cars on the current page.
- A reset button to return all cars to their starting positions.
- Display the winner's name upon race completion.
####  **Winners View**
- Display winning cars with their image, name, number of wins, and best time.
- Pagination and sorting capabilities by wins and best times.

## Technology stack

- Language: [**TypeScript**](https://www.typescriptlang.org/)
- Builder: [**Vite**](https://vitejs.dev/)
- Linters: [**ESLint**](https://eslint.org/), [**Prettier**](https://prettier.io/)
- Pre-push/Pre-commit: [**Husky**](https://typicode.github.io/husky/)

## Setup and Running the Server

**To test the app functionality, please clone [repo](https://github.com/mikhama/async-race-api) with a server and keep the server running during functionality review.**

- Use node 14.x or higher.
- Clone this repo: ```git clone https://github.com/mikhama/async-race-api.git```.
- Go to downloaded folder: ```cd async-race-api```.
- Install dependencies: ```npm install```.
- Start server: ```npm start```.

## Scripts available

### Build

To build the project run
```
npm run build
```
It will be stored in the `dist/` directory.

### ESLint check

To check for code style and potential errors in the `src/` directory, including TypeScript and TSX files (--ext ts,tsx), run

```
npm run lint
```

It also reports any unused disable directives (--report-unused-disable-directives) and sets the maximum number of warnings to 0 (--max-warnings 0), which means ESLint will treat warnings as errors. This script helps quickly identify code style issues and potential errors in the project

### ESLint fix issues

To automatically fixe ESLint errors and code style issues in the `src/` directory run:

```
npm run lint:fix
```

### Check the production build

To check if the production build looks OK in your local environment use:

```
npm run preview
```

It will run scripts `vite build && vite preview` to create `dist` folder (if absent), build the project and boot up a local static web server that serves the files from dist at http://localhost:4173.

_It is important to note that `vite preview` is intended for previewing the build locally and not meant as a production server._

### ESLint and Prettier fix issues

To make ESLint fix code style issues, and then format code using Prettier in the `src/` directory - use

```
npm run format:all
```

It will run scripts `npm run lint:fix && npm run prettier:fix`

### Set up Git hooks

To automatically set up Git hooks for code linting and formatting, run the following command after installing project dependencies:

```
npm run prepare
```
