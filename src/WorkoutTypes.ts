
/** File that has the sensor data. */
export type SensorData = {
    file: string
}

/** One set of an exercises repetition. */
export type RepSet = {
    data: SensorData
    predictedReps: number
    actualReps: number
    startTimeMs: number
    endTimeMs: number
}

/** Types of exercises. */
export enum ExerciseType {
    BICEP_CURL, 
    TRICEP_EXSTENSION,
}

/** Multiple sets of a certain type make an exercise. */
export type Exercise = {
    type: ExerciseType;
    sets: RepSet[]
}

/** One workout is a named set of exercises. */
export type Workout = {
    name: string
    exercises: Exercise[]
}

/** All of a users workout data. */
export type WorkoutData = {
    workouts: Workout[]
}

