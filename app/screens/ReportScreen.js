import {
  VStack,
  FormControl,
  Button,
  Input,
  Heading,
  Flex,
  Select,
  Text,
  ScrollView,
  CheckIcon,
  TextArea,
  useToast,
} from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import LoginScreen from '../screens/Auth/LoginScreen'
import { useSelector } from 'react-redux'
import { MyDatePicker, MyTimePicker } from '../components/MyDatePicker'
import moment from 'moment'
import { handle_addReport } from '../store/actions/postActions'

const formValidations = Yup.object().shape({
  incidentAddress: Yup.string().min(3).max(16).required(),
  reportType: Yup.string().required(),
  station: Yup.string().required(),
  description: Yup.string().required().min(10).max(255),
})

const ReportForm = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()

  const handleReport = (values) => {
    setLoading(true)
    dispatch(handle_addReport(navigation, values, toast))
    setLoading(false)
  }

  const { user } = useSelector((state) => state.auth)
  return (
    <>
      {user.status === 'verified' ? (
        <ScrollView>
          <Formik
            initialValues={{
              incidentDate: moment().format('YYYY-MM-DD'),
              incidentTime: moment().format('h:m A'),
              incidentAddress: '',
              reportType: '',
              station: '',
              description: '',
            }}
            onSubmit={handleReport}
            validationSchema={formValidations}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setFieldValue,
            }) => (
              <VStack mt={20} space={4} style={styles.container} safeArea>
                <Flex mb={30}>
                  <Heading mb={2} size="lg">
                    Report Form
                  </Heading>
                  <Text fontSize="sm">Please fill this form properly.</Text>
                </Flex>
                <FormControl isRequired>
                  <FormControl.Label>Incident Date</FormControl.Label>
                  <MyDatePicker values={values} setFieldValue={setFieldValue} />
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label>Incident Time</FormControl.Label>
                  <MyTimePicker
                    values={values.incidentTime}
                    setFieldValue={setFieldValue}
                  />
                </FormControl>
                <FormControl isRequired isInvalid={'incidentAddress' in errors}>
                  <FormControl.Label>Incident Address</FormControl.Label>
                  <Input
                    onBlur={handleBlur('incidentAddress')}
                    onChangeText={handleChange('incidentAddress')}
                    value={values.incidentAddress}
                  />
                  <FormControl.ErrorMessage>
                    {errors.incidentAddress}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'reportType' in errors}>
                  <FormControl.Label>Report Types</FormControl.Label>
                  <Select
                    minWidth={200}
                    accessibilityLabel="Report Types"
                    placeholder="Report Types"
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size={5} />,
                    }}
                    mt="1"
                    onValueChange={handleChange('reportType')}
                  >
                    <Select.Item label="lost/stolen" value="lost/stolen" />
                    <Select.Item label="found/recover" value="found/recover" />
                    <Select.Item label="accident" value="accident" />
                    <Select.Item
                      label="suspect/criminals"
                      value="suspect/criminals"
                    />
                    <Select.Item label="Any Others" value="Any Others" />
                  </Select>
                  <FormControl.ErrorMessage>
                    {errors.reportType}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'stations' in errors}>
                  <FormControl.Label>Police Station</FormControl.Label>
                  <Select
                    minWidth={200}
                    accessibilityLabel="Choose Police Station"
                    placeholder="Choose Police Station"
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size={5} />,
                    }}
                    mt="1"
                    onValueChange={handleChange('station')}
                  >
                    <Select.Item
                      label="Baraha Police Station"
                      value="Baraha Police Station"
                    />
                    <Select.Item
                      label="Biratnagar Police Station"
                      value="Biratnagar Police Station"
                    />
                    <Select.Item
                      label="Itahari police station"
                      value="Itahari police station"
                    />
                    <Select.Item
                      label="Dharan Police station"
                      value="Dharan Police station"
                    />
                    <Select.Item
                      label="Belbari Police Station"
                      value="Belbari Police Station"
                    />
                  </Select>
                  <FormControl.ErrorMessage>
                    {errors.station}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={'Description' in errors}>
                  <FormControl.Label>Description</FormControl.Label>
                  <TextArea
                    h={20}
                    placeholder="Please provide detailed information."
                    onBlur={handleBlur('description')}
                    onChangeText={handleChange('description')}
                    value={values.description}
                    w={{
                      base: '100%',
                      md: '50%',
                    }}
                  />
                  <FormControl.ErrorMessage>
                    {errors.description}
                  </FormControl.ErrorMessage>
                </FormControl>
                <Button onPress={handleSubmit} disabled={loading}>
                  Sumbit
                </Button>
              </VStack>
            )}
          </Formik>
        </ScrollView>
      ) : (
        <LoginScreen navigation={navigation} />
      )}
    </>
  )
}

export default ReportForm

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    margin: 20,
  },

  selectDate: {
    fontFamily: 'open-sans',
    fontSize: 20,
    marginTop: 50,
    marginBottom: 10,
    alignSelf: 'center',
    color: 'red',
  },
  datebox: {
    alignSelf: 'center',
    height: 50,
    width: 500,
  },
})
