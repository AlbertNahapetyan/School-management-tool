import { gql } from '@apollo/client'

export const createPupilMutation = gql`
    mutation CreatePupil($name: String!, $grade: String!, $subjectId: Int!) {
        createPupil(name: $name, grade: $grade, subjectId: $subjectId) {
            id
            name
            grade
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

export const updatePupilMutation = gql`
    mutation UpdatePupil($updatePupilId: Int!, $name: String, $grade: String, $subjectId: Int) {
        updatePupil(id: $updatePupilId, name: $name, grade: $grade, subjectId: $subjectId) {
            id
            name
            grade
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

export const deletePupilMutation = gql`
    mutation DeletePupil($deletePupilId: Int!) {
        deletePupil(id: $deletePupilId) {
            id
            name
            grade
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