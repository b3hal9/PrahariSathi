import { View, ScrollView, useToast } from 'native-base'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from '../components/PostCard'
import { handle_getAllPost } from '../store/actions/postActions'
import ColorPalete from '../utils/ColorPalete'
import { Spinner, Heading } from 'native-base'

const PostScreen = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const { posts, loading } = useSelector((state) => state.post_data)

  useEffect(() => {
    dispatch(handle_getAllPost(toast))
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {!loading ? (
            posts.map((post) => <PostCard post={post} key={post._id} />)
          ) : (
            <View style={styles.loading}>
              <Spinner accessibilityLabel="Loading posts" />
              <Heading color={ColorPalete.custom} fontSize="md">
                Loading
              </Heading>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PostScreen

const styles = StyleSheet.create({
  loading: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: ColorPalete.primary,
  },
})
