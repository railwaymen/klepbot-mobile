import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

export default function GradientButton({children, style = {}, onPress, icon}) {
  const {color = '#fff', fontSize = 16} = style;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonStyles, style]}>
      <LinearGradient
        style={styles.gradientContainer}
        start={{x: 0, y: -1}}
        end={{x: 1, y: 1}}
        colors={colors}>
        <Text style={{color, fontSize}}>{children}</Text>
        {icon ? <Icon color={color} name={icon} size={fontSize * 1.4} /> : null}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const colors = ['#E85A66', '#E25AE8'];

const styles = {
  buttonStyles: {
    justifyContent: 'center',
    fontSize: 44,
    borderRadius: 24,
  },
  gradientContainer: {
    padding: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
};
