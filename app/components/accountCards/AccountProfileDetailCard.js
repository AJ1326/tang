import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import globalStyles from '../../../assets/styles/globalStyle';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ButtonPlain} from '../Buttons';
import DataRow from './DataRow';
import AccountCardHeading from './AccountCardHeading';
import {useNavigation} from '@react-navigation/native';

const AccountProfileDetailCard = ({memberName, insuranceProvider, name}) => {
  const navigation = useNavigation();
  return (
    <View style={[globalStyles.card, styles.accountsCard]}>
      <AccountCardHeading label="Caregiving Details" />
      <View style={styles.accountsCardBody}>
        <DataRow
          label="Caring for"
          value={memberName}
          style={[styles.infoMarginTop]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  accountsCard: {
    marginTop: 10,
    paddingBottom: hp('3%'),
  },
  accountsCardBody: {
    marginHorizontal: 4,
    paddingTop: hp('1%'),
  },
  infoContainer: {
    marginTop: hp('3%'),
  },
  infoLabel: {
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  infoMarginTop: {
    marginTop: hp('0.8%'),
  },
  linkAsideView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AccountProfileDetailCard;
