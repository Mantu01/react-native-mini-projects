import * as LocalAuthentication from 'expo-local-authentication';

export const biometricAuth=async()=>{
  const hasHardware=await LocalAuthentication.hasHardwareAsync();
  if(!hasHardware){
    return {success:false, error:'Device does not support bio auth'};
  }
  const isEnroll=await LocalAuthentication.isEnrolledAsync();
  if(!isEnroll){
    return { success:false, error:"Bio data not enrolled"};
  }
  
  const result=await LocalAuthentication.authenticateAsync({
    promptDescription:"Verify Biometrics",
    disableDeviceFallback:false,
  });
  return result;
}