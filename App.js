import React from 'react'
import { StyleSheet, View } from 'react-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { Provider } from 'react-redux'
import * as Icon from '@expo/vector-icons'
import Routes from './app/routes/Routes';
import configureStore from './app/redux/configureStore';

const reduxStore = configureStore();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
            <Provider store={reduxStore}>
                <Routes />
            </Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "Bitter-Regular": require('./assets/fonts/Bitter-Regular.ttf'),
        "OpenSans-Bold": require('./assets/fonts/OpenSans-Bold.ttf'),
        "OpenSans-Light": require('./assets/fonts/OpenSans-Light.ttf'),
        "OpenSans-Regular": require('./assets/fonts/OpenSans-Regular.ttf'),
        "OpenSans-SemiBoldItalic": require('./assets/fonts/OpenSans-SemiBoldItalic.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error of your screen
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});