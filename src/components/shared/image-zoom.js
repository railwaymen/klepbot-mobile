import React, { useState, useEffect } from 'react';
import {View, Text, Image, Modal, Animated} from 'react-native';
import ModalHeader from './modal-header';
import FullScreenLoader from './full-screen-loader';

export default function ImageZoom({onClose, src, name = 'Image Preview'}) {
  const [backgroundAlpha] = useState(new Animated.Value(0));
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    Animated.timing(backgroundAlpha, {
      toValue: 1,
      duration: 500,
    }).start();
  }, []);

  return (
    <Modal transparent={true}>
      <Animated.View style={[styles.zoomContainer, {opacity: backgroundAlpha}]}>
        <ModalHeader style={{marginTop: 35, paddingLeft: 15, left: 0, top: 0, position: 'absolute', width: '100%', zIndex: 150}} onCancel={onClose}>
          <Text>{name}</Text>
        </ModalHeader>
        <FullScreenLoader visible={!isImageLoaded} />
        <View style={styles.imageContainer}>
          <Image
            source={{uri: src}}
            style={styles.image}
            onLoad={() => setIsImageLoaded(true)}
          />
        </View>
      </Animated.View>
    </Modal>
  )
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