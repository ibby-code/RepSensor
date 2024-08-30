import { ExerciseType, Workout, WorkoutData } from './WorkoutTypes';

const FAKE_MONDAY: Workout = {
    id: 'w1',
    name: 'Monday blues',
    exercises: [
        {
            id: '1',
            type: ExerciseType.BICEP_CURL,
            sets: [
                {
                    data: { "file": "RisusSemperPorta.avi" },
                    weight: 20,
                    predictedReps: 3,
                    actualReps: 2,
                    startTimeMs: 1699317169,
                    endTimeMs: 1699317188,
                },
                {
                    data: { "file": "QuisqueUt.mp3" },
                    weight: 20,
                    predictedReps: 8,
                    actualReps: 1,
                    startTimeMs: 1721734719,
                    endTimeMs: 1721734738,
                },
                {
                    data: { "file": "VulputateNonummyMaecenas.xls" },
                    weight: 20,
                    predictedReps: 15,
                    actualReps: 1,
                    startTimeMs: 1723618362,
                    endTimeMs: 1723618373,
                }
            ]
        },
        {
            id: '2',
            type: ExerciseType.TRICEP_EXTENSION,
            sets: [
                {
                    data: { "file": "EuMassaDonec.jpeg" },
                    weight: 20,
                    predictedReps: 6,
                    actualReps: 18,
                    startTimeMs: 1696733497,
                    endTimeMs: 1696733519,

                },
                {
                    data: { "file": "MagnisDis.jpeg" },
                    weight: 20,
                    predictedReps: 15,
                    actualReps: 11,
                    startTimeMs: 1705035916,
                    endTimeMs: 1705035941,
                }
            ]
        }
    ],
}

const FAKE_WEDNESDAY: Workout = {
    id: 'w2',
    name: 'Wednesday humpday',
    exercises: [
        {
            id: '3',
            type: ExerciseType.TRICEP_EXTENSION,
            sets: [
                {
                    data: { "file": "Sapien.ppt" },
                    predictedReps: 2,
                    weight: 25,
                    actualReps: 1,
                    startTimeMs: 1714321893,
                    endTimeMs: 1714321921,

                },
                {
                    data: { "file": "CondimentumNeque.mp3" },
                    predictedReps: 11,
                    actualReps: 1,
                    startTimeMs: 1720544681,
                    weight: 20,
                    endTimeMs: 1720544690,

                }
            ]
        },
        {
            id: '4',
            type: ExerciseType.BICEP_CURL,
            sets: [
                {
                    data: { "file": "Vivamus.ppt" },
                    predictedReps: 1,
                    actualReps: 12,
                    startTimeMs: 1697733884,
                    endTimeMs: 1697733919,
                    weight: 30,

                },
                {
                    data: { "file": "In.mp3" },
                    predictedReps: 17,
                    actualReps: 11,
                    weight: 30,
                    startTimeMs: 1705885989,
                    endTimeMs: 1705886008,

                },
                {
                    data: { "file": "Amet.png" },
                    predictedReps: 16,
                    actualReps: 2,
                    startTimeMs: 1704266781,
                    weight: 30,
                    endTimeMs: 1704266807,
                }

            ]
        },
        {
            id: "5",
            type: ExerciseType.BICEP_CURL,
            sets: [
                {
                    data: { "file": "PosuereCubilia.jpeg" },
                    predictedReps: 12,
                    actualReps: 9,
                    startTimeMs: 1693650724,
                    weight: 20,
                    endTimeMs: 1693650760,

                },
                {
                    data: { "file": "MaecenasUt.ppt" },
                    predictedReps: 5,
                    actualReps: 1,
                    startTimeMs: 1724688206,
                    weight: 30,
                    endTimeMs: 1724688222,

                }
            ]
        }
    ]
}

const FAKE_FRIDAY: Workout = {
    id: 'w3',
    name: 'Lazy friday',
    exercises: [
        {
            id: '6',
            type: ExerciseType.BICEP_CURL,
            sets: [
                {
                    data: { "file": "Nullam.avi" },
                    predictedReps: 12,
                    actualReps: 8,
                    startTimeMs: 1697266149,
                    weight: 35,
                    endTimeMs: 1697266185,

                },
                {
                    data: { "file": "IdSapien.xls" },
                    predictedReps: 9,
                    actualReps: 6,
                    startTimeMs: 1707047223,
                    endTimeMs: 1707047267,
                    weight: 35,

                },
                {
                    data: { "file": "SitAmet.tiff" },
                    predictedReps: 2,
                    actualReps: 8,
                    startTimeMs: 1707774442,
                    endTimeMs: 1707774465,
                    weight: 35,
                },
                {
                    data: { "file": "InFelisDonec.xls" },
                    predictedReps: 17,
                    weight: 20,
                    actualReps: 3,
                    startTimeMs: 1715408580,
                    endTimeMs: 1715408611,
                },
                {
                    data: { "file": "HendreritAtVulputate.avi" },
                    predictedReps: 19,
                    weight: 20,
                    actualReps: 2,
                    startTimeMs: 1706646691,
                    endTimeMs: 1706646735,
                },

            ]
        }
    ]
}

export const FAKE_DATA: WorkoutData = {
    workouts: [
        FAKE_MONDAY,
        FAKE_WEDNESDAY,
        FAKE_FRIDAY,
    ]
}
