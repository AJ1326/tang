import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import globalStyles from '../../../assets/styles/globalStyle';
import theme from '../../constants/theme';

const RadioButton = ({label, checked, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <View style={styles.circle}>
          {checked && <View style={styles.checkedCircle} />}
        </View>
        <Text style={[styles.label, globalStyles.labelMedium]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    marginLeft: 15,
  },
  checkedCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.success,
  },
});

export default RadioButton;
