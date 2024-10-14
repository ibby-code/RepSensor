import React, { FC } from 'react';
import { Button, YStack } from 'tamagui'

import { HomeScreenProps } from 'src/RouteConfig';

import { SafeAreaView } from 'react-native-safe-area-context';

const Home: FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <YStack>
                <Button onPress={() => navigation.navigate('ExerciseList', { workoutId: 'new' })}>Start exercising now!</Button>
                <Button>Choose an exercise</Button>
            </YStack>
        </SafeAreaView>
    );
}

export default Home;