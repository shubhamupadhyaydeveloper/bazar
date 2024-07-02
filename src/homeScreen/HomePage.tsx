import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {bookData} from '../constant/constant';
import Modal from 'react-native-modal';
import SharedButton from '../components/SharedButton';

const {width, height} = Dimensions.get('window');

const HomePage = () => {
  const [visible, SetVisible] = useState(false);
  const [currentId, SetCurrentId] = useState(0);

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

  const ItemSeparator = () => <View style={{width: width * 0.025}} />;

  return (
    <SafeAreaView className="bg-white h-full pt-2">
      <View className="flex flex-row justify-between items-center px-4">
        <FeatherIcon name="search" size={25} color={'#000'} />
        <Text className="font-bold text-black text-lg">Home</Text>
        <Ionicons name="notifications-outline" size={25} color={'#000'} />
      </View>
      <View className="flex flex-row justify-between px-4">
        <Text className="font-bold text-black">Top of Week</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-[#54408C] font-bold">See all</Text>
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
    </SafeAreaView>
  );
};

const DetailPage = ({
  visible,
  SetVisible,
  id,
}: {
  visible: boolean;
  SetVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const data = bookData.find(item => item.id === id);

  return (
    <Modal
    style={{ marginLeft: 0, marginBottom: 0, width: '100%' }}
    onBackdropPress={() => SetVisible(false)}
    isVisible={visible}
    onBackButtonPress={() => SetVisible(false)}
    useNativeDriver={true}
  >
    <View className="bg-white rounded-t-xl h-[85vh] px-3 w-full absolute bottom-0 right-0 left-0">
      <View className="flex flex-row items-center justify-center mt-1">
        <View className="w-[35px] h-[4px] bg-gray-400 rounded-md"></View>
      </View>
      <View className="mt-3">
        <FlatList
          data={data?.image}
          renderItem={({ item }) => (
            <View style={{ width: width }} className="items-center justify-center flex -ml-3">
              <Image
                source={{ uri: item }}
                style={{ width: width * 0.55 }}
                className="h-[40vh] rounded-md"
              />
            </View>
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View className="mt-2">
        <Text className="text-black font-[OpenSans-Bold] text-[18px] text-start">
          {data?.title}
        </Text>
        <Text className='text-[#A6A6A6] text-[10px] text-start'>
           {data?.description}
        </Text>
        <View className='flex flex-row ' style={{gap : 8}}>
            <SharedButton title='Contiue shopping' btnWidth={width * .53} backgroundColor='#54408C' textColor='#ffffff' radius={50}  />
            <SharedButton title='View cart' btnWidth={width * .34} backgroundColor='#FAF9FD' textColor='#54408C' radius={50}  />
        </View>
      </View>
    </View>
  </Modal>
  );
};

export default HomePage;
