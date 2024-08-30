import { createTamagui, TamaguiProvider } from 'tamagui';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {tamaguiConfig} from './tamagui.config'
import {useFonts, Inter_500Medium, Inter_700Bold} from '@expo-google-fonts/inter'

import Home from 'src/screens/Home/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Inter: Inter_500Medium,
    InterBold: Inter_700Bold,
  })
  if (!loaded) return null
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Rep sensor',
              headerStyle: {
                backgroundColor: '#000000'
              },
              headerTintColor: '#fff',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
}
