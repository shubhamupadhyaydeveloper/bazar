
import { View, Text ,StatusBar} from 'react-native'
import "react-native-gesture-handler"
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import AppNavigation from './navigation/navigation'

const App = () => {
  useEffect(() => {SplashScreen.hide()},[])
  return (
   <AppNavigation />
  )
}

export default App