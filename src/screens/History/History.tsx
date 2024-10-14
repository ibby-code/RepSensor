
import React, { FC, useEffect, useState } from 'react';
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import Workout from 'src/screens/History/Workout/Workout';
import { HistoryScreenProps } from 'src/RouteConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import WorkoutList from './WorkoutList/WorkoutList';

export type HistoryStackParamList = {
  Workout: { workoutId: string; isWorkoutEnd?: boolean };
  WorkoutList: undefined;
}

const HistoryNavigatorStack = createNativeStackNavigator<HistoryStackParamList>();

/** Properties for the Workout screen */
export type WorkoutScreenProps = NativeStackScreenProps<HistoryStackParamList, 'Workout'>;

/** Properties for the WorkoutList screen */
export type WorkoutListScreenProps = NativeStackScreenProps<HistoryStackParamList, 'Workout'>;


const History: FC<HistoryScreenProps> = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HistoryNavigatorStack.Navigator initialRouteName="WorkoutList"
                    screenOptions={{headerShown: false}}>
                <HistoryNavigatorStack.Screen
                    name="Workout"
                    component={Workout}
                    initialParams={{ workoutId: '', isWorkoutEnd: false }}
                />
                <HistoryNavigatorStack.Screen
                    name="WorkoutList"
                    component={WorkoutList}
                />
            </HistoryNavigatorStack.Navigator>
        </SafeAreaView>
    )
}

export default History;