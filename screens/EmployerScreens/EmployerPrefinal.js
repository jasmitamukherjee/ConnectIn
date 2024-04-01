import { StyleSheet, Text, View,SafeAreaView, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import { AuthContext } from '../../AuthContext'
import { getRegistrationProgress } from '../../registrationUtils'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
const EmployerPrefinal = () => {
  useEffect(() => {
    console.log(employerData) // Place the console.log here
  }, [employerData])
  const {token,setToken}= useContext(AuthContext)
  useEffect(()=>{
    if(token){
      navigation.replace("MainStack",{screen:"Main"})
    
    }
  },[token])
const navigation =useNavigation()
useEffect(()=>{
getAllEmployerData()
})
  const [employerData,setEmployerData]= useState()
  const getAllEmployerData=async ()=>{

    try {
      const screens = [
        'UserType',
        'Name',
        'Email',
        'Password',
       
        
        'Gender',
        'Location',
       
       
        'EmployeePreference',
        'CompanyOffers',
  
       
        'CompanyPhotos',
      
  
        'Prompts',
        'ShowEmployerPrompts'
      ];
let employerData ={}
for (const screenName of screens) {
  const screenData = await getRegistrationProgress(screenName);
  if(screenData){
    employerData={...employerData,...screenData}
  }
}
setEmployerData(employerData)


      
    } catch (error) {
      console.log("Error",error)
      
    }

  }
const registerEmployer= async ()=>{
  try {
    const response = await axios.post("http://localhost:5000/registerEmployer").then((response)=>{
      console.log(response)
      const token = response.data.token;
      AsyncStorage.setItem("token",token)
      setToken(token)
    })
    
  } catch (error) 
  {
   console.log("Error",error) 
  }
}
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
 Setting up your profile as an Employer...       
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
        onPress={registerEmployer}
        // onPress={()=> navigation.navigate("UserType")}
        style={{backgroundColor: '#502b63', padding: 15, marginTop: 'auto'}}>
            <Text style={{fontFamily:"monospace",textAlign:"center",color:"white",fontWeight:600,fontSize:15,fontFamily:"monospace"}}>
               Finish Registration
            </Text>
        </Pressable>
    </SafeAreaView>
  )
}

export default EmployerPrefinal

const styles = StyleSheet.create({})