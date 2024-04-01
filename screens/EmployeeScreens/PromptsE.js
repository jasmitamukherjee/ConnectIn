import { StyleSheet, Text, View ,SafeAreaView, Pressable,TextInput,Button, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {ModalContent, BottomModal,ModalTitle} from 'react-native-modals';
import {SlideAnimation} from 'react-native-modals';

const ShowPromptsScreen = () => {
  
  const navigation= useNavigation()
  const [prompts,setPrompts] = useState([])
  const [option,setOption] = useState("Professional Skills")
  const [answer,setAnswer ]= useState("")
  const [question, setQuestion] = useState("")
  const [isModalVisible,setModalVisible]= useState(false)
  const openModal=item=>{
    setModalVisible(!isModalVisible)
    setQuestion(item?.question)
  }
  const addPrompt = () => {
    const newPrompt = {question, answer};
    setPrompts([...prompts, newPrompt]);
    setQuestion('');
    setAnswer('');
    setModalVisible(false);
    if (prompts.length === 3) {
      setModalVisible(false);
      navigation.navigate('Prompts', {
        prompts: prompts,
      }); // Navigate away from the screen when prompts reach three
    }
  };
  // console.log('question', prompts);
  const promptss = [
    {
      id: '0',
      name: 'Professional Skills',
      questions: [
        {
          id: '10',
          question: 'My greatest professional accomplishment so far is',
        },
        {
          id: '11',
          question: 'I excel at',
        },
        {
          id: '12',
          question: 'One skill I am eager to develop further is',
        },
        {
          id: '13',
          question: 'I thrive in work environments that',
        },
        {
          id: '14',
          question: 'My dream job would involve',
        },
        {
          id: '15',
          question: 'I am passionate about',
        },
        {
          id: '16',
          question: 'One thing I am known for professionally is',
        },
      ],
    },
    {
      id: '1',
      name: 'Work Experience',
      questions: [
        {
          id: '20',
          question: 'My most challenging professional experience was',
        },
        {
          id: '21',
          question: 'I learned the most from',
        },
        {
          id: '22',
          question: 'My approach to problem-solving is',
        },
        {
          id: '23',
          question: 'In past roles, I have demonstrated success by',
        },
        {
          id: '24',
          question: 'My leadership style can be described as',
        },
        {
          id: '25',
          question: 'I collaborate best when',
        },
        {
          id: '26',
          question: 'I have adapted to change by',
        },
      ],
    },
    {
      id: '2',
      name: 'Career Goals',
      questions: [
        {
          id: '30',
          question: 'In the next 5 years, I see myself',
        },
        {
          id: '31',
          question: 'My ultimate career goal is',
        },
        {
          id: '32',
          question: 'I value growth opportunities that',
        },
        {
          id: '33',
          question: 'My ideal company culture is one that',
        },
        {
          id: '34',
          question: 'I am motivated by',
        },
        {
          id: '35',
          question: 'I want to contribute to a team by',
        },
        {
          id: '36',
          question: 'I envision my role as',
        },
      ],
    },
  ];
  
  return (
    <>
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
     <View style={{padding:10,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
      <Text style={{fontFamily:"monospace",fontSize: 16, fontWeight: 'bold', color: '#502b63'}}>
        View All
      </Text>
      <Text style={{fontFamily:"monospace",fontSize: 16, fontWeight: 'bold', color: '#502b63'}}>
        Prompts
      </Text>
     </View>

     <View style={{marginTop:20,flexDirection:"row",gap:5}}>

     {promptss.map((item, index) => (
  <View key={item.id}>
    <Pressable onPress={()=> setOption(item?.name)}style={{ padding: 10, borderRadius: 20 ,backgroundColor: option== item?.name ? "#502b63" :"white"}}>
      <Text style={{fontFamily:"monospace",textAlign:"center",color:option==item?.name ? "white":"black"}}>{item?.name}</Text>
    </Pressable>
  </View>
))}

     </View>
     


     <View style={{marginTop:20,marginHorizontal:12}}>
      {promptss?.map((item,index)=>(
        <View key={index}>
          {option== item?.name && (
          <View>
            {item?.questions?.map((question,index)=>(
              <Pressable key={question.id} onPress={()=> openModal(question)} style={{marginVertical:12,}}>
                <Text style={{fontFamily:"monospace",fontSize:15,fontWeight:500,color:"black"}}>{question?.question}</Text>
              </Pressable>

            ))}
            </View>)}
        </View>
      ))}
      
     </View>
    </SafeAreaView>
    <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        // modalTitle={<ModalTitle title="Answer the question" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}>
        <ModalContent style={{width: '100%', height: 280}}>
          <View style={{marginVertical: 10}}>
            {/* <Text
              style={{fontFamily:"monospace",textAlign: 'center', fontWeight: '600', fontSize: 15}}>
              Answer your question.
            </Text> */}
            <Text style={{fontFamily:"monospace",marginTop: 15, fontSize: 20, fontWeight: '600'}}>
              {question}
            </Text>
            <View
              style={{
                borderColor: '#202020',
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                height: 100,
                marginVertical: 12,
                borderStyle: 'dashed',
              }}>
              <TextInput
                value={answer}
                onChangeText={text => setAnswer(text)}
                style={{fontFamily:"monospace", width: 300, fontSize: answer ? 18 : 18}}
                placeholder="Your Answer."
              />
            </View>
            <Button onPress={addPrompt} title="Add"  color="#502b63" />
          </View>
        </ModalContent>
      </BottomModal>
    </>
  )
}

export default ShowPromptsScreen

const styles = StyleSheet.create({})