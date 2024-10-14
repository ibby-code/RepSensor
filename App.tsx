import { TamaguiProvider } from 'tamagui';
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
  // set options for screen here controlling title bar
  // figure out what we weannt do with it and back button
  // consider using bottom tabs navigator instead?
  return (
    <TamaguiProvider config={tamaguiConfig}>
        <UserDataProvider>
          <NavigationContainer>
            <RootNavigatorStack.Navigator initialRouteName="Home"
                screenOptions={headerOptions}>
              <RootNavigatorStack.Screen
                name="Home"
                component={Home}
                options={{
                  title: '',
                  tabBarIcon: ({color, size}) => <HomeIcon size={size} color={color} />
                }}
              />
              <RootNavigatorStack.Screen
                name="ExerciseList"
                component={ExerciseList}
                initialParams={{workoutId: 'new'}}
                options={{
                  title: '',
                  tabBarIcon: ({color, size}) => <Dumbbell size={size} color={color} />
                }}
              />
              <RootNavigatorStack.Screen
                name="History"
                component={History}
                options={{
                  title: '',
                  tabBarIcon: ({color, size}) => <CalendarCheck size={size} color={color} />
                }}
              />
            </RootNavigatorStack.Navigator>
          </NavigationContainer>
        </UserDataProvider>
    </TamaguiProvider>
  );
}
