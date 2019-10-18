import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

class LoginButton extends React.Component {
  render() {
    const label = 'Login';

    return (
      <TouchableOpacity style={styles.container}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(30,144,255)',
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  text: {
    color: 'rgb(255,255,255)',
    textAlign: 'center',
    height: 20,
  },
});

export default LoginButton;
