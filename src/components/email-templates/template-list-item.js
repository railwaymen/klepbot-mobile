import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {colorPalette} from '../../shared/styles';

export default function TemplateListItem({
  id,
  name,
  body,
  onSelect,
  selectedTemplateId,
}) {
  const onSelectTemplate = () => onSelect({id, template: body});

  return (
    <TouchableOpacity
      style={
        selectedTemplateId === id
          ? styles.selectedTemplateContainer
          : styles.templateContainer
      }
      onPress={onSelectTemplate}>
      <Text>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = {
  templateContainer: {
    padding: 12,
    borderBottomWidth: 2,
    borderColor: '#eaeaea',
  },
  selectedTemplateContainer: {
    padding: 12,
    borderBottomWidth: 2,
    borderColor: colorPalette.secondary,
  },
};
