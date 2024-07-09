import {
  View,
  Text,
  KeyboardTypeOptions,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { signUpFields } from '../constant/constant';
import { signUpSchema } from '../types/type';
import SharedInput from '../components/SharedInput';
import SharedButton from '../components/SharedButton';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../lib/firebase';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height} = Dimensions.get("window")

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(signUpSchema) });
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH

  const handleOnSubmit = async ({email,password}: FieldValues) => {
    try {
      const result = await createUserWithEmailAndPassword(auth,email,password)
      if(result.user) {
        (navigation as any).navigate('inside');
        Snackbar.show({
          text: 'User found successful',
          fontFamily :  "OpenSans-Bold",
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: '#059212',
          textColor: '#fff', 
          marginBottom : 50
          })
          await AsyncStorage.setItem("userDetail", result?.user.email as string)
      }
    } catch (error) {
      Snackbar.show({
        text: "User already exist",
        fontFamily :  "OpenSans-Bold",
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#C80036',
        textColor: '#fff', 
        marginBottom : 50
        })
    } finally {
      reset();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >

        <SafeAreaView className="flex-1 bg-[#fff] px-4 pt-2">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
            <View>
              <Text
                className="text-[#000] text-[20px]"
                style={{ fontFamily: 'OpenSans-Bold' }}
              >
                Sign Up
              </Text>
              <Text className="text-[#A6A6A6] text-[12px]">
                Create account and choose favorite menu
              </Text>
            </View>
            <View className="mt-10">
              {signUpFields.map(item => (
                <Controller
                  key={item.name}
                  name={item.name}
                  control={control}
                  render={({ field: { onBlur, onChange, value } }) => (
                    <View className="">
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

            <View className="mt-5">
              <SharedButton
                title="Register"
                radius={50}
                textColor="#fff"
                onpress={handleSubmit(handleOnSubmit)}
                isSubmittig={isSubmitting}
              />
              <View className="flex flex-row gap-1 items-center justify-center mt-3">
                <Text className="text-[#A6A6A6]">Have an account?</Text>
                <Text
                  className="text-[#54408C] font-[OpenSans-Bold]"
                  onPress={() => (navigation as any).navigate('signin')}
                >
                  Sign In
                </Text>
              </View>
            </View>
          <View className={`flex justify-center items-center mb-4`} style={{marginTop : height * .1}}>
            <Text className="text-[#A6A6A6]">By clicking Register, you agree to our</Text>
            <Text className="text-[#54408C]">Terms and Data Policy.</Text>
          </View>
          </ScrollView>
        </SafeAreaView>
 
    </KeyboardAvoidingView>
  );
};

export default Signup;