import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import theme from '../../constants/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
IconFontisto.loadFont();

const AddButton = ({navigation}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('contact');
      }}>
      <Text>
        <IconFontisto name={'plus-a'} size={24} color={theme.white} />
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.icons.active,
    height: wp('18%'),
    width: wp('18%'),
    borderRadius: 100,
    borderWidth: 4,
    borderColor: theme.white,
    position: 'relative',
    top: Platform.OS === 'ios' ? -hp('1.8%') : -hp('3%'),
  },
});

export default AddButton;
