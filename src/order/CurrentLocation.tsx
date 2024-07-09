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
      } else {
        Alert.alert(
          'Permission denied',
          'Location permission is required to get the current location.',
        );
      }
    } catch (error) {
      console.error('Error requesting microphone permission', error);
    }
  };

  useEffect(() => {
    if (permissionGranted !== true) {
      requestLocationPermission();
    }
  }, []);

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
        console.warn(code, message);
      });
  };

  return (
    <SafeAreaView className="px-4  bg-white h-full">
      {location ? (
        <>
          <MapView
            provider={PROVIDER_GOOGLE}
            className="rounded-xl  w-full h-[35vh]"
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
            className=" absolute bottom-0 right-0 left-0  rounded-t-[12px]  "
            style={{
              height: height * 0.54,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
            }}>
            <Text className="text-black">hello</Text>
          </View>
        </>
      ) : (
        <View className="flex-1 flex justify-center items-center">
          <ActivityIndicator color={'#54408C'} size={'large'} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CurrentLocation;
