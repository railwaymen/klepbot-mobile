import React, {Component, useState} from 'react';
import {View, ScrollView, Text, Animated, StatusBar} from 'react-native';
import TextInputGroup from '../shared/text-input-group';
import {colorPalette} from '../../shared/styles';
import ModalHeader from '../shared/modal-header';
import {Header2, HeaderTitle} from '../shared/header';
import Button from '../shared/button';
import MountedModal from '../shared/mounted-modal';
import PossibleNames from './card-possible-names';

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
            <Header2>
              {firstName} {lastName}
            </Header2>
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
          <Button onPress={this.onToggleMetadata}>Show metadata</Button>
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
      <Text style={styles.metadataText}>{data}</Text>
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
  },
};
