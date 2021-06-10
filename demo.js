const gql = require('graphql-tag')
const { ApolloServer } = require('apollo-server')

const typeDefs = gql`
    type User {
        email: String!
        avatar: String
        friends: [User]

    }

    type Query {
        me: User!
        friends: [User ]
    }
`

const resolvers = {
    Query: {
        me() {
            return {
                email: "kaio.fernandes@gmail.com",
                avatar: 'http://yoda.png',
                friends: []
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(4000)
    .then(() => console.log('server on 4000 '))