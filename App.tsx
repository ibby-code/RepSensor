import { TamaguiProvider } from 'tamagui';
import { NavigationContainer, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import tamaguiConfig from './tamagui.config'
import { useFonts, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter'
import { useColorScheme } from 'react-native';
import { registerRootComponent } from 'expo';

import { RootNavigatorStack } from 'src/RouteConfig';
import Home from 'src/screens/Home/Home';
import Workout from 'src/screens/Workout/Workout';
import Exercise from 'src/screens/Exercise/Exercise';

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
      <ThemeProvider value={DefaultTheme}>
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
            <RootNavigatorStack.Screen
              name="Exercise"
              component={Exercise}
              options={headerOptions}
            />
          </RootNavigatorStack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
