import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {onAuthStateChanged} from 'firebase/auth';
import {FIREBASE_AUTH} from '../lib/firebase';
import Onboarding from '../components/Onboarding';
import SignIn from '../auth/SignIn';
import Signup from '../auth/Signup';
import Home from '../homeScreen/Index';
import Search from '../homeScreen/Search';
import {View} from 'react-native';
import ConfirmOrder from '../order/ConfirmOrder';
import Location from '../order/Location';
import CurrentLocation from '../order/CurrentLocation';

const AppNavigation = () => {
  const Stack = createStackNavigator();
  const InSideStack = createStackNavigator();
  const [user, SetUser] = useState<any>(null);

  function InsideLayout() {
    return (
      <InSideStack.Navigator initialRouteName=''>
        <InSideStack.Screen
          name="index"
          component={Home}
          options={{headerShown: false}}
        />
        <InSideStack.Screen
          name="search"
          component={Search}
          options={{headerShown: false}}
        />
      </InSideStack.Navigator>
    );
  }

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, value => {
      SetUser(value);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
          <Stack.Screen
            name="inside"
            component={InsideLayout}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name='order'
            component={ConfirmOrder}
            options={{title : "Confirm Order",headerTitleStyle : {fontFamily : "OpenSans-Bold" , fontSize : 16, textAlign : "center", marginLeft : 45}}}
          />
          <Stack.Screen 
            name='location'
            component={Location}
            options={{title : "Location",headerTitleStyle : {fontFamily : "OpenSans-Bold" , fontSize : 16, textAlign : "center", marginLeft : 75}}}
          />
           <Stack.Screen
            name='currentLocation'
            component={CurrentLocation}
            options={{title : "Current Location",headerTitleStyle : {fontFamily : "OpenSans-Bold" , fontSize : 16, textAlign : "center", marginLeft : 45}}}
          />
          </>
        ) : (
          <>
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
              name="signup"
              component={Signup}
              options={{title: '', headerStyle: {backgroundColor: '#fff'}}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
