import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import theme from '../../constants/theme';
import globalStyles from '../../../assets/styles/globalStyle';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect from 'react-native-picker-select';
Icon.loadFont();

const PickerField = ({
  placeholder,
  value,
  showErrorText,
  errorText,
  style,
  onValueChange,
  items,
  pickerStyle = 'box',
  ...props
}) => {
  return (
    <View style={[...style]}>
      <View style={styles.inputContainer}>
        <RNPickerSelect
          value={value}
          style={{
            inputIOS:
              pickerStyle == 'box'
                ? globalStyles.textInputPrimary
                : globalStyles.pickerUnderlined,
            inputAndroid:
              pickerStyle == 'box'
                ? globalStyles.textInputPrimary
                : globalStyles.pickerUnderlined,
            iconContainer: {
              top: 18,
              right: 20,
              opacity: pickerStyle === 'box' ? 1 : 0,
            },
          }}
          onValueChange={value => onValueChange(value)}
          placeholder={{
            label: placeholder,
            value: '',
          }}
          {...props}
          Icon={() => (
            <Icon name="caret-down" size={16} color={theme.icons.gray} />
          )}
          items={items}
        />
        {showErrorText && (
          <Text style={[globalStyles.errorText, styles.textInputTopMargin]}>
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
  iconContainer: {
    position: 'absolute',
    top: 13,
    right: 10,
  },
  textInputTopMargin: {
    marginTop: 10,
  },
});

PickerField.propTypes = {
  placeholder: PropTypes.string,
  onValueChange: PropTypes.func,
  showErrorText: PropTypes.bool,
  errorText: PropTypes.string,
  style: PropTypes.array,
};

PickerField.defaultProps = {
  placeholder: 'Choose State',
  showErrorText: false,
  errorText: 'Please enter valid entry.',
  style: [],
  value: '',
};

export default PickerField;
