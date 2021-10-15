import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { PostList } from '../components/PostList'
import { postsAction } from '../store/actions/postAction'
import { THEME } from '../theme'

export const MainScreen = ({ navigation }) => {

  const openPostHandler = post => {
    navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked })
  }

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(postsAction())
  }, [dispatch])

  const allPosts = useSelector(state => state.post.allPosts)
  const loading = useSelector(state => state.post.loading)

  if(loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={THEME.MAIN_COLOR} size='large'/>
      </View>
    )
  }

  return <PostList data={allPosts} onOpen={openPostHandler}/>
}

MainScreen.navigationOptions = ({navigation}) => ({
  headerTitle: 'Мои посты',
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title='Take photo'
        iconName='camera'
        onPress={() => navigation.push('Create')} />
    </HeaderButtons>
  ),
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item
        title='Toggle drawer'
        iconName='menu'
        onPress={() => navigation.toggleDrawer()} 
        />
    </HeaderButtons>
  )
})

const styles = StyleSheet.create({
  center: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  }
})

