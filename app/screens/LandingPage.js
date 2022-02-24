import React from 'react'
import { Button } from 'native-base'

import { StyleSheet, Text, View } from 'react-native'
import ColorPalete from '../utils/ColorPalete'

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.Container}>
      <View style={styles.logoContainer}>
        <Text style={styles.h1}>Welcome to Prahari Sathi</Text>
        <Text style={styles.h3}>
          The app that keeps you connected with all police services and
          informations.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          full
          style={[styles.button, styles.btnPrimary]}
          onPress={() => navigation.push('login')}
        >
          <Text style={styles.btnText}> Log in</Text>
        </Button>
        <Button
          transparent
          light
          style={styles.button}
          onPress={() => navigation.push('register')}
        >
          <Text style={styles.btnText}> Sign up</Text>
        </Button>
      </View>
    </View>
  )
}

export default LandingPage

const styles = StyleSheet.create({
  Container: {
    backgroundColor: ColorPalete.primary,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  button: {
    width: 245.18,
    height: 48.18,
    padding: 14,
    marginBottom: 15,
    backgroundColor: ColorPalete.custom,
  },
  btnPrimary: {
    backgroundColor: ColorPalete.btn,
  },
  btnText: {
    fontSize: 20,
    fontWeight: '600',
    color: ColorPalete.secondary,
  },
  logoContainer: {
    alignItems: 'center',
    padding: 20,
  },
  h1: {
    fontSize: 26,
    color: ColorPalete.secondary,
    fontWeight: '800',
  },
  h3: {
    color: ColorPalete.secondary,
    fontSize: 20,
    padding: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 120,
  },
})
