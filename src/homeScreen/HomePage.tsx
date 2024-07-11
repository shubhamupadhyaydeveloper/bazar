import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {bookData} from '../constant/constant';
import Authors from '../components/Authors';
import DetailPage from '../components/DetailPage';
import { useNavigation } from '@react-navigation/native';
import Carousel from './Carousel';
import messaging from '@react-native-firebase/messaging';

const {width, height} = Dimensions.get('window');

const HomePage = () => {
  const [visible, SetVisible] = useState(false);
  const [currentId, SetCurrentId] = useState(0);
  const navigation = useNavigation()

  const renderItem = ({
    image,
    title,
    price,
    id,
  }: {
    title: string;
    price: number;
    id: number;
    image: string[];
  }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {
        SetVisible(true), SetCurrentId(id);
      }}>
      <View className="items-start">
        <Image
          source={{uri: image[0]}}
          className="rounded-lg"
          style={{width: width * 0.4, height: height * 0.25}}
        />
        <Text className="text-black font-bold" style={{width: width * 0.42}}>
          {title}
        </Text>
        <Text className="text-[#54408c] font-bold">₹{price}</Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
     (
       async () => {
         let token = await messaging().getToken()
         console.log("This is token",token)
       }
     )()
  },[])

  const ItemSeparator = () => <View style={{width: width * 0.025}} />;

  return (
    <SafeAreaView className="bg-white h-full pt-2">
      <StatusBar barStyle={"dark-content"}/>
      <ScrollView>
      <View className="flex flex-row justify-between items-center px-4 mb-1">
        <TouchableOpacity onPress={() => (navigation as any).navigate("search")}>
        <FeatherIcon name="search" size={25} color={'#000'}/>
        </TouchableOpacity>
        <Text className="font-[OpenSans-Bold] text-black text-[16px]">Home</Text>
        <Ionicons name="notifications-outline" size={25} color={'#000'} />
      </View>
      <Carousel />
      <View className="flex flex-row justify-between px-4 mb-2 mt-3">
        <Text className="font-[OpenSans-Bold] text-black">Top of Week</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => (navigation as any).navigate("Category")}>
          <Text className="text-[#54408C] font-[OpenSans-Bold]">See all</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-3 px-4">
        <FlatList
          data={bookData}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={ItemSeparator}
          horizontal
          renderItem={({item}) => renderItem(item)}
        />
      </View>
      <DetailPage visible={visible} SetVisible={SetVisible} id={currentId} />
      <Authors />
      </ScrollView>
    </SafeAreaView>
  );
};


export default HomePage;