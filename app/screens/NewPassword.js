import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Loading from './Loading';
import AppBackButtonHeader from '../components/appBackButtonHeader/AppBackButtonHeader';
import theme from '../constants/theme';
import { ButtonPrimary } from '../components/Buttons';
import globalStyles from '../../assets/styles/globalStyle';
import PasswordField from '../components/formFields/PasswordField';
import PasswordCriteriaChecks from '../components/PasswordCriteriaChecks';
import passwordValidation from '../utils/PasswordValidation';
import { resetPassword } from '../redux/modules/actions/userActions';
import { isNotEmpty } from '../utils/ObjectUtil.js';
class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: props.route.params.phoneNumber,
      otpCode: props.route.params.otpCode,
      form: {
        newPassword: '',
        confirmPassword: '',
      },
      formErrors: {
        newPassword: {
          value: false,
          errors: [],
        },
        confirmPassword: {
          value: false,
          error: this.CONFIRM_PASSWORD_INVALID_ERROR_MESSAGE,
        },
      },
    };
  }

  CONFIRM_PASSWORD_INVALID_ERROR_MESSAGE = 'Passwords are not matching.';

  handleNewPasswordSuccess = () => {
    const navigation = this.props.navigation;
    navigation.navigate('Login');
  };

  handleNewPasswordFailure = () => {
    const navigation = this.props.navigation;
    navigation.navigate('PasswordResetOtp', {
      phoneNumber: this.state.phoneNumber,
      otpCodeError: 'The entered code is incorrect.',
    });
  };

  handleNewPasswordSubmit = () => {
    if (isNotEmpty(this.state.form.newPassword) && this.checkPasswordMatch()) {
      this.props.resetPassword({
        phone: this.state.phoneNumber,
        code: this.state.otpCode,
        newPassword: this.state.form.newPassword,
        handleNewPasswordSuccessCallback: this.handleNewPasswordSuccess,
        handleNewPasswordFailureCallback: this.handleNewPasswordFailure,
      });
    } else {
      !this.state.form.newPassword && this.validateNewPassword();
      this.validateConfirmPassword();
    }
  };

  checkPasswordMatch = () => {
    let passwordMatch =
      this.state.form.confirmPassword === this.state.form.newPassword;
    return passwordMatch;
  };

  handleConfirmPasswordChange = password => {
    this.setState({
      form: {
        ...this.state.form,
        confirmPassword: password,
      },
      formErrors: {
        ...this.state.formErrors,
        confirmPassword: {
          ...this.state.formErrors.confirmPassword,
          value: false,
        },
      },
    });
  };

  validateConfirmPassword = () => {
    let passwordMatch = this.checkPasswordMatch();
    if (passwordMatch) {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          confirmPassword: {
            value: false,
          },
        },
      }));
    } else {
      this.setState(prevState => ({
        formErrors: {
          ...prevState.formErrors,
          confirmPassword: {
            value: true,
            error: this.CONFIRM_PASSWORD_INVALID_ERROR_MESSAGE,
          },
        },
      }));
    }
  };

  handleNewPasswordChange = password => {
    this.setState(
      {
        form: {
          ...this.state.form,
          newPassword: password,
        },
      },
      this.validateNewPassword,
    );
  };

  validateNewPassword = () => {
    let passwordValidationResult = passwordValidation(
      this.state.form.newPassword,
    );
    this.setState(prevState => ({
      formErrors: {
        ...prevState.formErrors,
        newPassword: {
          ...prevState.formErrors.newPassword,
          value: !passwordValidationResult.isValidS,
          errors: passwordValidationResult.invalidCriterias,
        },
      },
    }));
  };

  render() {
    const Heading = 'New Password';
    return (
      <View style={styles.container}>
        <Loading />
        <AppBackButtonHeader
          navigation={this.props.navigation}
          heading={Heading}
        />
        <View style={styles.formContainer}>
          <PasswordField
            value={this.state.form.newPassword}
            placeholder="New Password"
            onChangeText={this.handleNewPasswordChange}
            style={[styles.inputTopMargin]}
          />
          {this.state.formErrors.newPassword.value && (
            <PasswordCriteriaChecks
              invalidCriterias={this.state.formErrors.newPassword.errors}
            />
          )}
          <PasswordField
            value={this.state.form.confirmPassword}
            placeholder="Confirm New Password"
            onChangeText={this.handleConfirmPasswordChange}
            onBlur={this.validateConfirmPassword}
            showErrorText={this.state.formErrors.confirmPassword.value}
            errorText={this.state.formErrors.confirmPassword.error}
            style={[styles.inputTopMargin]}
          />
          <View style={styles.buttonContainer}>
            <ButtonPrimary
              parentLabel="Change Password"
              buttonLabel="Save"
              onPress={this.handleNewPasswordSubmit}
            />
            {isNotEmpty(this.props.newPasswordError) && (
              <Text style={globalStyles.errorText}>
                {this.props.newPasswordError}
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
  buttonContainer: {
    marginTop: 40,
  },
  inputTopMargin: {
    marginTop: 24,
  },
});

export default connect(
  ({ user }) => ({
    newPasswordError: isNotEmpty(user.passwordErrorMessage)
      ? user.passwordErrorMessage
      : '',
  }),
  { resetPassword },
)(NewPassword);
