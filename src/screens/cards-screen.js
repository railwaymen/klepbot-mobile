import React, {Component} from 'react';
import {View, ScrollView, RefreshControl, Platform} from 'react-native';
import ModalCamera from '../components/camera/modal-camera';
import CurrentUser from '../helpers/current-user';
import ApiService from '../services/api-service';

import Card from '../components/cards/card';
import CardsService from '../services/cards-service';
import {colorPalette} from '../shared/styles';
import {NavButton} from '../components/shared/logo-top-bar';
import {unauthorized} from '../shared/actions';
import AlertsList from '../components/alerts/alerts-list';

class CardsScreen extends Component {
  static navigationOptions = ({navigation: {getParam}}) => ({
    headerRight: () => (
      <NavButton icon="ios-camera" onPress={getParam('onToggleCamera')} />
    ),
  });

  state = {
    isCameraOpen: false,
    isRefreshing: false,
    cards: [],
  };

  componentDidMount() {
    const {
      onToggleCamera,
      props: {
        navigation: {setParams},
      },
    } = this;

    this.fetchCards();

    setParams({onToggleCamera});
  }

  fetchCards = () => {
    return CardsService.all()
      .then(cards => {
        this.setState({
          cards,
        });
      })
      .catch(() => {
        const {navigation} = this.props;

        unauthorized({navigation});
      });
  };

  onCardSelect = id => {
    const {navigate} = this.props.navigation;

    navigate('Card', {id});
  };

  onSubmit = async ({uri}) => {
    const form = new FormData();
    const platformUri =
      Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

    const photo = {
      uri: platformUri,
      type: 'image/png',
      name: 'TestNO1',
    };

    form.append('card[image]', photo);

    const user = await CurrentUser.get();

    return ApiService.post({
      url: 'cards',
      body: form,
      headers: {
        'Content-Type': 'multipart/form-data;',
        Accept: 'application/json',
      },
      authToken: user.token,
    });
  };

  onToggleCamera = () => {
    this.setState(state => ({
      isCameraOpen: !state.isCameraOpen,
    }));
  };

  onRefresh = () => {
    this.setState(
      {
        isRefreshing: true,
      },
      () => {
        this.fetchCards()
          .then(() => {
            this.setState({
              isRefreshing: false,
            });
          })
          .catch(() => {
            this.setState({
              isRefreshing: false,
            });
          });
      },
    );
  };

  render() {
    const {isCameraOpen, cards, isRefreshing} = this.state;

    return (
      <>
        <ModalCamera
          onToggleCamera={this.onToggleCamera}
          visible={isCameraOpen}
          onTakePicture={this.onSubmit}
        />

        <View style={styles.container}>
          <AlertsList />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={this.onRefresh}
              />
            }>
            {cards.map(card => (
              <Card key={card.id} onPress={this.onCardSelect} {...card} />
            ))}
          </ScrollView>
        </View>
      </>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colorPalette.backgroundColor,
  },
  topBar: {
    padding: 9,
  },
};

export default CardsScreen;
