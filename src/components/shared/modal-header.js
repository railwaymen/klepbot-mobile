import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ModalHeader({onSave, onCancel, children, style = {}}) {
  return (
    <View style={[styles.header, style]}>
      <TouchableOpacity style={styles.button} onPress={onCancel}>
        <Icon style={styles.icon} name="ios-close" size={26} />
      </TouchableOpacity>
      {children}
      {onSave ? (
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Icon style={styles.icon} name="ios-checkmark" size={26} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = {
  header: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    alignContent: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 17,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#555',
  },
  headerText: {
    fontSize: 17,
  },
};
