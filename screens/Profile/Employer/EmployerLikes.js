import { StyleSheet, Text, View,SafeAreaView } from 'react-native'
import { Route, useRoute } from '@react-navigation/native'

const EmployerLikes = () => {
 const route = useRoute();
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAF9F6'}}>
      <View>
        <Text>
          {route?.params?.name}
        </Text>
      </View>
    </SafeAreaView>
  
}

export default EmployerLikes

const styles = StyleSheet.create({})