import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function CardActions({moveToContact, edit}) {
  const [marginAnim] = useState(new Animated.Value(245));
  const [opacityAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(marginAnim, {
        toValue: 0,
        duration: 700,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1500,
      })
    ]).start();
  }, []);

  return (
    <Animated.View style={[actionStyles.container, {marginTop: marginAnim, opacity: opacityAnim}]}>
      <TouchableOpacity style={actionStyles.item} onPress={edit}>
        <View style={actionStyles.icon}>
          <Icon name="ios-settings" color={color} size={26} />
        </View>
        <Text style={actionStyles.itemText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={actionStyles.item} onPress={moveToContact}>
        <View style={actionStyles.icon}>
          <Icon name="md-person-add" color={color} size={26} />
        </View>
        <Text style={actionStyles.itemText}>Move to contact</Text>
      </TouchableOpacity>
      <TouchableOpacity style={actionStyles.item}>
        <View style={actionStyles.icon}>
          <Icon name="ios-image" color={color} size={26} />
        </View>
        <Text style={actionStyles.itemText}>Show Image</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const color = '#555';

const actionStyles = {
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '6%',
    marginRight: '6%',
  },
  itemText: {
    fontSize: 11,
    color: color,
  },
  icon: {
    padding: 15,
    width:  64,
    height: 64,
    borderRadius: 32,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
};
