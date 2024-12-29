import { gql } from '@apollo/client'

export const createTeacherMutation = gql`
    mutation CreateTeacher($name: String!) {
        createTeacher(name: $name) {
            id
            name
        }
    }
`

export const updateTeacherMutation = gql`
    mutation UpdateTeacher($updateTeacherId: Int!, $name: String!) {
        updateTeacher(id: $updateTeacherId, name: $name) {
            id
            name
        }
    }
`

export const deleteTeacherMutation = gql`
    mutation DeleteTeacher($deleteTeacherId: Int!) {
        deleteTeacher(id: $deleteTeacherId) {
            id
            name
        }
    }
`