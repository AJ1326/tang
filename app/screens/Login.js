import React from 'react';
import {connect} from 'react-redux';
import emailValidator from 'email-validator';
import {login} from '../redux/modules/actions/userActions';
import {StyleSheet, View, Text, SafeAreaView, ScrollView} from 'react-native';
import {ButtonPrimary} from '../components/Buttons';
import theme from '../constants/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import globalStyles from '../../assets/styles/globalStyle';
import EmailField from '../components/formFields/EmailField';
import PasswordField from '../components/formFields/PasswordField';
import Loading from './Loading';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: '',
        password: '',
        date: Date.now(),
      },
      formErrors: {
        email: {
          value: false,
          error: 'Please enter valid email.',
        },
        password: {
          value: false,
          error: 'Please enter valid password.',
        },
      },
    };
  }

  handleLoginSubmit = () => {
    if (
      emailValidator.validate(this.state.form.email) &&
      !!this.state.form.password
    ) {
      this.props.login({
        user: this.state.form.email,
        password: this.state.form.password,
        date: this.state.form.date,
      });
    } else {
      !emailValidator.validate(this.state.form.email) && this.validateEmail();
      !this.state.form.password && this.validatePassword();
    }
  };

  handleEmailChange = email => {
    this.setState(prevState => ({
      form: {
        ...this.state.form,
        email: email,
      },
      formErrors: {
        ...prevState.formErrors,
        email: {
          ...prevState.formErrors.email,
          value: false,
        },
      },
    }));
  };

  handlePasswordChange = password => {
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

    this.setState(prevState => ({
      formErrors: {
        ...prevState.formErrors,
        email: {
          ...prevState.formErrors.email,
          value: !isEmailValid,
        },
      },
    }));
  };

  validatePassword = () => {
    this.setState(prevState => ({
      formErrors: {
        ...prevState.formErrors,
        password: {
          ...prevState.formErrors.password,
          value: !prevState.form.password,
        },
      },
    }));
  };

  render() {
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Loading />
        <SafeAreaView style={styles.safeAreaViewStyle}>
          <View style={styles.pageTitle}>
            <Text style={globalStyles.pageTextHeading}>Login</Text>
          </View>
          <View style={styles.formContainer}>
            <EmailField
              value={this.state.form.email}
              onBlur={this.validateEmail}
              onChangeText={this.handleEmailChange}
              showErrorText={this.state.formErrors.email.value}
              errorText={this.state.formErrors.email.error}
              returnKeyType="done"
            />
            <PasswordField
              value={this.state.form.password}
              onChangeText={this.handlePasswordChange}
              showErrorText={this.state.formErrors.password.value}
              errorText={this.state.formErrors.password.error}
              style={[styles.inputTopMargin]}
              returnKeyType="done"
            />
            <View style={styles.buttonContainer}>
              <ButtonPrimary
                parentLabel="Login"
                buttonLabel="Login"
                onPress={this.handleLoginSubmit}
              />
              {!!this.props.errorMessage && (
                <Text style={globalStyles.errorText}>
                  {this.props.errorMessage}
                </Text>
              )}
            </View>
            <View style={styles.linkContainer}>
              <Text
                onPress={() => {
                  this.props.navigation.navigate('PasswordReset');
                }}
                style={globalStyles.secondaryLink}>
                Forgot password?
              </Text>
            </View>
          </View>
          <View style={styles.bottomLinkContainer}>
            <Text style={globalStyles.labelMedium}>
              Don’t have an account?{' '}
              <Text
                onPress={() => {
                  this.props.navigation.navigate('Signup');
                }}
                style={globalStyles.primaryLink}>
                Sign Up Now
              </Text>
            </Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background.light,
  },
  formContainer: {
    flex: 1,
    marginTop: hp('10%'),
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
    height: hp('100%'),
  },
  textInputTopMargin: {
    marginTop: 10,
  },
});

export default connect(
  ({user: {errorMessage}}) => ({
    errorMessage: errorMessage,
  }),
  {login},
)(Login);
