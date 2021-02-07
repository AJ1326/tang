import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import theme from '../constants/theme';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Loading = ({visible, loadingText}) =>
  visible ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.background.blue} />
      <Text style={[styles.labelMedium, styles.loadingText]}>
        {loadingText}
      </Text>
    </View>
  ) : null;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: theme.background.light,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10000,
    elevation: 1000,
  },
  loadingText: {
    paddingHorizontal: wp('10%'),
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  labelMedium: {
    color: theme.text.dark,
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
  },
});

export default connect(({loader}) => ({
  visible: !!loader.visible,
  loadingText: loader.loadingText,
}))(Loading);
