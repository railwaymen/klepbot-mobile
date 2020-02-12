import React, {useState} from 'react';
import {View, Dimensions, Animated} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../shared/styles';

export default function GradientContainerShaped({children}) {
  const [animatedOpacity] = useState(new Animated.Value(0));

  Animated.timing(animatedOpacity, {
    toValue: 1,
    duration: 600,
  }).start();

  return (
    <View style={styles.container}>
      <LinearGradient colors={colors} start={{x: -1, y: 1}} style={styles.body}>
        <Animated.View style={{opacity: animatedOpacity}}>
          {children}
        </Animated.View>
        <View style={styles.backgroundTriangle} />
      </LinearGradient>
    </View>
  )
}

const screenWidth = Dimensions.get('window').width;

const styles = {
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '20%',
    paddingBottom: '20%',
  },
  backgroundTriangle: {
    position: 'absolute',
    width: '100%',
    height: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: screenWidth,
    borderRightWidth: 0,
    borderBottomWidth: screenWidth / 2.5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    zIndex: -1,
  }
};
