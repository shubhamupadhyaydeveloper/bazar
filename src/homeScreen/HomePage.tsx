import {View, Text, TouchableOpacity, FlatList,Image , Dimensions} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { bookData } from '../constant/constant';

const {width,height} = Dimensions.get("window")

const HomePage = () => {
  const renderItem = ({image,title,price} : {title : string , price : number , id: number , image : string[]}) => (
     <View className='flex items-start'>
         <Image source={{uri : image[0]}}  className='rounded-lg' style={{width : width * .4 , height : height * .25}} />
         <Text className='text-black font-[OpenSans-Bold]' style={{width : width * .42}}>{title}</Text>
         <Text className='text-[#54408c] font-[OpenSans-Bold]'>₹{price}</Text>
     </View>
  )

  const ItemSeparator = () => <View style={{width : width * .025}} />;
  return (
    <SafeAreaView className="bg-white h-full px-4 pt-2">
      <View className="flex flex-row justify-between items-center">
        <FeatherIcon name="search" size={25} color={'#000'} />
        <Text className="font-[OpenSans-Bold] text-black text-lg">Home</Text>
        <Ionicons name="notifications-outline" size={25} color={'#000'} />
      </View>
      <View className="flex flex-row justify-between">
        <Text className="font-[OpenSans-Bold] text-black">Top of Week</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-[#54408C] font-[Op 
          enSans-Bold]">See all</Text>
        </TouchableOpacity>
      </View>
      <View>
      <FlatList 
        data={bookData}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        horizontal
        renderItem={({item}) => renderItem(item) }
      />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
