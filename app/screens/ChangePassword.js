import React from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Loading from './Loading';
import AppBackButtonHeader from '../components/appBackButtonHeader/AppBackButtonHeader';
import globalStyles from '../../assets/styles/globalStyle';
import PasswordField from '../components/formFields/PasswordField';
import {ButtonPrimary} from '../components/Buttons';
import PasswordCriteriaChecks from '../components/PasswordCriteriaChecks';
import passwordValidation from '../utils/PasswordValidation';
import {
  verifyPassword,
  changePassword,
  verifyPasswordUpdate,
} from '../redux/modules/actions/userActions';
import theme from '../constants/theme';

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      formErrors: {
        oldPassword: {
          value: false,
          error: this.OLD_PASSWORD_INVALID_ERROR_MESSAGE,
        },
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

  OLD_PASSWORD_INVALID_ERROR_MESSAGE = 'Please enter a valid password.';
  CONFIRM_PASSWORD_INVALID_ERROR_MESSAGE = 'Passwords are not matching.';
  OLD_PASSWORD_NOT_MATCHING_ERROR_MESSAGE = 'Your old password is incorrect.';

  handleChangePasswordSuccess = () => {
    const navigation = this.props.navigation;
    navigation.navigate('Account');
  };

  handleChangePasswordSubmit = () => {
    if (
      this.props.verifyPasswordValidationStatus === 'PASSWORD_EXIST' &&
      !!this.state.form.oldPassword &&
      !!this.state.form.newPassword &&
      this.checkPasswordMatch()
    ) {
      this.props.changePassword({
        email: this.props.email,
        currentpassword: this.state.form.oldPassword,
        changepassword: this.state.form.newPassword,
        token: this.props.token,
        handleChangePasswordCallback: this.handleChangePasswordSuccess,
      });
    } else {
      (!this.state.form.oldPassword ||
        this.props.verifyPasswordValidationStatus !== 'PASSWORD_EXIST') &&
        this.validateOldPassword();
      !this.state.form.newPassword && this.validateNewPassword();
      this.validateConfirmPassword();
    }
  };

  checkPasswordMatch = () => {
    let passwordMatch =
      this.state.form.confirmPassword === this.state.form.newPassword;
    return passwordMatch;
  };

  handleOldPasswordChange = password => {
    this.setState(this.props.verifyPasswordUpdate());
    this.setState({
      form: {
        ...this.state.form,
        oldPassword: password,
      },
      formErrors: {
        ...this.state.formErrors,
        oldPassword: {
          ...this.state.formErrors.oldPassword,
          value: false,
        },
      },
    });
  };

  validateOldPassword = () => {
    let password = this.state.form.oldPassword;
    let passwordValidationResult = passwordValidation(password);
    if (passwordValidationResult.isValid) {
      this.setState(
        this.props.verifyPassword({
          password: password,
          token: this.props.token,
        }),
      );
    } else {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          oldPassword: {
            value: true,
            error: this.OLD_PASSWORD_INVALID_ERROR_MESSAGE,
          },
        },
      });
    }
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
          value: !passwordValidationResult.isValid,
          errors: passwordValidationResult.invalidCriterias,
        },
      },
    }));
  };

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          <Loading />
          <ScrollView keyboardShouldPersistTaps="handled">
            <AppBackButtonHeader
              navigation={this.props.navigation}
              heading="Password"
            />
            <View style={styles.formContainer}>
              <PasswordField
                value={this.state.form.oldPassword}
                onChangeText={this.handleOldPasswordChange}
                onBlur={this.validateOldPassword}
                placeholder="Old Password"
                showErrorText={
                  this.state.formErrors.oldPassword.value ||
                  this.props.isPasswordExists
                }
                errorText={
                  this.props.isPasswordExists
                    ? this.OLD_PASSWORD_NOT_MATCHING_ERROR_MESSAGE
                    : this.state.formErrors.oldPassword.error
                }
                style={[styles.inputTopMargin]}
              />
              {!!this.props.verifyPasswordErrorMessage && (
                <Text style={globalStyles.errorText}>
                  {this.props.verifyPasswordErrorMessage}
                </Text>
              )}
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
                  onPress={this.handleChangePasswordSubmit}
                />
                {!!this.props.errorMessage && (
                  <Text style={globalStyles.errorText}>
                    {this.props.errorMessage}
                  </Text>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: theme.background.light,
  },
  inputTopMargin: {
    marginTop: 24,
  },
  formContainer: {
    flex: 1,
    width: wp('86%'),
    marginHorizontal: wp('7%'),
  },
  buttonContainer: {
    marginTop: 40,
  },
});

export default connect(
  ({user, member}) => ({
    token: user.accessToken,
    email: user.email,
    memberId: member._id,
    isPasswordExists: user.isPasswordExists,
    verifyPasswordValidationStatus: user.verifyPasswordValidationStatus,
    errorMessage: user.errorMessage,
    verifyPasswordErrorMessage: user.verifyPasswordErrorMessage,
  }),
  {verifyPassword, changePassword, verifyPasswordUpdate},
)(ChangePassword);
