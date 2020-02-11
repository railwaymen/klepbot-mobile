import React, {useState} from 'react';
import AlertsContext from '../contexts/alerts-context';

export default function Alerts({children}) {
  const [messages, setMessages] = useState([]);

  const pushMessage = (message) => {
    const messageModel = new AlertModel(message);

    setMessages(messages.concat([messageModel]));
    setTimeout(() => removeMessage(messageModel), messageModel.displayTime);
  };

  const removeMessage = message =>
    setMessages(messages.filter(m => m.id !== message.id));

  return (
    <AlertsContext.Provider value={{messages, pushMessage, removeMessage}}>
      {children}
    </AlertsContext.Provider>
  )
}

class AlertModel {
  constructor({description, type, displayTime = 2500}) {
    this.id = new Date();
    this.description = description;
    this.type = type;
    this.displayTime = displayTime;
  }
}