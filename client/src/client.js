import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'

const typeDefs = gql`
  extend type User {
    age: Int
  }

  extend type Pet {
    vaccinated: Boolean!
  }
`

const resolvers = {
  User: {
    age() {
      return 24
    }
  },
  Pet: {
    vaccinated() {
      return true
    }
  }
}


const http = new HttpLink({ uri: 'http://localhost:4000/' })

const delay = setContext(request => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, 800)
}))

const link = ApolloLink.from([
  delay,
  http
])
const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache,
  resolvers,
  typeDefs
})

// const query = gql`
//   {
//     characters {
//       results {
//         id
//         name
//       }
//     }
//   }
// `

// client.query({ query })
// 	.then(result => console.log(result))

export default client