import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

const ContactCardHeading = ({label}) => {
  return (
    <Text style={[styles.pageTextHeading, styles.cardHeading]}>
      {label}
    </Text>
  );
};

const styles = StyleSheet.create({
  cardHeading: {
    marginLeft: 4,
    marginVertical: hp('1%'),
    fontSize: 18,
  },
});

ContactCardHeading.propTypes = {
  label: PropTypes.string,
  style: PropTypes.array,
};

ContactCardHeading.defaultProps = {
  label: 'Label',
  style: [],
};

export default ContactCardHeading;
