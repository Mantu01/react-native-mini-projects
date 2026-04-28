import { Stack } from "expo-router";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import { useColorScheme } from "react-native";
import { customTheme } from "@/utils/colors";

export default function RootLayout() {
  const colorScheme=useColorScheme();
  const theme=colorScheme==='dark'?{...eva.dark,...customTheme.dark}:{...eva.light,...customTheme.light}
  return (
    <ApplicationProvider {...eva} theme={theme}>
      <Stack screenOptions={{headerShown:false}} />
    </ApplicationProvider>
  );
}
