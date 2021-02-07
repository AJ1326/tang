import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import theme from '../../constants/theme';
import PropTypes from 'prop-types';

const TextField = ({
  placeholder,
  value,
  onBlur,
  onFocus,
  onChangeText,
  showErrorText,
  errorText,
  style,
  type = 'text',
  textFieldStyle = 'box',
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const isTextArea = type !== 'text';
  const handleFocus = () => {
    setFocus(true);
    onFocus && onFocus();
  };

  const handleBlur = () => {
    setFocus(false);
    onBlur && onBlur();
  };

  return (
    <View style={[...style]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            !isTextArea && styles.textInputPrimary,
            !isTextArea &&
              focus &&
              textFieldStyle === 'box' &&
              styles.textInputPrimaryFocused,
            isTextArea && styles.textArea,
            textFieldStyle === 'underline' && styles.textFieldUnderlined,
          ]}
          placeholderTextColor={theme.text.placeHolder}
          placeholder={placeholder}
          autoCorrect={false}
          autoCompleteType="name"
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChangeText={onChangeText}
          {...props}
        />
        {showErrorText && (
          <Text style={[styles.errorText, styles.textInputTopMargin]}>
            {errorText}
          </Text>
        )}
      </View>
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
  textInputPrimary: {
    height: 54,
    width: '100%',
    borderRadius: 4,
    backgroundColor: theme.white,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 12,
    paddingHorizontal: 14,
    color: theme.text.dark,
    fontFamily: 'OpenSans-Regular',
    fontSize: 18,
    fontWeight: 'normal',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
  },
  textFieldUnderlined: {
    height: 40,
    borderBottomWidth: 0.25,
    borderRadius: 0,
    borderBottomColor: theme.border.gray,
    shadowOpacity: 0,
    paddingHorizontal: 0,
    elevation: 0,
  },
  textArea: {
    width: '100%',
    borderWidth: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    height: '100%',
    fontSize: 18,
    color: theme.text.dark,
    padding: 0,
    fontFamily: 'OpenSans-Regular',
  },
  textInputPrimaryFocused: {
    borderWidth: 1,
    borderColor: theme.border.primary,
  },
});

TextField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  showErrorText: PropTypes.bool,
  errorText: PropTypes.string,
  style: PropTypes.array,
};

TextField.defaultProps = {
  placeholder: '',
  value: '',
  showErrorText: false,
  errorText: 'Please enter valid entry.',
  style: [],
};

export default TextField;
