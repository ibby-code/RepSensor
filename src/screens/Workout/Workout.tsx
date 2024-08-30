import React, { FC } from 'react';
import { StyleSheet, View, Pressable, Text, FlatList } from 'react-native';
import { ListItem, Separator, XStack, YGroup, YStack } from 'tamagui'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { getExerciseDisplay} from 'src/WorkoutTypes';
import { WorkoutScreenProps } from 'src/RouteConfig';
import { FAKE_DATA } from 'src/FakeData';

const Workout: FC<WorkoutScreenProps> = ({ route, navigation }) => {
    const { workoutId } = route.params;
    const workout = FAKE_DATA.workouts.find((w) => w.id === workoutId);
    return (
        <YStack>
            <YStack>

            </YStack>
            <YStack>
                {workout ?
                    <FlatList data={workout.exercises}
                        renderItem={({ item }) => {
                            const display = getExerciseDisplay(item);
                            return (
                                <ListItem hoverTheme bordered
                                    key={item.id}
                                    title={display.title}
                                    subTitle={display.subtitle} />
                            )
                        }} />
                    : <Text>Could not find workout!</Text>}
            </YStack>
        </YStack>
    );
}

export default Workout;