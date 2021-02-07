import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import theme from '../../constants/theme';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const AppLoader = () => (
  <View style={styles.container}>
    <Text>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: theme.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppLoader;
