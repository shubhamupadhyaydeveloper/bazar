import { View, Text, TouchableOpacity , Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FIREBASE_AUTH } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import Snackbar from 'react-native-snackbar';
import { User } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width,height} = Dimensions.get("window")

const Profile = () => {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {

    const getEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('userDetail');
        setEmail(storedEmail);
      } catch (error) {
        console.error('Error fetching email:', error);
      }
    };

    getEmail(); 
  }, []);

  const handleLogout = async () => {
      try {
         await signOut(FIREBASE_AUTH)
         Snackbar.show({
          text: 'User Loged out',
          fontFamily :  "OpenSans-Bold",
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#06D001',
          textColor: '#fff', 
          })
          await AsyncStorage.removeItem("userDetail")
      } catch (error) {
         console.log(error)
      }
  }
  return (
    <SafeAreaView className='bg-white h-full items-center'>
      <Text className='text-black ml-1 mt-2 font-[OpenSans-Bold] text-[15px]'>Profile</Text>
      <Text className='text-black mt-5'>{email}</Text>
      <TouchableOpacity activeOpacity={.5} className='bg-[#D10363] mt-2 items-center py-1 rounded-full ml-1' style={{width : width * .2}} onPress={handleLogout} >
          <Text className='text-white'>logout</Text>
      </TouchableOpacity>
    
    </SafeAreaView>
  )
}

export default Profile;