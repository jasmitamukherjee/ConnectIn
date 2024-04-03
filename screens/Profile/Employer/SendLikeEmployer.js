import { StyleSheet, Text, View,SafeAreaView ,Image, TextInput,Pressable} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
const SendLikeEmployer = () => {
  const [comment,setComment] = useState("")
  const navigation = useNavigation()
    const route= useRoute()
    const { onReturnFromLike } = route?.params;
    const likeProfile = async ()=>{
      
        try {
          const response = await axios.post('http://192.168.1.4:5000/like-profile-employer', {
           employerId: route.params.employerId,
            likedEmployeeId: route.params.likedEmployeeId,
            image: route?.params?.image,
            comment: comment,
          });
          console.log("success"); // Log success message
          if (response.status == 200) {
          
            navigation.goBack();
            onReturnFromLike()
          }
          // Handle success: Update UI, show notifications, etc.

        
      } catch (error) {
        console.log("Error",error)
        
      }
    }
  return (
   
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAF9F6'}}>
      <View  style={{marginTop: 'auto', marginBottom: 'auto', marginHorizontal: 40}}>
        <Text style={{fontFamily:"monospace",color:"black",fontSize:22,fontWeight:"bold"}}>
          {route?.params?.name}
        </Text>
        <Image style={{width:"100%",height:350,resizeMode:"cover",borderRadius:10,marginTop:20}} source={{uri:route?.params?.image}}/>
     
     <TextInput   style={{
      fontFamily:"monospace",
            padding: 15,
            backgroundColor: 'white',
            borderRadius: 8,
            marginTop: 14,
            fontSize: comment ? 17 : 17,
          }} placeholder='Add a comment' value={comment} onChangeText={(text) =>setComment(text)}/>
          <View   style={{
            marginVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFC0CB',
              paddingHorizontal: 14,
              paddingVertical: 10,
              gap: 4,
              borderRadius: 22,
            }}>
            <AntDesign
 name="star" size={30} color="#452c63"/>

            </View>
            <Pressable
            onPress={likeProfile}
            style={{
              backgroundColor: '#FFFDD0',
              borderRadius: 20,
              padding: 10,
              flex: 1,
            }}>
            <Text style={{fontWeight: 'bold', textAlign: 'center',fontFamily:"monospace",color:"black"}}>
              Send Like
            </Text>
          </Pressable>

          </View>
      </View>
    </SafeAreaView>
  )
}

export default SendLikeEmployer

const styles = StyleSheet.create({})