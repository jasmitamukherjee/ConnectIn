import { StyleSheet, Text, View ,SafeAreaView,Image, KeyboardAvoidingView, Pressable, TextInput} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import AntDesign from "react-native-vector-icons/AntDesign"

import LottieView from 'lottie-react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../AuthContext'
import { useNavigation } from '@react-navigation/native'
const LoginScreen = () => {
    const [employerEmail,setEmployerEmail] = useState("")
    const [employeeEmail,setEmployeeEmail] = useState("")
    const {token,setToken,isLoading} = useContext(AuthContext)
    const [employeePassword,setEmployeePassword] = useState("")
    const [employerPassword,setEmployerPassword] = useState("")
    const navigation=useNavigation()
    const [option,setOption] =useState("Create Account")
    useEffect(()=>{
        if(token){
            navigation.replace("MainStack",{screen:"Main"})
        }
    },[token,navigation])
  const signInEmployer= async ()=>{
    setOption("Sign In As Employer");
    try {

        const employer= {
            email:employerEmail,
            password: employerPassword
        };

        const response = await axios.post("http://192.168.1.4:5000/loginEmployer",employer);
        console.log(response);
        const token = response.data.token;
        await AsyncStorage.setItem("token",token)
        setToken(token)
    } catch (error) {
        console.log("Error",error)
        
    }
  }

  const signInEmployee= async ()=>{
    setOption("Sign In As Employee");
    try {

        const employee= {
            email:employeeEmail,
            password: employeePassword
        };

        const response = await axios.post("http://192.168.1.4:5000/loginEmployee",employee);
        console.log(response);
        const token = response.data.token;
        await AsyncStorage.setItem("token",token)
        setToken(token)
    } catch (error) {
        console.log("Error",error)
        
    }
  }
  const createAccount = ()=>{
    setOption("Create Account");
    navigation.navigate("Basic")
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View  style={{
          height: 200,
          backgroundColor: '#502b63',
          width: '100%',
          borderBottomLeftRadius: 150,
          borderBottomRightRadius: 150,
        }}>
        <View  style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
          }}>

<Image
            style={{width: 150, height: 100, resizeMode: 'contain'}}
            source={{uri:"https://cdn-icons-png.flaticon.com/512/3361/3361945.png"}}
           
          />
             <Text
          style={{
            marginTop: 20,
            textAlign: 'center',
            fontSize: 23,
            fontFamily: 'monospace',
            color: 'white',
            fontWeight:"bold"
          }}>
         ConnectIn
        </Text>
        </View>
      </View>
      <KeyboardAvoidingView>
        <View style={{alignItems: 'center'}}>
            <Text   style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 25,
              fontFamily:"monospace",
              color: '#502b63',
            }}>Designed to connect professionals.</Text>
        </View>
        <View   style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
             <Image
            style={{width: 200, height: 200, resizeMode: 'cover'}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3417/3417367.png',
            }}
          />
            
        </View>
        {/* <View style={{marginTop:20,marginHorizontal:15}}>
            {option == "Sign In"?(
                <>
                <View  style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  backgroundColor: '#502b63',
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 30,
                }}>
                    <MaterialIcons   style={{marginLeft: 8}}
                  name="email"
                  size={24}
                  color="white" />
                    <TextInput  style={{
                    color: 'white',
                    marginVertical: 10,
                    width: 300,
                    fontFamily:"monospace"
                    // fontSize: password ? 17 : 17,
                  }} placeholderTextColor={"white"} placeholder='Enter your email' value={email} onChangeText={text=>setEmail(text)} />

                </View>

                <View  style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  backgroundColor: '#502b63',
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 30,
                }}>
                    <AntDesign   style={{marginLeft: 8}}
                  name="lock1"
                  size={24}
                  color="white" />
                    <TextInput  style={{
                    color: 'white',
                    marginVertical: 10,
                    width: 300,
                    fontFamily:"monospace"
                    // fontSize: password ? 17 : 17,
                  }} placeholderTextColor={"white"} placeholder='Enter your password' value={password} onChangeText={text=>setPassword(text)} />

                </View>
                <View  style={{
                  marginTop: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                    <Text style={{fontFamily:"monospace",color:"black"}}>Keep me logged in</Text>
                    <Text style={{color: 'gray',fontFamily:"monospace", fontWeight: '500'}}>Forgot Password</Text>

                </View>
                </>
            ):(

                <LottieView
                source={require('../assets/login.json')}
                style={{
                  height: 200,
                  width: 300,
                  alignSelf: 'center',
                  marginTop: 40,
                  justifyContent: 'center',
                }}
                autoPlay
                loop={true}
                speed={0.7}
              />
            )}

        </View>
        */}

        

