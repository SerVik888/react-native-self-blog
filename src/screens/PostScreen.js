import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { removePost, toggleBooked } from '../store/actions/postAction';
import { THEME } from '../theme'


export const PostScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const postId = navigation.getParam('postId')
  const post = useSelector(state => state.post.allPosts.find(post => post.id === postId))

  const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId))
  useEffect(() => {
    navigation.setParams({ booked })
  }, [booked])

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(post))
  }, [dispatch, post])

  useEffect(() => {
    navigation.setParams({ toggleHandler })
  }, [toggleHandler])

  const removeHandler = () => {
    return (
      Alert.alert(
        'Удалить пост',
        'Вы точно хотите удалить пост?',
        [
          { text: 'Отменить', style: 'cancel' },
          {
            text: 'Удалить',
            style: 'destructive',
            onPress: () => {
              navigation.navigate('Main')
              dispatch(removePost(postId))
            }
          }

        ],
        { cancelable: false }
      )
    )
  }

  if (!post) {
    return null
  }

  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.img} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button title='Удалить' color={THEME.DANGER_COLOR} onPress={removeHandler} />
    </ScrollView>
  )
}

PostScreen.navigationOptions = ({ navigation }) => {

  const date = navigation.getParam('date')
  const booked = navigation.getParam('booked')
  const toggleHandler = navigation.getParam('toggleHandler')
  const iconStar = booked ? 'star' : 'star-outline'

  return {
    headerTitle: 'Пост от ' + new Date(date).toLocaleDateString(),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='iconStar'
          iconName={iconStar}
          onPress={toggleHandler} />
      </HeaderButtons>
    )
  }

}

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 200
  },
  textWrap: {
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-regular'
  },
  cancel: {
    backgroundColor: 'red'
  }
})