import { StyleSheet, Text, View ,SafeAreaView,Image,TextInput} from 'react-native'
import { TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons'
import { saveRegistrationProgress } from '../../registrationUtils'

const PasswordScreen = () => {

  const [password, setPassword] = useState("")
  const navigation=useNavigation()
  const handleNext=()=>{
    if(password.trim() !== ''){
      saveRegistrationProgress('Password',{password})
    }
    navigation.navigate("Gender")

  }
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{marginTop:90,marginHorizontal:20}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{width:44,height:44,borderRadius:22,borderWidth:2,borderColor:"black",justifyContent:"center",alignItems:"center"}}>
      <AntDesign name="lock1" size={26} color="black"/>

      </View>
      <Image  style={{width: 100, height: 40}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}/>
    </View>
    <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            color:"black",
            marginTop: 15,
            fontFamily:"monospace"
          }}>Please choose a secured password for your account.</Text>
           <TextInput autoFocus={true} secureTextEntry={true} value={password} onChangeText={(text)=>setPassword(text)} 
          style={{
            width: 340,
            fontFamily:"monospace",
            marginVertical: 10,
            fontSize: password ? 22 : 22,
            marginTop: 25,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            
           
          }}placeholder='Enter your password' placeholderTextColor={'#BEBEBE'} />
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

export default PasswordScreen

const styles = StyleSheet.create({})