import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import theme from '../../constants/theme';
import globalStyles from '../../../assets/styles/globalStyle';
import PropTypes from 'prop-types';

const PhoneInput = ({
  phoneNumber,
  setPhoneNumber,
  e164PhoneNumber,
  setE164PhoneNumber,
  placeholder,
  style,
  value,
  onBlur,
  onChangeText,
  onFocus,
  errorText,
  showErrorText,
  maxLength,
  autoFocus,
  ...props
}) => {
  const [focus, setFocus] = useState(false);

  const handleBlur = () => {
    setFocus(false);
    onBlur && onBlur();
  };

  const handleFocus = () => {
    setFocus(true);
    onFocus && onFocus();
  };

  return (
    <View style={[...style]}>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={theme.text.placeHolder}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          style={[
            globalStyles.textInputPrimary,
            focus && globalStyles.textInputPrimaryFocused,
          ]}
          maxLength={maxLength}
          keyboardType={'numeric'}
          onBlur={handleBlur}
          autoFocus={autoFocus}
          setPhoneNumber={setPhoneNumber}
          setE164PhoneNumber={setE164PhoneNumber}
          {...props}
        />
      </View>
      {showErrorText && (
        <Text style={[globalStyles.errorText, styles.textInputTopMargin]}>
          {errorText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
  },
  textInputTopMargin: {
    marginTop: 10,
  },
});

PhoneInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  showErrorText: PropTypes.bool,
  errorText: PropTypes.string,
  style: PropTypes.array,
};

PhoneInput.defaultProps = {
  placeholder: '10-digit Mobile Phone Number',
  value: '',
  showErrorText: false,
  errorText: 'Please enter valid 10-digit mobile phone number.',
  style: [],
};

export default PhoneInput;
