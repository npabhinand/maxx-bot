import React from 'react';
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from './Profile'
import StudentList from './StudentList';

const Tab = createBottomTabNavigator();

export default function Admin({ navigation, route }) {
  const { userD } = route.params;

  const ProfileScreen = () => {
    return (
      <Profile userD={userD} />
    );
  }

  const HomeScreen = () => {
    return (
      <StudentList userD={userD} />
    );
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarPosition="bottom"
      screenOptions={{
        activeTintColor: '#e91e63',
        safeAreaInsets: { bottom: 0 },
        style: { position: 'absolute', bottom: 0, left: 0, right: 0 },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
