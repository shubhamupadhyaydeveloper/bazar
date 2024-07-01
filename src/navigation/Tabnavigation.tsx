import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomePage from '../homeScreen/HomePage';
import Category from '../homeScreen/Category';
import Cart from '../homeScreen/Cart';
import Profile from '../homeScreen/Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import EncytoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const Tabnavigation = () => {
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor : "#54408C"}}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({focused, color}) => (
            <EncytoIcon color={color} name="home" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => (
            <MaterialIcons color={color} name="category" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color}) => (
            <Icon color={color} name="cart" size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabnavigation;
