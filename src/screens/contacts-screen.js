import React, {Component} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import ContactsService from '../services/contacts-service';
import ContactList from '../components/contacts/contact-list';
import SearchField from '../components/shared/search-field';
import {colorPalette} from '../shared/styles';
import {unauthorized} from '../shared/actions';
import AlertsList from '../components/alerts/alerts-list';

class ContactsScreen extends Component {
  constructor(props) {
    super(props);

    this.page = 1;
    this.query = '';
    this.hasMore = true;

    this.state = {
      contacts: [],
      isRefreshing: false,
    };
  }

  componentDidMount() {
    ContactsService.page(1)
      .then(contacts => {
        this.setState({contacts});
      })
      .catch(() => {
        const {navigation} = this.props;

        unauthorized({navigation});
      });
  }

  isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 150
    );
  }

  onScroll = ({nativeEvent}) => {
    if (this.hasMore && this.isCloseToBottom(nativeEvent)) {
      this.hasMore = false;
      this.page += 1;

      const {
        state: {contacts},
        page,
        query,
      } = this;

      ContactsService.search({query, page})
        .then(fetchedContacts => {
          if (fetchedContacts.length > 0) {
            this.setState({contacts: contacts.concat(fetchedContacts)});
            this.hasMore = true;
          } else {
            this.hasMore = false;
          }
        })
        .catch(() => {
          const {navigation} = this.props;

          unauthorized({navigation});
        });
    }
  };

  onSelectContact = id => {
    const {navigate} = this.props.navigation;

    navigate('Contact', {id});
  };

  onRefresh = () => {
    this.page = 1;
    this.hasMore = false;

    const {page, query} = this;

    this.setState(
      {
        isRefreshing: true,
      },
      () => {
        ContactsService.search({query, page})
          .then(contacts => {
            this.setState({
              contacts,
              isRefreshing: false,
            });
            this.hasMore = true;
          })
          .catch(() => {
            this.setState({
              isRefreshing: false,
            });
          });
      },
    );
  };

  onSearch = value => {
    this.page = 1;
    this.query = value;

    const {page, query} = this;

    ContactsService.search({query, page}).then(contacts => {
      this.setState({contacts});

      this.hasMore = true;
    });
  };

  render() {
    const {contacts, isRefreshing} = this.state;

    return (
      <View style={styles.container}>
        <AlertsList />
        <View style={styles.searchBox}>
          <SearchField onStopTyping={this.onSearch} />
        </View>
        <View style={styles.wrapper}>
          <ScrollView
            onScroll={this.onScroll}
            style={styles.scroll}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={this.onRefresh}
              />
            }>
            {contacts.map(contact => (
              <ContactList
                onPress={this.onSelectContact}
                key={contact.id}
                {...contact}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colorPalette.backgroundColor,
  },
  wrapper: {
    flex: 11,
  },
  scroll: {
    flex: 1,
  },
  searchBox: {
    padding: 12,
    backgroundColor: 'transparent',
    flex: 1,
  },
};

export default ContactsScreen;
