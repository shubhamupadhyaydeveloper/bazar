import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {bookData, categoryData} from '../constant/constant';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {dataType} from '../types/type';

const {width, height} = Dimensions.get('window');

const Category = () => {
  const [category, SetCategory] = useState('All');
  const navigation = useNavigation();
  const [result, SetResult] = useState<dataType[]>(bookData);

  const handleGetResults = (selectedCategory: string) => {
    SetCategory(selectedCategory);
    if (selectedCategory !== 'All') {
      const filterData = bookData.filter(
        item => item.category === selectedCategory,
      );
      SetResult(filterData);
    } else {
      SetResult(bookData);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white px-4">
      <View className="flex flex-row justify-between items-center mb-2 mt-2">
        <TouchableOpacity
          onPress={() => (navigation as any).navigate('search')}>
          <FeatherIcon name="search" size={25} color={'#000'} />
        </TouchableOpacity>
        <Text className="font-[OpenSans-Bold] text-black text-[16px]">Category</Text>
        <Ionicons name="notifications-outline" size={25} color={'#000'} />
      </View>
     <View className='mb-4 mt-2'>
      <FlatList
        horizontal
        ItemSeparatorComponent={() => <View style={{width: 15}} />}
        data={categoryData}
        renderItem={item => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleGetResults(item.item)}>
            <Text
              className="font-[OpenSans-Bold] "
              style={{
                color: category === item.item ? 'black' : '#A6A6A6',
              }}>
              {item.item}
            </Text>
            {category === item.item && (
              <View className="w-full h-[2px] bg-[#54408C]" />
            )}
          </TouchableOpacity>
        )}
      />
     </View>

      {result.length > 0 ? (
        <FlatList
          data={result}
          key={category}
          numColumns={2}
          renderItem={({item}) => (
            <View style={{width: width * 0.5}} className="mb-2">
              <Image
                source={{uri: item.image[0]}}
                style={{width: width * 0.4, height: height * 0.25}}
                className='rounded-lg'
              />
              <View style={{width: width * 0.4}}>
                <Text className="text-black mt-1 font-[OpenSans-Bold]">{item.title}</Text>
              </View>
              <Text className='text-[#54408C] font-[OpenSans-Bold]'>₹{item.price}</Text>
            </View>
          )}
        />
      ) : (
        <View className="flex items-center justify-center h-full">
          <Text className="text-black font-[OpenSans-Bold] mb-10">
            Sorry we not have any results{' '}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Category;
