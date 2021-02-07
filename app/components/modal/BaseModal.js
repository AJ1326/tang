import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import theme from '../../constants/theme';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import Loading from '../../screens/Loading';
IconEvilIcons.loadFont();

const BaseModal = ({
  isModalOpen,
  onClose,
  children,
  parentLabel,
  modalName,
  isShowCloseIcon = true,
}) => {
  return (
    <Modal
      animationType="none"
      transparent={false}
      visible={isModalOpen}
      onRequestClose={onClose}
    >
      <View style={styles.modalWrapper}>
        <Loading />
        {isShowCloseIcon && (
          <SafeAreaView>
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <IconEvilIcons
                  name={'close'}
                  size={hp('4%')}
                  color={theme.icons.darkgray}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
        <View style={styles.modalBody}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: theme.white,
  },
  modalHeader: {
    height: hp('6%'),
    width: wp('100%'),
    alignItems: 'flex-end',
  },
  closeButton: {
    height: hp('6%'),
    marginRight: wp('2%'),
    justifyContent: 'center',
  },
  modalBody: {
    flex: 1,
  },
});

export default BaseModal;
