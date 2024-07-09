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
import React, {useState} from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {bookData} from '../constant/constant';
import Modal from 'react-native-modal';
import SharedButton from '../components/SharedButton';
import {Rating} from 'react-native-ratings';
import Snackbar from 'react-native-snackbar';
import useStore from '../zustand/store';
import { useNavigation } from '@react-navigation/native';
import { dataType } from '../types/type';

const {width, height} = Dimensions.get('window');

const DetailPage = ({
  visible,
  SetVisible,
  id,
}: {
  visible: boolean;
  SetVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) => {
  const data:dataType | undefined = bookData.find(item => item.id === id);
  const [count, SetCount] = useState(1);
  const {addToCart} = useStore()
  const navigation = useNavigation()

  const handleAddToCart = () => {
     if(data) {
       addToCart({...data, quantity : count})
       Snackbar.show({
        text: 'Item Added To cart!',
        duration: 1000,
        backgroundColor: '#000',
        textColor: '#fff',
        })
     }
  }

  return (
    <Modal
      scrollHorizontal={true}
      style={{marginLeft: 0, marginBottom: 0, width: '100%'}}
      onBackdropPress={() => SetVisible(false)}
      isVisible={visible}
      onBackButtonPress={() => SetVisible(false)}
      useNativeDriver={true}>
      <View className="bg-white rounded-t-xl h-[80vh] px-3 w-full absolute bottom-0 right-0 left-0">
        <StatusBar backgroundColor={"#fff"} barStyle={'dark-content'}/>
        <ScrollView>
          <View className="flex flex-row items-center justify-center mt-1">
            <View className="w-[35px] h-[4px] bg-gray-400 rounded-md sticky top-0"></View>
          </View>
          <View className="mt-3">
            <FlatList
              data={data?.image}
              renderItem={({item}) => (
                <View
                  style={{width: width}}
                  className="items-center justify-center flex -ml-3">
                  <Image
                    source={{uri: item}}
                    style={{width: width * 0.55}}
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
            <Text className="text-black font-[OpenSans-Bold] text-[18px] mt-3 text-start">
              {data?.title}
            </Text>
            <Text className="text-[#A6A6A6] text-[10px] text-start">
              {data?.description}
            </Text>
            <View className="flex items-start mt-3">
              <Text className="text-black font-[OpenSans-Bold]">Review</Text>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={20}
                readonly
                startingValue={data?.rating}
              />
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
                  onpress={() => SetCount(count + 1)}
                />
                <Text className="text-black font-[OpenSans-Bold] text-[20px]">
                  {count}
                </Text>
                <SharedButton
                  title={<EntypoIcon name="minus" color={'#000'} size={15} />}
                  backgroundColor="#54408C"
                  textColor="#fff"
                  radius={50}
                  btnWidth={35}
                  btnHeight={35}
                  onpress={() => SetCount(Math.max(count - 1, 1))}
                />
              </View>
              <View className="flex flex-row  items-center ml-10" style={{gap: 8}}>
                <Text className="text-black font-[OpenSans-Bold]">Price</Text>
                <Text className="text-[#54408C]">
                  ₹{data?.price && data.price * count}
                </Text>
              </View>
            </View>
            <View className="flex flex-row mt-4 mb-2 " style={{gap: 8}}>
              <SharedButton
                title="Add to cart"
                btnWidth={width * 0.53}
                backgroundColor="#54408C"
                textColor="#ffffff"
                radius={50}
                onpress={handleAddToCart}
              />
              <SharedButton
                title="View cart"
                btnWidth={width * 0.34}
                backgroundColor="#FAF9FD"
                textColor="#54408C"
                radius={50}
                onpress={() => (navigation as any).navigate("Cart")}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default DetailPage;
