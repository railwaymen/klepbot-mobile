import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

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
    const {email, password} = this.state;

    return (
      <KeyboardAvoidingView>
        <Text>Log in</Text>
        <TextInput
          onChangeText={this.onChangeEmail}
          value={email}
          placeholder="Email"
          autoCompleteType="email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          onChangeText={this.onChangePassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={this.onSubmit}>
          <Text>Log in</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;
