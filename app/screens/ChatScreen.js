import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { Button } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import ColorPalete from '../utils/ColorPalete'
import { useDispatch } from 'react-redux'
import { sendBotMessage } from '../store/actions/authAction'

const ChatScreen = () => {
  const dispatch = useDispatch()
  const [reply, setReply] = useState('')
  const [messages, setMessages] = useState([])

  const handle_sendMessage = async (e) => {
    e.preventDefault()
    await dispatch(sendBotMessage(reply, setMessages, messages))
    setReply('')
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.topbar}>
          <Text style={styles.title}>Chat</Text>
        </View>
        <ScrollView>
          <View style={styles.messagebody}>
            {messages.map((message) => {
              console.log(messages)
              return (
                <>
                  <View style={styles.response}>
                    <Text style={styles.responseText}>{message.user}</Text>
                  </View>
                  <View style={styles.reply}>
                    <Text style={styles.replyText}>{message.bot}</Text>
                  </View>
                </>
              )
            })}
          </View>
        </ScrollView>
        <View style={styles.buttombar}>
          <TextInput
            keyboardType="default"
            placeholder="Enter a message"
            style={styles.inputs}
            value={reply}
            placeholderTextColor={ColorPalete.primary}
            onChangeText={(text) => setReply(text)}
          />
          <Button color={ColorPalete.custom} style={styles.btn}>
            <Text style={styles.btnText} onPress={handle_sendMessage}>
              Send
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    height: '100%',
    backgroundColor: ColorPalete.primary,
  },
  topbar: {
    backgroundColor: ColorPalete.secondary,
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  messagebody: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  buttombar: {
    marginTop: 10,
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignSelf: 'flex-end',
  },
  reply: {
    height: 60,
    backgroundColor: ColorPalete.secondary,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: 10,
  },
  response: {
    marginTop: 10,
    height: 60,
    backgroundColor: ColorPalete.custom,
    marginBottom: 10,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    alignSelf: 'flex-end',
    marginRight: 5,
  },
  responseText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 16,
    fontStyle: 'italic',
  },
  replyText: {
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 16,
    fontStyle: 'italic',
  },
  inputs: {
    borderColor: ColorPalete.btn,
    height: 60,
    backgroundColor: ColorPalete.secondary,
    borderRadius: 40,
    padding: 10,
    width: 280,
    paddingLeft: 20,
    color: ColorPalete.primary,
    fontSize: 16,
  },
  btn: {
    padding: 10,
    backgroundColor: ColorPalete.custom,
    height: 60,
    borderRadius: 20,
    width: 100,
    marginLeft: 10,
    marginRight: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
