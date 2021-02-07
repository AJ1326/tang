import React from 'react';
import {StyleSheet, View, Text, Linking} from 'react-native';
import theme from '../constants/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ButtonPrimary} from '../components/Buttons';

const Documentation = () => (
  <View style={styles.container}>
      <View style={[styles.card, styles.contactCard]}>
        <Text style={[styles.labelMedium, styles.loadingText]}>
          Click below to check the documentation.
        </Text>
        <View style={styles.buttonContainer}>
      <ButtonPrimary
          parentLabel="Documentation"
          buttonLabel="View documentation"
          onPress={() => {
            Linking.openURL('https://docs.google.com/document/d/1ErCgn7USlPNvCrFmqHbcpGcE8cMvLOY3Xp1D9awtX2s/edit?usp=sharing')
         }}
      />
    </View>
      </View>
  </View>
)

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
  contactCard: {
    marginTop: 10,
    paddingBottom: hp('7%'),
  },
  card: {
    borderRadius: 6,
    backgroundColor: theme.white,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
    padding: 12,
    width: '100%',
  },
  scrollView: {
    backgroundColor: theme.background.light,
  },
  contactCards: {
    flex: 1,
    marginHorizontal: wp('4%'),
  },
  buttonContainer: {
    flex: 1,
    marginVertical: 40,
    width: wp('92%'),
    paddingHorizontal: wp('4%'),
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

export default Documentation;
