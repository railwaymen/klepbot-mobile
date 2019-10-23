import React, {Component} from 'react';
import {Image, KeyboardAvoidingView, View, StyleSheet} from 'react-native';
import LoginButton from '../components/buttons/login-button';
import FormTextInput from '../components/forms/form-text-input';
import UsersService from '../services/users-service';
import CurrentUser from '../helpers/current-user';
import imageLogo from '../assets/images/klep_bot_logo.png';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      passowd: '',
    };
  }

  onChangeEmail = email => {
    this.setState({email});
  };

  onChangePassword = password => {
    this.setState({password});
  };

  onSubmit = async () => {
    const {
      state: {email, password},
      props: {
        navigation: {navigate},
      },
    } = this;

    const user = await UsersService.signIn({email, password});
    await CurrentUser.assign(user);

    navigate('Home');
  };

  render() {
    const {email, password} = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form}>
          <FormTextInput
            placeholder="Enter email"
            onChange={this.onChangeEmail}
            inputValue={email}
          />
          <FormTextInput
            placeholder="Enter password"
            onChange={this.onChangePassword}
            inputValue={password}
          />
          <LoginButton onSubmit={this.onSubmit} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255,255,255)',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
});

export default LoginScreen;
