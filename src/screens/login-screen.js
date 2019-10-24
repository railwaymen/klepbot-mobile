import React, {Component} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
import LoginButton from '../components/buttons/login-button';
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
          <TextInput
            selectionColor={'rgb(30,144,255)'}
            style={styles.textInput}
            placeholder="Enter email"
            inputValue={email}
            onChangeText={this.onChangeEmail}
          />
          <TextInput
            selectionColor={'rgb(30,144,255)'}
            style={styles.textInput}
            placeholder="Enter password"
            inputValue={password}
            onChangeText={this.onChangePassword}
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
  textInput: {
    height: 40,
    borderColor: 'rgb(192,192,192)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
});

export default LoginScreen;
