import React from 'react';
import {StyleSheet, View, Text, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import Loading from './Loading';
import AppBackButtonHeader from '../components/appBackButtonHeader/AppBackButtonHeader';
import theme from '../constants/theme';
import {ButtonPrimary} from '../components/Buttons';
import {verifyPhoneNumberAndGetOtp} from '../redux/modules/actions/userActions';
import {isNotEmpty} from '../utils/ObjectUtil.js';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {AsYouType} from 'libphonenumber-js';
import PhoneInput from '../components/formFields/PhoneInput';
import globalStyles from '../../assets/styles/globalStyle';

class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      e164PhoneNumber: '',
      shouldShowError: false,
      maxPhoneLength: 10,
      unFormattedPhone: '',
    };
  }

  onVerifyPhonePressed = () => {
    Keyboard.dismiss();
    if (this.state.e164PhoneNumber === '') {
      this.showErrorIfNeeded();
    } else {
      this.props.verifyPhoneNumberAndGetOtp({
        phone: this.state.e164PhoneNumber,
        navigateToOtpScreen: () => {
          this.props.navigation.navigate('PasswordResetOtp', {
            phoneNumber: this.state.phoneNumber,
          });
        },
      });
    }
  };

  showErrorIfNeeded = () => {
    if (!this.state.shouldShowError) {
      this.setShouldShowError(true);
    }
  };

  setPhoneNumber = phoneNumber => {
    this.setState({
      ...this.state,
      phoneNumber: phoneNumber,
    });
  };

  setE164PhoneNumber = e164PhoneNumber => {
    this.setState({
      ...this.state,
      e164PhoneNumber: e164PhoneNumber,
    });
  };

  setShouldShowError = shouldShowError => {
    this.setState({
      ...this.state,
      shouldShowError: shouldShowError,
    });
  };

  setUnFormattedPhone = unFormattedPhone => {
    this.setState({
      ...this.state,
      unFormattedPhone: unFormattedPhone,
    });
  };

  didEndEditingPhone = () => {
    if (this.state.phoneNumber !== null) {
      let countryCode = 'IND';
      const phoneFormatter = new AsYouType(countryCode);
      let formattedText = phoneFormatter.input(this.state.phoneNumber);
      let formatterOutput = phoneFormatter.getNumber();
      if (formatterOutput !== undefined && formatterOutput.isValid()) {
        this.setState({
          ...this.state,
          phoneNumber: formattedText,
          e164PhoneNumber: formatterOutput.number,
          maxPhoneLength: undefined,
        });
      } else {
        this.setUnFormattedPhone(null);
        this.showErrorIfNeeded();
      }
    } else {
      this.showErrorIfNeeded();
    }
  };

  validateAndFormatPhone = text => {
    if (this.state.e164PhoneNumber !== null) {
      // If e164PhoneNumber is not null, user is editing a valid phone number so set it back to null unless they enter a valid number of appropriate max length
      this.setState({
        ...this.state,
        e164PhoneNumber: null,
      });
    }

    this.setState({
      ...this.state,
      phoneNumber: text,
    });

    if (text.length === 10) {
      Keyboard.dismiss();
    }
  };

  didBeginEditingPhone = () => {
    let phoneNumberToDisplayOnEditing =
      this.state.unFormattedPhone ?? this.state.phoneNumber;
    if (this.state.phoneNumber !== phoneNumberToDisplayOnEditing) {
      this.setPhoneNumber(phoneNumberToDisplayOnEditing);
    }
    this.setState({
      ...this.state,
      maxPhoneLength: 10,
    });

    if (this.state.shouldShowError) {
      this.setShouldShowError(false);
    }
  };

  render() {
    const Heading = 'Password Reset';
    return (
      <View style={styles.container}>
        <Loading />
        <AppBackButtonHeader
          navigation={this.props.navigation}
          heading={Heading}
        />
        <View style={styles.formContainer}>
          <Text style={styles.passwordText}>
            Enter your mobile phone number and we will send you a verification
            code, so that you can reset your password.
          </Text>
          <PhoneInput
            phoneNumber={this.state.phoneNumber}
            setPhoneNumber={this.setPhoneNumber}
            e164PhoneNumber={this.state.e164PhoneNumber}
            setE164PhoneNumber={this.setE164PhoneNumber}
            value={this.state.phoneNumber}
            onChangeText={text => this.validateAndFormatPhone(text)}
            onBlur={this.didEndEditingPhone}
            onFocus={this.didBeginEditingPhone}
            autoFocus={true}
            maxLength={this.state.maxPhoneLength}
            showErrorText={this.state.shouldShowError}
          />
          <View style={styles.buttonContainer}>
            <ButtonPrimary
              parentLabel="Submit Password Change"
              buttonLabel="Submit"
              onPress={this.onVerifyPhonePressed}
            />
            {isNotEmpty(this.props.PhoneError) && (
              <Text style={[globalStyles.errorText, styles.textInputTopMargin]}>
                {this.props.PhoneError}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: theme.background.light,
    paddingBottom: 30,
  },
  formContainer: {
    flex: 1,
    width: wp('86%'),
    marginHorizontal: wp('7%'),
  },
  passwordText: {
    color: theme.text.dark,
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    marginHorizontal: wp('6%'),
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 30,
  },
});

export default connect(
  ({user}) => ({
    token: user.accessToken,
    id: user._id,
    PhoneError: isNotEmpty(user.PhoneError) ? user.PhoneError : '',
  }),
  {verifyPhoneNumberAndGetOtp},
)(PasswordReset);
