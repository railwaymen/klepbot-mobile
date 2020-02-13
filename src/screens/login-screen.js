import React, {Component} from 'react';
import {KeyboardAvoidingView, View, TextInput, Text} from 'react-native';
import Button from '../components/shared/button';
import UsersService from '../services/users-service';
import CurrentUser from '../helpers/current-user';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../shared/styles';
import FullScreenLoader from '../components/shared/full-screen-loader';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      passowd: '',
      isLoading: false,
    };
  }

  onChangeEmail = email => {
    this.setState({email});
  };

  onChangePassword = password => {
    this.setState({password});
  };

  onSubmit = async () => {
    this.setState({isLoading: true});

    const {
      state: {email, password},
      props: {
        navigation: {navigate},
      },
    } = this;

    UsersService.signIn({email, password}).then(user => {
      CurrentUser.assign(user);
      navigate('Main');
    }).catch(() => {
      this.setState({isLoading: false});
    });
  };

  render() {
    const {email, password, isLoading} = this.state;

    return (
      <>
        <FullScreenLoader visible={isLoading} />
        <LinearGradient
          start={{x: 0, y: -1}}
          end={{x: 1, y: 1}}
          colors={colors}
          style={styles.gradientBackground}>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Text style={styles.header}>Klepbot</Text>
            <View style={styles.form}>
              <TextInput
                selectionColor={'rgb(30,144,255)'}
                autoCompleteType="email"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                style={styles.input}
                placeholder="Enter email"
                inputValue={email}
                onChangeText={this.onChangeEmail}
                placeholderTextColor={'#eaeaea'}
              />
              <TextInput
                selectionColor={'rgb(30,144,255)'}
                autoCompleteType="password"
                secureTextEntry={true}
                style={styles.input}
                placeholder="Enter password"
                inputValue={password}
                onChangeText={this.onChangePassword}
                placeholderTextColor={'#eaeaea'}
              />
              <Button style={styles.button} onPress={this.onSubmit}>
                Log in
              </Button>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </>
    );
  }
}

const styles = {
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    fontSize: 64,
    color: '#fff',
    fontFamily: 'DancingScript-Regular',
  },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 6,
    color: '#eaeaea',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  form: {
    padding: 24,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#eaeaea',
    borderRadius: 6,
    marginBottom: 12,
    padding: 15,
  },
};

export default LoginScreen;
