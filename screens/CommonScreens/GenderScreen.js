import { StyleSheet, Text, View,SafeAreaView,Image } from 'react-native'
import React, { useEffect } from 'react'
import FontAwesome6
from 'react-native-vector-icons/FontAwesome6'
import AntDesign
from 'react-native-vector-icons/AntDesign'
import FontAwesome
from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState } from 'react'
import { Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils'
const GenderScreen = () => {
  useEffect(()=>{
    getRegistrationProgress("Gender").then(progressData =>{
      if(progressData){
        setGender(progressData.gender || '')
      }
    })

  },[])
  const navigation=useNavigation()
  const handleNext=()=>{
    if(gender.trim() !== ''){
      saveRegistrationProgress('Gender',{gender})
    }
    navigation.navigate("Location")

  }
  const [gender, setGender] = useState("")
  return (
   
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 90, marginHorizontal: 20}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{width:44,height:44,borderRadius:22,borderWidth:2,borderColor:"black",justifyContent:"center",alignItems:"center"}}>
      <FontAwesome6 name="person" size={26} color="black"/>

      </View>
      <Image  style={{width: 100, height: 40}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}/>
    </View>

    <Text   style={{
      fontFamily:"monospace",
            fontSize: 25,
            fontWeight: 'bold',
           color:"black",
            marginTop: 15,
          }}>Select the gender that describes you best.</Text>

          <View style={{marginTop: 30}}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <Text style={{fontFamily:"monospace",fontWeight: '500', fontSize: 15,color:"black"}}>Men</Text>
            <Pressable onPress={() => setGender('Men')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Men' ? '#502b63' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 12,
            }}>
            <Text style={{fontFamily:"monospace",fontWeight: '500', fontSize: 15,color:"black"}}>Women</Text>
            <Pressable onPress={() => setGender('Women')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Women' ? '#502b63' : '#F0F0F0'}
              />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontFamily:"monospace",fontWeight: '500', fontSize: 15,color:"black"}}>Non-binary</Text>
            <Pressable onPress={() => setGender('Non-binary')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Non-binary' ? '#502b63' : '#F0F0F0'}
              />
            </Pressable>

            </View>
          </View>
          <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <AntDesign name="checksquare" size={26} color="#502b63" />
          <Text style={{fontSize: 15,fontFamily:"monospace"}}>Visible on profile.</Text>
        </View>
        <TouchableOpacity
        onPress={handleNext}
          activeOpacity={0.8}
          style={{marginTop: 30, marginLeft: 'auto'}}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color="#502b63"
            style={{alignSelf: 'center', marginTop: 20}}
          />
        </TouchableOpacity>
    
    </View>
    </SafeAreaView>
  )
}

export default GenderScreen

const styles = StyleSheet.create({})