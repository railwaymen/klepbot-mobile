import React, {Component, useState} from 'react';
import {View, ScrollView, Text, Animated, StatusBar} from 'react-native';
import TextInputGroup from '../shared/text-input-group';
import {colorPalette} from '../../shared/styles';
import ModalHeader from '../shared/modal-header';
import {Header2, HeaderTitle, Header3} from '../shared/header';
import Button from '../shared/button';
import MountedModal from '../shared/mounted-modal';
import PossibleNames from './card-possible-names';
import { TextInput } from 'react-native-gesture-handler';
import GradientButton from '../shared/gradient-button';

export default class CardEditModal extends Component {
  constructor(props) {
    super(props);

    const {firstName, lastName, email, websites, phoneNumbers} = props.card;

    this.state = {
      firstName,
      lastName,
      email,
      websites,
      phoneNumbers,
      showMetadata: false,
    };
  }

  onToggleMetadata = () => {
    this.setState(state => ({
      showMetadata: !state.showMetadata,
    }));
  };

  onChange = ({name, value}) => {
    this.setState({[name]: value});
  };

  onSelectName = possibleName => {
    const names = possibleName.split(' ');
    const firstName = names[0];
    names.splice(0, 1);
    const lastName = names.join(' ');

    this.setState({
      firstName: firstName,
      lastName: lastName,
    });
  };

  onSubmit = () => {
    const {
      props: {onSave},
      state: {firstName, lastName, email},
    } = this;

    onSave({firstName, lastName, email});
  };

  render() {
    const {
      state: {firstName, lastName, email, showMetadata, websites, phoneNumbers},
      props: {
        close,
        card: {metadata, possibleNames},
      },
    } = this;

    return (
      <MountedModal onCancel={close} visible={true}>
        <View style={[styles.container]}>
          <StatusBar hidden={false} />
          <ModalHeader onSave={this.onSubmit} onCancel={close} />
          <View style={styles.header}>
            <Header3>
              {firstName} {lastName}
            </Header3>
          </View>
          <PossibleNames
            onPress={this.onSelectName}
            possibleNames={possibleNames}
            style={styles.wrapper}
          />
          <ScrollView style={styles.wrapper}>
            <HeaderTitle>Edit</HeaderTitle>
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
              label="Email"
              name="email"
              value={email}
              onChange={this.onChange}
            />
            <TextInputGroup
              label="Websites"
              name="websites"
              value={websites}
              onChange={this.onChange}
            />
            <TextInputGroup
              label="Phone Numbers"
              name="phoneNumbers"
              value={phoneNumbers}
              onChange={this.onChange}
            />
            {showMetadata ? <Metadata data={metadata} /> : null}
          </ScrollView>
          <GradientButton style={{marginBottom: 5}} onPress={this.onToggleMetadata}>Show metadata</GradientButton>
          <GradientButton onPress={this.onToggleMetadata}>Show image</GradientButton>
        </View>
      </MountedModal>
    );
  }
}

function Metadata({data}) {
  const [resizeHeight] = useState(new Animated.Value(0));

  Animated.timing(resizeHeight, {
    toValue: 350,
    duration: 250,
  }).start();

  return (
    <Animated.View style={{height: resizeHeight}}>
      <HeaderTitle>Metadata</HeaderTitle>
      <TextInput
        editable={false}
        multiline={true}
        style={styles.metadataText}>
        {data}
      </TextInput>
    </Animated.View>
  );
}

const styles = {
  container: {
    flex: 1,
    borderRadius: 12,
    padding: 6,
    backgroundColor: '#efefef',
  },
  wrapper: {
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 13,
    marginBottom: 10,
    padding: 13,
  },
  header: {
    padding: 10,
    backgroundColor: colorPalette.gray,
  },
  metadataText: {
    color: '#0c0c0c',
    height: '100%',
  },
};
