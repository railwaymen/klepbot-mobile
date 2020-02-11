import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Button({children, style = {}, onPress, icon}) {
  const {color = '#0c0c0c', fontSize = 16} = style;

  return (
    <TouchableOpacity onPress={onPress} style={{...buttonStyles, ...style}}>
      <Text style={{color, fontSize}}>{children}</Text>
      {icon ? <Icon color={color} name={icon} size={fontSize * 1.4} /> : null}
    </TouchableOpacity>
  );
}

const buttonStyles = {
  padding: 12,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#eaeaea',
  fontSize: 44,
};
