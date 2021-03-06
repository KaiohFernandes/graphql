const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const {models, db} = require('./db')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req }) {
    // const jwt = req.headers.authorization
    
    // throw new Error('not auth')

    const user = models.User.findOne()
    return { models, db, user }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
})
