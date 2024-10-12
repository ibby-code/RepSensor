import React, { FC, useCallback, useEffect, useState} from 'react';
import { StyleSheet, View, Pressable, Text, FlatList } from 'react-native';
import { Button, Input, Label, ListItem, Separator, XStack, YGroup, YStack } from 'tamagui'
import _ from 'underscore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

import { getWorkoutRange, getExerciseDisplay, Exercise, Workout as WorkoutType } from 'src/WorkoutTypes';
import { WorkoutScreenProps } from 'src/RouteConfig';
import { useUserData, useUserDataDispatch, UserDataChange } from 'src/UserDataContext';

const TEXT_DEBOUNCE_MS = 1000;

const Workout: FC<WorkoutScreenProps> = ({ route, navigation }) => {
    const { workoutId, isWorkoutEnd } = route.params;
    const data = useUserData();
    const dispatch = useUserDataDispatch();
    const workout = data.workouts[workoutId];
    const [nameValue, setNameValue] = useState(workout?.name || "");
    useEffect(() => {
        if (isWorkoutEnd && data.draft) {
            dispatch({type: UserDataChange.SAVE_WORKOUT_DRAFT})
            navigation.setParams({workoutId: data.draft.id})
        }
    }, []);

    const saveNameValue = (name: string) => {
        dispatch({type: UserDataChange.UPDATE_WORKOUT_NAME, workoutId, name});
        console.log('saving value', name, "workout id", workoutId);
    };
    const saveInputDebounced = useCallback(_.debounce(saveNameValue, TEXT_DEBOUNCE_MS), [workoutId]);


    if (!workout) {
        if (isWorkoutEnd) {
            console.log('didn\'t find workout', workoutId);
            return (<Text>Wait!</Text>)
        }
        console.log("No workout found");
        navigation.navigate("Home");
    }
    let newWorkoutJSX = <></>;
    if (isWorkoutEnd) {
        newWorkoutJSX = (
            <YStack alignItems="center">
                <Text>Congrats! You completed {workout?.exercises.length} exercises!</Text>
                <Text>You lifted {getTotalPoundsText(workout)}!</Text>
                <Text>You spent {getWorkoutLengthText(workout)} working out!</Text>
                <Text>Name your workout?</Text>
                <XStack padding="$4" alignItems="center">
                    <Label htmlFor="name">
                        Name
                    </Label>
                    <Input
                        id="name"
                        flex={1}
                        margin="$2"
                        placeholder={workout.name || ""}
                        onChangeText={(text) => {setNameValue(text); saveInputDebounced(text);}}/>
                    <Button onPress={() => saveNameValue(nameValue)}>+</Button>
                </XStack>
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

function getTotalPoundsText(workout?: WorkoutType): string {
    if (!workout) return "0lbs";
    console.log("weight check", JSON.stringify(workout?.exercises));
    const total = workout.exercises.reduce(
        (acc, e) => acc + e.sets.reduce(
            (acc, set) => acc + (set.weight * set.actualReps), 0),
             0);
    return `${total}lbs`;
}

function getWorkoutLengthText(workout?: WorkoutType): string {
    if (!workout) return "0 seconds";
    const {start, end} = getWorkoutRange(workout);
    console.log(start.format('L'), "-", end.format("L"))
    const diff = end.diff(start, "minutes");
    return `${diff} minutes`;
}

export default Workout;