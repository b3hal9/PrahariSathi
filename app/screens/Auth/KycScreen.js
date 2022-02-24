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
  Radio,
  CheckIcon,
  useToast,
} from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { KycHandler } from '../../store/actions/authAction'
import { useSelector } from 'react-redux'
import HomeScreen from '../HomeScreen'
import { MyDatePicker } from '../../components/MyDatePicker'
import moment from 'moment'

const formValidations = Yup.object().shape({
  number: Yup.number().required(),
  occupation: Yup.string().required(),
  religion: Yup.string().min(5).max(50).required(),
  gender: Yup.string().required(),
  address: Yup.string().min(5).max(255).required(),
  province: Yup.number().required(),
  district: Yup.string().required(),
  documentType: Yup.string().required(),
  documentId: Yup.string().required(),
})

const KycScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const toast = useToast()
  const handleSubmit = (values) => {
    dispatch(KycHandler(values, navigation, toast))
  }
  const { user } = useSelector((state) => state.auth)
  return (
    <>
      {user?.status !== 'verified' ? (
        <ScrollView>
          <Formik
            initialValues={{
              incidentDate: moment().format('YYYY-MM-DD'),
              number: '',
              address: '',
              district: '',
              province: '',
              gender: '',
              religion: '',
              documentType: '',
              documentId: '',
              occupation: '',
            }}
            onSubmit={handleSubmit}
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
                    Other Details
                  </Heading>
                  <Text fontSize="sm">Please fill this form properly.</Text>
                </Flex>
                <FormControl isRequired isInvalid={'number' in errors}>
                  <FormControl.Label>Phone number</FormControl.Label>
                  <Input
                    onBlur={handleBlur('number')}
                    onChangeText={handleChange('number')}
                    value={values.number}
                  />
                  <FormControl.ErrorMessage>
                    {errors.number}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={'address' in errors}>
                  <FormControl.Label>Address</FormControl.Label>
                  <Input
                    onBlur={handleBlur('address')}
                    onChangeText={handleChange('address')}
                    value={values.address}
                  />
                  <FormControl.ErrorMessage>
                    {errors.address}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <FormControl.Label>Date Of Birth</FormControl.Label>
                  <MyDatePicker values={values} setFieldValue={setFieldValue} />
                </FormControl>
                <FormControl isRequired isInvalid={'province' in errors}>
                  <FormControl.Label>Province no.</FormControl.Label>
                  <Input
                    onBlur={handleBlur('province')}
                    onChangeText={handleChange('province')}
                    value={values.province}
                  />
                  <FormControl.ErrorMessage>
                    {errors.province}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={'district' in errors}>
                  <FormControl.Label>District</FormControl.Label>
                  <Input
                    onBlur={handleBlur('district')}
                    onChangeText={handleChange('district')}
                    value={values.district}
                  />
                  <FormControl.ErrorMessage>
                    {errors.district}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={'gender' in errors}>
                  <FormControl.Label>Gender</FormControl.Label>
                  <Radio.Group
                    name="gender"
                    accessibilityLabel="gender"
                    value={values.gender}
                    onChange={handleChange('gender')}
                  >
                    <Radio accessibilityLabel="male" value="male" my={1}>
                      Male
                    </Radio>
                    <Radio accessibilityLabel="female" value="female" my={1}>
                      Female
                    </Radio>
                  </Radio.Group>
                  <FormControl.ErrorMessage>
                    {errors.gender}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={'religion' in errors}>
                  <FormControl.Label>Religion</FormControl.Label>
                  <Input
                    onBlur={handleBlur('religion')}
                    onChangeText={handleChange('religion')}
                    value={values.religion}
                  />
                  <FormControl.ErrorMessage>
                    {errors.religion}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={'occupation' in errors}>
                  <FormControl.Label>Occupation</FormControl.Label>
                  <Select
                    minWidth={200}
                    accessibilityLabel="Choose Occupation"
                    placeholder="Choose Occupation"
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size={5} />,
                    }}
                    mt="1"
                    onValueChange={handleChange('occupation')}
                  >
                    <Select.Item label="student" value="student" />
                    <Select.Item label="teacher" value="teacher" />
                    <Select.Item label="farmer" value="farmer" />
                    <Select.Item label="foreigner" value="foreigner" />
                    <Select.Item label="Others" value="Others" />
                  </Select>
                  <FormControl.ErrorMessage>
                    {errors.occupation}
                  </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={'documentType' in errors}>
                  <FormControl.Label>Document Type</FormControl.Label>
                  <Select
                    minWidth={200}
                    accessibilityLabel="Choose document"
                    placeholder="Choose document"
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size={5} />,
                    }}
                    mt="1"
                    onValueChange={handleChange('documentType')}
                  >
                    <Select.Item label="Citizenship" value="citizenship" />
                    <Select.Item label="Passport" value="passport" />
                    <Select.Item label="License" value="license" />
                  </Select>
                  <FormControl.ErrorMessage>
                    {errors.documentType}
                  </FormControl.ErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={'documentId' in errors}>
                  <FormControl.Label>Document no.</FormControl.Label>
                  <Input
                    onBlur={handleBlur('documentId')}
                    onChangeText={handleChange('documentId')}
                    value={values.documentId}
                  />
                  <FormControl.ErrorMessage>
                    {errors.documentId}
                  </FormControl.ErrorMessage>
                </FormControl>
                <Button onPress={handleSubmit}>Sumbit</Button>
              </VStack>
            )}
          </Formik>
        </ScrollView>
      ) : (
        <HomeScreen navigation={navigation} />
      )}
    </>
  )
}

export default KycScreen

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
