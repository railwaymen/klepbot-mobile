import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

class FormTextInput extends React.Component {
  render() {
    return (
      <TextInput selectionColor={'rgb(30,144,255)'} style={styles.textInput} />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'rgb(192,192,192)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
});

export default FormTextInput;
