import React, { FC } from 'react';
import { Button, Circle, YStack, ZStack, styled} from 'tamagui'
import { Dumbbell } from '@tamagui/lucide-icons';
import { useWindowDimensions } from 'react-native';

import { HomeScreenProps } from 'src/RouteConfig';

import { SafeAreaView } from 'react-native-safe-area-context';

const HomeButton = styled(Button, {
    marginHorizontal: "$10",
    marginVertical: "$3",
})

const Home: FC<HomeScreenProps> = ({ navigation }) => {
    const layout = useWindowDimensions();
    const smallerDim = Math.min(layout.width, layout.height);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <YStack flex={3}>
                <ZStack flex={1}>
                    <Circle marginVertical="auto"  alignSelf="center" size={smallerDim * .75} backgroundColor="$blue3Dark" />
                    <Dumbbell marginVertical="auto" alignSelf="center" size={smallerDim * .5} color="$color" />
                </ZStack>
            </YStack>
            <YStack flex={1}>
                <HomeButton onPress={() => navigation.navigate('ExerciseList', { workoutId: 'new' })}>Start exercising now!</HomeButton>
                <HomeButton>Choose an exercise</HomeButton>
            </YStack>
        </SafeAreaView>
    );
}

export default Home;