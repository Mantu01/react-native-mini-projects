import './global.css';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {

  return (
    <SafeAreaProvider>
      <View className="h-screen w-screen flex justify-center items-center bg-green-600" >
        <Text className="text-9xl text-red-600">Hello</Text>
      </View>
    </SafeAreaProvider>
  );
}

export default App;
