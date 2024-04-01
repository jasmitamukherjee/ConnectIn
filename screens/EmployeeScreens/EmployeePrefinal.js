
import { StyleSheet, Text, View,SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
const EmployeePrefinal
 = () => {
const navigation =useNavigation()
  
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
     <View style={{marginTop:90}}>
        
        <Text style={{fontFamily:"monospace",fontSize:35,fontFamily:"monospace",
        fontWeight: 800,
        
    marginLeft: 20,
    marginTop:10,
    color:'black'}}>
         All set to register.
        </Text>
        <Text style={{fontFamily:"monospace",fontSize:25,fontFamily:"monospace",
        fontWeight: 600,
    marginLeft: 20,
    marginTop:20,
    color:'black'}}>
 Setting up your profile as an Employee...       
  </Text>
        <View style={{ alignItems: 'center', marginTop: 20}}>
        <LottieView
          source={require('../../assets/handshake1.json')}
          style={{
            height: 500,
            width: 500,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          autoPlay
          loop={true}
          speed={0.7}
        />
        </View> 
        
        </View>

        <Pressable 
        // onPress={()=> navigation.navigate("UserType")}
        style={{backgroundColor: '#502b63', padding: 15, marginTop: 'auto'}}>
            <Text style={{fontFamily:"monospace",textAlign:"center",color:"white",fontWeight:600,fontSize:15,fontFamily:"monospace"}}>
               Finish Registration
            </Text>
        </Pressable>
    </SafeAreaView>
  )
}

export default EmployeePrefinal


const styles = StyleSheet.create({})