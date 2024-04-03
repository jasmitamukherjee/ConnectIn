import { StyleSheet, Text, View,SafeAreaView, ScrollView } from 'react-native'
import { Route, useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import 'core-js/stable/atob';
import axios from 'axios';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

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
      else{
       console.log("You dont have any likes yet")
      }
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
       </ScrollView>
    )
  
}

export default EmployerLikes

const styles = StyleSheet.create({})