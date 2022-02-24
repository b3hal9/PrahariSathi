import * as SecureStore from 'expo-secure-store'
import moment from 'moment'

const key = 'my-token'
const ExpiryTime = 60 // minutes

const isExpired = (item) => {
  const now = moment(Date.now())
  const storedTime = moment(item.timestamp)
  return now.diff(storedTime, 'minutes') > ExpiryTime
}

const storeToken = async (authToken) => {
  try {
    const item = {
      authToken,
      timestamp: Date.now(),
    }
    await SecureStore.setItemAsync(key, JSON.stringify(item))
  } catch (e) {
    console.log('Error saving Auth Token', e)
  }
}

const getToken = async () => {
  try {
    const value = await SecureStore.getItemAsync(key)
    const item = JSON.parse(value)
    if (!item) return null
    if (isExpired(item)) {
      console.log('Token Expired')
      await SecureStore.deleteItemAsync(key)
      return null
    }
    return item.authToken
  } catch (e) {
    console.log('Error getting Auth Token', e)
  }
}

const removeToken = async () => {
  try {
    return await SecureStore.deleteItemAsync(key)
  } catch (e) {
    console.log('Error removing Auth Token', e)
  }
}

// setInterval(getToken,3600000)

export default { getToken, removeToken, storeToken }
