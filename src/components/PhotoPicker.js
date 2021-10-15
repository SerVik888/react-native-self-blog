import React, { useState, useEffect } from 'react'
import { Alert, Button, Image, StyleSheet, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo-camera';
// import * as Permissions from 'expo-permissions'

async function askForPermissions() {

    const { status } = await Camera.requestPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Вы не дали права на использование камеры')
    return false
  }
  return true
}

export const PhotoPicker = ({ onPick }) => {
  const [image, setImage] = useState(null)

  const takePhoto = async () => {
    const hasPermissions = await askForPermissions()
    if(!hasPermissions){
      return
    }

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9]
    })

    setImage(img.uri)
    onPick(img.uri)
   }

  return (
    <View style={styles.wrapper}>
      <Button title='Сделать фото' onPress={takePhoto} />
      {image && <Image style={styles.img} source={{ uri: image }} />}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 10
  },
  img: {
    width: '100%',
    height: 200,
    marginTop: 10
  }
})