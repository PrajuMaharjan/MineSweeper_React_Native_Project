import {Stack} from "expo-router";
import {StatusBar} from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index" />
        <Stack.Screen name="HomeScreen" />
        <Stack.Screen name="GameScreen" />
        <Stack.Screen name="SettingsScreen" />
        <Stack.Screen name="StatisticsScreen" />
        <Stack.Screen name="TutorialScreen" />
      </Stack>
    </>
  )
}
