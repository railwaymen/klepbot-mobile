import React, { useState, useEffect } from 'react';
import {View, Text, Image, Modal, Animated, PanResponder} from 'react-native';
import ModalHeader from './modal-header';
import FullScreenLoader from './full-screen-loader';

export default function ImageZoom({onClose, src, name = 'Image Preview'}) {
  const [backgroundAlpha] = useState(new Animated.Value(0));
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [panPosition] = useState(new Animated.ValueXY());

  useEffect(() => {
    Animated.timing(backgroundAlpha, {
      toValue: 1,
      duration: 500,
    }).start();
  }, []);

  useEffect(() => {
    alert(panPosition.x);
    if (panPosition.x < 500) {
      alert()
    }
  }, panPosition)

  const panResponser = panResponderGesturesImage(panPosition);

  const panStyles = {
    transform: [
      {translateX: panPosition.x},
      {translateY: panPosition.y},
    ]
  }

  return (
    <Modal transparent={true}>
      <Animated.View style={[styles.zoomContainer, {opacity: backgroundAlpha}]}>
        <ModalHeader style={{marginTop: 35, paddingLeft: 15, left: 0, top: 0, position: 'absolute', width: '100%', zIndex: 150}} onCancel={onClose}>
          <Text>{name}</Text>
        </ModalHeader>
        <FullScreenLoader visible={!isImageLoaded} />
        <Animated.View
          style={[styles.imageContainer, panStyles]}
          {...panResponser.panHandlers}
        >
          <Image
            source={{uri: src}}
            style={styles.image}
            onLoad={() => setIsImageLoaded(true)}
          />
        </Animated.View>
      </Animated.View>
    </Modal>
  )
}

const panResponderGesturesImage = (xyHandler) => {
  return PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (e, gestureState) => {
      xyHandler.setValue({x: 0, y: 0});
    },
    onPanResponderMove: Animated.event([
      null, {dx: xyHandler.x, dy: xyHandler.y}
    ]),
    onPanResponderRelease: (e, {vx, vy}) => {
      xyHandler.setValue({x: vx, y: vy});
    }
  });
}

const styles = {
  zoomContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
};