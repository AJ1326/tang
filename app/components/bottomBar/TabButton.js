import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
IconIonicons.loadFont();

const TabButton = ({
  inactiveColor,
  label,
  inactiveIcon,
  isActive,
  activeIcon,
  activeColor,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text>
        <IconIonicons
          name={isActive ? activeIcon : inactiveIcon}
          size={24}
          color={isActive ? activeColor : inactiveColor}
        />
      </Text>
      <Text
        style={[styles.label, {color: isActive ? activeColor : inactiveColor}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: 'bold',
  },
});

export default TabButton;
