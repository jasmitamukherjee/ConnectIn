import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/Profile/HomeScreen'

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LikesScreen from '../screens/Profile/LikesScreen'
import { NavigationContainer } from '@react-navigation/native'
import ChatScreen from '../screens/Profile/ChatScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import BasicInfo from '../screens/BasicInfo'
import UserType from '../screens/UserType'
import NameScreen from '../screens/CommonScreens/NameScreen'
import EmailScreen from '../screens/CommonScreens/EmailScreen'
import PasswordScreen from '../screens/CommonScreens/PasswordScreen'
import GenderScreen from '../screens/CommonScreens/GenderScreen'
import LocationScreen from '../screens/CommonScreens/LocationScreen'
import JobPreferenceScreen from '../screens/EmployeeScreens/JobPreferenceScreen'
import SkillsScreen from '../screens/EmployeeScreens/SkillsScreen'
import EmployeePhotosScreen from '../screens/EmployeeScreens/EmployeePhotosScreen'
import PrefinalScreen from '../screens/CommonScreens/PrefinalScreen'
import Prompts from '../screens/CommonScreens/Prompts'
import EmployeePreferenceScreen from '../screens/EmployerScreens/EmployeePreferenceScreen'
import CompanyOffersScreen from '../screens/EmployerScreens/CompanyOffersScreen'
import CompanyPhotos from '../screens/EmployerScreens/CompanyPhotos'
import EPrompts from '../screens/EmployerScreens/EPrompts'
import EmployerPrefinal from '../screens/EmployerScreens/EmployerPrefinal'
import EmployeePrefinal from '../screens/EmployeeScreens/EmployeePrefinal'
import PromptsE from '../screens/EmployeeScreens/PromptsE'
const StackNavigator = () => {
    const Stack = createNativeStackNavigator()
    const Tab= createBottomTabNavigator()

    function BottomTabs(){
        return(
            <Tab.Navigator screenOptions={() => ({
                tabBarShowLabel: false,
              })}>
                <Tab.Screen name="Home" component={HomeScreen}  options={{
            tabBarStyle: {backgroundColor: '#101010'},
            tabBarLabelStyle: {color: '#008E97'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <MaterialCommunityIcons name="alpha" size={39} color="white" />
              ) : (
                <MaterialCommunityIcons
                  name="alpha"
                  size={39}
                  color="#989898"
                />
              ),
          }}/>

<Tab.Screen name="Likes" component={LikesScreen}  options={{
            tabBarStyle: {backgroundColor: '#101010'},
            tabBarLabelStyle: {color: '#008E97'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Foundation name="like" size={38} color="white" />
              ) : (
                <Foundation
                  name="like"
                  size={38}
                  color="#989898"
                />
              ),
          }}/>

<Tab.Screen name="Chat" component={ChatScreen}  options={{
            tabBarStyle: {backgroundColor: '#101010'},
            tabBarLabelStyle: {color: '#008E97'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <MaterialIcons name="chat-bubble" size={30} color="white" />
              ) : (
                <MaterialIcons
                  name="chat-bubble"
                  size={30}
                  color="#989898"
                />
              ),
          }}/>

<Tab.Screen name="Profile" component={ProfileScreen}  options={{
            tabBarStyle: {backgroundColor: '#101010'},
            tabBarLabelStyle: {color: '#008E97'},
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="person-circle-outline" size={35} color="white" />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={35}
                  color="#989898"
                />
              ),
          }}/>
            </Tab.Navigator>
        )
    }
const AuthStack=()=>{

    return(
        <Stack.Navigator>
            {/* common */}
            <Stack.Screen name="Basic" component={BasicInfo} options={{headerShown:false}}/>
            <Stack.Screen name="UserType" component={UserType} options={{headerShown:false}}/>
            <Stack.Screen name="Prompts" component={Prompts} options={{headerShown:false}}/>


            <Stack.Screen name="Name" component={NameScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Email" component={EmailScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Password" component={PasswordScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Gender" component={GenderScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Location" component={LocationScreen} options={{headerShown:false}}/>
            
            {/* Employee */}

            <Stack.Screen name="JobPreference" component={JobPreferenceScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Skills" component={SkillsScreen} options={{headerShown:false}}/>
            <Stack.Screen name="EmployeePhotos" component={EmployeePhotosScreen} options={{headerShown:false}}/>
            <Stack.Screen name="ShowEmployeePrompts" component={PromptsE} options={{headerShown:false}}/>
            <Stack.Screen name="EmployeePrefinal" component={EmployeePrefinal} options={{headerShown:false}}/>


            {/* Employer */}

            <Stack.Screen name="EmployeePreference" component={EmployeePreferenceScreen} options={{headerShown:false}}/>
            <Stack.Screen name="CompanyOffers" component={CompanyOffersScreen} options={{headerShown:false}}/>
            <Stack.Screen name="CompanyPhotos" component={CompanyPhotos} options={{headerShown:false}}/>
            <Stack.Screen name="ShowEmployerPrompts" component={EPrompts} options={{headerShown:false}}/>
            <Stack.Screen name="EmployerPrefinal" component={EmployerPrefinal} options={{headerShown:false}}/>








        </Stack.Navigator>
    )
}

    function MainStack(){
        return(
            <Stack.Navigator>
                <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}}/>
            </Stack.Navigator>
        )
    }
  return (
    <NavigationContainer>
        <AuthStack/>
    </NavigationContainer>
  )
}

export default StackNavigator

const styles = StyleSheet.create({})