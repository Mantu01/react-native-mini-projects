import { createStackNavigator } from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Home from './src/component/Home';
import Chat from './src/component/Chat';
import { NavigationContainer } from '@react-navigation/native';

const Stack=createStackNavigator();

const StackNavigator=()=>{
  return (
    <Stack.Navigator>
      <Stack.Screen name='home' component={Home} />
      <Stack.Screen name='chat' component={Chat} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
