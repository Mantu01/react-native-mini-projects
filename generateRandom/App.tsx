import './global.css'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ColorScreen from './src/screen/Colors';
import PasswordScreen from './src/screen/Password';
import { Ionicons } from '@react-native-vector-icons/ionicons';

const Tab = createBottomTabNavigator<RootStackParamList>();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if(route.name==='Color'){
            return <Ionicons name='color-palette' color={color} size={size} />
          }else if(route.name==='Password'){
            return <Ionicons name='lock-closed'  color={color} size={size} />
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Color" component={ColorScreen} />
      <Tab.Screen name="Password" component={PasswordScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}