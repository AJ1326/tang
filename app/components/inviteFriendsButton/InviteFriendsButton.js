import React from 'react';
import {StyleSheet, View, Text, Share} from 'react-native';
import {ButtonPrimary} from '../Buttons';
// import Share from 'react-native-share';
import theme from '../../constants/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const link = 'https://dummy.api.com/app';

const inviteFriends = async (inviteSuccess, inviteFailure) => {
  const shareOptions = {
    message:
      "Have you tried the byond table? I think you'll love it. Learn more at " +
      link,
  };
  try {
    const shareResponse = await Share.open(shareOptions);
    inviteSuccess(shareResponse);
  } catch (err) {
    inviteFailure(err);
  }
};

const InviteFriendsButton = ({inviteSuccess, inviteFailure}) => {
  return (
    <>
      <View style={styles.pageTitle}>
        <Text style={styles.titleText}>Do you love Byond Table?</Text>
        <Text style={styles.subTitleText}>Invite friends to use the app!</Text>
      </View>
      <View style={styles.shareButtonContainer}>
        <ButtonPrimary
          parentLabel="Account"
          buttonLabel="Invite Friends"
          onPress={() => inviteFriends(inviteSuccess, inviteFailure)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  titleText: {
    color: theme.text.dark,
    fontFamily: 'Bitter-Regular',
    fontSize: 24,
    marginBottom: hp('1%'),
  },
  subTitleText: {
    color: theme.text.dark,
    fontFamily: 'Bitter-Regular',
    fontSize: 16,
    marginBottom: hp('2%'),
  },
  shareButtonContainer: {
    marginVertical: 10,
    width: wp('92%'),
    paddingHorizontal: wp('4%'),
  },
});

export default InviteFriendsButton;
