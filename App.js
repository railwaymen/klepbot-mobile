import React from 'react';
import AppNavigation from './src/navigations/app-navigation';
import Alerts from './src/hooks/alerts-hook';
import InternetConnection from './src/hooks/internet-connection-hook';

function App() {
  return (
    <InternetConnection>
      <Alerts>
        <AppNavigation />
      </Alerts>
    </InternetConnection>
  );
}

export default App;
