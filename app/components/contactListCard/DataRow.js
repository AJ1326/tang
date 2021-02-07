import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import ContactListTypeEnum from '../../constants/enums/contactListTypeEnum';
import TextField from '../../components/formFields/TextField';
import theme from '../../constants/theme';

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
      return contactData.map((data, i) => {
        return (
          <View style={styles.contactActivityItem} key={i}>
            <Text style={styles.contactDataEmailText}>{data.email}</Text>
          </View>
        );
      });
    case ContactListTypeEnum.PHONENUMBERS:
      return contactData.map((data, i) => {
        return (
          <View style={styles.contactActivityItem} key={i}>
            { i === 0 ? 
            (
              <View>
                <Text style={[styles.inputTopMargin, styles.infoMessage]}>
                  *Only to show, Cannot edit the phone number.
                </Text>
                <TextField
                  value={data.number}
                  placeholder="Selected user phone number."
                  style={[styles.inputTopMargin]}
                  returnKeyType="done"
                />
              </View>
            ) :
            <Text style={styles.contactActivityName, styles.inputTopMargin}>{data.number}{' '}({data.label})</Text>}
          </View>
        );
      });
  }
};

const DataRow = ({label, valueArr, contactTypeStatus, style}) => {
    return (
      <View style={[styles.infoContainer, ...style]}>
        <Text style={[styles.labelMedium, styles.infoLabel]}>{label}</Text>
        <View style={[styles.labelMedium]}>
          {displayContactListData(valueArr, contactTypeStatus)}
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: hp('3%'),
  },
  infoLabel: {
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  infoMessage: {
    color: theme.red,
    fontFamily: 'OpenSans-Regular',
    fontSize: 10,
  },
  labelMedium: {
    color: theme.text.dark,
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
  },
  inputTopMargin: {
    marginTop: 10,
  },
  contactActivityItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  contactDataEmailText: {
    color: theme.contactList.text.light,
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 15,
    marginTop: 5,
  },
  contactDetailDataText: {
    color: theme.text.dark,
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    letterSpacing: 0,
    lineHeight: 18,
    marginTop: 0,
  },
});

DataRow.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  style: PropTypes.array,
};

DataRow.defaultProps = {
  label: 'Label',
  value: '',
  style: [],
};

export default DataRow;
