import NetInfo from '@react-native-community/netinfo';

const DEFAULT_API_URL = 'http://localhost:3000/';
const DEFAULT_URL = 'http://locahost:3000';
const HEADER_TOKEN_NAME = 'Token';

export {DEFAULT_URL};

async function connect() {
  const connection = await NetInfo.fetch();

  return connection;
}

class ApiService {
  static get = async params => {
    const connection = await connect();
    if (!connection.isConnected) {
      throw new Error('No internet connection');
    }

    return fetch(`${DEFAULT_API_URL}/${params.url}`, {
      headers: {
        [HEADER_TOKEN_NAME]: params.authToken || '',
      },
    }).then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json();
      } else {
        throw Error(response.json());
      }
    });
  };

  static post = async params => {
    const connection = await connect();
    if (!connection.isConnected) {
      throw new Error('No internet connection');
    }

    return fetch(`${DEFAULT_API_URL}/${params.url}`, {
      body: params.body,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        ...params.headers,
        [HEADER_TOKEN_NAME]: params.authToken || '',
      },
    }).then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json();
      } else {
        throw response.json();
      }
    });
  };

  static put = async params => {
    const connection = await connect();
    if (!connection.isConnected) {
      throw new Error('No internet connection');
    }

    return fetch(`${DEFAULT_API_URL}/${params.url}`, {
      body: params.body,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        ...params.headers,
        [HEADER_TOKEN_NAME]: params.authToken || '',
      },
    }).then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json();
      } else {
        throw response.json();
      }
    });
  };

  static delete = async params => {
    const connection = await connect();
    if (!connection.isConnected) {
      throw new Error('No internet connection');
    }

    return fetch(`${DEFAULT_API_URL}/${params.url}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        [HEADER_TOKEN_NAME]: params.authToken || '',
      },
    }).then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json();
      } else {
        throw response.json();
      }
    });
  };
}

export default ApiService;
