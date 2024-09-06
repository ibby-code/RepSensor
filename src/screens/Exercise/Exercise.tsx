import React, { FC } from 'react';

import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { StyleSheet, View, Pressable, Text, FlatList } from 'react-native';
import { Adapt, Label, Sheet, Button, Select, ListItem, Separator, YStack, XStack } from 'tamagui'

import { ExerciseType, getWorkoutEndTime, EXERCISE_TYPE_MAP } from 'src/WorkoutTypes';
import { LinearGradient } from 'tamagui/linear-gradient'

import { ExerciseScreenProps } from 'src/RouteConfig';
import IncrementNumberInput from 'src/components/IncrementNumberInput/IncrementNumberInput';
import { FAKE_DATA } from 'src/FakeData';

const Exercise: FC<ExerciseScreenProps> = ({ navigation }) => {
    const [exerciseType, setExerciseType] = React.useState<ExerciseType | null>(null)
    return (
        <YStack>
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
                <Button>Start</Button>
                <YStack>
                    <IncrementNumberInput
                        label="Weight"
                        delta={5} />
                    <IncrementNumberInput
                        label="Repititions"
                        delta={1}
                        allowFloats={false} />
                </YStack>
            </XStack>
        </YStack>

    );

}

export default Exercise;