import React, {useContext} from 'react';
import Notice from './alert-fixed-center';
import AlertsContext from '../../contexts/alerts-context';
import InternetConnectionContext from '../../contexts/internet-connection-context';
import ToastLabel from '../shared/toast-label';

export default function AlertsList() {
  const {messages} = useContext(AlertsContext);
  const isConnected = useContext(InternetConnectionContext);

  return (
    <>
      {!isConnected ? <Notify description="No internet" /> : null}
      {messages.map(message => (
        <Notify {...message} />
      ))}
    </>
  );
}

function Notify({description, type = 'toast'}) {
  switch (type) {
    case 'toast':
      return <ToastLabel>{description}</ToastLabel>;
    case 'popup':
      return <Notice>{description}</Notice>;
  }
}
