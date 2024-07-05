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
import {TonboardingContent, onboardingData} from '../constant/constant';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import SharedButton from './SharedButton';
import {useNavigation} from '@react-navigation/native';

const Onboarding = () => {
  const {width: windowWidth} = Dimensions.get('window');
  const scrollX = useSharedValue(0);
  const [currentIndex, SetCurrentIndex] = useState<number>(0);
  const scrollViewRef = React.useRef<any>(null);
  const navigation = useNavigation();

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollX.value = e.nativeEvent.contentOffset.x;
    SetCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / windowWidth));
  };

  const onClickNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextSlideIndex = currentIndex + 1;
      const offset = nextSlideIndex * windowWidth;
      scrollViewRef?.current?.scrollToOffset({offset});
      SetCurrentIndex(nextSlideIndex);
    }
  };

  const renderItem = (item: TonboardingContent) => (
    <View
      style={{width: windowWidth}}
      className="rounded-md items-center flex ">
      <Image
        source={item.image}
        className="justify-center items-center object-cover h-[50vh]"
        style={{width: windowWidth * 0.93}}
      />
      <View className="mt-5 " style={{width: windowWidth * 0.8}}>
        <Text
          className="text-[#121212] text-[18px] text-center "
          style={{fontFamily: 'OpenSans-Bold'}}>
          {item.title}
        </Text>
      </View>
      <View className="mt-5 " style={{width: windowWidth * 0.8}}>
        <Text className="text-[#A6A6A6] text-center text-[13px]">
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="items-center bg-white h-full">
      <FlatList
        ref={scrollViewRef}
        onScroll={handleScroll}
        data={onboardingData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => renderItem(item)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <View
        className={` flex flex-row items-center justify-center`}
        style={{marginTop: windowWidth * 0.02}}>
        {onboardingData.map((_, imageIndex) => {
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
      <View className="mt-10 mb-2">
        <SharedButton
          title={"Get Started"}
          onpress={onClickNext}
          textColor="white"
        />
        <View className="mt-2">
          <SharedButton
            radius={12}
            title="Sign in"
            backgroundColor="#FAF9FD"
            onpress={() => (navigation as any).navigate('signin')}
          />
        </View>
      </View>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
    </View>
  );
};

export default Onboarding;
