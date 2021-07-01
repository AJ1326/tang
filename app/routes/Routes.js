import React from "react";
import "react-native-gesture-handler";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppRoutes from "./AppRoutes";
import { StyleSheet } from "react-native";
import ErrorModal from "../modals/ErrorModal";
import { hidePopup } from "../redux/modules/actions/popupAction";
import PopupEnum from "../constants/enums/popupEnum";
import {
  removeErrorText,
  showErrorPopup,
} from "../redux/modules/actions/errorModalAction";
import Contact from "../screens/Contact";
import OnBoarding from "../screens/OnBoarding";
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import PasswordReset from '../screens/PasswordReset';
import PasswordResetOtp from '../screens/PasswordResetOtp';
import NewPassword from '../screens/NewPassword';
import ChangePassword from '../screens/ChangePassword';
import Account from '../screens/Account';


export const Stack = createStackNavigator();

const handleOnReady = (routeNameRef, navigationRef) => {
  routeNameRef.current = navigationRef.current.getCurrentRoute().name;
};

const handleErrorModalClose = (hidePopup, removeErrorText) => {
  removeErrorText();
  hidePopup(PopupEnum.ERROR_POPUP);
};

const handleOnStateChange = (routeNameRef, navigationRef) => {
  const previousRouteName = routeNameRef.current;
  const currentRouteName = navigationRef.current.getCurrentRoute().name;

  if (previousRouteName !== currentRouteName) {
    AnalyticsUtil.logEventOnScreenChange(currentRouteName);
  }
  // Save the current route name for later comparision
  routeNameRef.current = currentRouteName;
};

const Routes = ({
  isLoggedIn,
  showErrorPopup,
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
      {!isLoggedIn ? (
        <Stack.Navigator initialRouteName="OnBoarding">
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PasswordReset"
            component={PasswordReset}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PasswordResetOtp"
            component={PasswordResetOtp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewPassword"
            component={NewPassword}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="AppRoutes">
          <Stack.Screen
            name="AppRoutes"
            component={AppRoutes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="contact"
            component={Contact}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Account"
            component={Account}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(
  ({ user }) => ({
    isLoggedIn: !!user.accessToken || !!user._id,
  }),
  { hidePopup, showErrorPopup, removeErrorText },
)(Routes);
