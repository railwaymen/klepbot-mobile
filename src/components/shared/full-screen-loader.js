import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Animated} from 'react-native';

export default function FullScreenLoader({visible}) {
  const [animOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animOpacity, {
      toValue: 1,
      duration: 600,
    }).start();
  }, []);

  if (visible) {
    return (
      <Animated.View style={[styles.loader, {opacity: animOpacity}]}>
        <ActivityIndicator size="large" />
      </Animated.View>
    )
  } else {
    return null;
  }
}

const styles = {
  loader: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    shadowColor: '#000000',
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 1,
  },
}
