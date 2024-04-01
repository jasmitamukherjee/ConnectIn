import { StyleSheet, Text, View,SafeAreaView ,Image,TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo
from 'react-native-vector-icons/Entypo'
import { AuthContext } from '../../AuthContext'
import { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils'
const LocationScreen = () => {
  useEffect(()=>{
    getRegistrationProgress('Location').then(progressData => {
      if(progressData){
        const {location} = progressData
        const [cityValue,stateValue]= location.split(",")
        setCity(cityValue)
        setState(stateValue)

      }
    })

  },[])
  const { userType } = useContext(AuthContext); // Access userType from AuthContext

  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const navigation=useNavigation()
  const handleNext=()=>{
    if(city.trim() !== '' && state.trim() !== ''){
      const location = `${city},${state}`
      saveRegistrationProgress('Location',{location})
    }

    if (userType === 'employee') {
      navigation.navigate("JobPreference");
    } else if (userType === 'employer') {
      navigation.navigate("EmployeePreference");
    } else {
      navigation.navigate("Location")
    }

  }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
      <View style={{marginTop: 90, marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{width:44,height:44,borderRadius:22,borderWidth:2,borderColor:"black",justifyContent:"center",alignItems:"center"}}>
      <Entypo name="location" size={26} color="black"/>

      </View>
      <Image  style={{width: 100, height: 40}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}/>
    </View> 
    <Text style={{
      fontFamily:"monospace",
            fontSize: 25,
            fontWeight: 'bold',
            color:"black",
            marginTop: 15,
          }}>Enter your location</Text>
       
  <TextInput
  autoFocus={true}
  value={city}
  onChangeText={(text)=> setCity(text)}
  placeholder='City(required)' placeholderTextColor={"#BEBEBE"}
  style={{width:340,marginVertical:10,fontFamily:"monospace",marginTop:25,borderBottomColor:"black",borderBottomWidth:1,
  paddingBottom:10,
  fontSize: city? 22:22
  }}/>

<TextInput
  autoFocus={true}
  value={state}
  onChangeText={(text)=> setState(text)}
  placeholder='State(required)' placeholderTextColor={"#BEBEBE"}
  style={{width:340,fontFamily:"monospace",marginVertical:10,marginTop:20,borderBottomColor:"black",borderBottomWidth:1,
  paddingBottom:10,
  fontSize: state? 22:22
  }}/>

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

export default LocationScreen

const styles = StyleSheet.create({})