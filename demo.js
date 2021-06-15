const gql = require('graphql-tag')
const { ApolloServer } = require('apollo-server')

const typeDefs = gql`
    enum ShoeType {
        NIKE
        TIMBERLAND
    }

    # union Footwear = Sneaker | Boot

    interface Shoe {
        brand: ShoeType!
        size: Int!
        user: User!
    }

    type Sneaker implements Shoe {
        brand: ShoeType!
        size: Int!
        user: User!
        sport: String!
    }

    type Boot implements Shoe {
        brand: ShoeType!
        size: Int!
        user: User!
        hasGrip: Boolean!
    }

    type User {
        email: String!
        avatar: String
        shoes: [Shoe]

    }

    input ShoesInput {
        brand: ShoeType
        size: Int
    }

    input NewShoeInput {
        brand: ShoeType!
        size: Int!
    }

    type Query {
        me: User!
        shoes(input: ShoesInput): [Shoe]!
    }

    type Mutation {
        newShoe(input: NewShoeInput!): Shoe!
    }
`

const resolvers = {
    Query: {
        shoes(_, { input }, ctx,) {
            return [
                { brand: 'NIKE', size: 12, sport: 'basketball', user: 1  },
                { brand: 'TIMERLAND', size: 14, hasGrip: true, user: 1 }
            ]
        },
        me() {
            return {
                id: 1,
                email: "kaio.fernandes@gmail.com",
                avatar: 'http://yoda.png',
                shoes: []
            }
        }
    },
    Mutation: {
        newShoe(_, { input }) {
            return input
        }
    },
    User: {
        shoes(user) {
            return [
                { brand: 'NIKE', size: 12, sport: 'basketball', user: 1  },
                { brand: 'TIMERLAND', size: 14, hasGrip: true, user: 1 }
            ]
        }
    },
    Shoe: {
        __resolveType(shoe) {
            if (shoe.sport) return 'Sneaker'
            return 'Boot'
        }
    },
    Sneaker: {
        user(shoe) {
            return {
                id: 1,
                email: "kaio.fernandes@gmail.com",
                avatar: 'http://yoda.png',
                shoes: []
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