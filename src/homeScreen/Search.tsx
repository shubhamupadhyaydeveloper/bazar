import React, { useEffect, useState } from 'react';
import {View, TextInput, TouchableOpacity, Alert, StyleSheet, Button, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Voice from '@react-native-voice/voice';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

const CustomHeader = () => {
  const navigation = useNavigation();
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsListening(true);
  };

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  const onSpeechResults = (e:any) => {
    const speechText = e.value[0];
    setResult(speechText);
    setSearchQuery(speechText);
  };

  const requestMicrophonePermission = async () => {
    const permission = 
      Platform.OS === 'ios' 
        ? PERMISSIONS.IOS.MICROPHONE 
        : PERMISSIONS.ANDROID.RECORD_AUDIO;

    try {
      const result = await request(permission);
      if (result !== RESULTS.GRANTED) {
        Alert.alert('Permission denied', 'Microphone permission is required for voice search.');
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
      } else {
        requestMicrophonePermission();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };


  return (
    <SafeAreaView className=" p-[10px] bg-[#fff] h-full">
      <View className="flex flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TextInput
          className="ml-[10px] bg-[#E8E8E8] p-[8px] h-[35px] border border-[#ccc] rounded-full flex-1 text-[#000]"
          placeholder="Search books"
          placeholderTextColor={"#7A7A7A"}
        />
      </View>

      <View style={styles.container}>
      <Text style={styles.instructions}>Press the button and start speaking.</Text>
      <Button
        title={isListening ? "Stop Listening" : "Start Listening"}
        onPress={isListening ? stopListening : startListening}
      />
      <Text style={styles.result}>{result}</Text>
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search"
      />
      {/* Add your search results component here */}
    </View>

    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  result: {
    margin: 20,
    fontSize: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
    marginTop: 20,
    color: "black"
  },
});