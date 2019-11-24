import ApiService from './api-service';
import UserModel from '../models/user-model';

class UsersService {
  static async signIn({email, password}) {
    const body = {
      email,
      password,
    }

    return ApiService.post({
      url: 'users/sign_in',
      body: JSON.stringify({user: body}),
    }).then((attributes) => {
      return new UserModel(attributes);
    });
  }
}

export default UsersService;
