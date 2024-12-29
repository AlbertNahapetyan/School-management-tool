import { gql } from "@apollo/client";

export const getPupilsQuery = gql`
    query Pupils($skip: Int, $take: Int) {
        pupils(skip: $skip, take: $take) {
            pupils {
                grade
                id
                name
                subject {
                    id
                    name
                    teacher {
                        id
                        name
                    }
                }
            }
            totalCount
        }
    }
`

export const getPupilQuery = gql`
    query Pupil($pupilId: Int!) {
        pupil(id: $pupilId) {
            grade
            id
            name
            subject {
                id
                name
                teacher {
                    id
                    name
                }
            }
        }
    }
`