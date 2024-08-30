import { TamaguiProvider } from 'tamagui';
import { NavigationContainer } from '@react-navigation/native';
import { tamaguiConfig } from './tamagui.config'
import { useFonts, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter'

import { RootNavigatorStack } from 'src/RouteConfig';
import Home from 'src/screens/Home/Home';
import Workout from 'src/screens/Workout/Workout';

export default function App() {
  const headerOptions = {
    title: 'Rep sensor',
    headerStyle: {
      backgroundColor: '#000000'
    },
    headerTintColor: '#fff',
  };
  const [loaded] = useFonts({
    Inter: Inter_500Medium,
    InterBold: Inter_700Bold,
  })
  if (!loaded) return null
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <NavigationContainer>
        <RootNavigatorStack.Navigator initialRouteName="Home">
          <RootNavigatorStack.Screen
            name="Home"
            component={Home}
            options={headerOptions}
          />
          <RootNavigatorStack.Screen
            name="Workout"
            component={Workout}
            options={headerOptions}
            initialParams={{ workoutId: '' }}
          />
        </RootNavigatorStack.Navigator>
      </NavigationContainer>
    </TamaguiProvider>
  );
}
