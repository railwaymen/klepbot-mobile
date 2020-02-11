import React, {Component} from 'react';
import {TextInput, KeyboardAvoidingView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SearchField extends Component {
  constructor(props) {
    super(props);

    const {value = '', typeDelay = 1} = props;

    this.state = {
      value,
      typeDelay: typeDelay * 1000,
      isFocused: false,
    };

    this.lastTypeAt = null;
    this.typeOut = null;
  }

  onChange = value => {
    this.lastTypeAt = new Date();

    if (this.typeOut) {
      clearTimeout(this.typeOut);
    }

    this.setState(
      {
        value,
      },
      () => {
        const {
          props: {onStopTyping},
          state: {typeDelay, value: newValue},
        } = this;

        this.typeOut = setTimeout(() => {
          if (new Date() - this.lastTypeAt >= typeDelay) {
            if (onStopTyping) {
              onStopTyping(newValue);
            }
          }
        }, typeDelay);
      },
    );
  };

  onFocus = () => {};

  clear = () => {
    const {onStopTyping} = this.props;

    this.setState({value: ''}, () => {
      const {value} = this.state;

      if (this.typeOut) {
        clearTimeout(this.typeOut);
      }
      if (onStopTyping) {
        onStopTyping(value);
      }
    });
  };

  render() {
    const {styles = {}} = this.props;

    return (
      <KeyboardAvoidingView
        behavior={null}
        keyboardVerticalOffset={0}
        style={[styles, inputStyles.inputContainer]}>
        <TextInput
          style={inputStyles.input}
          placeholder="Type to search"
          onFocus={this.onFocus}
          onChangeText={this.onChange}
        />
        <Icon style={inputStyles.icon} name="ios-search" size={17} />
      </KeyboardAvoidingView>
    );
  }
}

const inputStyles = {
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 6,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 12,
  },
};
