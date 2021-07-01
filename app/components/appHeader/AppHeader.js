import React from 'react';
import theme from '../../constants/theme';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AppHeader = ({}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaView}>
          <Text style={styles.headingName}>Livin</Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    backgroundColor: theme.icons.active,
    height: hp('12%'),
    width: wp('100%'),
    paddingBottom: hp('1%'),
  },
  safeAreaView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('100%'),
    flexDirection: 'row',
    marginLeft: wp('2%'),
    marginRight: wp('3%'),
  },
  headingName: {
    color: theme.white,
    fontFamily: 'Bitter-Regular',
    fontSize: 20,
  },
});

export default AppHeader;
