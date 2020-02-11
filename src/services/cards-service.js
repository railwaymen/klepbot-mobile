import ApiService from './authenticate-api-service';
import CardModel from '../models/card-model';

class CardsService {
  static async all() {
    return ApiService.get({
      url: 'cards',
    }).then(cards => cards.map(card => new CardModel(card)));
  }

  static async find(id) {
    return ApiService.get({
      url: `cards/${id}`,
    }).then(card => new CardModel(card));
  }

  static async update(id, attributes) {
    return ApiService.put({
      url: `cards/${id}`,
      body: JSON.stringify({card: attributes}),
    }).then(card => new CardModel(card));
  }
}

export default CardsService;
