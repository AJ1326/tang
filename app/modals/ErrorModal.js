import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../constants/theme';
import BaseModal from '../components/modal/BaseModal';
import {connect} from 'react-redux';
import {errorResponces} from '../constants/errorResponces';
const ErrorModal = ({
  onClose,
  isModalOpen,
  parentLabel,
  errorText,
  isShowCloseIcon = true,
}) => {
  return (
    <BaseModal
      isShowCloseIcon={isShowCloseIcon}
      isModalOpen={isModalOpen}
      onClose={onClose}
      parentLabel={parentLabel}
      modalName="Error Modal">
      <View style={styles.info}>
        <Image
          source={require('../../assets/images/sad.png')}
          style={styles.sadImage}
        />
        <Text style={[styles.pageTextHeading, styles.errorText]}>
          Oops…{'\n'}
          {errorResponces.UNKNOWN_ERROR}
        </Text>
        <Text style={[styles.labelMedium, styles.errorSubText]}>
          {errorText}
        </Text>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  info: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.white,
  },
  errorText: {
    textAlign: 'center',
  },
  sadImage: {
    marginTop: hp('10%'),
    maxWidth: wp('30%'),
    resizeMode: 'contain',
    marginBottom: 20,
  },
  errorSubText: {
    fontWeight: 'bold',
    marginTop: hp('2%'),
    paddingHorizontal: wp('5%'),
    textAlign: 'center',
  },
  pageTextHeading: {
    color: theme.text.dark,
    fontFamily: 'Bitter-Regular',
    fontSize: 24,
  },
  labelMedium: {
    color: theme.text.dark,
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
  },
});

export default connect(({errorModal, popup}) => ({
  isModalOpen: !!popup.ERROR_POPUP,
  errorText: errorModal.errorText,
}))(ErrorModal);
