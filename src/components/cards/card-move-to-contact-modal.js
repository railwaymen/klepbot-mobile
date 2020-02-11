import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import MountedModal from '../shared/mounted-modal';
import ModalHeader from '../shared/modal-header';
import StatusesService from '../../services/statuses-service';
import EventsService from '../../services/events-service';
import SelectList from '../shared/select-list';
import GradientButton from '../shared/gradient-button';
import ContactsService from '../../services/contacts-service';
import AlertsContext from '../../contexts/alerts-context';

export default class CardMoveToContactModal extends Component {
  static contextType = AlertsContext;

  constructor(props) {
    super(props);
    const {card} = props;

    this.state = {
      contact: card.toContact(),
      events: [],
      statuses: [],
      isScrollEnabled: true,
    };
  }

  componentDidMount() {
    Promise.all([EventsService.all(), StatusesService.all()]).then(
      ([statuses, events]) => {
        const {contact} = this.state;
        contact.status = statuses[0];
        contact.event = events[0];

        this.setState({statuses, events, contact});
      },
    );
  }

  onStatusChange = ({value}) => {
    const {contact, statuses} = this.state;
    const selectedStatus = statuses.find(status => status.id === value);
    contact.status = selectedStatus;

    this.setState({contact});
  };

  onEventChange = ({value}) => {
    const {contact, events} = this.state;
    const selectedEvent = events.find(event => event.id === value);
    contact.event = selectedEvent;

    this.setState({contact});
  };

  onSubmit = () => {
    const {
      state: {contact},
      context: {pushMessage},
      props: {close},
    } = this;

    ContactsService.create(contact.toParams()).then(() => {
      close();
      pushMessage({description: 'Saved!', type: 'popup'});
    });
  };

  toggleMainScroll = () => {
    this.setState(state => ({
      isScrollEnabled: !state.isScrollEnabled,
    }));
  };

  render() {
    const {
      props: {close},
      state: {
        isScrollEnabled,
        events,
        statuses,
        contact: {
          event: {id: selectedEventId},
          status: {id: selectedStatusId},
        },
      },
    } = this;

    return (
      <MountedModal onCancel={close} visible={true}>
        <View style={styles.container}>
          <ModalHeader onCancel={close} />
          <View style={styles.scrollContainer}>
            <ScrollView scrollEnabled={isScrollEnabled}>
              <SelectList
                list={events}
                displayKey="name"
                toggleMainScroll={console.log}
                onSelect={this.onEventChange}
                returnKey="id"
                name="name"
                selectedId={selectedEventId}
              />
              <SelectList
                list={statuses}
                displayKey="name"
                toggleMainScroll={console.log}
                onSelect={this.onStatusChange}
                returnKey="id"
                name="name"
                selectedId={selectedStatusId}
              />
            </ScrollView>
          </View>
          <View style={styles.actionsContainer}>
            <GradientButton onPress={this.onSubmit}>Let's go!</GradientButton>
          </View>
        </View>
      </MountedModal>
    );
  }
}

const styles = {
  container: {
    padding: 12,
    justifyContent: 'center',
    flex: 1,
  },
  scrollContainer: {
    flex: 5,
    justifyContent: 'center',
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
};
