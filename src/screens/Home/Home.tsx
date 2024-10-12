import React, { FC } from 'react';
import {StyleSheet, View, Pressable, Text, FlatList} from 'react-native';
import { Button, ListItem, Separator, YStack, YGroup } from 'tamagui'

import { Workout, getWorkoutRange, getWorkoutEndTime } from 'src/WorkoutTypes';

import { HomeScreenProps } from 'src/RouteConfig';
import { useUserData } from 'src/UserDataContext';

const Home: FC<HomeScreenProps> = ({navigation}) => {
    const data = useUserData();
    const sortedWorkouts = Object.values(data.workouts).sort((a: Workout, b: Workout) => 
        getWorkoutRange(a).end.isAfter(getWorkoutRange(b).end) ? 1 : -1
    );
    return (
        <YStack>
            <YStack>
                <Button onPress={() => navigation.navigate('Exercise', {})}>Start exercising now!</Button>
                <Button onPress={() => navigation.navigate('ExerciseList', {workoutId: 'new'})}>Choose an exercise</Button>
            </YStack>
            <FlatList data={sortedWorkouts}
                renderItem={({item}) => {
                return (
                        <ListItem hoverTheme bordered
                            key={item.id}
                            onPress={() => navigation.navigate('Workout', {workoutId: item.id})}
                            title={item.name}
                            subTitle={getWorkoutEndTime(item)}/>
                )
                }}/>
        </YStack>
    );
}

export default Home;