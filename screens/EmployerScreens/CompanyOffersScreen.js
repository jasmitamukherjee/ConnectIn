import { TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons'
import { getRegistrationProgress, saveRegistrationProgress } from '../../registrationUtils';
const CompanyOffers = () => {
  useEffect(() => {
    getRegistrationProgress("CompanyOffers").then(progressData => {
      if (progressData) {
        setCompanyOffers(progressData.companyOffers || []);
      }
    });
  }, []);
  const navigation=useNavigation()
  const handleNext=()=>{
    if(companyOffers.length > 0){
    saveRegistrationProgress('CompanyOffers', { companyOffers });}

   
    navigation.navigate("CompanyPhotos")}
  
  const [companyOffers, setCompanyOffers] = useState([]);

  const chooseOption = (option) => {

   
  
    
    if (companyOffers.includes(option)) {
      setCompanyOffers(companyOffers.filter((selectedOption) => selectedOption !== option));
    } else {
      setCompanyOffers([...companyOffers, option]);
    }
  };

  const options = [
    {
      label: 'Location',
      subOptions: ['Remote', 'On-site'],
    },
    {
      label: 'Type',
      subOptions: ['Full-time', 'Part-time', 'Freelance', 'Internship'],
    },
    {
      label: 'Industry',
      subOptions: ['Technology', 'Healthcare', 'Finance', 'Education', 'Manufacturing', 'Retail', 'Hospitality and Tourism', 'Energy and Utilities', 'Media and Entertainment', 'Nonprofit and Social Services', 'Government and Public Administration', 'Professional Services'],
    },
    {
      label: 'Job Role',
      subOptions: ['Engineering', 'Marketing', 'Sales', 'Finance', 'Human Resources', 'Customer Service', 'Information Technology', 'Operations', 'Product Management', 'Design', 'Research and Development', 'Education and Training', 'Healthcare Services', 'Administrative', 'Legal', 'Quality Assurance'],
    },
    {
      label: 'Work Environment',
      subOptions: ['Collaborative', 'Independent', 'Fast-paced', 'Creative', 'Structured'],
    },
    {
      label: 'Benefits',
      subOptions: ['Health Insurance', 'Retirement Plans', 'Paid Time Off', 'Stock Options', 'Performance Bonuses'],
    },
    {
      label: 'Company Size',
      subOptions: ['Startup', 'Small Business', 'Medium-sized Enterprise', 'Large Corporation'],
    },
    {
      label: 'Remote Work Setup',
      subOptions: ['Home Office', 'Coworking Space', 'Coffee Shop', 'Library'],
    },
   
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={{ flex: 1, marginTop: 90, marginHorizontal: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
              <MaterialCommunityIcons name="magnify-scan" size={26} color="black" />
            </View>
            <Image
              style={{ width: 100, height: 40 }}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
              }}
            />
          </View>
          <Text style={{ fontFamily:"monospace",fontSize: 25, fontWeight: 'bold', color: 'black', marginTop: 15 }}>What does your company offer?</Text>
          <Text style={{fontFamily:"monospace",marginTop: 30, fontSize: 15, color: 'gray' }}>Select all that apply to your company.</Text>
          {options.map((option, index) => (
            <View key={index} style={{ marginTop: 30 }}>
              <Text style={{fontFamily:"monospace", fontWeight: 'bold', fontSize: 18, color: 'black' }}>{option.label}</Text>
              <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginTop: 12 }}>
                {option.subOptions.map((subOption, subIndex) => (
                  <Pressable key={subIndex} onPress={() => chooseOption(subOption)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 12 }}>
                      <FontAwesome
                        name="circle"
                        size={26}
                        color={companyOffers.includes(subOption) ? '#502b63' : '#F0F0F0'}
                      />
                      <Text style={{fontFamily:"monospace", fontWeight: '500', fontSize: 15, color: 'black', marginLeft: 8 }}>{subOption}</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompanyOffers;

const styles = StyleSheet.create({});
