import React, {useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import InternetConnectionContext from '../contexts/internet-connection-context';

export default function InternetConnection({children}) {
  const [isInternetConnection, setIsInternetConnection] = useState(true);

  setInterval(() => {
    NetInfo.fetch().then(({isConnected}) => {
      setIsInternetConnection(isConnected);
    });
  }, 3000);

  return (
    <InternetConnectionContext.Provider value={isInternetConnection}>
      {children}
    </InternetConnectionContext.Provider>
  );
}
