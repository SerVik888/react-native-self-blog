import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Post } from './Post';


export const PostList = ({data, onOpen}) => {

if(!data.length) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.noItems}>Постов пока нет...</Text>
    </View>
  )
}

    return (
        <View style={styles.wrapper}>
          <FlatList
            data={data}
            keyExtractor={post => post.id.toString()}
            renderItem={({ item }) => <Post post={item} onOpen={onOpen} />}
          />
        </View>
      )
}

const styles = StyleSheet.create({
    wrapper: {
      paddingHorizontal: 10
    },
    noItems: {
      paddingVertical: 20,
      textAlign: 'center',
      fontSize: 20,
      fontFamily: 'open-regular'
    }
  })