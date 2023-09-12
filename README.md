
# Heartva
This is the repository for Heartva, a web app for runners to connect to their Strava data and visualize heartrate, pace, and distance trends. It can be found at https://heartva.vercel.app

<kbd>
  <img width="1351" alt="image" src="https://github.com/l3onwu/heartva/assets/85681107/5ed70be6-536d-4c42-8787-421d47a89e30">
</kbd>


## Architecture
The web app frontend is built in **Typescript** with **React** and the create-react-app framework. The backend uses **Firebase**.

Deployment is handled by **Vercel.**

The app relies on the Strava API to retrieve user's running data. Visualization is handled by the **ChartJS** library and plugins.

## Development
You will need Node and `npm` installed, to run the code and install packages.

### Local env
You will need to sign up for an API key from Strava in order to make requests for user data. You will get a Client ID and a Client Secret, which you must add to .env. The Strava api is also used to authenticate users to access and view their data.

If you would like a working demo mode, then you will need a Strava athlete id for the person whose data you want to display, as well as their earliest activity date (approximate to a year).

Once you get these values, create a `.env` file in the project root directory.

```
REACT_APP_CLIENT_ID = ""  
REACT_APP_CLIENT_SECRET = ""  
REACT_APP_BASEURL = "http://localhost:3000"  
REACT_APP_IDOL_ID = ""  
REACT_APP_CREATED_AT = ""
```

## Frontend deep-dive
Navigate to the web app directory. Run `npm start` in development to view the app locally. As long as node modules are installed, and `.env` is set up, the app will run.

### Styles
The app uses **Chakra-UI** as a style framework with style props, an implementation of CSS-in-JS. While the app is intended to be responsive, the current design benefits from a larger display.

### ChartJS
Visualization uses the ChartJS library in addition to the **chartjs-plugin-crosshair** and **chartjs-adapter-luxon** plugins to allow the user to perform tooltip brushing on the main graph component (similar to Garmin Connect and Strava's graph components). Refer to the libraries' respective documentation.

### State 
State is handled with React's inbuilt `useState`, along with custom hooks which are given scope with React's context API. The philosophy behind this is to simplify the app's design, reflecting the ethos of 'rapid production' and avoid using an external library like Redux. 

The core state management is implemented in two hooks. The `useInitialDownload` hook downloads a user's Strava data and stores it in Firebase on a user's first login. This is to prevent expensive calls to the Strava api on future loads. `useUserSettings` retrieves Strava user and activities data from Firebase following the initial download. It also checks the Strava api for a user's new activities to add to Firebase.

Prop drilling is avoided through the context API, and nesting the app in a context component allows access to the hooks from any component in the app.

```
const { userHook } = useGlobalContext();
```
