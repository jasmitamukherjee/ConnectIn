import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { ScrollView } from 'react-native';
// import 'core-js/stable/atob'
import 'core-js/stable/atob';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'
import Octicons from 'react-native-vector-icons/Octicons'

import MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons'

const EmployerHome = () => {
  const [option,setOption] = useState("Compatible")
  const [employerId,setEmployerId] = useState("");
  const [employersProfileData,setEmployersProfileData]= useState([])
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
    showToken()
  },[])
  const showToken = async () =>{
    const token = await AsyncStorage.getItem("token");
    console.log("Employer token :",token)
  }
  console.log("Employer ID : ",employerId)
  const [currentEmployerProfileIndex,setCurrentEmployerProfileIndex]= useState(0)
  const [currentEmployerProfile,setCurrentEmployerProfile]= useState(employersProfileData[0])
  const fetchEmployerMatches = async ()=>{
    try {
      const response = await axios.get(`http://192.168.1.4:5000/matchesEmployer?employerId=${employerId}`);
      const matches = response.data.matches;
      setEmployersProfileData(matches)
      
    } catch (error) {
      console.log("Error finding matches",error)
      
    }
  }
  useEffect(()=>{
    if(employerId){
      fetchEmployerMatches()
    }

  },[employerId])
  useEffect(()=>{
    if(employersProfileData.length>0){
      setCurrentEmployerProfile(employersProfileData[0])
    }
  },[employersProfileData])

  console.log("Profiles:",currentEmployerProfile)

  return (
    <ScrollView style={{marginTop:25}}>
<View  style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
  <View  style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#D0D0D0',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
<Ionicons name="sparkles-sharp" size={22} color="black"/>
  </View>
  <Pressable   onPress={() => setOption('Compatible')}
            style={{
              borderColor: option == 'Compatible' ? 'transparent' : '#808080',
              borderWidth: 0.7,
              padding: 10,
              borderRadius: 20,
              backgroundColor: option == 'Compatible' ? 'black' : 'transparent',
            }}>
    <Text style={{  textAlign: 'center',
                fontSize: 14,
                fontWeight: '400',
                color: option == 'Compatible' ? 'white' : '#808080',fontFamily:"monospace"}}>Compatible</Text>
  </Pressable>
  <Pressable onPress={() => setOption('Active Today')}
            style={{
              borderColor: option == 'Active Today' ? 'transparent' : '#808080',
              borderWidth: 0.7,
              padding: 10,
              borderRadius: 20,
              backgroundColor: option == 'Active Today' ? 'black' : 'transparent',
            }}>
    <Text style={{  textAlign: 'center',
                fontSize: 14,
                fontWeight: '400',
                color: option == 'Active Today' ? 'white' : '#808080',fontFamily:"monospace"}}>Active Today</Text>
  </Pressable>
  <Pressable onPress={() => setOption('New Here')}
            style={{
              borderColor: option == 'New Here' ? 'transparent' : '#808080',
              borderWidth: 0.7,
              padding: 10,
              borderRadius: 20,
              backgroundColor: option == 'New Here' ? 'black' : 'transparent',
            }}>
    <Text style={{  textAlign: 'center',
                fontSize: 14,
                fontWeight: '400',
                color: option == 'New Here' ? 'white' : '#808080',fontFamily:"monospace"}}>New Here</Text>
  </Pressable>
  </View>
  <View style={{marginHorizontal:12,marginVertical:12}}>
    <>
    <View>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
          <Text
           style={{fontSize:22,
            color:"black",
           fontWeight:800,
           fontFamily:"monospace"}}>{currentEmployerProfile?.firstName}</Text>
           <View style={{backgroundColor:"#452c63",paddingHorizontal:12,paddingVertical:4,borderRadius:20}}>
            <Text style={{textAlign:"center",color:"white",fontFamily:"monospace"}}>New Here</Text>
           </View>
        </View>

        <View>
        <Entypo name="dots-three-horizontal" size={22} color="black"/>
        </View>
      </View>
      <View style={{marginVertical:15}}>
        <View>
          {currentEmployerProfile?.imageUrls?.length>0 && (
            <View>
              <Image source={{uri:currentEmployerProfile.imageUrls[0]}} style={{width:"100%",height:350,resizeMode:"cover",borderRadius:10}}/>
              <Pressable 
              style={{position:"absolute",bottom:10,right:10,backgroundColor:"white",width:42,height:42,borderRadius:21,justifyContent:"center",alignItems:"center"}}>
              <Foundation name="like" size={30} color="#452c63"/>

              </Pressable>
            </View>
          )}
        </View>

    </View>
    <View style={{marginVertical:15}}>
      {currentEmployerProfile?.prompts?.length > 0 && 
      (   currentEmployerProfile?.prompts.slice(0,1).map((prompt,index) => {
        <>
        <View style={{backgroundColor:"white",padding:12,borderRadius:10,height:150,justifyContent:"center"}}  key={index}>
          <Text style={{color:"black",fontSize:15,fontWeight:"500",fontFamily:"monospace"}}>
            {prompt.question}


          </Text>
        <Text style={{color:"black",fontSize:20,fontWeight:"600",fontFamily:"monospace",marginTop:20}}>
          {prompt.answer}

        </Text>
        </View>
        <Pressable 
              style={{position:"absolute",bottom:10,right:10,backgroundColor:"white",width:42,height:42,borderRadius:21,justifyContent:"center",alignItems:"center",
              shadowColor:"#000",
              shadowOpacity: 0.25,
              shadowRadius:3.84
              }}>
              <Foundation name="like" size={30} color="#452c63"/>

              </Pressable>
        </>
      }))
    }

    </View>

    <View style={{backgroundColor:"white",padding:10,borderRadius:8}}>
      <View style={{flexDirection:"row",paddingTop:5,alignItems:"center",gap:20,borderBottomWidth:0.8,borderBottomColor:"gray",paddingBottom:10}}>
        <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
        <Ionicons
 name="person" size={30} color="#452c63"/>
 <Text style={{fontFamily:"monospace",color:"black"}}>{currentEmployerProfile?.gender}</Text>

        </View>

        <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
        <Ionicons
 name="magnet" size={30} color="#452c63"/>
 <Text style={{fontFamily:"monospace",color:"black"}}>{currentEmployerProfile?.userType}</Text>

        </View>

        <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
        <Entypo

 name="home" size={30} color="#452c63"/>
 <Text style={{fontFamily:"monospace",color:"black"}}>{currentEmployerProfile?.location}</Text>

        </View>



        
      </View>

     

    </View>
    </View>
    
    </>

  </View>
      </ScrollView>
  )
}

export default EmployerHome

const styles = StyleSheet.create({})