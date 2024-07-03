import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {authorData} from '../constant/constant';

type props = {
  item: {
    authorName: string;
    profileImg: string;
    profession: string;
  };
};

const Authors = () => {
  const renderItem = ({item: {authorName, profession, profileImg}}: props) => (
    <View className='flex items-center'>
      <Image
        source={{uri: profileImg}}
        className="w-[60px] h-[60px] rounded-full"
      />
      <View >

      <Text className="text-black font-[OpenSans-Bold] text-[12px]">
        {authorName}
      </Text>
      <Text className="text-[#A6A6A6] text-[11px]">{profession}</Text>
      </View>
    </View>
  );
  return (
    <View className='px-4 mt-5'>
         <View className="flex flex-row justify-between mb-4">
        <Text className=" text-black font-[OpenSans-Bold]">Authors</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-[#54408C]  font-[OpenSans-Bold]">See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={authorData}
        renderItem={item => renderItem(item)}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-[13px]"></View>}
      />
    </View>
  );
};

export default Authors;
