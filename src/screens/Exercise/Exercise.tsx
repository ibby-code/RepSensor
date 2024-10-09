import moment from 'moment'
import React, { FC, useState } from 'react';

import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { StyleSheet, View, Pressable, Text, FlatList } from 'react-native';
import { Adapt, Label, Sheet, Button, Select, ListItem, Separator, YStack, XStack } from 'tamagui'

import { ExerciseType, getWorkoutEndTime, EXERCISE_TYPE_MAP } from 'src/WorkoutTypes';
import { LinearGradient } from 'tamagui/linear-gradient'

import { ExerciseScreenProps } from 'src/RouteConfig';
import IncrementNumberInput from 'src/components/IncrementNumberInput/IncrementNumberInput';
import { FAKE_DATA } from 'src/FakeData';
import { RepSet } from 'src/WorkoutTypes';

const EMPTY_SET: RepSet = { actualReps: 0, endTimeMs: 0, startTimeMs: 0, weight: 0 };

const Exercise: FC<ExerciseScreenProps> = ({ navigation }) => {
    const [exerciseType, setExerciseType] = useState<ExerciseType | null>(null)
    const [sets, setSets] = useState<RepSet[]>([{ ...EMPTY_SET }]);

    const updateRecentSet = (updater: (set: RepSet) => void) => {
        const set = sets.pop();
        if (!set) return;
        updater(set);
        setSets([...sets, set]);
    }
    let buttonHTML;
    if (!sets.length || !sets[sets.length - 1].startTimeMs) {
        const startTimeUpdater = (set: RepSet) => set.startTimeMs = moment().unix();
        buttonHTML = <Button onPress={() => updateRecentSet(startTimeUpdater)}>Start</Button>
    } else if (!sets[sets.length - 1].endTimeMs) {
        const endTimeUpdater = (set: RepSet) => set.endTimeMs = moment().unix();
        buttonHTML = <Button onPress={() => updateRecentSet(endTimeUpdater)}>End</Button>
    } else {
        const lastSet = sets.length ? sets[sets.length - 1] : EMPTY_SET;
        const newSet = {...EMPTY_SET, startTimeMs: moment().unix(), weight: lastSet.weight, actualReps: lastSet.actualReps};
        buttonHTML = <Button onPress={() => setSets([...sets, newSet])}>Next</Button>
    }

    return (
        <YStack fullscreen={true}>
            <Select value={exerciseType?.toString()} onValueChange={(val) => setExerciseType(val as ExerciseType)}>
                <Select.Trigger width={220} iconAfter={ChevronDown}>
                    <Select.Value placeholder="Select a movement" />
                </Select.Trigger>
                <Adapt when="sm" platform="touch">
                    <Sheet
                        modal
                        dismissOnSnapToBottom
                        animationConfig={{
                            type: 'spring',
                            damping: 20,
                            mass: 1.2,
                            stiffness: 250,
                        }}
                    >
                        <Sheet.Frame>
                            <Sheet.ScrollView>
                                <Adapt.Contents />
                            </Sheet.ScrollView>
                        </Sheet.Frame>
                        <Sheet.Overlay
                            animation="lazy"
                            enterStyle={{ opacity: 0 }}
                            exitStyle={{ opacity: 0 }}
                        />
                    </Sheet>
                </Adapt>

                <Select.Content zIndex={200000}>
                    <Select.ScrollUpButton
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        width="100%"
                        height="$3"
                    >
                        <YStack zIndex={10}>
                            <ChevronUp size={20} />
                        </YStack>
                        <LinearGradient
                            start={[0, 0]}
                            end={[0, 1]}
                            fullscreen
                            colors={['$background', 'transparent']}
                            borderRadius="$4"
                        />
                    </Select.ScrollUpButton>

                    <Select.Viewport
                        // to do animations:
                        // animation="quick"
                        // animateOnly={['transform', 'opacity']}
                        // enterStyle={{ o: 0, y: -10 }}
                        // exitStyle={{ o: 0, y: 10 }}
                        minWidth={200}
                    >
                        <Select.Group>
                            <Select.Label>Workout Types</Select.Label>
                            {/* for longer lists emoizing these is useful */}
                            {
                                [...EXERCISE_TYPE_MAP.entries()].map(([type, displayInfo], i) => {
                                    return (
                                        <Select.Item
                                            index={i}
                                            key={type}
                                            value={type}
                                        >
                                            <Select.ItemText>{displayInfo.displayText}</Select.ItemText>
                                            <Select.ItemIndicator marginLeft="auto">
                                                <Check size={16} />
                                            </Select.ItemIndicator>
                                        </Select.Item>
                                    )
                                })
                            }
                        </Select.Group>
                    </Select.Viewport>

                    <Select.ScrollDownButton
                        alignItems="center"
                        justifyContent="center"
                        position="relative"
                        width="100%"
                        height="$3"
                    >
                        <YStack zIndex={10}>
                            <ChevronDown size={20} />
                        </YStack>
                        <LinearGradient
                            start={[0, 0]}
                            end={[0, 1]}
                            fullscreen
                            colors={['transparent', '$background']}
                            borderRadius="$4"
                        />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select>
            <XStack>
                {buttonHTML}
                <YStack>
                    <IncrementNumberInput
                        label="Enter a weight"
                        value={sets[sets.length - 1].weight}
                        onChange={(weight) => updateRecentSet((set) => set.weight = weight)}
                        delta={5} />
                    <IncrementNumberInput
                        label="Enter # of reps"
                        value={sets[sets.length - 1].actualReps}
                        onChange={(reps) => updateRecentSet((set) => set.actualReps = reps)}
                        delta={1}
                        disableFloats={true} />
                </YStack>
            </XStack>
            <FlatList data={sets.filter((val) => Boolean(val.endTimeMs))}
                renderItem={({ item }) => (
                    <ListItem bordered
                        key={item.endTimeMs}
                        title={getRepTitle(item.actualReps, item.weight)}
                        subTitle={getRepTimeRange(item.startTimeMs, item.endTimeMs)} />
                )} />
            <XStack alignSelf="flex-end">
                <Button flex={1}
                        onPress={() => navigation.navigate('Workout', {workoutId: '', isWorkoutEnd: true})}>
                    End
                </Button>
                <Button flex={3}
                        onPress={() => navigation.navigate('Exercise')}>
                    Next exercise
                </Button>
            </XStack> 
        </YStack>
    );
}

function getRepTitle(reps: number, weight: number): string {
    return `${reps} reps @ ${weight}lbs`;
}

function getRepTimeRange(startTimeMs: number, endTimeMs: number): string {
    return `${moment.unix(startTimeMs).format("LT")} - ${moment.unix(endTimeMs).format("LT")}`;
}

export default Exercise;