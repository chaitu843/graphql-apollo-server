const {gql} = require('apollo-server');

const typedefs = gql`

    type Book {
        id: Int,
        name: String,
        genre: String,
        author: Author
    }

    type Author {
        id: Int,
        name: String,
        age: Int,
        books: [Book]
    }

    type Query {
        getBooks: [Book],
        getBook(id: Int!): Book,
        getAuthors: [Author],
        getAuthor(id: Int!): Author
    }

    input bookInfo {
        name: String!,
        genre: String!,
        authorId: Int!
    }

    input authorInfo {
        name: String!,
        age: Int!
    }

    type Mutation {
        addBook(bookInfo: bookInfo!): Book,
        addAuthor(authorInfo: authorInfo!): Author
    }
`;

module.exports = typedefs;