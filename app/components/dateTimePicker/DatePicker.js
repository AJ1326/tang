import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import theme from '../../constants/theme';
import globalStyles from '../../assets/styles/globalStyle';
import dateFormat from 'dateformat';

const DatePicker = ({date, handleDateChange}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    handleDateChange(date);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatePicker}>
        <Text style={globalStyles.labelMedium}>
          {dateFormat(date, 'mmmm d, yyyy')}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={date}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    borderBottomColor: theme.border.gray,
    borderBottomWidth: 1,
  },
});

export default DatePicker;
