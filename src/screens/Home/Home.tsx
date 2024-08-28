import React, { FC } from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';

import { FAKE_DATA } from 'src/FakeData';

const Home: FC<{}> = () => {
    return (
        <View>
            {FAKE_DATA.workouts.map((w) => {
                return (
                    <Text>{w.name}</Text>
                )
            })}
        </View>
    );
}

export default Home;