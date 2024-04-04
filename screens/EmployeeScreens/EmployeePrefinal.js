
import { StyleSheet, Text, View,SafeAreaView, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import { AuthContext } from '../../AuthContext'
import { getRegistrationProgress } from '../../registrationUtils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
const EmployeePrefinal= () => {

  const [employeeData,setEmployeeData]=useState()
  const {token,setToken} = useContext(AuthContext)
  useEffect(()=>{
    if(token){
      navigation.replace("MainStack",{screen:"MainE"})
    
    }
  },[token])
  useEffect(()=>{
    getAllData();
  },[])
  const registerEmployee= async ()=>{
    try {
      const response = await axios.post("http://192.168.1.5:5000/registerEmployee",employeeData).then((response)=>{
        console.log(response)
        const token = response.data.token;
        AsyncStorage.setItem("token",token)
        setToken(token)
        
      })
  
      clearAllData();
      
    } catch (error) 
    {
     console.log("Error",error) 
    }
  }
 
  const clearAllData= async ()=>{
    try {
      const screens = [
        'UserType',
        'Name',
        'Email',
        'Password',
       
        
        'Gender',
        'Location',
       
       
        'JobPreference',
  
       
        'EmployeePhotos',
      
  
        'Prompts',
        'ShowEmployeePrompts'
      ];
      for (const screenName of screens) {
        const key = `registration_progress_${screenName}`;
        await AsyncStorage.removeItem(key);
      }
      console.log('All screen data cleared successfully');
      
    } catch (error) {
      console.log("Error",error)
      
    }

  }
  const getAllData= async ()=>{
    try {
      const screens = [
        'UserType',
        'Name',
        'Email',
        'Password',
       
        
        'Gender',
        'Location',
       
       
        'JobPreference',
        'Skills',
  
       
        'EmployeePhotos',
      
  
        'Prompts',
        'ShowEmployeePrompts'
      ];
let employeeData ={}
for (const screenName of screens) {
  const screenData = await getRegistrationProgress(screenName);
  if(screenData){
    employeeData={...employeeData,...screenData}
  }
}
setEmployeeData(employeeData)


      
    } catch (error) {
      console.log("Error",error)
      
    }


  }
  console.log(employeeData)
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
        onPress={registerEmployee}
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