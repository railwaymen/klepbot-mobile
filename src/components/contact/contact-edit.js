import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import ModalHeader from '../shared/modal-header';
import TextInputGroup from '../shared/text-input-group';

class ContactEdit extends Component {
  render() {
    const {close, firstName, lastName} = this.props;

    return (
      <View style={styles.container}>
        <ModalHeader onSave={this.onSubmit} onCancel={close} />
        <ScrollView>
          <View style={styles.scrollContainer}>
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
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
  },
  scrollContainer: {
    backgroundColor: '#fff',
  },
};

export default ContactEdit;
