import React, { FC, useEffect, useState } from 'react';

import { Button, Group, XGroup, Separator, Spinner, Text, XStack, YStack, useTheme } from 'tamagui'
import { ExerciseListScreenProps } from 'src/RouteConfig';
import { Alert, View, useWindowDimensions } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { StopCircle, ArrowRightCircle} from '@tamagui/lucide-icons';
import { useUserData, useUserDataDispatch, UserDataChange, UserDataAction } from 'src/UserDataContext';
import { Exercise, EXERCISE_TYPE_MAP } from 'src/WorkoutTypes';
import ExerciseEditor from 'src/components/ExerciseEditor/ExerciseEditor';
import { SafeAreaView } from 'react-native-safe-area-context';

const NEW_EXERCISE_ID = "new";

type ExerciseTab = {
    exercise: Exercise;
    key: string;
    title: string;
}

const ExerciseList: FC<ExerciseListScreenProps> = ({ route, navigation }) => {
    const layout = useWindowDimensions();
    const theme = useTheme();
    const { workoutId } = route.params;
    const data = useUserData();
    const dispatch = useUserDataDispatch();


    const [isDirtyForm, setDirtyForm] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!data.draft && workoutId == NEW_EXERCISE_ID) {
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
    if (workoutId == NEW_EXERCISE_ID && !data.draft) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Spinner size="large" color="$green10" />
            </SafeAreaView>
        )
    }

    const routes = (data.draft?.exercises || []).map(
        (exercise, index) => ({
            title: getExerciseTabTitle(exercise, index, data.draft?.exercises?.length || 0),
            key: exercise.id,
            exercise
        }));
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
            <Group.Item>
                <Button
                    icon={StopCircle}
                    onPress={() => navigation.navigate('History', { screen: 'Workout', params: {workoutId: workoutId || '', isWorkoutEnd: true }})}>
                    Save and end
                </Button>
            </Group.Item>
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TabView
                navigationState={{ index, routes }}
                renderTabBar={(props) => (
                    <TabBar 
                        {...props}
                        style={{backgroundColor: theme.blue3Dark.val}}
                        scrollEnabled={true}
                        indicatorStyle={{backgroundColor: theme.orange10Light.val}}
                    />
                )}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
            <XStack justifyContent="center">
                <XGroup marginVertical="$5">
                    {endButtonHTML}
                    <Group.Item>
                        <Button
                            icon={ArrowRightCircle}
                            onPress={() => {
                                dispatch({ type: UserDataChange.CREATE_EXERCISE_DRAFT });
                                setDirtyForm(true);
                            }}>
                            Next exercise
                        </Button>
                    </Group.Item>
                </XGroup>
            </XStack>
        </SafeAreaView>
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