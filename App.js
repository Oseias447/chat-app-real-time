import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import ChatScreen from './src/screens/ChatScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const AppStack = createStackNavigator({ 
  Home: HomeScreen, 
  Chat: ChatScreen
});

AppStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = navigation.state.index === 0;
  
  return {
    tabBarVisible
  };
}

const AuthStack = createStackNavigator({ Login: LoginScreen });

const TabNavigator = createBottomTabNavigator({
  Chats: AppStack,
  Profile: ProfileScreen
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let ImageName = require('./src/images/chats.png');
      if (routeName === 'Profile') {
        ImageName = require('./src/images/settings.png');
      }

      return <Image source={ImageName} style={{ width:25, resizeMode: 'contain', tintColor}}/>;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: TabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'Auth',
    }
  )
);