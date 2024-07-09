import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
  StatusBar,
} from 'react-native';

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {homeCarouselData} from '../constant/constant';
import SharedButton from '../components/SharedButton';

const Carousel = () => {
  const {width: windowWidth} = Dimensions.get('window');
  const scrollX = useSharedValue(0);
  const [currentIndex, SetCurrentIndex] = useState<number>(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.value = e.nativeEvent.contentOffset.x;
    SetCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / windowWidth));
  };

  const renderItem = (item: string) => (
    <View style={{width: windowWidth}} className="rounded-md items-center flex">
      <View
        className="bg-[#f1eff5] rounded-lg h-[20vh] flex flex-row items-center justify-center"
        style={{width: windowWidth * 0.92}}>
        <View className=''>
             <Text className='text-black font-[OpenSans-Bold] text-[18px]'>Special Offer</Text>
             <Text className='text-black'>Discount 25%</Text>
             <View className='mt-5'>
             <SharedButton title="Order Now" textColor='#fff' btnWidth={100} btnHeight={37} radius={50}/>
             </View>
        </View>
        
        <Image
          source={{uri: item}}
          className="justify-center items-center ml-[10vw] object-cover h-[19vh] rounded-md"
          style={{width: windowWidth * 0.33}}
        />
      </View>
    </View>
  );

  return (
    <View className="mt-2">
      <FlatList
        onScroll={handleScroll}
        data={homeCarouselData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => renderItem(item)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <View
        className={` flex flex-row items-center justify-center`}
        style={{marginTop: windowWidth * 0.02}}>
        {homeCarouselData.map((_, imageIndex) => {
          const animatedStyle = useAnimatedStyle(() => {
            const width = interpolate(
              scrollX.value,
              [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
              ],
              [8, 16, 8],
              Extrapolate.CLAMP,
            );
            const backgroundColor =
              Math.round(scrollX.value / windowWidth) === imageIndex
                ? '#54408C'
                : 'silver';
            return {
              width,
              backgroundColor,
            };
          });
          return (
            <Animated.View
              key={imageIndex}
              style={[animatedStyle]}
              className="h-[8px] w-[8px] rounded-[4px] mx-[4px]"
            />
          );
        })}
      </View>
    </View>
  );
};

export default Carousel;
