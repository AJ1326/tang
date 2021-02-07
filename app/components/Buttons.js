import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import theme from '../constants/theme';

const handleOnPress = (parentLabel, buttonLabel, onPress) => {
  onPress && onPress();
};

export const ButtonPrimary = ({
  parentLabel,
  buttonLabel,
  onPress,
  isDisabled,
  style = {},
}) => {
  return (
    <TouchableOpacity
      onPress={() => handleOnPress(parentLabel, buttonLabel, onPress)}
      disabled={isDisabled}
      style={style}>
      <View style={[styles.buttonPrimary, isDisabled && styles.disabledButton]}>
        <Text style={styles.buttonPrimaryText}>{buttonLabel}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const ButtonSecondary = ({
  parentLabel,
  buttonLabel,
  onPress,
  isDisabled,
  style = {},
}) => {
  return (
    <TouchableOpacity
      onPress={() => handleOnPress(parentLabel, buttonLabel, onPress)}
      disabled={isDisabled}
      style={style}>
      <View
        style={[styles.buttonSecondary, isDisabled && styles.disabledButton]}>
        <Text style={styles.buttonSecondaryText}>{buttonLabel}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const ButtonPlain = ({
  parentLabel,
  buttonLabel,
  onPress,
  isDisabled,
}) => {
  return (
    <TouchableOpacity
      onPress={() => handleOnPress(parentLabel, buttonLabel, onPress)}>
      <Text style={[styles.buttonPlain, isDisabled && styles.disabledButton]}>
        {buttonLabel}
      </Text>
    </TouchableOpacity>
  );
};

export const ButtonFormAction = ({
  parentLabel,
  buttonLabel,
  onPress,
  isDisabled = false,
  textAlign = 'center',
  icon,
}) => {
  return (
    <TouchableOpacity
      onPress={() => handleOnPress(parentLabel, buttonLabel, onPress)}>
      <View style={[styles.buttonFormAction, {justifyContent: textAlign}]}>
        {!!icon && icon}
        <Text
          style={[
            styles.buttonFormActionText,
            isDisabled && styles.disabledButton,
          ]}>
          {buttonLabel}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonPrimary: {
    height: 56,
    borderRadius: 27,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonPrimaryText: {
    color: theme.white,
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonSecondary: {
    height: 56,
    borderRadius: 27,
    borderColor: theme.secondary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonSecondaryText: {
    color: theme.secondary,
    fontFamily: 'OpenSans-Bold',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonPlain: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 13,
    color: theme.success,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  buttonFormAction: {
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.background.blue,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  buttonFormActionText: {
    fontFamily: 'OpenSans-SemiBoldItalic',
    fontSize: 16,
    color: theme.icons.active,
    textAlignVertical: 'center',
  },
});
