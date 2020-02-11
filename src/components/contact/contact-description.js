import React from 'react';
import {View, Text} from 'react-native';

export default function ContactDescription({
  firstName,
  lastName,
  email,
  phoneNumbers,
  event: {color: eventColor, name: eventName},
  status: {color: statusColor, name: statusName},
}) {
  return (
    <>
      <View style={styles.contactCard}>
        <Text style={styles.cardText}>
          {firstName} {lastName}
        </Text>
      </View>
      <View style={styles.contactData}>
        <Card color={statusColor}>{statusName}</Card>
        <Card color={eventColor}>{eventName}</Card>
      </View>
      <View style={styles.info}>
        <Text style={styles.infoText}>{email}</Text>
        <Text style={styles.infoText}>{phoneNumbers}</Text>
      </View>
    </>
  );
}

function Card({color, children}) {
  return (
    <View
      style={[
        styles.card,
        {shadowColor: color, backgroundColor: hexToRgb(color)},
      ]}>
      <Text style={[styles.cardInfoText]}>{children}</Text>
    </View>
  );
}

function hexToRgb(hex) {
  if (!hex) return;

  const rgb = hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b,
    )
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16))
    .join(',');

  return `rgba(${rgb}, 0.3)`;
}

const styles = {
  contactData: {
    flexDirection: 'row',
    padding: 14,
  },
  cardText: {
    color: '#eee',
    fontSize: 39,
  },
  contactCard: {
    padding: 14,
  },
  info: {
    padding: 14,
  },
  infoText: {
    color: '#ccc',
  },
  card: {
    flex: 1,
    alignItems: 'center',
    padding: 11,
    flexDirection: 'column',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    justifyContent: 'center',
    color: '#fff',
    borderRadius: 7,
    marginLeft: 5,
    marginRight: 5,
  },
  cardInfoText: {
    color: '#eee',
    fontSize: 14,
  },
};
