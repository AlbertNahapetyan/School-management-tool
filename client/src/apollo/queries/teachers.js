import { gql } from "@apollo/client";

export const getTeachersQuery = gql`
    query Teachers($skip: Int, $take: Int) {
        teachers(skip: $skip, take: $take) {
            teachers {
                id
                name
                subjects {
                    id
                    name
                }
            }
            totalCount
        }
    }
`

export const getTeacherQuery = gql`
    query Teacher($teacherId: Int!) {
        teacher(id: $teacherId) {
            id
            name
        }
    }
`