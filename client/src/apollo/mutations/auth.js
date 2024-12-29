import { gql} from "@apollo/client";

export const loginMutation = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                id
                role
                username
            }
        }
    }
`

export const createUserMutation = gql`
    mutation CreateUser($input: CreateUserInput!, $secretKey: String) {
        createUser(input: $input, secretKey: $secretKey) {
            id
            role
            username
        }
    }
`