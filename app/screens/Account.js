import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import theme from '../constants/theme';
import {connect} from 'react-redux';
import {
  logout,
  updateProfilePicture,
  inviteSuccess,
  inviteFailure,
} from '../redux/modules/actions/userActions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ButtonPrimary} from '../components/Buttons';
import AccountDetailsCard from '../components/accountCards/AccountDetailsCard';
import AccountProfileDetailCard from '../components/accountCards/AccountProfileDetailCard';
import HelpCard from '../components/accountCards/HelpCard';
import Loading from './Loading';
import InviteFriendsButton from '../components/inviteFriendsButton/InviteFriendsButton';

const Account = ({
  fullName,
  logout,
  updateProfilePicture,
  profilepic,
  email,
  version,
  inviteSuccess,
  inviteFailure,
}) => {
  return (
    <View style={styles.container}>
      <Loading />
      <ScrollView style={styles.scrollView}>
        <View style={styles.accountCards}>
          <InviteFriendsButton
            inviteSuccess={inviteSuccess}
            inviteFailure={inviteFailure}
          />
            <AccountDetailsCard
              email={email}
              name={fullName}
              image={profilepic}
              updateProfilePicture={updateProfilePicture}
            />
          {/* <AccountProfileDetailCard
            memberName={memberName}
            insuranceProvider={insuranceProvider}
            name={fullName}
          /> */}
          <HelpCard />
          <View style={styles.buttonContainer}>
            <ButtonPrimary
              parentLabel="Account"
              buttonLabel="Log out"
              onPress={() => {
                logout();
              }}
            />
            <View style={styles.versionView}>
              <Text style={styles.versionText}>Version: {version}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
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
  scrollView: {
    backgroundColor: theme.background.light,
  },
  container: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: theme.background.light,
  },
  accountCards: {
    flex: 1,
    marginHorizontal: wp('4%'),
  },
  shareButtonContainer: {
    marginVertical: 10,
    width: wp('92%'),
    paddingHorizontal: wp('4%'),
  },
  buttonContainer: {
    flex: 1,
    marginVertical: 40,
    width: wp('92%'),
    paddingHorizontal: wp('4%'),
  },
  versionView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  versionText: {
    color: theme.text.dark,
    fontFamily: 'Bitter-Regular',
    fontSize: 16,
  },
});

export default connect(
  ({user, application}) => ({
    version:
      application && application.versionData && application.versionData.version
        ? application.versionData.version
        : '0.0.0',
    fullName: 'Abhishek Jaimini',
    profilepic: false,
    email: 'jaiminiabhishek@gmail.com',
  }),
  {logout, updateProfilePicture, inviteSuccess, inviteFailure},
)(Account);