<View style={{ marginTop: 20, marginHorizontal: 15 }}>
  {option === "Sign In As Employer" ? (
    <>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#502b63',
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 30,
      }}>
        <MaterialIcons style={{ marginLeft: 8 }}
          name="email"
          size={24}
          color="white" />
        <TextInput style={{
          color: 'white',
          marginVertical: 10,
          width: 300,
          fontFamily: "monospace"
        }} placeholderTextColor={"white"} placeholder='Enter your email' value={employerEmail} onChangeText={text => setEmployerEmail(text)} />
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#502b63',
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 30,
      }}>
        <AntDesign style={{ marginLeft: 8 }}
          name="lock1"
          size={24}
          color="white" />
        <TextInput style={{
          color: 'white',
          marginVertical: 10,
          width: 300,
          fontFamily: "monospace"
        }} placeholderTextColor={"white"} placeholder='Enter your password' value={employerPassword} onChangeText={text => setEmployerPassword(text)} />
      </View>
      <View style={{
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text style={{ fontFamily: "monospace", color: "black" }}>Keep me logged in</Text>
        <Text style={{ color: 'gray', fontFamily: "monospace", fontWeight: '500' }}>Forgot Password</Text>
      </View>
    </>
  ) : option === "Sign In As Employee" ? (
    <>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#502b63',
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 30,
      }}>
        <MaterialIcons style={{ marginLeft: 8 }}
          name="email"
          size={24}
          color="white" />
        <TextInput style={{
          color: 'white',
          marginVertical: 10,
          width: 300,
          fontFamily: "monospace"
        }} placeholderTextColor={"white"} placeholder='Enter your email' value={employeeEmail} onChangeText={text => setEmployeeEmail(text)} />
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#502b63',
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 30,
      }}>
        <AntDesign style={{ marginLeft: 8 }}
          name="lock1"
          size={24}
          color="white" />
        <TextInput style={{
          color: 'white',
          marginVertical: 10,
          width: 300,
          fontFamily: "monospace"
        }} placeholderTextColor={"white"} placeholder='Enter your password' value={employeePassword} onChangeText={text => setEmployeePassword(text)} />
      </View>
      <View style={{
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text style={{ fontFamily: "monospace", color: "black" }}>Keep me logged in</Text>
        <Text style={{ color: 'gray', fontFamily: "monospace", fontWeight: '500' }}>Forgot Password</Text>
      </View>
    </>
  ) : (
        <LottieView
          source={require('../assets/login.json')}
          style={{
            height: 200,
            width: 300,
            alignSelf: 'center',
            marginTop: 40,
            justifyContent: 'center',
          }}
          autoPlay
          loop={true}
          speed={0.7}
        />
      )}
</View>
        <Pressable onPress={createAccount} style={{
              width: 300,
              marginTop:20,
              backgroundColor: option == 'Create Account' ? '#502b63' : 'transparent',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
              borderRadius: 30,
            }}>
            <Text style={{
                textAlign: 'center',
                color: option == 'Create Account' ? 'white' : 'black',
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily:"monospace"
              }}>Create Account</Text>
        </Pressable>
        <Pressable onPress={signInEmployer} style={{
              width: 300,
              backgroundColor:option == 'Sign In As Employer' ? '#502b63' : 'transparent',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
              borderRadius: 30,
            }}>
            <Text style={{
                textAlign: 'center',
                color: option == 'Sign In As Employer' ? 'white' : 'black',
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily:"monospace"
              }}>Sign In As Employer</Text>
        </Pressable>

        <Pressable onPress={signInEmployee} style={{
              width: 300,
              backgroundColor:option == 'Sign In As Employee' ? '#502b63' : 'transparent',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
              borderRadius: 30,
            }}>
            <Text style={{
                textAlign: 'center',
                color: option == 'Sign In As Employee' ? 'white' : 'black',
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily:"monospace"
              }}>Sign In As Employee</Text>
        </Pressable>
        
       
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})