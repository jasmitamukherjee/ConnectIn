import { StyleSheet, Text, View,SafeAreaView,Image, TextInput,TouchableOpacity } from 'react-native'
import React, { useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import Fontisto
from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils'
const EmailScreen = () => {

  const [email,setEmail] = useState("")

  useEffect(()=>{
    getRegistrationProgress('Email').then(progressData => {
      if(progressData){
        setEmail(progressData.email || '')
      }
    })

  },[])
  const navigation=useNavigation()
  const handleNext = () => {
    if (email.trim() !== '') {
        
      
      saveRegistrationProgress('Email', { email });
    }
    
    navigation.navigate('Password');
  };
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
      <View style={{marginTop: 90, marginHorizontal: 20}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{width:44,height:44,borderRadius:22,borderWidth:2,borderColor:"black",justifyContent:"center",alignItems:"center"}}>
      <Fontisto name="email" size={26} color="black"/>

      </View>
      <Image  style={{width: 100, height: 40}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}/>
    </View>
    <Text   style={{
            fontSize: 25,
            fontWeight: 'bold',
           color:"black",
           fontFamily:"monospace",
            marginTop: 15,
          }}>Please provide a valid email.</Text>     

           <Text style={{marginTop: 30, fontSize: 15, color: 'gray',fontFamily:"monospace"}}>
          Email verification helps us keep your account secure and let's you connect over the network more easily.
          
        </Text>
          <TextInput autoFocus={true} value={email} onChangeText={(text)=>setEmail(text)} 
          style={{
            width: 340,
            marginVertical: 10,
            fontSize: email ? 22 : 22,
            marginTop: 25,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            fontFamily:"monospace",

            paddingBottom: 10,
           
          }}placeholder='Enter your email' placeholderTextColor={'#BEBEBE'} />
          <Text  style={{color: 'gray', fontSize: 15, marginTop: 7,fontFamily:"monospace"}}>Note : You'll be asked to verify your email.</Text>
          <TouchableOpacity
onPress={handleNext}
activeOpacity={0.8} style={{marginTop:40,marginLeft:"auto"}}>
<MaterialCommunityIcons 
style={{alignSelf:"center",marginTop:20}}name="arrow-right-circle" size={45} color="#502b63"/>
</TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default EmailScreen

const styles = StyleSheet.create({})