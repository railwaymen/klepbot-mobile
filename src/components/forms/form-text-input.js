import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const FormTextInput = props => {
  const {placeholder, inputValue, onChange} = props;
  return (
    <TextInput
      selectionColor={'rgb(30,144,255)'}
      style={styles.textInput}
      placeholder={placeholder}
      inputValue={inputValue}
      onChangeText={onChange}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'rgb(192,192,192)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
});

export default FormTextInput;
