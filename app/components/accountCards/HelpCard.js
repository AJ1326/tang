import React from 'react';
import theme from '../../constants/theme';
import {StyleSheet, View, Text, Linking} from 'react-native';
import globalStyles from '../../../assets/styles/globalStyle';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
IconEvilIcons.loadFont();

export const HelpDataRow = ({lable, value, onPress}) => (
  <Text style={[globalStyles.labelMedium, styles.phoneNumber]}>
    {lable + ' '}
    <Text
      style={[globalStyles.primaryLink, styles.highlightedText]}
      onPress={onPress}>
      {value}
    </Text>
  </Text>
);

const HelpCard = () => {
  return (
    <View style={[globalStyles.card, styles.accountsCard]}>
      <View style={styles.helpHeader}>
        <Text>
          <IconEvilIcons name={'question'} size={38} color={theme.text.dark} />
        </Text>
        <Text style={[globalStyles.labelMedium, styles.infoLabel]}>Help</Text>
      </View>
      <View style={styles.accountsCardBody}>
        <HelpDataRow
          lable="Call:"
          value="(877) 763-3343"
          onPress={() => {
            Linking.openURL(`tel:${'8777633343'}`);
          }}
        />
        <HelpDataRow
          lable="Email:"
          value="support@careheroes.com"
          onPress={() => Linking.openURL('mailto:support@careheroes.com')}
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
  phoneNumber: {
    marginBottom: hp('1%'),
  },
  helpHeader: {
    alignItems: 'center',
    marginTop: hp('1%'),
    flexDirection: 'row',
  },
  highlightedText: {
    color: theme.link.secondary,
    textDecorationLine: 'none',
  },
  accountsCardBody: {
    marginHorizontal: 4,
    paddingTop: hp('1%'),
  },
  infoLabel: {
    fontWeight: 'bold',
  },
});

export default HelpCard;
