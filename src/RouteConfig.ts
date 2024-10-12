import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackParamList = {
  Exercise: {workoutId?: string, exerciseId?: string};
  Home: undefined;
  Workout: { workoutId: string; isWorkoutEnd?: boolean };
  ExerciseList: {workoutId?: string};
}

/** Root navigation stack for the app. */
export const RootNavigatorStack = createNativeStackNavigator<RootStackParamList>();

/** Properties for the Home screen */
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;


/** Properties for the Workout screen */
export type WorkoutScreenProps = NativeStackScreenProps<RootStackParamList, 'Workout'>;

/** Properties for the Exercise screen */
export type ExerciseScreenProps = NativeStackScreenProps<RootStackParamList, 'Exercise'>;

/** Properties for the ExerciseList screen */
export type ExerciseListScreenProps = NativeStackScreenProps<RootStackParamList, 'ExerciseList'>;

