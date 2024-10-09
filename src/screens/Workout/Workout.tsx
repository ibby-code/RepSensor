import React, { FC, useState} from 'react';
import { StyleSheet, View, Pressable, Text, FlatList } from 'react-native';
import { Button, Input, ListItem, Separator, XStack, YGroup, YStack } from 'tamagui'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { getWorkoutRange, getExerciseDisplay, Workout } from 'src/WorkoutTypes';
import { WorkoutScreenProps } from 'src/RouteConfig';
import { FAKE_DATA } from 'src/FakeData';

const Workout: FC<WorkoutScreenProps> = ({ route, navigation }) => {
    const { workoutId, isWorkoutEnd } = route.params;
    const workout = FAKE_DATA.workouts.find((w) => w.id === workoutId);
    const [nameValue, setNameValue] = useState(workout?.name || "");
    let newWorkoutJSX = <></>;
    if (isWorkoutEnd) {
        newWorkoutJSX = (
            <YStack>
                <Text>Congrats! You completed {workout?.exercises.length} exercises!</Text>
                <Text>You lifted {getTotalPoundsText(workout)}!</Text>
                <Text>You spent {getWorkoutLengthText(workout)} working out!</Text>
                <Text>Name your workout?</Text>
                <Input
                    placeholder="Enter a name"
                    onChangeText={(text) => setNameValue(text)}
                    value={workout?.name || ""} />
                <Button onPress={() => saveNameValue(nameValue)}>+</Button>
            </YStack>
        )
    }
    return (
        <YStack>
            {newWorkoutJSX}
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

function getTotalPoundsText(workout?: Workout): string {
    if (!workout) return "0lbs";
    const total = workout.exercises.reduce(
        (acc, e) => acc + e.sets.reduce(
            (acc, set) => acc + (set.weight * set.actualReps), 0),
             0);
    return `{total}lbs`;
}

function getWorkoutLengthText(workout?: Workout): string {
    if (!workout) return "0 seconds";
    const range = getWorkoutRange(workout);
    const diff = range.start.diff(range.end, "minutes");
    return `${diff} minutes`;
}

function saveNameValue(value: string) {

}

export default Workout;