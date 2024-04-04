import { StyleSheet, Text, View,SafeAreaView, ScrollView, Pressable, Image } from 'react-native'
import { Route, useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import 'core-js/stable/atob';
import axios from 'axios';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EmployerLikes = () => {
  const [likes,setLikes] = useState([])
  const navigation = useNavigation();
  const [option,setOption] = useState("Recent");
  const [employerId,setEmployerId] = useState("");
  useEffect(()=>{
    const fetchEmployer = async ()=>{
      const token = await AsyncStorage.getItem("token")
      const decodedToken = jwtDecode(token);
      const employerId= decodedToken.employerId;
      setEmployerId(employerId)
    }
    fetchEmployer();
  },[])
  useEffect(()=>{
    if(employerId){
      fetchReceivedLikes()
    }
  },[employerId])

  const fetchReceivedLikes= async ()=>{
    try {
      const response = await axios.get(`http://192.168.1.4:5000/received-likes/${employerId}`)
      const receivedLikes = response.data.receivedLikes
      if(receivedLikes.length > 0)
      {setLikes(receivedLikes)
    console.log("Set the likes")}
      // else{
      //  console.log("You dont have any likes yet")
      // }
    } catch (error) {
      console.log("Error",error)
      
    }
  }
    return(
    
       <ScrollView   style={{marginTop: 55, padding: 15, flex: 1, backgroundColor: '#FAF9F6'}}>
       <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text    style={{
            fontSize: 23,
            fontWeight: 'bold',
            fontFamily: 'monospace',
            marginTop: 15,
            color:"black"
          }}>
          Likes You
        </Text>
        <View   style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            backgroundColor: '#008B8B',
            padding: 10,
            borderRadius: 30,
          }}>
        <SimpleLineIcons name="fire" size={24} color="white" />
        <Text
            style={{fontFamily:"monospace",textAlign: 'center', fontWeight: 'bold', color: 'white'}}>
            Boost

          </Text>
        </View>
       </View>
       <View  style={{
          marginVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
        <View style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: '#D0D0D0',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
        <Ionicons name="filter" size={22} color="black" />

        </View>
        <Pressable
          onPress={() => setOption('Recent')}
          style={{
            borderColor: option == 'Recent' ? 'transparent' : '#808080',
            borderWidth: 0.7,
            padding: 10,
            borderRadius: 20,
            backgroundColor: option == 'Recent' ? 'black' : 'transparent',
          }}>
          <Text
            style={{
              fontFamily:"monospace",
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
              color: option == 'Recent' ? 'white' : '#808080',
            }}>
            Recent
          </Text>
        </Pressable>

        <Pressable     onPress={() => setOption('Your type')}
          style={{
            borderColor: option == 'Your type' ? 'transparent' : '#808080',
            borderWidth: 0.7,
            padding: 10,
            borderRadius: 20,
            backgroundColor: option == 'Your type' ? 'black' : 'transparent',
          }}>
          <Text  style={{
             fontFamily:"monospace",
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
              color: option == 'Your type' ? 'white' : '#808080',
            }}>
            Your type
          </Text>
        </Pressable>

        <Pressable     onPress={() => setOption('Last active')}
          style={{
            borderColor: option == 'Last active' ? 'transparent' : '#808080',
            borderWidth: 0.7,
            padding: 10,
            borderRadius: 20,
            backgroundColor: option == 'Last active' ? 'black' : 'transparent',
          }}>
          <Text  style={{
            fontFamily:"monospace",
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
              color: option == 'Last active' ? 'white' : '#808080',
            }}>
            Last Active
          </Text>
        </Pressable>
       </View>

       <View>
        {likes.length>0 ?(
          <Pressable  style={{
            padding: 20,
            borderColor: '#E0E0E0',
            borderWidth: 1,
            borderRadius: 7,
          }}>
            <View>
              <View style={{alignItems:"flex-start",paddingHorizontal:15,paddingVertical:12,backgroundColor:"#f0f0f0",borderRadius:5,marginBottom:8,width:145}}>
                <Text>Liked your photo</Text>
              </View>
              <Text style={{fontFamily:"monospace",fontSize: 22, fontWeight: 'bold'}}>{likes[0].employeeId?.firstName}</Text>
          <Image  style={{
                width: '100%',
                height: 350,
                resizeMode: 'cover',
                borderRadius: 10,
                marginTop: 20,
              }} source={{uri:likes[0].employeeId?.imageUrls[0]}}/>
            </View>
          </Pressable>

        ):(
          <Text style={{fontWeight:"bold",fontSize:18,fontFamily:"monospace",color:"black"}}>
            Oops! You dont seem to have any likes yet from the employees on this app.
          </Text>
        )}
       </View>
       {likes.length>1 && (
        <>
       <Text  style={{
          fontSize: 20,
          fontWeight: 'bold',
          fontFamily: 'monospace',
          marginTop: 20,
        }}>Up Next</Text>
        <View   style={{
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 20,
        }}>

          {likes?.slice(1).map((like,index)=>(
            <View style={{marginVertical: 10, backgroundColor: 'white'}}>
              <View  style={{padding: 12}}>
                {like?.comment ? (
                <>
                 <View style={{alignItems:"flex-start",paddingHorizontal:15,paddingVertical:12,backgroundColor:"#f0f0f0",borderRadius:5,marginBottom:8,width:145}}>
                <Text>{like?.comment}</Text>
              </View>
                </>
                ):(
                <>
                 <View style={{alignItems:"flex-start",paddingHorizontal:15,paddingVertical:12,backgroundColor:"#f0f0f0",borderRadius:5,marginBottom:8,width:145}}>
                <Text>Liked your photo</Text>
              </View>
                </>
                )}
                <Text style={{fontSize: 17, fontWeight: '500',fontFamily:"monospace",color:"black"}}>{like?.employeeId?.firstName}</Text>
              </View>
              <View>
                <Image  style={{height: 220, width: 180, borderRadius: 4}} source={{uri:like?.employeeId?.imageUrls[0]}}/>
              </View>
            </View>

          )

          )}
        </View>
        </>
        )}
       </ScrollView>
    )
  
}

export default EmployerLikes

const styles = StyleSheet.create({})