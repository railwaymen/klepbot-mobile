import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Platform} from 'react-native';
import Button from '../shared/button';

export default function DatePickerModalUI({value, onChange}) {
  const [isCalendarDaysOpen, setCalendarDaysOpen] = useState(false);
  const [isCalendarMinutesOpen, setCalendarMinutesOpen] = useState(false);

  if (Platform.OS === 'ios') {
    return <DateTimePicker value={value} mode="datetime" onChange={onChange} />;
  } else {
    const onDateChange = (event, date) => {
      if (event.type === 'dismissed') {
        return setCalendarDaysOpen(false);
      }

      onChange(event, date);
      setCalendarDaysOpen(false);
      setCalendarMinutesOpen(true);
    };

    const onMinutesChange = (event, date) => {
      if (event.type === 'dismissed') {
        return setCalendarMinutesOpen(false);
      }

      onChange(event, date);
      setCalendarDaysOpen(false);
      setCalendarMinutesOpen(false);
    };

    return (
      <>
        {isCalendarDaysOpen ? (
          <DateTimePicker
            value={value}
            minimumDate={new Date()}
            onChange={onDateChange}
            display="calendar"
          />
        ) : null}
        {isCalendarMinutesOpen ? (
          <DateTimePicker
            value={value}
            onChange={onMinutesChange}
            minimumDate={new Date()}
            display="clock"
            mode="time"
          />
        ) : null}

        <Button onPress={() => setCalendarDaysOpen(true)}>Open calendar</Button>
      </>
    );
  }
}
