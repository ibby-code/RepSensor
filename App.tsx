import { TamaguiProvider, Theme} from 'tamagui';
import { NavigationContainer, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import tamaguiConfig from './tamagui.config'
import { Home as HomeIcon, Dumbbell, CalendarCheck } from 'lucide-react-native';
import { useFonts, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter'
import { useColorScheme } from 'react-native';
import { registerRootComponent } from 'expo';

import {UserDataProvider} from 'src/UserDataContext';
import { RootNavigatorStack } from 'src/RouteConfig';
import Home from 'src/screens/Home/Home';
import ExerciseList from 'src/screens/ExerciseList/ExerciseList';
import History from 'src/screens/History/History';

export default function App() {
  const headerOptions = {
    headerShown: false,
  };
  const [loaded] = useFonts({
    Inter: Inter_500Medium,
    InterBold: Inter_700Bold,
  })
  if (!loaded) return null
  const getIconColor = (focused: boolean, defaultColor: string): string => {
    // TODO: use theme color here
    // cannot use useTheme since we declare theme provider here, the context is not set yet
    // one option is to make a providers wrapper that has all providers
    return focused ? "darkblue" : defaultColor;
  }
  return (
    <TamaguiProvider config={tamaguiConfig}>
        <UserDataProvider>
          <Theme name="dark_blue">
            <NavigationContainer>
              <RootNavigatorStack.Navigator initialRouteName="Home"
                  screenOptions={headerOptions}>
                <RootNavigatorStack.Screen
                  name="Home"
                  component={Home}
                  options={{
                    title: '',
                    tabBarIcon: ({color, size, focused}) => <HomeIcon size={size} color={getIconColor(focused, color)} />
                  }}
                />
                <RootNavigatorStack.Screen
                  name="ExerciseList"
                  component={ExerciseList}
                  initialParams={{workoutId: 'new'}}
                  options={{
                    title: '',
                    tabBarIcon: ({color, size, focused}) => <Dumbbell size={size} color={getIconColor(focused, color)} />
                  }}
                />
                <RootNavigatorStack.Screen
                  name="History"
                  component={History}
                  options={{
                    title: '',
                    tabBarIcon: ({color, size, focused}) => <CalendarCheck size={size} color={getIconColor(focused, color)} />,
                  }}
                />
              </RootNavigatorStack.Navigator>
            </NavigationContainer>
          </Theme>
        </UserDataProvider>
    </TamaguiProvider>
  );
}
