import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../constants/theme';
import BaseModal from '../../components/modal/BaseModal';
import {ButtonPrimary, ButtonSecondary} from '../../components/Buttons';
import globalStyles from '../../assets/styles/globalStyle';

const ConfirmModal = ({
  onClose,
  isModalOpen,
  confirmRedeemReward,
  confirmModalText,
  confirmModalButtonLabel,
  parentLabel,
}) => {
  return (
    <BaseModal
      isModalOpen={isModalOpen}
      onClose={onClose}
      parentLabel={parentLabel}
      isShowCloseIcon={false}
      modalName="Confirm Modal">
      <View style={styles.confirmModalContainer}>
        <Text
          style={[globalStyles.pageTextHeading, styles.confirmModalHeading]}>
          Are you sure?
        </Text>
        <Text style={styles.confirmModalText}>{confirmModalText}</Text>
        <View style={styles.buttonContainer}>
          <ButtonPrimary
            buttonLabel={confirmModalButtonLabel}
            onPress={confirmRedeemReward}
          />
          <ButtonSecondary buttonLabel="Cancel" onPress={onClose} />
        </View>
      </View>
    </BaseModal>
  );
};

const styles = StyleSheet.create({
  confirmModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmModalHeading: {
    letterSpacing: 0,
    lineHeight: 28,
  },
  confirmModalText: {
    width: wp('86%'),
    color: theme.text.dark,
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 22,
    marginTop: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 80,
    marginBottom: 20,
    marginHorizontal: wp('7%'),
    width: wp('86%'),
    position: 'relative',
  },
});

export default ConfirmModal;
