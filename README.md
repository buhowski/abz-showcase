This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Structure

```scss
my-app/
├── public/          // This directory contains static files that will be served by the web server.
├── src/             // This directory contains the source code for the application.
│   ├── assets/      // Global assets like fonts, icons, images, etc.
│   ├── components/  // Contains the React components used in the application.
│   ├── styles/      // Contains global SCSS files for the application.
│   ├── App.js       // The main React component that serves as the root of the application.
│   ├── App.scss     // SCSS file for styling the App component and all other imported styles.
│   └── index.js     // The JavaScript entry point for the application.
├── .gitignore       // Specifies files and directories to be ignored by Git.
├── package.json     // Contains metadata about the project and its dependencies.
└── README.md        // The main documentation file for the project.

```

## Usage

In the project directory, you can run:

### Prerequisites

```
Node.js >= 20V

npm i

```

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
