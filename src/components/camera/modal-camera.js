import React, {useContext} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import AlertsContext from '../../contexts/alerts-context';
import AlertsList from '../alerts/alerts-list';

export default function ModalCamera({onTakePicture, visible, onToggleCamera}) {
  const {pushMessage} = useContext(AlertsContext);

  const takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);

      onTakePicture(data)
        .then(() => {
          pushMessage({
            description: 'Card saved!',
            type: 'popup',
          });
        })
        .catch(() => {
          pushMessage({
            description: 'There was and error when processing card!',
          });
        })
        .finally(() => {
          onToggleCamera();
        });
    }
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visible}>
      <RNCamera
        style={styles.container}
        ref={ref => (this.camera = ref)}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        <AlertsList />
        <IconButton
          ico="ios-close"
          style={styles.absoluteIcon}
          onPress={onToggleCamera}
        />
        <IconButton style={[styles.circle]} onPress={takePicture} />
      </RNCamera>
    </Modal>
  );
}

function IconButton({ico, style, onPress}) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Icon name={ico} size={39} color="#fff" />
    </TouchableOpacity>
  );
}

const circleWidth = 74;

const styles = {
  absoluteIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 15,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
  },
  circle: {
    width: circleWidth,
    height: circleWidth,
    borderRadius: circleWidth / 2,
    borderWidth: 4,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    borderColor: 'rgba(0,0,0,0.3)',
    marginBottom: 22,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
  },
};
