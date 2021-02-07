import React from 'react';
import theme from '../../constants/theme';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import ContactListTypeEnum from '../../constants/enums/contactListTypeEnum';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

const displayContactListData = (contactData, contactTypeStatus) => {
  switch (contactTypeStatus) {
    case ContactListTypeEnum.DETAILS:
      return (
        <Text style={styles.contactDetailDataText}>
          {contactData.contactType}
          {contactData.JobTitle  && ',' + contactData.JobTitle}
          {contactData.company  && ',' + contactData.company}{' '}
        </Text>
      );
    case ContactListTypeEnum.EMAILS:
      return contactData.emails.map((data, i) => {
        return (
          <View style={styles.contactActivityItem} key={i}>
            <Text style={styles.contactDataEmailText}>{data.email}</Text>
          </View>
        );
      });
    case ContactListTypeEnum.PHONENUMBERS:
      return contactData.phoneNumbers.map((data, i) => {
        return (
          <View style={styles.contactActivityItem} key={i}>
            <Text>
              <Icon name="circle" size={4} color={theme.text.dark} />
            </Text>
            <Text style={styles.contactActivityName}>{data.number}{' '}({data.label})</Text>
          </View>
        );
      });
  }
};

const displayContactHeading = contact => {
  return contact;
};

const displayContactGiverProfilePic = (contactData, contactName) => {
  return (<View style={styles.logoCircleView}>
    {contactData.imageAvailable
      ? 
        <Image
          style={styles.profilePic}
          source={{
            uri: contactData.image.uri,
          }}
        />
      : 
        <Image
          style={styles.profilePic}
          source={require('../../../assets/images/contactReport/avatar.png')}
        />
    }
  </View>)
}

const ContactListCard = ({contactData, contactName, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.boxContainer}>
        <View style={styles.boxView}>
          <View style={styles.imageContainer}>
            {displayContactGiverProfilePic(contactData, contactName)}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.contactDataHeader}>
              {displayContactHeading(contactName)}
            </Text>
            {displayContactListData(contactData, 'Details')}
            {contactData.phoneNumbers && displayContactListData(contactData, 'PhoneNumbers')}
            <View style={styles.contactEmailDisplayDataContainer}>
                {contactData.emails && displayContactListData(contactData, 'Emails')}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    paddingHorizontal: 11,
  },
  boxView: {
    paddingTop: 15,
    paddingHorizontal: 25,
    paddingBottom: 14,
    backgroundColor: theme.white,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 6,
    shadowColor: theme.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 12,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircleView: {
    height: 34,
    width: 34,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  },
  profilePic: {
    height: 44,
    width: 44,
    borderRadius: 64,
    marginLeft: -10,
  },
  textContainer: {
    marginLeft: 13,
    flex: 1,
  },
  contactDataHeader: {
    color: theme.text.dark,
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 22,
    marginBottom: 4,
  },
  contactDetailDataText: {
    color: theme.text.dark,
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    letterSpacing: 0,
    lineHeight: 18,
    marginTop: 0,
  },
  contactEmailDisplayDataContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 4,
  },
  contactDataEmailText: {
    color: theme.contactList.text.light,
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    letterSpacing: 0,
    lineHeight: 15,
    marginTop: 5,
  },
  contactActivityItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  contactActivityName: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    fontWeight: 'normal',
    color: theme.text.dark,
    marginLeft: 4,
  },
});

export default ContactListCard;
