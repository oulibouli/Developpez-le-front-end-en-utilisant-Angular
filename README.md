# Project
OlympicGamesStarter

# Description
This application is an Olympic Games project builded with Angular. Its goal is to provide a simple and interactive interface to globally see the medals won by the countries, and to analyse the data in details for each one

# Versions
* Nodejs 20.15.0
* Npm 10.7.0
* Angular 18.0.5


# Installation
## Clone the repository & Install the dependencies : 
1. Install _node.js_ and _npm_:
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

2. Open a terminal and run these commands:
- _git clone https://github.com/oulibouli/Developpez-le-front-end-en-utilisant-Angular.git_
- _cd Developpez-le-front-end-en-utilisant-Angular_
- _npm install_

# Use
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Other usage
See [Scripts section](#scripts)

# Scripts
- ng : Start CLI Angular
- npm start : Start the dev server
- npm run build : Compile the app for production
- npm run  watch : Compile the app in surveillance mode
- npm test : Start the unit tests

# Directory Structure

## `src` folder: Contains the source code of the application

- `app` folder: Contains the main components, modules, services, and other elements of the application.
  - **app-routing.module.ts** : Main routing module of the application.
  - **app.component.*** : Files related to the main application component (HTML, SCSS, spec.ts for tests, and the TypeScript files).
  - **app.module.ts** : Main application module.
  - **core** :  Contains the business logic : models and services
    - **config** : Contains configuration files.
      - **chart-config.ts** : Chart configuration.
    - **models** : Contains data models and interfaces.
      - **interfaces.ts** : Definition of interfaces used in the application.
    - **services** : Contains services used in the application.
      - **olympic.service.*** : Service to manage Olympic Games data (source and test files).
      - **network.service.*** : Service to manage the lost of the network and notify the user.
      - **responsive.service.*** : Service to make the chart and the legend responsive depending on the window size.
  - **pages** : Contains the page components of the application.
    - **detail** : Detail page component.
      - **detail.component.*** : Files related to the detail component (HTML, SCSS, spec.ts for tests, and the TypeScript file).
    - **home** : Home page component.
      - **home.component.*** : Files related to the home component (HTML, SCSS, spec.ts for tests, and the TypeScript file).
    - **banner** : Banner component.
      - **banner.component.*** : Files related to the banner component (HTML, SCSS, spec.ts for tests, and the TypeScript file).
    - **not-found** : Component for the "Not Found" (404) page.
      - **not-found.component.*** : Files related to the not-found component (HTML, SCSS, spec.ts for tests, and the TypeScript file).

- **assets** : Contains static files such as images, JSON files for mock data, etc.
  - **mock** : Contains mock data.
    - **olympic.json** : Mock data for the Olympic Games.

- **environments** : Contains configuration files for different environments (development, production).
  - **environment.prod.ts** : Configuration for the production environment.
  - **environment.ts** : Configuration for the development environment.

- **favicon.ico** : Application favicon.
- **index.html** : Main HTML file of the application.
- **main.ts** : Main entry point of the application.
- **polyfills.ts** : Polyfills file for browser compatibility.
- **styles.scss** : Main SCSS styles file.
- **test.ts** : Configuration file for unit tests.

## `node_modules` : Contains the installed modules

# Modules

- HttpClientModule deprecated => Replaced by provideHttpClient() in the providers
- BrowserModule
- AppRoutingModule
- AppComponent
- HomeComponent
- NotFoundComponent
- NgxChartsModule : Provide everything to create the charts needed for the project
- BrowserAnimationsModule
- DetailComponent
- RouterLink

# Dependencies
* @angular/animations: ^18.0.3
* @angular/common: ^18.0.3
* @angular/compiler: ^18.0.3
* @angular/core: ^18.0.3
* @angular/forms: ^18.0.3
* @angular/platform-browser: ^18.0.3
* @angular/platform-browser-dynamic: ^18.0.3
* @angular/router: ^18.0.3
* @swimlane/ngx-charts: ^20.5.0
* d3: ^7.9.0
* rxjs: ~7.8.0
* tslib: ^2.3.0
* zone.js: ~0.14.3
* @angular-devkit/build-angular: ^18.0.3
* @angular/cli: ^18.0.3
* @angular/compiler-cli: ^18.0.3
* @types/d3-scale: ^4.0.8
* @types/d3-selection: ^3.0.10
* @types/d3-shape: ^3.1.6
* @types/jasmine: ~5.1.0
* jasmine-core: ~5.1.0
* karma: ~6.4.0
* karma-chrome-launcher: ~3.2.0
* karma-coverage: ~2.2.0
* karma-jasmine: ~5.1.0
* karma-jasmine-html-reporter: ~2.1.0
* typescript: ~5.4.2