import React from 'react';
import {connect} from 'react-redux';
import emailValidator from 'email-validator';
import {
  signup,
  checkEmailExists,
  emailUpdate,
} from '../redux/modules/actions/signupAction';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {ButtonPrimary} from '../components/Buttons';
import theme from '../constants/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import globalStyles from '../../assets/styles/globalStyle';
import EmailField from '../components/formFields/EmailField';
import PasswordField from '../components/formFields/PasswordField';
import TextField from '../components/formFields/TextField';
import passwordValidation from '../utils/PasswordValidation';
import PasswordCriteriaChecks from '../components/PasswordCriteriaChecks';
import ValidIconEnum from '../constants/enums/validIconEnum';
import Loading from './Loading';
import PhoneInput from '../components/formFields/PhoneInput';
import {AsYouType} from 'libphonenumber-js';
import {isNotEmpty} from '../utils/ObjectUtil.js';
import AppBackButtonHeader from '../components/appBackButtonHeader/AppBackButtonHeader';
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        e164PhoneNumber: '',
        shouldShowError: false,
        maxPhoneLength: 10,
        unFormattedPhone: '',
      },
      formErrors: {
        firstName: {
          value: false,
          error: 'Please enter your first name.',
        },
        lastName: {
          value: false,
          error: 'Please enter your last name.',
        },
        email: {
          value: false,
          error: this.EMAIL_INVALID_ERROR_MESSAGE,
          validIcon: ValidIconEnum.NO_ICON,
        },
        password: {
          value: false,
          errors: [],
          validIcon: ValidIconEnum.NO_ICON,
        },
      },
    };
    this.scrollViewRef = React.createRef();
  }

  EMAIL_INVALID_ERROR_MESSAGE = 'Please enter valid email.';
  EMAIL_EXIST_ERROR_MESSAGE = 'There is already an account with this email.';

  handleSignUpSubmit = () => {
    if (
      emailValidator.validate(this.state.form.email) &&
      !!this.state.form.password &&
      !!this.state.form.firstName &&
      !!this.state.form.lastName &&
      !!this.state.e164PhoneNumber
    ) {
      this.props.signup({
        firstName: this.state.form.firstName,
        lastName: this.state.form.lastName,
        email: this.state.form.email,
        password: this.state.form.password,
        phone: this.state.e164PhoneNumber,
      });
    } else {
      this.showErrorIfNeeded();
      !emailValidator.validate(this.state.form.email) && this.validateEmail();
      !this.state.form.password && this.validatePassword();
      !this.state.form.firstName &&
        this.validateFullName(this.state.form.firstName, 'firstName');
      !this.state.form.lastName &&
        this.validateFullName(this.state.form.lastName, 'lastName');
    }
  };

  handleUserNameChange = (name, type) => {
    this.setState({
      form: {
        ...this.state.form,
        [type]: name,
      },
      formErrors: {
        ...this.state.formErrors,
        [type]: {
          ...this.state.formErrors[type],
          value: false,
        },
      },
    });
  };

  handleEmailChange = email => {
    this.setState(this.props.emailUpdate());
    this.setState({
      form: {
        ...this.state.form,
        email: email,
      },
      formErrors: {
        ...this.state.formErrors,
        email: {
          ...this.state.formErrors.email,
          value: false,
          validIcon: ValidIconEnum.NO_ICON,
        },
      },
    });
  };

  handlePasswordChange = password => {
    this.scrollViewRef.scrollToEnd({animated: true});
    this.setState(
      {
        form: {
          ...this.state.form,
          password: password,
        },
      },
      this.validatePassword,
    );
  };

  validateEmail = () => {
    let email = this.state.form.email;
    let isEmailValid = emailValidator.validate(email);
    if (isEmailValid) {
      this.setState(this.props.checkEmailExists({email}));
    } else {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          email: {
            value: true,
            validIcon: ValidIconEnum.CROSS_ICON,
            error: this.EMAIL_INVALID_ERROR_MESSAGE,
          },
        },
      });
    }
  };

  validatePassword = () => {
    let passwordValidationResult = passwordValidation(this.state.form.password);

    this.setState(prevState => ({
      formErrors: {
        ...prevState.formErrors,
        password: {
          ...prevState.formErrors.password,
          value: !passwordValidationResult.isValid,
          errors: passwordValidationResult.invalidCriterias,
          validIcon: passwordValidationResult.isValid
            ? ValidIconEnum.CHECK_ICON
            : ValidIconEnum.CROSS_ICON,
        },
      },
    }));
  };

  validateFullName = (name, type) => {
    this.setState(prevState => ({
      formErrors: {
        ...prevState.formErrors,
        [type]: {
          ...prevState.formErrors[type],
          value: !name,
        },
      },
    }));
  };

  getEmailValidationIcon = emailValidationStatus => {
    switch (emailValidationStatus) {
      case 'EMAIL_UPDATE_INPROGRESS':
        return this.state.formErrors.email.validIcon;
      case 'EMAIL_EXIST':
        return ValidIconEnum.CROSS_ICON;
      case 'EMAIL_DOES_NOT_EXIST':
        return ValidIconEnum.CHECK_ICON;
      default:
        return ValidIconEnum.NO_ICON;
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
    if (this.state.phoneNumber) {
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
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="handled"
            ref={ref => {
              this.scrollViewRef = ref;
            }}>
            <Loading />
            <SafeAreaView style={styles.safeAreaViewStyle}>
              <AppBackButtonHeader
                navigation={this.props.navigation}
                heading="Create Account"
              />
              <View style={styles.formContainer}>
                <TextField
                  value={this.state.form.firstName}
                  placeholder="First Name"
                  autoCapitalize="words"
                  returnKeyType="done"
                  onChangeText={firstName =>
                    this.handleUserNameChange(firstName, 'firstName')
                  }
                  onBlur={e =>
                    this.validateFullName(
                      this.state.form.firstName,
                      'firstName',
                    )
                  }
                  showErrorText={this.state.formErrors.firstName.value}
                  errorText={this.state.formErrors.firstName.error}
                />

                <TextField
                  value={this.state.form.lastName}
                  placeholder="Last Name"
                  autoCapitalize="words"
                  returnKeyType="done"
                  onChangeText={lastName =>
                    this.handleUserNameChange(lastName, 'lastName')
                  }
                  onBlur={e =>
                    this.validateFullName(this.state.form.lastName, 'lastName')
                  }
                  showErrorText={this.state.formErrors.lastName.value}
                  errorText={this.state.formErrors.lastName.error}
                  style={[styles.inputTopMargin]}
                />

                <EmailField
                  value={this.state.form.email}
                  onChangeText={this.handleEmailChange}
                  onBlur={e => this.validateEmail()}
                  returnKeyType="done"
                  showErrorText={
                    this.state.formErrors.email.value ||
                    this.props.isEmailExists
                  }
                  errorText={
                    this.props.isEmailExists
                      ? this.EMAIL_EXIST_ERROR_MESSAGE
                      : this.state.formErrors.email.error
                  }
                  validIcon={this.getEmailValidationIcon(
                    this.props.emailValidationStatus,
                  )}
                  style={[styles.inputTopMargin]}
                />

                <PhoneInput
                  phoneNumber={this.state.phoneNumber}
                  setPhoneNumber={this.setPhoneNumber}
                  e164PhoneNumber={this.state.e164PhoneNumber}
                  setE164PhoneNumber={this.setE164PhoneNumber}
                  value={this.state.phoneNumber}
                  onChangeText={text => this.validateAndFormatPhone(text)}
                  onBlur={this.didEndEditingPhone}
                  onFocus={this.didBeginEditingPhone}
                  autoFocus={false}
                  maxLength={this.state.maxPhoneLength}
                  showErrorText={this.state.shouldShowError}
                  style={[styles.inputTopMargin]}
                  returnKeyType="done"
                />

                <PasswordField
                  value={this.state.form.password}
                  onChangeText={this.handlePasswordChange}
                  validIcon={this.state.formErrors.password.validIcon}
                  style={[styles.inputTopMargin]}
                  returnKeyType="done"
                />
                {this.state.formErrors.password.value && (
                  <PasswordCriteriaChecks
                    invalidCriterias={this.state.formErrors.password.errors}
                  />
                )}

                <View style={styles.buttonContainer}>
                  <ButtonPrimary
                    parentLabel="Signup"
                    buttonLabel="Create My Account"
                    onPress={this.handleSignUpSubmit}
                  />
                  {!!this.props.errorMessage && (
                    <Text style={globalStyles.errorText}>
                      {this.props.errorMessage}
                    </Text>
                  )}
                </View>
              </View>
            </SafeAreaView>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background.light,
  },
  formContainer: {
    flex: 1,
    marginTop: hp('4%'),
    width: wp('86%'),
    marginHorizontal: wp('7%'),
  },
  pageTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('6%'),
  },
  inputTopMargin: {
    marginTop: 24,
  },
  buttonContainer: {
    marginTop: 40,
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 34,
  },
  bottomLinkContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  safeAreaViewStyle: {
    flex: 1,
  },
  textInputTopMargin: {
    marginTop: 10,
  },
  passwordValidation: {
    color: '#444A6F',
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 18,
    marginLeft: 2,
  },
  passwordMatchValidation: {
    color: '#444A6F',
    opacity: 0.5,
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 18,
    marginLeft: 2,
  },
});

export default connect(
  state => ({
    emailValidationStatus: state.signup.emailValidationStatus,
    isEmailExists: state.signup.isEmailExists,
    errorMessage: state.signup.errorMessage,
  }),
  {signup, emailUpdate, checkEmailExists},
)(Signup);
