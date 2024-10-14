import { BottomTabScreenProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigatorScreenParams } from '@react-navigation/native';

import type { HistoryStackParamList } from './screens/History/History';

type RootStackParamList = {
  Home: undefined;
  ExerciseList: { workoutId?: string };
  History: NavigatorScreenParams<HistoryStackParamList>;
}

/** Root navigation stack for the app. */
export const RootNavigatorStack = createBottomTabNavigator<RootStackParamList>();

/** Properties for the Home screen */
export type HomeScreenProps = BottomTabScreenProps<RootStackParamList, 'Home'>;

/** Properties for the ExerciseList screen */
export type ExerciseListScreenProps = BottomTabScreenProps<RootStackParamList, 'ExerciseList'>;

/** Properties for the Histoy screen */
export type HistoryScreenProps = BottomTabScreenProps<RootStackParamList, 'History'>;
