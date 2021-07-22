# Summary

This frontend app used `react-router-dom` to enable client-side navigation, `react-redux` and `redux` to handle some state throughout the whole app. At this stage, I decided to use state to only keep track of auth state, that is which user is logged, and get the movie data through API calls. Authentication process is via token, as I've always used basic authentication (username and password), and decided I was a good time to put something new into practice, the token is not stored in the state, as I wasn't sure the immediate implications it might have, and was stored in localStorage, so, API calls that needs authentication retrieve the token from localStorage. To add icons I chose the `material-ui` library (also something new to me, as I frequently use fontAwesome as my source of icons). To handle date format I decided to use the `luxon` library, as the team behind `moment.js` recommended it for newer projects. Initially I considered having more state management through redux, and considering the amount of AJAX used, I installed `redux-thunk` to dispatch actions, but as I moved into the project I wasn't sure if that was the right path. I might refactor this whole app with fresh eyes.
Clean up for asynchronous process can definitely be improved.
The app is loaded from `index.js` which imports the `AppRouter`.

# Plan
- check if I can retrieve/push data from django backend API.
    - GET request for movie list.
    - POST request to register user.
    - POST request to add movie review with valid credentials.
- think about how the state will be configured
    - token
    - ~~movie list~~
    - user id
- think how many 'pages' will be needed.
- build card component or something to display movie information.
- build component to display reviews about movie.

## Advances
* installed react-router-dom. 
* installed react-redux and redux-thunk.
* added AbortController to cancel fetch call when unmounting components
* succesfully retrieved movie list.
* successfully made post request to token auth endpoint and set state
* successfully dispatched action to clear state
* successfully incorporated AppRouter
* successfully added header/navbar
* successfully retrieved movie details.
* successfully redirected from Watchlist at logout.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)


### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

