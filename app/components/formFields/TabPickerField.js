import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import theme from '../../constants/theme';
import globalStyles from '../../../assets/styles/globalStyle';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const TabPickerField = ({options = [], activeOption = '', onChange}) => {
  return (
    <View style={styles.inputContainer}>
      {options.map((option, index) => (
        <TouchableOpacity
          onPress={() => onChange(option)}
          style={styles.tabWrapper}
          key={index}>
          <View
            style={[styles.tab, activeOption === option && styles.activeTab]}>
            <Text
              style={[
                globalStyles.labelSmall,
                activeOption === option && styles.activeTabText,
              ]}>
              {option}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    width: wp('88%'),
    marginHorizontal: wp('6%'),
  },
  tabWrapper: {
    flex: 1,
  },
  tab: {
    backgroundColor: theme.background.grayMedium,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: theme.text.dark,
  },
  activeTabText: {
    color: theme.white,
    fontFamily: 'OpenSans-Bold',
  },
});

export default TabPickerField;
