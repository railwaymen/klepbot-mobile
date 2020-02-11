import ApiService from './api-service';
import CurrentUser from '../helpers/current-user';

async function currentUserToken() {
  const user = await CurrentUser.get();

  return user.token;
}

class AuthenticatedApiService {
  static get = async params => {
    const token = await currentUserToken();

    return ApiService.get({...params, authToken: token});
  };

  static post = async params => {
    const token = await currentUserToken();

    return ApiService.post({...params, authToken: token});
  };

  static put = async params => {
    const token = await currentUserToken();

    return ApiService.put({...params, authToken: token});
  };

  static delete = async params => {
    const token = await currentUserToken();

    return ApiService.delete({...params, authToken: token});
  };
}

export default AuthenticatedApiService;
