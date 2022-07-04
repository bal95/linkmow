import React,{useState} from 'react'
import {View,Text,TextInput,TouchableOpacity,Keyboard,ToastAndroid} from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'

const App=()=>{
  let [website,setWebsite]=useState('')
  let [mowedLink,getMowedLink]=useState('')
  let [isServerError,getServerStatus]=useState(false)

  const showToast=()=>{
    ToastAndroid.showWithGravity("Link copied!",ToastAndroid.SHORT,ToastAndroid.BOTTOM)
  }

  const getKey=async ()=>{
    try{
      const res=await fetch('http://10.0.2.2:3000/insert',{ //Use DynamoDB link by replacing the localhost
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          website: website,
        })
      })
      const key=await res.json()
      getMowedLink(key==='Invalid Website!'?key:`http://10.0.2.2:3000/${key}`) //Use DynamoDB link by replacing the localhost
      getServerStatus(false)
      setWebsite('')
    }
    catch(err){
      getServerStatus(true)
      setWebsite('')
      getMowedLink('')
    }
  }

  return(
    <View style={{
        flex:1,
        alignItems: 'center',
        backgroundColor: 'black',
    }}>
      <Text style={{
          fontSize: 70,
          color: 'white',
          fontFamily:'Fascinate-Regular',
      }}>
        LinkMow
      </Text>
      <Text style={{
          marginTop:20,
          fontSize: 20,
          color: 'red'
      }}>
        {isServerError?'SERVER ERROR!!':''}
      </Text>
      <TextInput placeholder='Paste URL here...' defaultValue={website} onChangeText={(text)=>setWebsite(text)} placeholderTextColor="gray" style={{
        borderWidth: 2,
        borderColor: 'white',
        color: 'white',
        width:300,
        marginTop:100,
        marginBottom:20,
        borderRadius: 20
      }}/>
      <TouchableOpacity onPress={()=>{getKey();Keyboard.dismiss()}} style={{
        margin: 5,
        padding: 10,
        borderRadius:10,
        backgroundColor: '#DDDDDD',
      }}>
        <Text style={{
          color: 'black'
        }}>
          Generate
        </Text>
      </TouchableOpacity>
      <TextInput editable={false} defaultValue={mowedLink} placeholder='Link will be mowed and generated here...' placeholderTextColor="gray" style={{
        borderWidth: 2,
        borderColor: 'white',
        color: 'white',
        width:300,
        marginTop:100,
        marginBottom:20,
        borderRadius: 20
      }}/>
      <TouchableOpacity onPress={()=>{Clipboard.setString(mowedLink);showToast()}} style={{
        margin: 5,
        padding: 10,
        borderRadius:10,
        backgroundColor: '#DDDDDD',
      }}>
        <Text style={{
          color: 'black'
        }}>
          Copy Link
        </Text>
      </TouchableOpacity>
    </View>
  )
}
export default App;
