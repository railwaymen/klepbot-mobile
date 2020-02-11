import ApiService from './api-service';
import UserModel from '../models/user-model';

class UsersService {
  static async signIn({email, password}) {
    return ApiService.post({
      url: 'users/sign_in',
      body: JSON.stringify({user: {email, password}}),
    }).then(attributes => {
      return new UserModel(attributes);
    });
  }

  static all() {
    return ApiService.get({
      url: 'users',
    }).then(users => users.map(user => new UserModel(user)));
  }

  static currentUser() {
    return ApiService.get({
      url: 'profile',
    }).then(user => new UserModel(user));
  }

  static async currentUserUpdate(params) {
    return ApiService.put({
      url: 'profile',
      body: params,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(user => new UserModel(user));
  }
}

export default UsersService;
