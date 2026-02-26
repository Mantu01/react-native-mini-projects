import { Text, View } from "react-native";
import {Button} from '@react-navigation/elements';
import { useState } from "react";


function ColorScreen() {
  const [color,setColor]=useState<string>('#f00');

  function GenerateRandomColor(){
    const str="0123456789abcdef";
    let hexCode="#";
    for(let i=0;i<6;i++){
      hexCode+=str[Math.floor(Math.random()*16)]
    }
    setColor(hexCode);
  }

  return (
    <View className="h-3/4 w-screen gap-5 flex justify-center items-center">
      <View style={{backgroundColor:color}} className="h-80 w-80 rounded-2xl"/>
      <Text className="text-xl">Hexa Code : {color}</Text>
      <Button onPress={()=>GenerateRandomColor()} >Generate Color</Button>
    </View>
  );
}

export default ColorScreen;