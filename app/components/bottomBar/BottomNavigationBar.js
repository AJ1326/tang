import React from 'react';
import 'react-native-gesture-handler';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet, SafeAreaView, View, Platform} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AddButton from './AddButton';
import TabButton from './TabButton';
import theme from '../../constants/theme';

IconIonicons.loadFont();

const BottomNavigationBar = ({state, navigation}) => {
  let currentRoute = state.routeNames[state.index];
  const onPress = route => {
    navigation.navigate(route);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonWrapper}>
        <TabButton
          onPress={() => onPress('Home')}
          inactiveIcon="person-circle-outline"
          activeIcon="person-circle"
          inactiveColor={theme.icons.inactive}
          activeColor={theme.icons.active}
          label="Home"
          isActive={currentRoute === 'Home'}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <AddButton navigation={navigation} />
      </View>
      <View style={styles.buttonWrapper}>
        <TabButton
          onPress={() => onPress('Documentation')}
          inactiveIcon="book-outline"
          activeIcon="book"
          inactiveColor={theme.icons.inactive}
          activeColor={theme.icons.active}
          label="Documentation"
          isActive={currentRoute === 'Documentation'}
        />
      </View>
    </SafeAreaView>
  );
};

export default BottomNavigationBar;

const styles = StyleSheet.create({
  container: {
    paddingTop: hp('1%'),
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 15,
    shadowRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: theme.white,
    height: hp('11%'),
    borderTopColor: 'rgba(0,0,0,0.12)',
    borderTopWidth: Platform.OS === 'ios' ? 0 : 2,
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
  },
});
