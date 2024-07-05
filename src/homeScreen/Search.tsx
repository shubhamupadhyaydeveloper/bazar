import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Text,
  Modal,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Voice from '@react-native-voice/voice';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const CustomHeader = () => {
  const navigation = useNavigation();
  const [isListening, setIsListening] = useState(false);
  const [input, setInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsListening(true);
  };

  const onSpeechEnd = () => {
    setIsListening(false);
    setIsVisible(false)
  };

  const onSpeechResults = (e:any) => {
    const speechText = e.value[0];
    setInput(speechText);
  };

  const onSpeechError = (e:any) => {
    setIsListening(false);
    // setIsVisible(false)
  };

  const requestMicrophonePermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO;

    try {
      const result = await request(permission);
      if (result !== RESULTS.GRANTED) {
        Alert.alert(
          'Permission denied',
          'Microphone permission is required for voice search.',
        );
      }
    } catch (error) {
      console.error('Error requesting microphone permission', error);
    }
  };

  const startListening = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.MICROPHONE
          : PERMISSIONS.ANDROID.RECORD_AUDIO;

      const result = await check(permission);
      if (result === RESULTS.GRANTED) {
        await Voice.start('en-US');
        setIsVisible(true);
      } else {
        await requestMicrophonePermission();
        const newResult = await check(permission);
        if (newResult === RESULTS.GRANTED) {
          await Voice.start('en-US');
        }
      }
    } catch (e) {
      console.error('Error starting voice recognition: ', e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsVisible(false);
    } catch (e) {
      console.error('Error stopping voice recognition: ', e);
    }
  };

  return (
    <SafeAreaView className=" p-[10px] bg-[#fff] h-full">
      <View className="flex flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TextInput
          value={input}
          onChangeText={text => setInput(text)}
          className="ml-[10px] bg-[#E8E8E8] p-[8px] h-[35px] border border-[#ccc] rounded-full flex-1 text-[#000]"
          placeholder="Search books"
          placeholderTextColor={'#7A7A7A'}
        />
        <TouchableOpacity className='bg-[#E8E8E8] rounded-full h-[35px] w-[35px] ml-[5px] items-center justify-center px-2  '
          onPress={isListening ? stopListening : startListening}>
          <FontAwesomeIcon name="microphone" color={'#000'} size={24} />
        </TouchableOpacity>
      </View>
      <Modal visible={isVisible}>
        <View>
          <View className='ml-3 mt-2'>
            <TouchableOpacity onPress={stopListening}>
              <AntDesignIcon name='close' color={"#000"} size={30} />
            </TouchableOpacity>
          </View>
          <View className='flex items-center justify-center ' style={{ height: height , gap : 10 }}>
          <FontAwesomeIcon name="microphone" color={isListening ? "#3FA2F6" : "#758694"} size={100} />
            <Text className='text-black font-[OpenSans-Bold] text-center'>Speak about your Search</Text>
            <View className='flex flex-row' style={{gap : 5}}>
            <TouchableOpacity onPress={stopListening} activeOpacity={.7}>
              <View className='bg-[#758694] p-2 rounded-lg items-center '>
                <Text className='text-white'>Stop</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={startListening} activeOpacity={.7}>
              <View className='bg-[#3FA2F6] p-2 rounded-lg items-center '>
                <Text className='text-white bg-'>Start</Text>
              </View>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CustomHeader;