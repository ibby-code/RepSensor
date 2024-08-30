import React, { FC } from 'react';
import {StyleSheet, View, Pressable, Text, FlatList} from 'react-native';
import { ListItem, Separator, XStack, YGroup, YStack } from 'tamagui'

import { getExerciseDisplay, Workout } from 'src/WorkoutTypes';

type WorkoutProps = {
    workout: Workout
}

const Workout: FC<WorkoutProps> = ({workout}) => {
    return (
        <YStack>
            <YStack>
                
            </YStack>
            <YStack>
                <FlatList data={workout.exercises}
                    renderItem={({item}) => {
                    const display = getExerciseDisplay(item);
                    return (
                            <ListItem hoverTheme bordered
                                key={item.id}
                                title={display.title}
                                subTitle={display.subtitle}/>
                    )
                    }}/>
            </YStack>
        </YStack>
    );
}

export default Workout;