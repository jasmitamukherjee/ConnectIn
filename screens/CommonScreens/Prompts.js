import { StyleSheet, Text, View ,SafeAreaView,Image,Pressable} from 'react-native'
import React from 'react'
import { AuthContext } from '../../AuthContext'
import { useContext } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { saveRegistrationProgress } from '../../registrationUtils'
const PromptsScreen = () => {
  const { userType } = useContext(AuthContext); // Access userType from context

  const handlePromptPress = () => {
    if (userType === 'employer') {
      navigation.navigate('ShowEmployerPrompts');
    } else if (userType === 'employee') {
      navigation.navigate('ShowEmployeePrompts');
    }
  };
  
  const route= useRoute()
  const navigation = useNavigation()
  const handleNext=()=>{
    saveRegistrationProgress('Prompts',{prompts: route?.params?.prompts})
    if (userType === 'employer') {
      navigation.navigate('EmployerPrefinal');
    } else if (userType === 'employee') {
      navigation.navigate('EmployeePrefinal');
    }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}} >
     <View  style={{marginTop: 90, marginHorizontal: 20}}>
     <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{width:44,height:44,borderRadius:22,borderWidth:2,borderColor:"black",justifyContent:"center",alignItems:"center"}}>
      <AntDesign name="eye" size={26} color="black"/>

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
          }}>Select your profile answers.</Text>
          <View style={{marginTop:20,flexDirection:"column",gap:20}}> 
          <View style={{marginTop: 20, flexDirection: 'column', gap: 20}}>
          {route?.params?.prompts ? (
            route?.params?.prompts?.map((item, index) => (
              <Pressable key={index}
                onPress={handlePromptPress}
                style={{
                  borderColor: '#707070',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 70,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                  }}>
                  {item?.question}
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                    marginTop: 3,
                  }}>
                  {item?.answer}
                </Text>
              </Pressable>
            ))
          ) : (
            <View>
              <Pressable 
                onPress={handlePromptPress}
                style={{
                  borderColor: '#707070',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 70,
                
                }}>
                <Text
                  style={{
                    fontFamily:"monospace",
                    color: 'black',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                  }}>
                  Select a Prompt.
                </Text>
                <Text
                  style={{
                    fontFamily:"monospace",

                    color: 'black',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                    marginTop: 3,
                  }}>
                  And write your own answer.
                </Text>
              </Pressable>

              <Pressable 
                onPress={handlePromptPress}
                style={{
                  borderColor: '#707070',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 70,
                  marginVertical: 15
                }}>
                <Text
                  style={{
                    fontFamily:"monospace",

                    color: 'black',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                  }}>
                  Select a Prompt.
                </Text>
                <Text
                  style={{
                    fontFamily:"monospace",

                    color: 'black',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                    marginTop: 3,
                  }}>
                  And write your own answer.
                </Text>
              </Pressable>

              <Pressable 
                onPress={handlePromptPress}
                style={{
                  borderColor: '#707070',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 70,
                }}>
                <Text
                  style={{
                    fontFamily:"monospace",

                    color: 'black',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                  }}>
                  Select a Prompt.
                </Text>
                <Text
                  style={{
                    fontFamily:"monospace",

                    color: 'black',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                    marginTop: 3,
                  }}>
                  And write your own answer.
                </Text>
              </Pressable>
            </View>
          )}
         
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
      </View>
    </SafeAreaView>
  )
}

export default PromptsScreen

const styles = StyleSheet.create({})