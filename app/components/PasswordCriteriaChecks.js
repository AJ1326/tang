import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import theme from '../constants/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
Icon.loadFont();
IconIonicons.loadFont();

const RenderIcons = ({value}) => (
  <Text style={styles.icon}>
    {!value && <Icon name="circle" size={4} color={theme.text.dark} />}
    {value && (
      <IconIonicons name="checkmark" size={16} color={theme.text.light} />
    )}
  </Text>
);
const PasswordCriteriaChecks = ({invalidCriterias}) => {
  let isMinLength = !invalidCriterias.includes('min');
  let isUpperCase = !invalidCriterias.includes('uppercase');
  let isLowerCase = !invalidCriterias.includes('lowercase');
  let isDigits = !invalidCriterias.includes('digits');
  let isSymbols = !invalidCriterias.includes('symbols');
  return (
    <View style={styles.container}>
      <View style={styles.singleRow}>
        <RenderIcons value={isMinLength} />
        <Text style={[styles.errorText, isMinLength && styles.colorLight]}>
          At least 8 characters in length
        </Text>
      </View>

      <View style={styles.singleRow}>
        <RenderIcons value={isUpperCase && isLowerCase} />
        <Text
          style={[
            styles.errorText,
            isUpperCase && isLowerCase && styles.colorLight,
          ]}>
          Use upper and lower case characters
        </Text>
      </View>

      <View style={styles.singleRow}>
        <RenderIcons value={isDigits} />
        <Text style={[styles.errorText, isDigits && styles.colorLight]}>
          At least 1 number
        </Text>
      </View>

      <View style={styles.singleRow}>
        <RenderIcons value={isSymbols} />
        <Text style={[styles.errorText, isSymbols && styles.colorLight]}>
          At least 1 special character
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  singleRow: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
    alignContent: 'center',
  },
  icon: {
    marginRight: 6,
  },
  errorText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    fontWeight: 'normal',
    color: theme.text.dark,
  },
  colorLight: {
    color: theme.text.light,
  },
});

PasswordCriteriaChecks.propTypes = {
  invalidCriterias: PropTypes.array,
};

PasswordCriteriaChecks.defaultProps = {
  invalidCriterias: [],
};

export default PasswordCriteriaChecks;
