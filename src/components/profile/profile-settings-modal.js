import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image, ScrollView} from 'react-native';
import Button from '../shared/button';
import TextInputGroup from '../shared/text-input-group';
import ModalHeader from '../shared/modal-header';
import MountedModal from '../shared/mounted-modal';

export default class ProfileSettingsModal extends Component {
  constructor(props) {
    super(props);
    const {firstName, lastName, signature, avatarUrl} = this.props.user;

    this.state = {firstName, lastName, signature, avatarUrl};
  }

  onChange = ({name, value}) => {
    this.setState({
      [name]: value,
    });
  };

  onSubmit = () => {
    const {
      props: {saveUser},
      state: {firstName, lastName, signature},
    } = this;

    saveUser({firstName, lastName, signature});
  };

  render() {
    const {
      props: {visible, close, onLogOut},
      state: {firstName, lastName, signature, avatarUrl},
    } = this;

    return (
      <MountedModal visible={visible}>
        <View style={styles.container}>
          <ModalHeader onSave={this.onSubmit} onCancel={close} />
          <ScrollView>
            <TouchableOpacity style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: avatarUrl}} />
              <Text style={styles.imageLabel}>Change your profile picture</Text>
            </TouchableOpacity>
            <View style={styles.formBody}>
              <TextInputGroup
                label="First name"
                name="firstName"
                value={firstName}
                onChange={this.onChange}
              />
              <TextInputGroup
                label="Last name"
                name="lastName"
                value={lastName}
                onChange={this.onChange}
              />
              <TextInputGroup
                label="Signature"
                name="signature"
                value={signature}
                onChange={this.onChange}
              />
              <Button onPress={onLogOut}>Log out</Button>
            </View>
          </ScrollView>
        </View>
      </MountedModal>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
  },
  imageContainer: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  image: {
    width: 124,
    height: 124,
    borderRadius: 62,
  },
  formBody: {
    backgroundColor: '#fff',
  },
  imageLabel: {
    color: '#54A2FF',
  },
};
