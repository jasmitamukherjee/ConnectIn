import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';
import { getRegistrationProgress, saveRegistrationProgress } from '../registrationUtils';
const UserType = () => {

  useEffect(()=>{
    getRegistrationProgress('UserType').then(progressData => {
      if(progressData){
        setSelectedType(progressData.selectedItem || '')
      }
    })

  },[])
  const { updateUserType } = useContext(AuthContext);
  const navigation=useNavigation()
  const [selectedType, setSelectedType] = useState(null);
  const handleNext=()=>{

    updateUserType(selectedType)
  // console.log(selectedType)
if(selectedType.trim() !== ''){
  saveRegistrationProgress('UserType',{selectedType})
}
   
    navigation.navigate("Name")}
  const data = [
    { id: 'employer', label: 'Employer' },
    { id: 'employee', label: 'Employee' },
  ];

  const renderItem = ({ item }) => {
    const isSelected = selectedType === item.id;

    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => setSelectedType(item.id)}
      >
        <Text style={[styles.itemText, isSelected && styles.selectedItemText, { fontFamily: 'monospace' }]}>
          {item.label}
        </Text>
     
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Before we proceed any further, please choose what describes you best.
        </Text>
      </View>
      <LottieView
            source={require('../assets/thinking.json')}
            autoPlay
            loop
            style={{ height: 300, width: 300, alignSelf: 'center', justifyContent: 'center' }}
          />
      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={{ width: 20 }} />} // Add space between items
        />
          <TouchableOpacity
        onPress={handleNext}
          activeOpacity={0.8}
          style={{marginTop: 30, marginLeft: 'auto'}}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={50}
            color="#502b63"
            style={{alignSelf: 'center', marginTop: 20}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  header: {
   
    marginTop:90
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: 'black',
    marginLeft: 20,
    marginTop: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  listContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 50,
    marginHorizontal: 10,
    marginLeft:10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 18,
    color: 'black',
  },
  selectedItem: {
    // borderColor: '#502b63',
    backgroundColor:"#502b63",
    
  },
  selectedItemText: {
    fontWeight: 'bold',
    color:"white"
  },
  animation: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
});
