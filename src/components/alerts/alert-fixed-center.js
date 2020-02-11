import React, {useState} from 'react';
import {Animated, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Notice({children = 'Saved', style}) {
  const [fadeAnim] = useState(new Animated.Value(0));

  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 700,
  }).start();

  return (
    <Animated.View style={[noticeStyles.container, style, {opacity: fadeAnim}]}>
      <View style={noticeStyles.iconContainer}>
        <Text style={noticeStyles.iconLabel}>{children}</Text>
        <Icon name="ios-checkmark" size={42} color="#fff" />
      </View>
    </Animated.View>
  );
}

const noticeStyles = {
  container: {
    flex: 1,
    position: 'absolute',
    zIndex: 100,
    justifyContent: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  body: {
    borderRadius: 10,
    padding: 25,
  },
  text: {
    fontSize: 24,
    color: '#0c0c0c',
  },
  iconLabel: {
    fontSize: 18,
    color: '#fff',
  },
};
