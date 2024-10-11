import { assert } from 'console'
import moment from 'moment'

/** File that has the sensor data. */
export type SensorData = {
    file: string
}

/** One set of an exercises repetition. */
export type RepSet = {
    actualReps: number
    data?: SensorData
    endTimeMs: number
    predictedReps?: number
    startTimeMs: number
    weight: number
}

/** Types of exercises. */
export enum ExerciseType {
    UNSET = 'unset',
    BICEP_CURL = 'bicep_curl',
    TRICEP_EXTENSION = 'tricep_extenstion',
}

type ExerciseTypeData = {
    displayText: string
    icon: string
}

/** Map with display values for each exercise type. */
export const EXERCISE_TYPE_MAP: Map<ExerciseType, ExerciseTypeData> = new Map([
    [ExerciseType.BICEP_CURL, { displayText: 'Bicep Curl', icon: '' }],
    [ExerciseType.TRICEP_EXTENSION, { displayText: 'Tricep Extension', icon: '' }],
]);


/** Multiple sets of a certain type make an exercise. */
export type Exercise = {
    id: string
    type: ExerciseType
    sets: RepSet[]
}

/** One workout is a named set of exercises. */
export type Workout = {
    id: string
    name: string
    exercises: Exercise[]
}

/** Maps a workout to its id. */
export type WorkoutMap = {
    [key: string]: Workout;
}

/** All of a users workout data. */
export type WorkoutData = {
    workouts: WorkoutMap 
}

type TimeRange = {
    start: moment.Moment
    end: moment.Moment
}

/** Returns the most recent workout time. */
export function getWorkoutEndTime(workout: Workout) {
    return getWorkoutRange(workout).end.format('L');
}

/** Returns the min and max workout time. */
export function getWorkoutRange(workout:Workout): TimeRange {
    const [start, end] = workout.exercises.reduce(([start, end], exercise) => {
        const range = getExerciseRange(exercise);
        return [Math.min(start, range.start.unix()), Math.max(end, range.end.unix())]
    }, [0, 0])
    return { start: moment.unix(start), end: moment.unix(end)};
}

/** Returns the min and max exercise time. */
export function getExerciseRange(exercise: Exercise): TimeRange {
    const [start, end] = exercise.sets.reduce(
        ([start, end], { startTimeMs, endTimeMs }) => {
            return [Math.min(start, startTimeMs), Math.max(end, endTimeMs)];

        }, [moment().unix(), 0]);
    return { start: moment.unix(start), end: moment.unix(end)};
}

/** Returns the display data for an exercise. */
export function getExerciseDisplay(exercise: Exercise): { title: string, subtitle: string } {
    const exerciseDisplay = EXERCISE_TYPE_MAP.get(exercise.type)?.displayText || 'Exercise';
    if (exercise.sets.length) {
        const avgWeight = exercise.sets.reduce((sum, s) => sum + s.weight, 0) / exercise.sets.length;
        const avgReps = exercise.sets.reduce((sum, s) => sum + s.actualReps, 0) / exercise.sets.length;
        const title = `${exerciseDisplay} - ${exercise.sets.length} sets @ ${
            roundMeasure(avgReps)}${avgReps > 1 ? ' reps' : ' rep'} / ${
                roundMeasure(avgWeight)}${avgWeight > 1 ? 'lbs' : 'lb'}`;

        const {start, end} = getExerciseRange(exercise);
        const subtitle = `From ${start.format('LT')} to ${end.format('LT')}`;
        return {title, subtitle}
    }
    return {title: `${exerciseDisplay} - N/A`, subtitle: 'Not started'};
    // Bicep curls - 5 sets, avg 15.5lb
    // From {start} - {end} with {avg_rest} of rest
}

/** Turns a partial workout into a full object */
export function validateFullWorkout(workout: Partial<Workout>): Workout|undefined {
    checkExistance(Boolean(workout.id), "Id not present");
    checkExistance(Boolean(workout.name), "Name not present");
    checkExistance(Boolean(workout.exercises), "Exercises not present");
    return workout as Workout;
}

function roundMeasure(num: number): string {
    return num == Math.round(num) ? num.toString() : num.toFixed(2);
}

function checkExistance(check: boolean, msg = "") {
    if (!check) {
        throw new Error(msg)
    }
}