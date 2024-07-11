import {
  View,
  Text,
  Platform,
  Alert,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, useSafeAreaFrame} from 'react-native-safe-area-context';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import GetLocation from 'react-native-get-location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SharedButton from '../components/SharedButton';

const {width, height} = Dimensions.get('window');

const CurrentLocation = () => {
  const [location, SetLocation] = useState<any>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  const requestLocationPermission = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

    try {
      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        getCurrentLocation();
        setPermissionGranted(true);
      }

      if (result !== RESULTS.GRANTED) {
        Alert.alert(
          'Permission denied',
          'Location permission is required to get the current location.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Try Again', onPress: requestLocationPermission},
            {text: 'Open Settings', onPress: openAppSettings},
          ],
        );
      }
    } catch (error) {
      console.error('Error requesting microphone permission', error);
    }
  };

  useEffect(() => {
    if (permissionGranted === false) {
      requestLocationPermission();
    }
  }, [permissionGranted]);

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        SetLocation(location);
      })
      .catch(error => {
        const {code, message} = error;
        if (code === 'UNAVAILABLE') {
          Alert.alert(
            'Turn On Location',
            'Location services are not available.',
          );
        }
        console.warn(code, message);
      });
  };

  const openAppSettings = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings', 'Please open settings manually.');
    });
  };

  return (
    <SafeAreaView className="px-4  bg-white h-full">
      {location ? (
        <>
          <MapView
            provider={PROVIDER_GOOGLE}
            className="rounded-xl  w-full h-[37vh]"
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}>
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="You are here"
              description="This is your current location"
            />
          </MapView>
          <View
            className=" absolute bottom-0 right-0 left-0 flex rounded-t-[20px] px-5 "
            style={{
              height: height * 0.54,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.9,
              shadowRadius: 2,
              elevation: 2,
            }}>
            <View className="flex flex-row w-full justify-between mt-4">
              <Text className="text-black font-[OpenSans-Bold] text-[16px]">
                Detail Address
              </Text>
              <MaterialCommunityIcons
                name="target"
                color={'#54408C'}
                size={27}
              />
            </View>
            <View className="flex flex-row items-center mt-6" style={{gap: 15}}>
              <View className="bg-[#f5f4f7] w-[50px] h-[50px] rounded-full items-center justify-center">
                <Ionicons name="location-sharp" size={25} color={'#54408C'} />
              </View>
              <View style={{width: width * 0.55}}>
                <Text className="text-black font-[OpenSans-Bold]">
                  Roop vihar
                </Text>
                <Text className="text-[#ccc]">
                  mubarak pur dabas delhi 110081
                </Text>
              </View>
            </View>
            <View className="w-full px-5 bg-[#ccc] h-[1px] mt-4" />
            <View className='mt-3'>
              <Text className="text-black font-[OpenSans-Bold] text-[16px]">
                Save Address As
              </Text>
            </View>
            <View className="absolute bottom-[2vh] right-0 left-0 items-center">
              <SharedButton title="Confirmation" textColor="#fff" radius={50} />
            </View>
          </View>
        </>
      ) : (
        <View className="flex-1 flex justify-center items-center">
          <ActivityIndicator color={'#54408C'} size={'large'} />
          <TouchableOpacity
            onPress={getCurrentLocation}
            className="bg-[#54408C] px-4 py-2 ml-2 items-center mt-5 rounded-full">
            <Text className="text-white font-[OpenSans-Bold]">Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CurrentLocation;
