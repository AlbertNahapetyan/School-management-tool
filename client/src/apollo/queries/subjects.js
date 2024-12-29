import { gql } from "@apollo/client";

export const getSubjectsQuery = gql`
    query Subjects($skip: Int, $take: Int) {
        subjects(skip: $skip, take: $take) {
            subjects {
                id
                name
                teacher {
                    id
                    name
                }
            }
            totalCount
        }
    }
`

export const getSubjectQuery = gql`
    query Subject($subjectId: Int!) {
        subject(id: $subjectId) {
            id
            name
            teacher {
                id
                name
            }
        }
    }
`