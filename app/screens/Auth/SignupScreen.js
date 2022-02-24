import {
  VStack,
  FormControl,
  Button,
  Input,
  Heading,
  Flex,
  Text,
  useToast,
} from 'native-base'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { FontAwesome } from '@expo/vector-icons'
import ColorPalete from '../../utils/ColorPalete'
import { useDispatch } from 'react-redux'
import { RegisterHandler } from '../../store/actions/authAction'

const formValidations = Yup.object().shape({
  name: Yup.string().required().label('User Name').min(3).max(16),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().label('Password').min(8).max(16),
})

const SignupScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast()
  const dispatch = useDispatch()

  const userRegister = (values) => {
    setLoading(true)
    dispatch(RegisterHandler(values, navigation, toast))
    setLoading(false)
  }
  return (
    <View style={styles.signup}>
      <Formik
        initialValues={{ email: '', password: '', name: '' }}
        onSubmit={userRegister}
        validationSchema={formValidations}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <VStack mt={20} space={4} style={styles.container} safeArea>
            <Flex mb={30}>
              <Heading
                mb={4}
                size="lg"
                style={{
                  textTransform: 'uppercase',
                  color: ColorPalete.secondary,
                }}
              >
                Create Your Account
              </Heading>
              <Text
                fontSize="sm"
                style={{ textAlign: 'center', color: ColorPalete.secondary }}
              >
                Enter your details to register.
              </Text>
            </Flex>
            <FormControl
              isRequired={'name' in errors}
              isInvalid={'name' in errors}
            >
              <FormControl.Label>
                <Text style={styles.label}>User Name</Text>
              </FormControl.Label>
              <Input
                onBlur={handleBlur('name')}
                placeholder="John Doe"
                onChangeText={handleChange('name')}
                value={values.name}
                style={styles.inputtext}
                InputLeftElement={
                  <FontAwesome
                    name="user"
                    size={20}
                    color={ColorPalete.secondary}
                    style={{ opacity: 0.3, paddingLeft: 8, paddingRight: 2 }}
                  />
                }
              />
              <FormControl.ErrorMessage>{errors.name}</FormControl.ErrorMessage>
            </FormControl>

            <FormControl
              isRequired={'email' in errors}
              isInvalid={'email' in errors}
            >
              <FormControl.Label>
                <Text style={styles.label}>Email Address</Text>
              </FormControl.Label>
              <Input
                onBlur={handleBlur('email')}
                placeholder="Johndoe@example.com"
                onChangeText={handleChange('email')}
                value={values.email}
                style={styles.inputtext}
                InputLeftElement={
                  <FontAwesome
                    name="envelope"
                    size={20}
                    color={ColorPalete.secondary}
                    style={{ opacity: 0.3, paddingLeft: 8, paddingRight: 2 }}
                  />
                }
              />
              <FormControl.ErrorMessage>
                {errors.email}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl
              isRequired={'password' in errors}
              isInvalid={'password' in errors}
            >
              <FormControl.Label>
                <Text style={styles.label}>Password</Text>
              </FormControl.Label>
              <Input
                type={show ? 'text' : 'password'}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder="Your Password here"
                style={styles.inputtext}
                InputLeftElement={
                  <FontAwesome
                    name="lock"
                    size={30}
                    color={ColorPalete.secondary}
                    style={{ opacity: 0.3, paddingLeft: 8, paddingRight: 2 }}
                  />
                }
                InputRightElement={
                  <Button
                    variant="ghost"
                    ml={1}
                    roundedLeft={0}
                    roundedRight="md"
                    onPress={handleClick}
                    startIcon={
                      <FontAwesome
                        name={show ? 'eye' : 'eye-slash'}
                        size={30}
                        color={ColorPalete.secondary}
                        style={{ opacity: 0.3 }}
                      />
                    }
                  ></Button>
                }
              />
              <FormControl.ErrorMessage>
                {errors.password}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button mt={10} size="lg" onPress={handleSubmit} disabled={loading}>
              Sign Up
            </Button>

            <Button
              mt={10}
              size="sm"
              variant="link"
              onPress={() => navigation.push('login')}
            >
              <Text style={styles.label}>
                Already have an account?{' '}
                <Text bold style={{ color: ColorPalete.custom }}>
                  Log In
                </Text>
              </Text>
            </Button>
          </VStack>
        )}
      </Formik>
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  signup: {
    backgroundColor: ColorPalete.primary,
    height: '100%',
  },
  label: {
    color: ColorPalete.secondary,
  },

  container: {
    display: 'flex',
    alignItems: 'center',
    margin: 20,
  },
  links: {
    color: 'blue',
  },
  inputtext: {
    color: 'white',
  },
})
