import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import React, { ReactNode } from 'react';

type props = {
  title: ReactNode;
  onpress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  radius?: number;
  isGoogle?: boolean;
  borderColor?: string;
  btnWidth?: number;
  btnHeight?: number;
};

const {width, height} = Dimensions.get('window');

const SharedButton = ({
  title,
  onpress,
  backgroundColor,
  textColor,
  radius,
  isGoogle,
  borderColor,
  btnWidth,
  btnHeight
}: props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`flex items-center justify-center`}
      style={{
        width: btnWidth ?? width * 0.9,
        height: btnHeight ?? height * 0.07,
        backgroundColor: backgroundColor ?? '#54408C',
        borderRadius : radius ?? 8,
        borderColor : borderColor,
        borderWidth : borderColor ? 1 : 0
      }}
      onPress={onpress}>
      <View className='flex flex-row items-center gap-2'>
        {isGoogle && (
           <Image  source={require("../../assets/googleicon.png")}/>
        )}
        <Text
          style={{color: textColor ?? 'black', fontFamily: 'OpenSans-Bold'}}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SharedButton;
