import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Ionicons} from '@expo/vector-icons';
import { biometricAuth } from "@/service/authService";

export default function Index() {
  const [isLogged,setIslLoggedIn]=useState(false);
  
  const handleLogin=async()=>{
    const result=await biometricAuth();
    if(result?.success){
      setIslLoggedIn(true);
    }else{
      Alert.alert("Auth failed",result?.error);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title} >{isLogged?"Your are Authenticated":"Loging to Your account"}</Text>
      {isLogged?(
        <TouchableOpacity style={styles.button} onPress={()=>setIslLoggedIn(false)}>
          <Text style={styles.buttonText} >Logout</Text>
        </TouchableOpacity>
      ):(
        <TouchableOpacity onPress={handleLogin} style={styles.button} >
          <Text style={styles.buttonText}>Login</Text>
          <Ionicons name="finger-print" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#907509',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#06713d',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});