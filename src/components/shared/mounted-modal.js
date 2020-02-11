import React from 'react';
import {Modal} from 'react-native';

export default function MountedModal({children, visible}) {
  return (
    <Modal
      presentationStyle="pageSheet"
      animationType="slide"
      transparent={false}
      visible={visible}>
      {visible ? children : null}
    </Modal>
  );
}
