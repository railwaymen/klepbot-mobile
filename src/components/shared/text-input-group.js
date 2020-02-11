import React from 'react';
import {View, Text, TextInput} from 'react-native';

export default function TextInputGroup({name, label, value, onChange}) {
  const onInputChange = string => onChange({name, value: string});

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputText}>{label}</Text>
      <TextInput
        style={styles.inputField}
        placeholder={label}
        value={value}
        onChangeText={onInputChange}
      />
    </View>
  );
}

const styles = {
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    marginBottom: 12,
  },
  inputField: {
    flex: 3,
    padding: 2,
  },
  inputText: {
    flex: 1,
    padding: 2,
  },
};
