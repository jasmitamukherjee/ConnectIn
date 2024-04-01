import { StyleSheet, Text, View ,SafeAreaView, Pressable,TextInput,Button} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {ModalContent, BottomModal,ModalTitle} from 'react-native-modals';
import {SlideAnimation} from 'react-native-modals';

const ShowEmployerPrompts = () => {
    const promptss = [
        {
          id: '0',
          name: 'Skills',
          questions: [
            {
              id: '10',
              question: 'What makes your team unique? Share a key skill you seek in candidates.',
            },
            {
              id: '11',
              question: 'What expertise do you need in candidates? Give examples.',
            },
            {
              id: '12',
              question: 'How will candidates develop their skills in your team?',
            },
            {
              id: '13',
              question: 'Describe your ideal work environment for enhancing skills.',
            },
            {
              id: '14',
              question: 'Essential skills for this role and why?',
            },
            {
              id: '15',
              question: 'What excites you most about a candidate’s skills?',
            },
            {
              id: '16',
              question: 'Example of a team members impactful skill in a project.',
            },
          ],
        },
        {
          id: '1',
          name: 'Experience',
          questions: [
            {
              id: '20',
              question: 'Describe a significant past challenge and its outcome.',
            },
            {
              id: '21',
              question: 'Share a successful project and team roles.',
            },
            {
              id: '22',
              question: 'How does your team solve problems effectively?',
            },
            {
              id: '23',
              question: 'Qualities that contributed to past hires’ success.',
            },
            {
              id: '24',
              question: 'Your leadership style and its impact on teamwork.',
            },
            {
              id: '25',
              question: 'Successful collaboration strategies within your team.',
            },
            {
              id: '26',
              question: 'Adaptation strategies to industry changes.',
            },
          ],
        },
        {
          id: '2',
          name: 'Goals',
          questions: [
            {
              id: '30',
              question: 'Opportunities for employee growth in your company.',
            },
            {
              id: '31',
              question: 'Your vision for employees’ career paths and support.',
            },
            {
              id: '32',
              question: 'Company culture’s impact on employee growth.',
            },
            {
              id: '33',
              question: 'Defining company culture and its effect on satisfaction.',
            },
            {
              id: '34',
              question: 'Motivators for team members’ success.',
            },
            {
              id: '35',
              question: 'New hires’ role in team goals and objectives.',
            },
            {
              id: '36',
              question: 'Future role of successful candidates in your team.',
            },
          ],
        },
      ];
      
      
  const navigation= useNavigation()
  const [prompts,setPrompts] = useState([])
  const [option,setOption] = useState("Skills")
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

     <View style={{marginHorizontal:10,marginTop:20,flexDirection:"row",gap:10}}>

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
              <Pressable   key={question.id} onPress={()=> openModal(question)} style={{marginVertical:12,}}>
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
      
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}>
        <ModalContent style={{width: '100%', height: 280}}>
          <View style={{marginVertical: 10}}>
            
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
                style={{fontFamily:"monospace",color: 'black', width: 300, fontSize: answer ? 18 : 18}}
                placeholder="Your Answer."
              />
            </View>
            <Button onPress={addPrompt} title="Add" color="#502b63" />
          </View>
        </ModalContent>
      </BottomModal>
    </>
  )
}

export default ShowEmployerPrompts

const styles = StyleSheet.create({})