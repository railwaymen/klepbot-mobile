import ApiService from './api-service';

class ImagesService {
  static async sendPicture(image) {
    return ApiService.post({
      url: 'cards',
      body: JSON.stringify({card: {image}}),
    });
  }
}

export default ImagesService;
