import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loading from './Loading';
import AppBackButtonHeader from '../components/appBackButtonHeader/AppBackButtonHeader';
import theme from '../constants/theme';
import {ButtonPrimary} from '../components/Buttons';
import globalStyles from '../../assets/styles/globalStyle';
import {verifyPhoneNumberAndGetOtp} from '../redux/modules/actions/userActions';
import {isNotEmpty} from '../utils/ObjectUtil.js';
import OTPTextView from 'react-native-otp-textinput';
import {AsYouType} from 'libphonenumber-js';

class PasswordResetOtp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otpInput: '',
      phoneNumber: props.route.params.phoneNumber,
      otpCodeError: isNotEmpty(props.route.params.otpCodeError)
        ? props.route.params.otpCodeError
        : '',
    };
  }

  otpCodeValue = () => {
    const {otpInput = ''} = this.state;
    if (otpInput) {
      return otpInput;
    } else {
      return false;
    }
  };

  render() {
    const Heading = 'Enter Verification Code';
    let countryCode = 'IND';
    const phoneFormatter = new AsYouType(countryCode);
    let formattedText = phoneFormatter.input(this.state.phoneNumber);
    let formatterOutput = phoneFormatter.getNumber().number;
    return (
      <View style={styles.container}>
        <Loading />
        <AppBackButtonHeader
          navigation={this.props.navigation}
          heading={Heading}
        />
        <View style={styles.formContainer}>
          <Text style={styles.passwordText}>
            To confirm your identity, please enter the six digit code we sent
            to: {formattedText}
          </Text>
          <OTPTextView
            handleTextChange={text => this.setState({otpInput: text})}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            inputCount={6}
            keyboardType="numeric"
            inputCellLength={1}
            tintColor={theme.link.primary}
            offTintColor={theme.link.primary}
          />
          <View style={[styles.inputTopMargin, styles.resendContainer]}>
            <TouchableOpacity
              onPress={() => {
                this.props.verifyPhoneNumberAndGetOtp({
                  phone: formatterOutput,
                  navigateToOtpScreen: () => {
                    this.props.navigation.navigate('PasswordResetOtp', {
                      phoneNumber: this.state.phoneNumber,
                    });
                  },
                });
              }}
              style={styles.resendButtonWrapper}>
              <Text style={styles.resendButton}>Resend code</Text>
            </TouchableOpacity>
          </View>
          <View>
            <ButtonPrimary
              parentLabel="Next"
              buttonLabel="Next"
              onPress={() => {
                this.props.navigation.navigate('NewPassword', {
                  phoneNumber: formatterOutput,
                  otpCode: this.otpCodeValue(),
                });
              }}
            />
            {isNotEmpty(this.props.route.params.otpCodeError) && (
              <Text style={globalStyles.errorText}>
                {this.props.route.params.otpCodeError}
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
    marginTop: 10,
  },
  passwordText: {
    color: theme.text.dark,
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    marginBottom: 35,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resendButtonWrapper: {
    width: wp('28%'),
  },
  resendButton: {
    color: theme.text.buttonBlueText,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
    fontWeight: '600',
    fontSize: 16,
  },
  inputTopMargin: {
    marginVertical: 40,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roundedTextInput: {
    borderRadius: 4,
    height: hp('9%'),
    width: wp('10.4%'),
    borderWidth: 1,
    padding: 5,
    fontSize: 50,
    marginBottom: 0,
    textAlign: 'center',
    borderBottomWidth: 1,
    backgroundColor: theme.white,
    color: '#5B5B5B',
    fontWeight: '100',
    fontFamily: 'OpenSans-Light',
  },
});

export default connect(
  ({user}) => ({
    token: user.accessToken,
    id: user._id,
  }),
  {verifyPhoneNumberAndGetOtp},
)(PasswordResetOtp);
