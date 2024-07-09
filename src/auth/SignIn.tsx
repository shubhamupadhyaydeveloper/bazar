import {
  View,
  Text,
  KeyboardTypeOptions,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm, Controller, FieldValues} from 'react-hook-form';
import {signInFields} from '../constant/constant';
import {signInSchema} from '../types/type';
import SharedInput from '../components/SharedInput';
import SharedButton from '../components/SharedButton';
import {useNavigation} from '@react-navigation/native';
import { FIREBASE_AUTH } from '../lib/firebase';
import { signInWithEmailAndPassword, User } from 'firebase/auth';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
  } = useForm({resolver: zodResolver(signInSchema)});
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH

  const handleOnSubmit = async ({email , password}: FieldValues) => {
    try {
      const result = await signInWithEmailAndPassword(auth,email,password)
      if(result.user) {
        (navigation as any).navigate('inside');
        Snackbar.show({
          text: 'User found Successful',
          duration: Snackbar.LENGTH_SHORT,
          fontFamily :  "OpenSans-Bold",
          backgroundColor: '#059212',
          textColor: '#fff', 
          marginBottom : 50
          })
        await AsyncStorage.setItem("userDetail", result?.user.email as string)
      }
      if(!result.user) {
        Snackbar.show({
          text: 'User not found',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#C80036',
          fontFamily :  "OpenSans-Bold",
          textColor: '#fff', 
          marginBottom : 50
          })
      }
      // console.log(email,password)
    } catch (error) {
    } finally {
      reset();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <SafeAreaView className="bg-[#fff] h-full px-4 pt-2">
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View>
            <Text
              className="text-[#000] text-[20px]"
              style={{fontFamily: 'OpenSans-Bold'}}>
              Welcome Back👋
            </Text>
            <Text className="text-[#A6A6A6] text-[12px]">
              Sign to your account
            </Text>
          </View>
          <View className="mt-10">
            {signInFields.map(item => (
              <Controller
                key={item.name}
                name={item.name}
                control={control}
                render={({field: {onBlur, onChange, value}}) => (
                  <View className="mt-4">
                    <SharedInput
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                      label={item.label}
                      placeholder={item.placeholder}
                      keyboardType={item.keyboardType as KeyboardTypeOptions}
                      secureText={item.secureText}
                      errorText={errors[item.name]?.message}
                    />
                  </View>
                )}
              />
            ))}
          </View>

          <View className="mt-10">
            <SharedButton
              title="Login"
              radius={50}
              textColor="#fff"
              onpress={handleSubmit(handleOnSubmit)}
              isSubmittig={isSubmitting}
            />
            <View className="flex flex-row gap-1 items-center justify-center mt-5">
              <Text className="text-[#A6A6A6] ">Don't have an account?</Text>
              <Text
                className="text-[#54408C] font-[OpenSans-Bold]"
                onPress={() => (navigation as any).navigate('signup')}>
                Sign Up
              </Text>
            </View>
            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-gray-300" />
              <View>
                <Text className="mx-4 text-gray-500">Or with</Text>
              </View>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            <SharedButton
              title="Sign in with Google"
              textColor="#000"
              isGoogle={true}
              backgroundColor="white"
              borderColor="#E8E8E8"
              radius={50}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
