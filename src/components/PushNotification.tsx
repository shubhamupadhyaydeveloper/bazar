import { View, Text, Platform, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

const PushNotification = () => {

    const requestForIos = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
    }

    const requestPostNotificationPermission = async () => {
        const permission:any =
          Platform.OS === 'ios'
            ? requestForIos
            : PERMISSIONS.ANDROID.POST_NOTIFICATIONS;
    
        try {
          const result = await request(permission);
          if (result !== RESULTS.GRANTED) {
            Alert.alert(
              'Permission denied',
              'Notification permission is required.',
            );
          }
        } catch (error) {
          console.error('Error requesting notification permission', error);
        }
      };

  return (
    <SafeAreaView>
      <Text className='text-black'>PushNotification</Text>
      <Text className='text-black' onPress={requestPostNotificationPermission}>Post permission</Text>
    </SafeAreaView>
  )
}

export default PushNotification;