import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null)
  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!')
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync()
    console.log(pickerResult)

    if (pickerResult.cancelled === true) {
      return
    }

    setSelectedImage({ localUri: pickerResult.uri })
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.imgur.com/TkIrScD.png' }}
        style={styles.logo}
      />
      <Text style={styles.instructions}>
        To share a photo from your phone with a friend, just press the button
        below!
      </Text>

      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  )
}
