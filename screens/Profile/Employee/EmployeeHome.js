import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { ScrollView } from 'react-native';
import 'core-js/stable/atob';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
const EmployeeHome = () => {

  const navigation = useNavigation()
  const [option,setOption] = useState("Compatible")
  const [employeeId,setEmployeeId] = useState("");
  const [employeesProfileData,setEmployeesProfileData]= useState([])
  useEffect(()=>{
    const fetchEmployee = async ()=>{
      const token = await AsyncStorage.getItem("token")
      const decodedToken = jwtDecode(token);
      const employeeId= decodedToken.employeeId;
      setEmployeeId(employeeId)
    }
    fetchEmployee();
  },[])
  useEffect(()=>{
    showToken()
  },[])
  const showToken = async () =>{
    const token = await AsyncStorage.getItem("token");
    console.log("Employee token :",token)
    // console.log("option selected was",loginOption)

  }
  // console.log("Employer ID : ",employerId)
  const [currentEmployeeProfileIndex,setCurrentEmployeeProfileIndex]= useState(0)
  const [currentEmployeeProfile,setCurrentEmployeeProfile]= useState(employeesProfileData[0])
  const fetchEmployeeMatches = async ()=>{
    try {
      const response = await axios.get(`http://192.168.1.5:5000/matchesEmployee?employeeId=${employeeId}`);
      const matches = response.data.matches;
      setEmployeesProfileData(matches)
      
    } catch (error) {
      console.log("Error finding matches",error)
      
    }
  }
  useEffect(()=>{
    if(employeeId){
      fetchEmployeeMatches()
    }

  },[employeeId])
  useEffect(()=>{
    if(employeesProfileData.length>0){
      setCurrentEmployeeProfile(employeesProfileData[currentEmployeeProfileIndex])
      // console.log(currentEmployerProfileIndex)
    }
  },[employeesProfileData])

  
  useFocusEffect(
    useCallback(() => {
      console.log('i call');
      if (employeeId) {
       fetchEmployeeMatches()
      }
    }, [employeeId]),
  );
  
  
  const handleCross = () => {
    
    // For now, just moving to the next profile
    navigateToNextProfile();
  };

  const navigateToNextProfile = () => {
    const nextIndex = currentEmployeeProfileIndex + 1;
    if (nextIndex < employeesProfileData.length) {
      setCurrentEmployeeProfileIndex(nextIndex);
      // setCurrentEmployerProfile(employersProfileData[nextIndex]);
      // navigation.navigate('Animation');
    } else {
      // No more profiles to display
      console.log('No more profiles');
      navigation.navigate("NothingToDisplay")
    }
  };
  
  
  const handleLike = () => {
    navigateToNextProfile();
  }
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     handleLike(); // Call handleLike when screen receives focus
  //   });

  //   return unsubscribe;
  // }, [navigation, handleLike]);

  
  return (
    <>
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
           fontFamily:"monospace"}}>{currentEmployeeProfile?.firstName}</Text>
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
          {currentEmployeeProfile?.imageUrls?.length>0 && (
            <View>
              <Image source={{uri:currentEmployeeProfile.imageUrls[0]}} style={{width:"100%",height:350,resizeMode:"cover",borderRadius:10}}/>
              <Pressable 
                onPress={() =>
                  navigation.navigate('SendLikeEmployer', {
                    image: currentEmployeeProfile?.imageUrls[0],
                    name: currentEmployeeProfile?.firstName,
                    employeeId: employeeId,
                   
                    likedEmployerId: currentEmployeeProfile?._id,
                    onReturnFromLike: handleLike
                    
                  })
                }
              style={{position:"absolute",bottom:10,right:10,backgroundColor:"white",width:42,height:42,borderRadius:21,justifyContent:"center",alignItems:"center"}}>
              <Foundation name="like" size={30} color="#452c63"/>

              </Pressable>
            </View>
          )}
        </View>

    </View>
    <View style={{marginVertical:15}}>
      {currentEmployeeProfile?.prompts?.length > 0 && 
      (   currentEmployeeProfile?.prompts.slice(0,1).map((prompt,index) => {
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
        <MaterialCommunityIcons

 name="star-circle" size={30} color="#452c63"/>
 <Text style={{fontFamily:"monospace",color:"black",fontWeight:"bold"}}>{currentEmployeeProfile?.gender}</Text>

        </View>

        <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
        <Ionicons
 name="magnet" size={30} color="#452c63"/>
 <Text style={{fontFamily:"monospace",color:"black",fontWeight:"bold"}}>{currentEmployeeProfile?.userType}</Text>

        </View>

        <View style={{flexDirection:"row",alignItems:"center",gap:10}}>
        <Entypo

 name="home" size={30} color="#452c63"/>
 <Text style={{fontFamily:"monospace",color:"black",fontWeight:"bold"}}>{currentEmployeeProfile?.location}</Text>

        </View>



        
      </View>


      <View style={{marginVertical:15}}>
        <View>
          {currentEmployeeProfile?.imageUrls?.length>1 && (
            <View>
              <Image source={{uri:currentEmployeeProfile.imageUrls[1]}} style={{width:"100%",height:350,resizeMode:"cover",borderRadius:10}}/>
              <Pressable 
              style={{position:"absolute",bottom:10,right:10,backgroundColor:"white",width:42,height:42,borderRadius:21,justifyContent:"center",alignItems:"center"}}>
              <Foundation name="like" size={30} color="#452c63"/>

              </Pressable>
            </View> 

            
            
          )}
        </View>

    </View>

      <View style={{
  marginTop: 15,
  borderBottomWidth: 0.8,
  borderBottomColor: '#E0E0E0',
  paddingBottom: 10,
}}>
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
    <Ionicons name="glasses" size={30} color="#452c63" />
    <Text style={{ marginLeft: 10, fontSize: 15, fontFamily: "monospace", color: "black",fontWeight:"bold" }}>My Employee preferences are:</Text>
  </View>
  <ScrollView horizontal>
    {currentEmployeeProfile && currentEmployeeProfile.employeePreference ? (
      <Text style={{ fontSize: 16, fontFamily: "monospace", color: "black" ,fontWeight:"bold"}}>
        {currentEmployeeProfile.employeePreference.join(", ")}
      </Text>
    ) : (
      <Text style={{ fontSize: 16, fontFamily: "monospace" }}>Open to all kinds of employees.</Text>
    )}
  </ScrollView>
</View>
<View style={{marginVertical:15}}>
        <View>
          {currentEmployeeProfile?.imageUrls?.length>2 && (
            <View>
              <Image source={{uri:currentEmployeeProfile.imageUrls[2]}} style={{width:"100%",height:350,resizeMode:"cover",borderRadius:10}}/>
              <Pressable 
              style={{position:"absolute",bottom:10,right:10,backgroundColor:"white",width:42,height:42,borderRadius:21,justifyContent:"center",alignItems:"center"}}>
              <Foundation name="like" size={30} color="#452c63"/>

              </Pressable>
            </View> 

            
            
          )}
        </View>

    </View>

<View style={{
  marginTop: 15,
  borderBottomWidth: 0.8,
  borderBottomColor: '#E0E0E0',
  paddingBottom: 10,
}}>
  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
    <FontAwesome5 name="user-tie" size={30} color="#452c63" />
    <Text style={{ marginLeft: 10, fontSize: 15, fontFamily: "monospace", color: "black", fontWeight: "bold" }}>My Company offers:</Text>
  </View>
  <ScrollView horizontal={false}>
    {currentEmployeeProfile && currentEmployeeProfile.companyOffers ? (
      currentEmployeeProfile.companyOffers.map((offer, index) => (
        <Text key={index} style={{ fontSize: 16, fontFamily: "monospace", color: "black", fontWeight: "bold" }}>

          -{offer}
        </Text>
      ))
    ) : (
      <Text style={{ fontSize: 16, fontFamily: "monospace" }}>Like to know about what my company offers.</Text>
    )}
  </ScrollView>
</View>







     

    </View>
  
    <View style={{marginVertical:15}}>
        <View>
          {currentEmployeeProfile?.imageUrls?.length>3 && (
            <View>
              <Image source={{uri:currentEmployeeProfile.imageUrls[3]}} style={{width:"100%",height:350,resizeMode:"cover",borderRadius:10}}/>
              <Pressable 
              style={{position:"absolute",bottom:10,right:10,backgroundColor:"white",width:42,height:42,borderRadius:21,justifyContent:"center",alignItems:"center"}}>
              <Foundation name="like" size={30} color="#452c63"/>

              </Pressable>
            </View> 

            
            
          )}
        </View>

    </View>
    <View style={{marginVertical:15}}>
      {currentEmployeeProfile?.prompts?.length > 0 && 
      (   currentEmployeeProfile?.prompts.slice(1,2).map((prompt,index) => {
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

    <View style={{marginVertical:15}}>
        <View>
          {currentEmployeeProfile?.imageUrls?.length>4 && (
            <View>
              <Image source={{uri:currentEmployeeProfile.imageUrls[4]}} style={{width:"100%",height:350,resizeMode:"cover",borderRadius:10}}/>
              <Pressable 
              style={{position:"absolute",bottom:10,right:10,backgroundColor:"white",width:42,height:42,borderRadius:21,justifyContent:"center",alignItems:"center"}}>
              <Foundation name="like" size={30} color="#452c63"/>

              </Pressable>
            </View>
          )}
        </View>

    </View>
    <View style={{marginVertical:15}}>
      {currentEmployeeProfile?.prompts?.length > 0 && 
      (   currentEmployeeProfile?.prompts.slice(2,3).map((prompt,index) => {
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
    <View style={{marginVertical:15}}>
        <View>
          {currentEmployeeProfile?.imageUrls?.length>5 && (
            <View>
              <Image source={{uri:currentEmployeeProfile.imageUrls[5]}} style={{width:"100%",height:350,resizeMode:"cover",borderRadius:10}}/>
              <Pressable 
              style={{position:"absolute",bottom:10,right:10,backgroundColor:"white",width:42,height:42,borderRadius:21,justifyContent:"center",alignItems:"center"}}>
              <Foundation name="like" size={30} color="#452c63"/>

              </Pressable>
            </View>
          )}
        </View>

    </View>
    

    </View>
    
    </>

  </View>
      </ScrollView>
      <Pressable onPress={handleCross}  style={{position:"absolute",bottom:15,left:12,backgroundColor:"white",width:50,height:50,borderRadius:25,justifyContent:"center",alignItems:"center"}}>
      <Entypo name="cross" size={30} color="#452c63"/>

      </Pressable>
      </>
  )
}

export default EmployeeHome

const styles = StyleSheet.create({})