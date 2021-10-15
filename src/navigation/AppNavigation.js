import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { MainScreen } from '../screens/MainScreen'
import { PostScreen } from '../screens/PostScreen'
import { BookedScreen } from '../screens/BookedScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { THEME } from '../theme'
import { Ionicons } from '@expo/vector-icons'
import { createDrawerNavigator } from 'react-navigation-drawer'



const navigatorOptions = { 
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
  } 
}

const PostNavigator = createStackNavigator({
  Main: MainScreen,
  Post: PostScreen
},
navigatorOptions
)
const BookedNavigator = createStackNavigator({
  Booked: BookedScreen,
  Post: PostScreen
},
navigatorOptions
)
const AboutNavigator = createStackNavigator({
  About: AboutScreen
},
navigatorOptions
)
const CreateNavigator = createStackNavigator({
  Create: CreateScreen
},
navigatorOptions
)


const bottomTabsConfig = {
  Post: {
    screen: PostNavigator,
    navigationOptions: {
      tabBarLabel: 'Все',
      tabBarIcon: info => <Ionicons name='albums-sharp' size={25} color={info.tintColor}/>
    }
  },
  Booked: {
    screen: BookedNavigator,
    navigationOptions: {
      tabBarLabel: 'Избранное',
      tabBarIcon: info => <Ionicons name='ios-star' size={25} color={info.tintColor}/>
    }
  }
}

const BottomNavigator = Platform.OS === 'android'
? createMaterialBottomTabNavigator(bottomTabsConfig, {
  activeTintColor: 'fff',
  shifting: true,
  barStyle: {
    backgroundColor: THEME.MAIN_COLOR
  }
}) 
: createBottomTabNavigator( bottomTabsConfig, {
  tabBarOptions: {
    activeTintColor: THEME.MAIN_COLOR
  }
})

const MainNavigator = createDrawerNavigator({
  PostTabs: {
    screen: BottomNavigator,
    navigationOptions: {
      drawerLabel: 'Главная',
      fontFamily: 'open-regular'
      // drawerIcon: <Ionicons name='camera'/>
    }
  },
  About: {
    screen: AboutNavigator,
    navigationOptions: {
      drawerLabel: 'О приложении'
    }
  },
  Create: {
    screen: CreateNavigator,
    navigationOptions: {
      drawerLabel: 'Создать пост'
    }
  }
},{
  contentOptions: {
    activeTintColor: THEME.MAIN_COLOR,
    labelStyle: {
      padding: 5,
      fontFamily: 'open-regular'
    }
  }
})


export const AppNavigation = createAppContainer(MainNavigator)
