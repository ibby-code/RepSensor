import React, { FC, useEffect, useState } from 'react';

import { Button, Spinner, Text, XStack, YStack } from 'tamagui'
import { ExerciseListScreenProps } from 'src/RouteConfig';
import { Alert, View, useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { useUserData, useUserDataDispatch, UserDataChange, UserDataAction } from 'src/UserDataContext';
import { Exercise, EXERCISE_TYPE_MAP } from 'src/WorkoutTypes';
import ExerciseEditor from 'src/components/ExerciseEditor/ExerciseEditor';


type ExerciseTab = {
    exercise: Exercise;
    key: string;
    title: string;
}

const ExerciseList: FC<ExerciseListScreenProps> = ({ route, navigation }) => {
    const layout = useWindowDimensions();
    const { workoutId } = route.params;
    const data = useUserData();
    const dispatch = useUserDataDispatch();


    const [isDirtyForm, setDirtyForm] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!data.draft && workoutId == "new") {
            dispatch({ type: UserDataChange.CREATE_WORKOUT_DRAFT });
        }
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            console.log('before remove!', data.draft);
            if (!isDirtyForm) {
                return;
            }
            e.preventDefault();
            showDiscardConfirmation(() => navigation.dispatch(e.data.action));
        });
        return unsubscribe;
    }, [navigation, data]);


    // Wait for the draft to be created.
    if (!workoutId && !data.draft) {
        return (
            <YStack fullscreen={true}>
                <Spinner size="large" color="$green10" />
            </YStack>
        )
    }

    const routes = (data.draft?.exercises || []).map(
        (exercise, index) => ({
            title: getExerciseTabTitle(exercise, index, data.draft?.exercises?.length || 0),
            key: exercise.id,
            exercise
        }));
    console.log("routes", routes);
    const renderScene = ({ route }: { route: ExerciseTab }) =>
        <View style={{ flex: 1 }}>
            <ExerciseEditor exercise={route.exercise} onSave={(exercise: Exercise) => {
                dispatch({type: UserDataChange.UPDATE_EXERCISE_DRAFT, exercise});
                setDirtyForm(true);
            }}/>
        </View>
    let endButtonHTML;
    if (isDirtyForm) {
        endButtonHTML =
            <Button flex={1}
                onPress={() => navigation.navigate('Workout', { workoutId: workoutId || '', isWorkoutEnd: true })}>
                End
            </Button>
    } else {
        endButtonHTML =
            <Button flex={1} onPress={() => navigation.navigate("Home")}>
                Exit
            </Button>
    }
    return (
        <>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
            <XStack alignSelf="flex-end">
                {endButtonHTML}
                <Button flex={3}
                    onPress={() => {
                        dispatch({ type: UserDataChange.CREATE_EXERCISE_DRAFT });
                        setDirtyForm(true);
                    }}>
                    New exercise
                </Button>
            </XStack>
        </>
    );
};

function getExerciseTabTitle(exercise: Exercise, index: number, totalNum: number): string {
    const shortTitle = `E${index}`
    const exerciseDisplay = EXERCISE_TYPE_MAP.get(exercise.type)?.displayText || shortTitle;
    return totalNum > 5 ? shortTitle : exerciseDisplay;
}

function showDiscardConfirmation(confirmCallback: () => void): void {
    Alert.alert(
        "Discard workout?",
        "You have unsaved changes. Are you sure you want to discard your workout?",
        [
            { text: 'Cancel', style: 'cancel', onPress: () => { } },
            { text: 'Discard & exit', onPress: () => confirmCallback() },
        ]
    );
}

export default ExerciseList;