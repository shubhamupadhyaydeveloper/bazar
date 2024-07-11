import {View, Text, Dimensions, StatusBar} from 'react-native';
import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SharedButton from '../components/SharedButton';
import { useNavigation } from '@react-navigation/native';
import SharedBottomSheet from '../components/SharedBottomSheet';

const {width, height} = Dimensions.get('window');

const ConfirmOrder = () => {
  const refRBSheet = useRef<any>();
  const navigation = useNavigation()

  return (
    <>
      <SafeAreaView className="bg-white h-full px-4">
        <StatusBar barStyle={'dark-content'} />
        <View className="border border-[#ccc] min-h-[23vh] rounded-lg px-2 flex">
          <Text className="text-black font-[OpenSans-Bold] mt-2 mb-2">
            Address
          </Text>
          <View className="flex flex-row items-center" style={{gap: 15}}>
            <View className="bg-[#f5f4f7] w-[50px] h-[50px] rounded-full items-center justify-center">
              <Ionicons name="location-sharp" size={25} color={'#54408C'} />
            </View>
            <View style={{width: width * 0.55}}>
              <Text className="text-black font-[OpenSans-Bold]">
                Roop vihar
              </Text>
              <Text className="text-[#ccc]">
                mubarak pur dabas delhi 110081
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" color={'#000'} size={25} />
          </View>

          <View className="ml-[18vw] mt-2">
            <SharedButton
              title="Change"
              textColor="#54408C"
              btnWidth={100}
              btnHeight={40}
              radius={50}
              backgroundColor="#f5f4f7"
              onpress={() => refRBSheet.current.open()}
            />
          </View>
        </View>
        <View className="border border-[#ccc] min-h-[15vh] rounded-lg px-2 flex mt-3">
          <Text className="text-black font-[OpenSans-Bold] mt-2 mb-2">
            Date and Time
          </Text>
          <View className="flex flex-row items-center" style={{gap: 15}}>
            <View className="bg-[#f5f4f7] w-[50px] h-[50px] rounded-full items-center justify-center">
              <Ionicons name="calendar" size={25} color={'#54408C'} />
            </View>
            <View style={{width: width * 0.55}}>
              <Text className="text-black font-[OpenSans-Bold]">
                Date & Time
              </Text>
              <Text className="text-[#ccc]">
                Choose data and Time
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" color={'#000'} size={25} />
          </View>
        </View>
        <View className="border border-[#ccc] min-h-[15vh] rounded-lg px-2 flex mt-3">
          <Text className="text-black font-[OpenSans-Bold] mt-2 mb-2">
            Payment
          </Text>
          <View className="flex flex-row items-center" style={{gap: 15}}>
            <View className="bg-[#f5f4f7] w-[50px] h-[50px] rounded-full items-center justify-center">
              <MaterialIcons name="payments" size={25} color={'#54408C'} />
            </View>
            <View style={{width: width * 0.55}}>
              <Text className="text-black font-[OpenSans-Bold]">
                Payment
              </Text>
              <Text className="text-[#ccc]">
                Choose your payment
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" color={'#000'} size={25} />
          </View>
        </View> 
        <View className='flex items-center absolute bottom-[2vh] right-0 left-0'>
           <SharedButton title="Order" textColor='#fff'/>
        </View>
        <SharedBottomSheet refRBSheet={refRBSheet}>
          <View className="flex items-center justify-center " style={{gap: 10}}>
            <View>
              <SharedButton
                title="Use your current location"
                textColor="#54408C"
                radius={50}
                backgroundColor="#f5f4f7"
                onpress={() => (navigation as any).navigate("currentLocation")}
              />
            </View>
            <View>
              <SharedButton
                title="Add manually"
                textColor="#54408C"
                radius={50}
                backgroundColor="#f5f4f7"
                onpress={() => (navigation as any).navigate("location")}
              />
            </View>
          </View>
        </SharedBottomSheet>
      </SafeAreaView>
    </>
  );
};

export default ConfirmOrder;