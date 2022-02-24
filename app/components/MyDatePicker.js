import React, { useState } from 'react'
import { View } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { Icon, Button } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

export const MyDatePicker = (props) => {
  const { values, setFieldValue } = props
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    setFieldValue('incidentDate', moment(date).format('YYYY-MM-DD'))
    hideDatePicker()
  }

  return (
    <View>
      <Button
        leftIcon={<Icon as={MaterialIcons} name="date-range" size="sm" />}
        onPress={showDatePicker}
        style={{ justifyContent: 'flex-start' }}
      >
        {moment(values.incidentDate).format('YYYY-MM-DD')}
      </Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={moment(values.incidentDate).toDate()}
      />
    </View>
  )
}

export const MyTimePicker = (props) => {
  const { value, setFieldValue } = props
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false)

  const showTimePicker = () => {
    setTimePickerVisibility(true)
  }
  const hideTimePicker = () => {
    setTimePickerVisibility(false)
  }
  const handleConfirm = (date) => {
    setFieldValue('incidentTime', moment(date).format('h:m A'))
    hideTimePicker()
  }
  return (
    <View>
      <Button
        leftIcon={<Icon as={MaterialIcons} name="access-time" size="sm" />}
        onPress={showTimePicker}
        style={{ justifyContent: 'flex-start' }}
      >
        {moment(value).format('h:m A')}
      </Button>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
        date={moment(value).toDate()}
      />
    </View>
  )
}
