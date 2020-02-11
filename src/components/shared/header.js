import React from 'react';
import {Text} from 'react-native';

export function Header1({style = {}, children}) {
  return <Text style={[header1, style]}>{children}</Text>;
}

export function Header2({style = {}, children}) {
  return <Text style={[header2, style]}>{children}</Text>;
}

export function Header3({style = {}, children}) {
  return <Text style={[header3, style]}>{children}</Text>;
}

export function HeaderTitle({children}) {
  return <Text style={headerTitleText}>{children}</Text>;
}

const headerTitleText = {
  fontWeight: '800',
  marginBottom: 15,
};

const header1 = {
  fontSize: 44,
};
const header2 = {
  fontSize: 34,
};
const header3 = {
  fontSize: 24,
};
