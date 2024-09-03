import React, { FC } from 'react';
import {StyleSheet, View, Pressable, Text, FlatList} from 'react-native';
import { Button, ListItem, Separator, YStack, YGroup } from 'tamagui'

import { getWorkoutEndTime } from 'src/WorkoutTypes';

import { HomeScreenProps } from 'src/RouteConfig';
import { FAKE_DATA } from 'src/FakeData';

const Home: FC<HomeScreenProps> = ({navigation}) => {
    return (
        <YStack>
            <YStack>
                <Button onPress={() => navigation.navigate('Exercise')}>Start exercising now!</Button>
                <Button>Choose an exercise</Button>
            </YStack>
            <FlatList data={FAKE_DATA.workouts}
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