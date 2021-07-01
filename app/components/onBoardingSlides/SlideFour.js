import React from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView } from 'react-native';
import theme from '../../constants/theme';
import globalStyles from '../../../assets/styles/globalStyle';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SlideFour = () => {
  return (
    <SafeAreaView style={globalStyles.onBoardingSlide}>
      <View style={styles.slideLayoutTop}>
        <Text style={styles.slideHeading}>
          Keep your things at one place.
        </Text>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/slider/ideas.gif')}
            style={styles.slideImage}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  slideImage: {
    width: wp('100%'),
    resizeMode: 'contain',
    maxHeight: hp('45%'),
  },
  slideHeading: {
    color: theme.dark,
    fontFamily: 'Bitter-Regular',
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 32,
    paddingHorizontal: 50,
    lineHeight: 36,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 220,
  },
  slideLayoutTop: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60
  },
});

export default SlideFour;
