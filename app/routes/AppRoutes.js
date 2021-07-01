import React from 'react';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AppHeader from '../components/appHeader/AppHeader';
import Home from '../screens/Home';
import Account from '../screens/Account';
import {StyleSheet, SafeAreaView} from 'react-native';
import BottomNavigationBar from '../components/bottomBar/BottomNavigationBar';
import theme from '../constants/theme';
import {useNavigation} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const AppRoutes = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <AppHeader navigation={navigation} />
      <Tab.Navigator
        tabBar={props => <BottomNavigationBar {...props} />}
        initialRouteName="Home"
        backBehavior="history">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
export default AppRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background.light,
  },
});
