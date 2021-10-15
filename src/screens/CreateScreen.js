import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Button, ScrollView, TouchableNativeFeedback, Keyboard } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch } from 'react-redux';
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { PhotoPicker } from '../components/PhotoPicker';
import { addPost } from '../store/actions/postAction';
import { THEME } from '../theme';

export const CreateScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const imgRef = useRef()


  const saveHandler = () => {
    const post = {
      text: text,
      date: new Date().toJSON(),
      img: imgRef.current,
      booked: false
    }
    navigation.navigate('Main')
    dispatch(addPost(post))
  }

  const photoPickHandler = uri => {
    imgRef.current = uri
  }

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
    <ScrollView>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Создайте новый пост</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.textarea}
          placeholder='Ведите текст поста...'
          multiline 
          />
        <PhotoPicker onPick={photoPickHandler}/>
        <Button
          color={THEME.MAIN_COLOR}
          title='Добавить пост'
          onPress={() => saveHandler()}
          disabled={!text}
        />
      </View>
    </ScrollView>
    </TouchableNativeFeedback>
  )
}

CreateScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Создать пост',
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
  wrapper: {
    padding: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'open-regular'
  },
  textarea: {
    paddingVertical: 10,
    // marginVertical: 10 
  },
  img: {
    width: '100%',
    height: 200,
    marginBottom: 10
  }
})