import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import globalStyles from '../../../assets/styles/globalStyle';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

const DataRow = ({label, value, style}) => {
  return (
    <View style={[styles.infoContainer, ...style]}>
      <Text style={[globalStyles.labelMedium, styles.infoLabel]}>{label}</Text>
      <Text style={[globalStyles.labelMedium]}>{value}</Text>
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
