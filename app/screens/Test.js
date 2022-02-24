import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Formik } from 'formik'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { Input, Icon, Button } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

export default function Example() {
  return (
    <Formik
      initialValues={{ myDate: moment().format('YYYY-MM-DD') }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit, values, setFieldValue }) => (
        <MyForm
          values={values}
          setFieldValue={setFieldValue}
          handleSubmit={handleSubmit}
        />
      )}
    </Formik>
  )
}

export const MyForm = (props) => {
  const { handleSubmit, values, setFieldValue } = props
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = (date) => {
    setFieldValue('myDate', moment(date).format('YYYY-MM-DD'))
    hideDatePicker()
  }

  return (
    <View style={{ marginTop: 200, marginBottom: 40 }}>
      <Button
        leftIcon={<Icon as={MaterialIcons} name="date-range" size="sm" />}
        onPress={showDatePicker}
        style={{ justifyContent: 'flex-start' }}
      >
        {moment(values.myDate).format('YYYY-MM-DD')}
      </Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={moment(values.myDate).toDate()}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  )
}
