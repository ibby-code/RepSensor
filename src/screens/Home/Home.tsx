import React, { FC } from 'react';
import {StyleSheet, View, Pressable, Text, FlatList} from 'react-native';
import { ListItem, Separator, XStack, YGroup } from 'tamagui'

import { getWorkoutEndTime } from 'src/WorkoutTypes';

import { FAKE_DATA } from 'src/FakeData';

const Home: FC<{}> = () => {
    return (
            <FlatList data={FAKE_DATA.workouts}
                renderItem={({item}) => {
                return (
                        <ListItem hoverTheme bordered
                            key={item.id}
                            title={item.name}
                            subTitle={getWorkoutEndTime(item)}/>
                )
                }}/>
    );
}

export default Home;