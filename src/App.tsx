import { View, Text ,StatusBar} from 'react-native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  useEffect(() => {SplashScreen.hide()},[])
  return (
    <SafeAreaView className='bg-white h-screen'>
      <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"}/>
      <Text  className='text-black'>App</Text>
    </SafeAreaView>
  )
}

export default App