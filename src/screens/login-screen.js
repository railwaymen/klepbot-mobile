import React, {Component} from 'react';
import {KeyboardAvoidingView, View, StyleSheet} from 'react-native';
import LoginButton from '../components/buttons/login-button';
import FormTextInput from '../components/forms/form-text-input';

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

  render() {
    return (
      <KeyboardAvoidingView>
        <View styles={styles.container}>
          <View styles={styles.form}>
            <FormTextInput />
            <FormTextInput />
            <LoginButton />
          </View>
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
