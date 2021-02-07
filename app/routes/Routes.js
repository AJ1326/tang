import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppRoutes from './AppRoutes';
import {StyleSheet} from 'react-native';
import ErrorModal from '../modals/ErrorModal';
import {hidePopup} from '../redux/modules/actions/popupAction';
import PopupEnum from '../constants/enums/popupEnum';
import {
  removeErrorText,
  showErrorPopup,
} from '../redux/modules/actions/errorModalAction';
import Contact from '../screens/Contact';


export const Stack = createStackNavigator();

const handleOnReady = (routeNameRef, navigationRef) => {
  routeNameRef.current = navigationRef.current.getCurrentRoute().name;
};

const handleErrorModalClose = (hidePopup, removeErrorText) => {
  removeErrorText();
  hidePopup(PopupEnum.ERROR_POPUP);
};

const Routes = ({
  hidePopup,
  removeErrorText,
}) => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      style={styles.container}
      onReady={() => handleOnReady(routeNameRef, navigationRef)}
      >
      <ErrorModal
        isShowCloseIcon={true}
        onClose={() => handleErrorModalClose(hidePopup, removeErrorText)}
        parentLabel="App"
      />
        <Stack.Navigator initialRouteName="AppRoutes">
          <Stack.Screen
            name="AppRoutes"
            component={AppRoutes}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="contact"
            component={Contact}
            options={{headerShown: true}}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(
  ({}) => ({}),
  {hidePopup, showErrorPopup, removeErrorText},
)(Routes);
