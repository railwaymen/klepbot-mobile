import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Text, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colorPalette} from '../../shared/styles';

export default function SelectList({
  list,
  selectedId,
  onSelect,
  displayKey,
  name,
  returnKey,
  toggleMainScroll,
}) {
  const selectedItem = list.find(item => item.id === selectedId);
  const [displayModal, setDisplayModal] = useState(false);

  const {color = '#ccc'} = selectedItem || {};

  useEffect(() => {
    toggleMainScroll();
  }, [displayModal, toggleMainScroll]);

  const onSelectItem = args => {
    setDisplayModal(false);

    onSelect(args);
  };

  return (
    <Animated.View style={[styles.container, displayModal ? styles.index : {}]}>
      <TouchableOpacity
        style={[styles.infoItem, styles.label, {borderColor: color}]}
        onPress={() => setDisplayModal(!displayModal)}>
        <Text style={[styles.infoItemText, {color}]}>
          {selectedItem ? selectedItem[displayKey] : 'Not selected'}
        </Text>
        <Icon name="ios-arrow-down" size={18} />
      </TouchableOpacity>
      {displayModal ? (
        <ScrollItems
          list={list}
          onSelectItem={onSelectItem}
          name={name}
          returnKey={returnKey}
          selectedId={selectedId}
          displayKey={displayKey}
        />
      ) : null}
    </Animated.View>
  );
}

function ScrollItems({
  list,
  onSelectItem,
  name,
  returnKey,
  selectedId,
  displayKey,
}) {
  const [animatedHeight] = useState(new Animated.Value(0));

  Animated.timing(animatedHeight, {
    toValue: 200,
    duration: 300,
  }).start();

  return (
    <Animated.ScrollView style={[styles.dropdown, {height: animatedHeight}]}>
      {list.map(item => (
        <Item
          key={item.id}
          item={item}
          displayKey={displayKey}
          onSelect={onSelectItem}
          selectedId={selectedId}
          name={name}
          returnKey={returnKey}
        />
      ))}
    </Animated.ScrollView>
  );
}

function Item({item, displayKey, onSelect, name, returnKey, selectedId}) {
  const onSelectItem = () => onSelect({name, value: item[returnKey]});

  return (
    <TouchableOpacity style={[styles.infoItem]} onPress={onSelectItem}>
      <Text style={[styles.infoItemText, {color: item.color}]}>{item[displayKey]}</Text>
      {selectedId === item.id ? (
        <Icon
          color={item.color}
          name="ios-checkmark-circle-outline"
          size={20}
        />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = {
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colorPalette.backgroundColor,
    marginTop: 6,
    marginBottom: 6,
    zIndex: 100,
    borderRadius: 10,
  },
  label: {
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    borderBottomWidth: 1,
    borderRadius: 10,
  },
  index: {
    zIndex: 150,
  },
  infoItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    zIndex: 100,
    flexDirection: 'row',
    padding: 12,
    backgroundColor: colorPalette.backgroundColor,
  },
  infoItemText: {
    marginLeft: 12,
    shadowColor: '#0c0c0c',
    shadowOffset: {
      width: 2.3,
      height: 2.3,
    },
    shadowRadius: 23,
    shadowOpacity: .5,
  },
  dropdown: {
    zIndex: 100,
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
};
