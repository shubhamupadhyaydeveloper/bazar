import { View, Text, Image,Dimensions} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import useStore from '../zustand/store';

const {width,height } = Dimensions.get("window")

const Cart = () => {
  const {cart} = useStore()
  return (
    <SafeAreaView className='bg-white h-full'>
      <Text className='text-black font-[OpenSans-Bold] text-center text-[17px] mt-2'>My Cart</Text>
      {cart.length === 0 ? (
        <View className='flex items-center justify-center flex-1'>
          <Image source={require("../../assets/carticon.png")}  width={width * .8} />
          <Text className='text-black font-[OpenSans-Bold] text-center ml-3 mt-2'>There is no product</Text>
        </View>
      ) : (
        <View />
      )}

    </SafeAreaView>
  )
}

export default Cart;