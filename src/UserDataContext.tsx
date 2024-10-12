import { createContext, useReducer, useContext, Dispatch, useEffect } from 'react';
import { Exercise, ExerciseType, Workout, WorkoutMap, validateFullWorkout} from './WorkoutTypes';
import { FAKE_DATA } from './FakeData';

interface UserData {
  draft?: Partial<Workout>;
  workouts: WorkoutMap;
}

export enum UserDataChange {
  LOAD_WORKOUTS = "LOAD_WORKOUTS",
  CREATE_WORKOUT_DRAFT = "CREATE_WORKOUT_DRAFT",
  CREATE_EXERCISE_DRAFT = "CREATE_EXERCISE_DRAFT",
  UPDATE_EXERCISE_DRAFT = "UPDATE_EXERCISE_DRAFT",
  SAVE_WORKOUT_DRAFT = "SAVE_WORKOUT_DRAFT",
  UPDATE_WORKOUT_NAME = "UPDATE_WORKOUT_NAME",
}

export type UserDataAction =
  | { type: UserDataChange.LOAD_WORKOUTS, workouts: Workout[] }
  | { type: UserDataChange.CREATE_WORKOUT_DRAFT }
  | { type: UserDataChange.CREATE_EXERCISE_DRAFT}
  | { type: UserDataChange.UPDATE_EXERCISE_DRAFT, exercise: Exercise }
  | { type: UserDataChange.SAVE_WORKOUT_DRAFT}
  | { type: UserDataChange.UPDATE_WORKOUT_NAME, workoutId: string, name: string}

export const UserDataContext = createContext<UserData>({ workouts: {} });
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

export function useUserData(): UserData {
  return useContext(UserDataContext);
}

export function useUserDataDispatch(): Dispatch<UserDataAction> {
  const context = useContext(UserDataDispatchContext);
  if (!context) {
    throw new Error("Missing UserDataContext dispatcher!!");
  }
  return context;
}

function userDataReducer(state: UserData, action: UserDataAction) {
  console.log('action', JSON.stringify(action));
  let work;
  switch (action.type) {
    case UserDataChange.LOAD_WORKOUTS:
      return { ...state, workouts: action.workouts };
    case UserDataChange.CREATE_WORKOUT_DRAFT:
      console.log('draft', String(Object.keys(state.workouts).length));
      return { ...state, draft: { id: String(Object.keys(state.workouts).length), name: '', exercises: [{id: '0', type: ExerciseType.UNSET, sets: []}] } };
    case UserDataChange.CREATE_EXERCISE_DRAFT:
      work = state.draft;
      if (!work) return state;
      work.exercises = work.exercises || [];
      work.exercises.push({id: String(work.exercises.length), type: ExerciseType.UNSET, sets: []});
      return {...state, draft: work};
    case UserDataChange.UPDATE_EXERCISE_DRAFT:
      work = state.draft;
      const exerciseIndex = work?.exercises?.findIndex((e) => e.id == action.exercise.id);
      if (!work || !work.exercises || exerciseIndex == undefined || exerciseIndex == -1) return state;
      work.exercises[exerciseIndex] = action.exercise;
      return {...state, draft: work};
    case UserDataChange.SAVE_WORKOUT_DRAFT:
      if (!state.draft || !state.draft.id) return state;
      state.draft.name = generateWorkoutName(state.draft);
      console.log('draft', JSON.stringify(state.draft));
      return {...state, workouts : {...state.workouts, [state.draft.id]: validateFullWorkout(state.draft)}, draft: undefined};
    case UserDataChange.UPDATE_WORKOUT_NAME:
      work = state.workouts[action.workoutId];
      if (!work) return state;
      work.name = action.name
      return {...state, workouts : {...state.workouts, [action.workoutId]: work}};
    default: {
      return state;
    }
  }
}

function generateWorkoutName(workout: Partial<Workout>) {
    return `Workout id:${workout?.id}`;
}

