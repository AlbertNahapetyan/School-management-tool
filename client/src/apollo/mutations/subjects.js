import { gql } from '@apollo/client'

export const createSubjectMutation = gql`
    mutation CreateSubject($name: String!, $teacherId: Int!) {
        createSubject(name: $name, teacherId: $teacherId) {
            id
            name
            teacher {
                id
                name
            }
        }
    }
`

export const updateSubjectMutation = gql`
    mutation UpdateSubject($updateSubjectId: Int!, $name: String, $teacherId: Int) {
        updateSubject(id: $updateSubjectId, name: $name, teacherId: $teacherId) {
            id
            name
            teacher {
                id
                name
            }
        }
    }
`

export const deleteSubjectMutation = gql`
    mutation DeleteSubject($deleteSubjectId: Int!) {
        deleteSubject(id: $deleteSubjectId) {
            id
            name
            teacher {
                id
                name
            }
        }
    }
`