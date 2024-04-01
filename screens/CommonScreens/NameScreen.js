import { StyleSheet, Text, View,SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils'
const NameScreen = () => {
  const [firstName,setFirstName]=useState("")
  const [lastName, setLastName] = useState("")
  const navigation=useNavigation()
  useEffect(()=>{
    getRegistrationProgress('Name').then(progressData => {
      if(progressData){
        setFirstName(progressData.firstName || '')
      }
    })

  },[])
  const handleNext=()=>{
    if(firstName.trim() !== ''){
      saveRegistrationProgress('Name',{firstName})
    }
    navigation.navigate("Email")

  }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
      <Text style={{marginTop:50,textAlign:'center',color:"gray"}}>
      </Text>
   <View style={{marginTop:30,marginHorizontal:20}}>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{width:44,height:44,borderRadius:22,borderWidth:2,borderColor:"black",justifyContent:"center",alignItems:"center"}}>
      <MaterialCommunityIcons name="newspaper-variant-outline" size={26} color="black"/>

      </View>
      <Image  style={{width: 100, height: 40}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}/>
    </View>
<View style={{marginTop:20}}>
  <Text style={{  fontSize: 25,
              fontWeight: 'bold',
             color:"black",
             fontFamily:"monospace"}}>
    Enter your name. 
  </Text>
  <TextInput
  autoFocus={true}
  value={firstName}
  onChangeText={(text)=> setFirstName(text)}
  placeholder='First name(required)' placeholderTextColor={"#BEBEBE"}
  style={{width:340,marginVertical:10,marginTop:25,borderBottomColor:"black",borderBottomWidth:1,
  paddingBottom:10,
  fontFamily:"monospace",
  fontSize:firstName? 22:22
  }}/>

<TextInput
  autoFocus={true}
  value={lastName}
  onChangeText={(text)=> setLastName(text)}
  placeholder='Last name' placeholderTextColor={"#BEBEBE"}
  style={{width:340,  fontFamily:"monospace",
  marginVertical:10,marginTop:20,borderBottomColor:"black",borderBottomWidth:1,
  paddingBottom:10,
  fontSize:lastName? 22:22
  }}/>

  
</View>
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

export default NameScreen

const styles = StyleSheet.create({})