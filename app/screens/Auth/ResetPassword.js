import {
  VStack,
  FormControl,
  Button,
  Input,
  Heading,
  Flex,
  Text,
} from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { FontAwesome } from '@expo/vector-icons'

const formValidations = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
})

const handleSubmit = (values) => {
  console.log(values)
}

const ResetScreen = ({ navigation }) => {
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={handleSubmit}
      validationSchema={formValidations}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <VStack mt={20} space={4} style={styles.container} safeArea>
          <Button
            mb={20}
            startIcon={
              <FontAwesome
                name="chevron-left"
                size={30}
                color="black"
                style={{ opacity: 0.3 }}
              />
            }
            size="sm"
            variant="link"
            onPress={() => navigation.pop()}
            style={{ alignSelf: 'flex-start' }}
          ></Button>
          <Flex mb={30}>
            <Heading mb={2} size="sm" style={{ textTransform: 'uppercase' }}>
              Reset Your Account Password
            </Heading>
          </Flex>
          <FormControl
            isRequired={'email' in errors}
            isInvalid={'email' in errors}
          >
            <FormControl.Label>Email Address</FormControl.Label>
            {console.log('errors', errors)}
            <Input
              onBlur={handleBlur('email')}
              placeholder="Johndoe@gmail.com"
              onChangeText={handleChange('email')}
              value={values.email}
              InputLeftElement={
                <FontAwesome
                  name="envelope"
                  size={20}
                  color="black"
                  style={{ opacity: 0.3, paddingLeft: 8, paddingRight: 2 }}
                />
              }
            />
            <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
          </FormControl>

          <Button mt={10} style={{ width: '50%' }} onPress={handleSubmit}>
            Send
          </Button>
        </VStack>
      )}
    </Formik>
  )
}

export default ResetScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',

    margin: 20,
  },
})
