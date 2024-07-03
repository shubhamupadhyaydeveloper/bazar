import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Onboarding from '../components/Onboarding';
import SignIn from '../auth/SignIn';
import Signup from '../auth/Signup';
import Home from '../homeScreen/Index';
import Search from '../homeScreen/Search';

const AppNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="signin"
          component={SignIn}
          options={{title: '', headerStyle: {backgroundColor: '#fff'}}}
        />
        <Stack.Screen 
          name='signup'
          component={Signup}
          options={{title : "" , headerStyle : {backgroundColor :"#fff"}}}
        />
        <Stack.Screen 
          name='index'
          component={Home}
          options={({headerShown : false})}
        />
        <Stack.Screen 
          name='search'
          component={Search}
          options={({headerShown : false})}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
