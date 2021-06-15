

# Getting started

1. Go to project folder and install dependencies:
 ```bash
 npm install
 ```
 
2. Launch development server, and open `http://localhost:190001` in your browser:
 ```bash
 expo start
 ```
Click on IOS/Android Emulator if checking locally else install expo app from playstore and scan the QR code to see the app on your phone.

# Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

Tasks                         | Description
------------------------------|---------------------------------------------------------------------------------------
expo start                     | Run development server on `http://localhost:19000/`
expo start --android     |  Run android mode
expo start --ios     	 |  Run android mode


### Libraries
- [React Navigation](https://reactnavigation.org/)
- [React Native Gesture Handler](https://github.com/kmagiera/react-native-gesture-handler)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [Redux](http://redux.js.org/) with [hooks](https://react-redux.js.org/api/hooks) support
- [Redux Saga](https://redux-saga.js.org/)
- [Redux Persist](https://github.com/rt2zz/redux-persist/)
- [Expo](https://docs.expo.io/)	
	- expo contacts, fonts, app-loading(https://docs.expo.io/versions/latest/sdk/contacts/)

### Steps
1. Clone this repo, `git clone `
2. Go to project's root directory, `cd tang`
3. Run `npm` to install dependencies
4. Start the packager with `expo start`
5. Connect a mobile device to your development machine by clicking open ios/android emulator
6. Run the test application:
- On Android:
  - Run `expo start --android`
- On iOS:
  - Run `expo start --ios`
7. Enjoy!!!
