import moment from 'moment'
import React, { FC, useState } from 'react';

import { FlatList } from 'react-native';
import { Check, ChevronDown, ChevronUp, PlayCircle, PauseCircle } from '@tamagui/lucide-icons'
import { Adapt, Button, Label, ListItem, Select, Sheet, XStack, YStack, styled } from 'tamagui';
import { LinearGradient } from 'tamagui/linear-gradient'
import { EXERCISE_TYPE_MAP, Exercise, ExerciseType, RepSet } from 'src/WorkoutTypes';

import IncrementNumberInput from 'src/components/IncrementNumberInput/IncrementNumberInput';

interface ExerciseEditorProps {
    exercise: Exercise;
    onSave: (e: Exercise) => void;
}

const EMPTY_SET: RepSet = { actualReps: 0, endTimeMs: 0, startTimeMs: 0, weight: 0 };
const INPUT_LABEL_WIDTH_PX = 56;

const CenterButton = styled(Button, {alignSelf: "center", marginVertical: "$6"})

const ExerciseEditor: FC<ExerciseEditorProps> = ({ exercise, onSave }) => {
    const [exerciseType, setExerciseType] = useState<ExerciseType>(exercise.type);
    const [sets, setSets] = useState<RepSet[]>(
        exercise.sets.length ? exercise.sets : [{ ...EMPTY_SET }]);


    const saveExercise = (newSets: RepSet[]) => {
        const newExercise = {id: exercise.id, type: exerciseType, sets: newSets};
        onSave(newExercise);
    }
    const updateRecentSet = (updater: (set: RepSet) => void, saveUpdate = false) => {
        const set = sets.pop();
        if (!set) return;
        updater(set);
        const newSets = [...sets, set];
        setSets(newSets);
        if (saveUpdate) {
            saveExercise(newSets);
       }
    }
    let buttonHTML;
    if (!sets.length || !sets[sets.length - 1].startTimeMs) {
        const startTimeUpdater = (set: RepSet) => set.startTimeMs = moment().unix();
        buttonHTML = <CenterButton icon={PlayCircle} onPress={() => updateRecentSet(startTimeUpdater)}>Start</CenterButton>
    } else if (!sets[sets.length - 1].endTimeMs) {
        const endTimeUpdater = (set: RepSet) => set.endTimeMs = moment().unix();
        buttonHTML = <CenterButton icon={PauseCircle} onPress={() => updateRecentSet(endTimeUpdater, true)}>End</CenterButton>
    } else {
        const lastSet = sets.length ? sets[sets.length - 1] : EMPTY_SET;
        const saveAndCreateNew = () => {
            saveExercise(sets);
            const newSet = { ...EMPTY_SET, startTimeMs: moment().unix(), weight: lastSet.weight, actualReps: lastSet.actualReps };
            setSets([...sets, newSet]);
        }
        buttonHTML = <CenterButton icon={PlayCircle} onPress={() => saveAndCreateNew()}>Next</CenterButton>
    }
 
    return ( 
        <>
            <Select value={exerciseType != ExerciseType.UNSET ? exerciseType.toString() : undefined} onValueChange={(val) => setExerciseType(val as ExerciseType)}>
                <Select.Trigger alignSelf="center" marginVertical="$3" width={220} iconAfter={ChevronDown}>
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
            {buttonHTML}
            <YStack theme="alt1" alignItems="center" marginBottom="$3">
                <XStack marginBottom="$2">
                    <Label htmlFor="weight" width={INPUT_LABEL_WIDTH_PX}>Weight</Label>
                    <IncrementNumberInput
                        id="weight"
                        label="Enter a weight"
                        value={sets[sets.length - 1].weight}
                        onChange={(weight: number) => updateRecentSet((set) => set.weight = weight)}
                        delta={5} />
                </XStack>
                <XStack>
                    <Label htmlFor="reps" width={INPUT_LABEL_WIDTH_PX}>Reps</Label>
                    <IncrementNumberInput
                        id="reps"
                        label="Enter # of reps"
                        value={sets[sets.length - 1].actualReps}
                        onChange={(reps: number) => updateRecentSet((set) => set.actualReps = reps)}
                        delta={1}
                        disableFloats={true} />
                </XStack>
            </YStack>
            <FlatList data={sets.filter((val) => Boolean(val.endTimeMs))}
                renderItem={({ item }) => (
                    <ListItem bordered
                        key={item.endTimeMs}
                        title={getRepTitle(item.actualReps, item.weight)}
                        subTitle={getRepTimeRange(item.startTimeMs, item.endTimeMs)} />
                )} />
        </>

    );
}

function getRepTitle(reps: number, weight: number): string {
    return `${reps} reps @ ${weight}lbs`;
}

function getRepTimeRange(startTimeMs: number, endTimeMs: number): string {
    return `${moment.unix(startTimeMs).format("LT")} - ${moment.unix(endTimeMs).format("LT")}`;
}



export default ExerciseEditor;