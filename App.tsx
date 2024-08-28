import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MovementGraphics from 'src/components/MovementGraphics/MovementGraphics';

const Stack = createNativeStackNavigator();

export default function App() {
   return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MovementGraphics}
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
   );
}
