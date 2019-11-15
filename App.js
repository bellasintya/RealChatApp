import React from 'react';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import Icon from 'react-native-ionicons';
import LoadingScreen from "./src/screens/LoadingScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";

import HomeScreen from "./src/screens/HomeScreen";
import MessageScreen from "./src/screens/MessageScreen";
import FindScreen from "./src/screens/FindScreen";
import NotificationScreen from "./src/screens/NotificationScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDPdOWMsBGYc2EohFuj9cT43CmWwHrto8s",
  authDomain: "realchatapp-31613.firebaseapp.com",
  databaseURL: "https://realchatapp-31613.firebaseio.com",
  projectId: "realchatapp-31613",
  storageBucket: "realchatapp-31613.appspot.com",
  messagingSenderId: "739929501942",
  appId: "1:739929501942:web:41732e40b0e8163254fcd7"
};

firebase.initializeApp(firebaseConfig);

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon android="md-home" style={24} color={tintColor} />
      }
    },
    HOOOOO: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon android="md-chatbubbles" size={24} color={tintColor} />
      }
    },
    Find: {
      screen: FindScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <Icon
            android="md-pin"
            size={40}
            color="#E9446A"
            style={{
              shadowColor: "#E9446A",
              shadowOffset: { width: 0, height: 0 },
              shadowRadius: 10,
              shadowOpacity: 0.3
            }}
          />
      }
    },
    Notification: {
      screen: NotificationScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon android="md-notifications" style={24} color={tintColor} />
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon android="md-person" style={24} color={tintColor} />
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#161F3D",
      inactiveTintColor: "#B8BBC4",
      showLabel: false,
    }
  }
)

const AppStack = createStackNavigator({
  AppTabNavigator,
  Message: MessageScreen,
})

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading"
    }
  )
)