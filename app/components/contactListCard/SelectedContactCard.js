import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DataRow from './DataRow';
import SelectedCardHeading from './SelectedCardHeading';
import {useNavigation} from '@react-navigation/native';
import theme from '../../constants/theme';

const ContactProfile = ({contact}) => (
  <View style={styles.imageContainer}>
    {contact.imageAvailable
      ? 
      <Image source={{uri: contact.image.uri}} style={styles.userImage} />
      :
      <Image source={require('../../../assets/images/contactReport/avatar.png')} style={styles.userImage} />
    }
    <View>
      <Text style={[styles.labelMedium, styles.userName]}>{contact.name}</Text>
    </View>
  </View>
);

const ContactDetailCard = ({contact}) => {
  return (
    <View style={[styles.card, styles.contactCard]}>
      <SelectedCardHeading label="Selected Contact" />
      <View style={styles.contactCardBody}>
        <ContactProfile
          contact={contact}
        />
        {contact.company && contact.jobTitle && <DataRow label="Details" valueArr={contact} contactTypeStatus='Details'/>}
        {contact.emails && <DataRow label="Email" valueArr={contact.emails} contactTypeStatus='Emails'/>}
        {contact.phoneNumbers && <DataRow label="Phone Numbers" valueArr={contact.phoneNumbers} contactTypeStatus='PhoneNumbers' />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactCard: {
    marginTop: 10,
    paddingBottom: hp('3%'),
  },
  labelMedium: {
    color: theme.text.dark,
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
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
  contactCardBody: {
    marginHorizontal: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2.5%'),
  },
  userImage: {
    width: wp('18%'),
    height: wp('18%'),
    marginRight: wp('5%'),
    resizeMode: 'cover',
    borderRadius: wp('9%'),
  },
  userName: {
    textTransform: 'capitalize',
    fontSize: 17,
    marginBottom: hp('0.6%'),
  },
});

export default ContactDetailCard;
