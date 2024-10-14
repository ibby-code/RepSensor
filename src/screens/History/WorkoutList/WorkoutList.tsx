import React, { FC, useEffect, useState } from 'react';

import { FlatList } from 'react-native';
import { Button, ListItem } from 'tamagui'
import { Workout, getWorkoutRange, getWorkoutEndTime } from 'src/WorkoutTypes';
import { useUserData } from 'src/UserDataContext';

import { WorkoutListScreenProps } from '../History';

const WorkoutList: FC<WorkoutListScreenProps> = ({navigation}) => {
    const data = useUserData();
    const sortedWorkouts = Object.values(data.workouts).sort((a: Workout, b: Workout) =>
        getWorkoutRange(a).end.isAfter(getWorkoutRange(b).end) ? 1 : -1
    );
    return (
        <FlatList data={sortedWorkouts}
                renderItem={({ item }) => {
                    return (
                        <ListItem hoverTheme bordered
                            key={item.id}
                            onPress={() => navigation.navigate('Workout',  {workoutId: item.id})}
                            title={item.name}
                            subTitle={getWorkoutEndTime(item)} />
                    )
                }} />
    );
}

export default WorkoutList;