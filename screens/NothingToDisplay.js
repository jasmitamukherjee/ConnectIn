import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const AnimationScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.goBack();
    }, 10000);
  }, []);
  return (
    <View style={{flex:1,backgroundColor:"White",justifyContent:"center",alignItems:"center"}}>
       <View>
        <LottieView
          source={require('../assets/thinking.json')}
          style={{
            height: 260,
            width: 300,
            alignSelf: 'center',
            marginTop: 40,
            justifyContent: 'center',
          }}
          autoPlay
          loop={true}
          speed={0.7}
        />
      </View>
      <View>
        <Text style={{fontFamily:"monospace",color:"black"}}>
          You have rejected all the employees on our database for now, we will be directing you to the home page again in 10 seconds.
        </Text>
      </View>
    </View>
  );
};

export default AnimationScreen;

const styles = StyleSheet.create({});