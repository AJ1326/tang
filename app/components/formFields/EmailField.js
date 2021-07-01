import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import theme from '../../constants/theme';
import globalStyles from '../../../assets/styles/globalStyle';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import ValidIconEnum from '../../constants/enums/validIconEnum';
Icon.loadFont();

const EmailField = ({
  placeholder,
  value,
  onBlur,
  onFocus,
  onChangeText,
  showErrorText,
  errorText,
  validIcon,
  style,
  ...props
}) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
    onFocus && onFocus();
  };

  const handleBlur = () => {
    setFocus(false);
    onBlur && onBlur();
  };

  const displayValidIcon = validIconStatus => {
    switch (validIconStatus) {
      case ValidIconEnum.NO_ICON:
        break;
      case ValidIconEnum.CHECK_ICON:
        return (
          <Text style={styles.iconContainer}>
            <Icon name="check" size={28} color={theme.success} />
          </Text>
        );
      case ValidIconEnum.CROSS_ICON:
        return (
          <Text style={styles.iconContainer}>
            <Icon name="times" size={28} color={theme.error} />
          </Text>
        );
    }
  };

  return (
    <View style={[...style]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            globalStyles.textInputPrimary,
            focus && globalStyles.textInputPrimaryFocused,
          ]}
          placeholderTextColor={theme.text.placeHolder}
          placeholder={placeholder}
          autoCorrect={false}
          autoCapitalize="none"
          autoCompleteType="email"
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChangeText={onChangeText}
          {...props}
        />
        {showErrorText && (
          <Text style={[globalStyles.errorText, styles.textInputTopMargin]}>
            {errorText}
          </Text>
        )}
        {displayValidIcon(validIcon)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    top: 13,
    right: 10,
  },
  textInputTopMargin: {
    marginTop: 10,
  },
});

EmailField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  showErrorText: PropTypes.bool,
  errorText: PropTypes.string,
  validIcon: PropTypes.string,
  style: PropTypes.array,
};

EmailField.defaultProps = {
  placeholder: 'Email',
  value: '',
  showErrorText: false,
  errorText: 'Please enter valid email.',
  validIcon: ValidIconEnum.NO_ICON,
  style: [],
};

export default EmailField;
