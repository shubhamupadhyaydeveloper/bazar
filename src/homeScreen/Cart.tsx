import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import useStore from '../zustand/store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import SharedButton from '../components/SharedButton';
import Snackbar from 'react-native-snackbar';

const {width, height} = Dimensions.get('window');

type dataType = {
  image: string[];
  title: string;
  description: string;
  price: number;
  id: number;
  quantity: number;
};

const Cart = () => {
  const {cart, removeToCart, increaseCount, decreaseCount} = useStore();
  const renderItem = (item: ListRenderItemInfo<dataType>) => (
    <View
      className="flex flex-row bg-[#f7f8f8] p-2 rounded-lg "
      style={{width: width * 0.95}}>
      <Image
        source={{uri: item.item.image[0]}}
        style={{width: width * 0.25, height: height * 0.17, objectFit: 'cover'}}
      />
      <View className="flex justify-between">
        <View className="ml-[2vh]">
          <View>
            <Text className="text-black font-[OpenSans-Bold]">
              {item.item.title}
            </Text>
            <View className="flex flex-row">
              <Text className="text-black font-[OpenSans-Bold]">Quantity</Text>
              <Text className="text-[#54408C] ">
                &nbsp;{item.item.quantity}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-row ml-[2vh]">
          <Text className="text-black font-[OpenSans-Bold]">Price</Text>
          <Text className="text-[#54408C] ">&nbsp;₹{item.item.price}</Text>
        </View>
        <View className="flex flex-row items-center ">
          <View
            className="flex flex-row mt-3 bg-[#F5F5F5] items-center justify-center py-1 rounded-xl"
            style={{gap: 8, width: width * 0.33}}>
            <SharedButton
              title={<EntypoIcon name="plus" color={'#000'} size={15} />}
              backgroundColor="#A6A6A6"
              textColor="#000"
              radius={50}
              btnWidth={35}
              btnHeight={35}
              onpress={() => increaseCount(item.item.id)}
            />
            <Text className="text-black font-[OpenSans-Bold] text-[20px]">
              {item.item.quantity}
            </Text>
            <SharedButton
              title={<EntypoIcon name="minus" color={'#000'} size={15} />}
              backgroundColor="#fff"
              textColor="#000"
              radius={50}
              btnWidth={35}
              btnHeight={35}
              onpress={() => decreaseCount(item.item.id)}
            />
          </View>
          <View className="mt-3 ml-[5vw]">
            <SharedButton
              title="delete"
              btnWidth={80}
              btnHeight={40}
              backgroundColor="#fff"
              borderColor="#ccc"
              radius={50}
              onpress={() => {
                removeToCart(item.item.id)
                Snackbar.show({
                  text: 'Item deleted To cart!',
                  duration: Snackbar.LENGTH_SHORT,
                  backgroundColor: '#000',
                  textColor: '#fff',
                });
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
  return (
    <SafeAreaView className="bg-white h-full">
      <Text className="text-black font-[OpenSans-Bold] text-center text-[17px] mt-2">
        My Cart
      </Text>
      {cart.length === 0 ? (
        <View className="flex items-center justify-center flex-1">
          <Image
            source={require('../../assets/carticon.png')}
            width={width * 0.8}
          />
          <Text className="text-black font-[OpenSans-Bold] text-center ml-3 mt-2">
            There is no product
          </Text>
        </View>
      ) : (
        <View className="mt-5">
          <View className="flex justify-center items-center">
            <FlatList data={cart} renderItem={item => renderItem(item)} ItemSeparatorComponent={() => <View style={{height : 12}} />} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;
