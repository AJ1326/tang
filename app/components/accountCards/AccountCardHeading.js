import React from 'react';
import {StyleSheet, Text} from 'react-native';
import globalStyles from '../../../assets/styles/globalStyle';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

const AccountCardHeading = ({label, style}) => {
  return (
    <Text style={[globalStyles.pageTextHeading, styles.cardHeading]}>
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

AccountCardHeading.propTypes = {
  label: PropTypes.string,
  style: PropTypes.array,
};

AccountCardHeading.defaultProps = {
  label: 'Label',
  style: [],
};

export default AccountCardHeading;
