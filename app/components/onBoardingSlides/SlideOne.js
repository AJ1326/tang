import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
import theme from '../../constants/theme';
import globalStyles from '../../../assets/styles/globalStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SlideOne = () => {
  return (
    <SafeAreaView style={[globalStyles.onBoardingSlide, styles.container]}>
      <Image
        source={require('../../../assets/images/slider/bg-bynd.png')}
        style={styles.slideImage}
      />
      <View style={globalStyles.onBoardingSlideContents}>
        <Image
          source={require('../../../assets/images/slider/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.slideHeading}>
          Build for the people who "Born To Chase"
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  slideImage: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    width: '100%',
  },
  logo: {
    width: wp('100%'),
    maxHeight: hp('10%'),
    resizeMode: 'contain',
  },
  slideHeading: {
    color: theme.white,
    fontFamily: 'Bitter-Regular',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 100,
    paddingHorizontal: 44,
    lineHeight: 36,
  },
});

export default SlideOne;
