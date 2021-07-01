import React from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import theme from '../constants/theme';
import SelectedContactCard from '../components/contactListCard/SelectedContactCard';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ButtonPrimary} from '../components/Buttons';
import Loading from './Loading';
import {useNavigation} from '@react-navigation/native';

const Home = ({
  contact
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Loading />
      {contact.name ? (
        <ScrollView style={styles.scrollView}>
          <View style={styles.contactCards}>
            <SelectedContactCard
              contact={contact}
            />
            <View style={styles.buttonContainer}>
              <ButtonPrimary
                parentLabel="Contact"
                buttonLabel="Change contact"
                onPress={() => {
                  navigation.navigate('contact');
                }}
              />
            </View>
        </View>
        </ScrollView>
      ) :
      (
        <View style={styles.contactDataContainer}>
          <Text style={styles.contactDataHeading}>Add Settings</Text>
          <Text style={styles.contactDataText}>
            Click the plus icon to change color.
          </Text>
          <Image
            style={styles.addContactListArrow}
            source={require('../../assets/images/contactReport/addContactListReport.png')}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: theme.background.light,
  },
  container: {
    flex: 1,
    width: wp('100%'),
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
  contactDataContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  contactDataHeading: {
    color: theme.text.dark,
    fontFamily: 'Bitter-Regular',
    fontSize: 24,
    letterSpacing: 0,
    lineHeight: 31,
    textAlign: 'center',
  },
  contactDataText: {
    color: theme.text.dark,
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 30,
  },
  addContactListArrow: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    height: 49,
    width: 18,
    right: -40,
    marginTop: 8,
    marginBottom: 12,
  },
});

export default connect(
  ({contactList}) => ({
    contact: contactList.selectedContact === {} ? null : contactList.selectedContact,
  }),
  {},
)(Home);
