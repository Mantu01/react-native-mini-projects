import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import {Button} from '@react-navigation/elements';
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";


type Props = BottomTabNavigationProp<RootStackParamList, 'Password'>;
function PasswordScreen() {
  const navigation = useNavigation<Props>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Color')}>
        Go to Profile
      </Button>
    </View>
  );
}

export default PasswordScreen;