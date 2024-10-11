import { createContext, useReducer, useContext, Dispatch, useEffect } from 'react';
import { Exercise, Workout, WorkoutMap } from './WorkoutTypes';
import { FAKE_DATA } from './FakeData';

interface UserData {
  draft?: Partial<Workout>;
  workouts: WorkoutMap;
}

export enum UserDataChange {
  LOAD_WORKOUTS,
  CREATE_WORKOUT_DRAFT,
  UPSERT_EXERCISE_DRAFT,
  UPDATE_WORKOUT_DRAFT,
  SAVE_WORKOUT,
}

export type UserDataAction =
  | { type: UserDataChange.LOAD_WORKOUTS, workouts: Workout[] }
  | { type: UserDataChange.CREATE_WORKOUT_DRAFT }
  | { type: UserDataChange.UPSERT_EXERCISE_DRAFT, workoutId: string, exercise: Exercise }
  | { type: UserDataChange.SAVE_WORKOUT, name: string}

export const UserDataContext = createContext<UserData>({ workouts: [] });
export const UserDataDispatchContext = createContext<Dispatch<UserDataAction> | null>(null);

export function UserDataProvider({ children }: { children: React.ReactNode }) {
  const [workoutData, dispatch] = useReducer(userDataReducer, { workouts: [] });
  useEffect(() => {
    dispatch({ type: UserDataChange.LOAD_WORKOUTS, workouts: {...FAKE_DATA.workouts} });
  }, []);

  return (
    <UserDataContext.Provider value={workoutData} >
      <UserDataDispatchContext.Provider value={dispatch}>
        {children}
      </UserDataDispatchContext.Provider>
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserDataContext);
}

export function useUserDataDispatch() {
  return useContext(UserDataDispatchContext);
}

function userDataReducer(state: UserData, action: UserDataAction) {
  switch (action.type) {
    case UserDataChange.LOAD_WORKOUTS:
      return { ...state, workouts: action.workouts };
    case UserDataChange.CREATE_WORKOUT_DRAFT:
      return { ...state, draft: { id: state.workouts.length, name: '', exercises: [] } };
    case UserDataChange.UPSERT_EXERCISE_DRAFT:
      const workout = state.workouts[action.workoutId];
      if (!workout) return state;
      // update the exercise
      const exerciseIndex = workout.exercises.findIndex((e) => e.id == action.exercise.id);
      if (exerciseIndex) {
        workout.exercises[exerciseIndex] = action.exercise;
      } else {
        workout.exercises.push(action.exercise)
      }
      return {...state, workouts : {...state.workouts, [action.workoutId]: workout}};
    case UserDataChange.SAVE_WORKOUT:
      if (!state.draft || !state.draft.id) return state;
      state.draft.name = action.name;
      return {...state, workouts : {...state.workouts, [state.draft.id]: state.draft}, draft: undefined};
    default: {
      return state;
    }
  }
}