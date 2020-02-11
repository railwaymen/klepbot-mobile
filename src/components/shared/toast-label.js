import React, { useState } from 'react';
import {Animated, Text} from 'react-native';

export default function ToastLabel({children}) {
  const [animatedMargin] = useState(new Animated.Value(-25));

  Animated.timing(animatedMargin, {
    toValue: 0,
    duration: 300,
  }).start();

  return (
    <Animated.View style={[styles.toast, {marginTop: animatedMargin}]}>
      <Text style={styles.text}>{children}</Text>
    </Animated.View>
  );
}

const styles = {
  toast: {
    padding: 12,
    backgroundColor: '#FF645F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
  },
};
