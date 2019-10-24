const neo4j = require('neo4j-driver').v1,
    URL = 'bolt://localhost:7687',
    username = 'neo4j',
    password = 'bookStore'
driver = neo4j.driver(URL, neo4j.auth.basic(username, password)),
    session = driver.session();

const resolvers = {
    Query: {
        getBooks() {
            return session.run(`MATCH (book:Book)<-[:WROTE]-(author:Author) RETURN book {
                id: id(book),
                .*,
            })  AS book`)
                .then((result) => {
                    session.close();
                    return result.records.map(record => {
                        return createFlatProps(record.get('book').properties)
                    });
                });
        },

        getAuthors() {
            return session.run(`MATCH (author:Author)-[:WROTE]->(book:Book) RETURN author {
                id: id(author),
               .*
            } AS author`)
                .then((result) => {
                    session.close();
                    return result.records.map(record => createFlatProps(record.get('author')));
                })
        },

        getBook(parent, args) {
            return session.run(`MATCH (book:Book) WHERE id(book) = ${args.id} RETURN book {
                id: id(book),

                .*
                } AS book`)
                .then((result) => {
                    session.close();
                    return  createFlatProps(result.records[0].get('book'))
                });
        },

        getAuthor(parent, args) {
            return session.run(`MATCH (author:Author) WHERE id(author) = ${args.id} RETURN author {
                id: id(author),

                .*
                } AS author`)
                .then((result) => {
                    session.close();
                    return createFlatProps(result.records[0].get('author'))
                });
        },


    },

    Author: {
        books(author) {
            return session.run(`MATCH (author:Author)-[:WROTE]->(book:Book)
                                WHERE id(author) = ${author.id}
                                RETURN book {
                                    id: id(book),
                                    .*
                                }`
            )
                .then((result) => {
                    session.close();
                    return result.records.map(record => createFlatProps(record.get('book')));
                })
        }
    },

    Book: {
        author(book) {
            return session.run(`MATCH (author:Author)-[:WROTE]->(book:Book)
                                WHERE id(book) = ${book.id}
                                RETURN author {
                                    id: id(author),
                                    .*
                                } AS author`
            )
                .then((result) => {
                    session.close();
                    return createFlatProps(result.records[0].get('author'));
                })
        }
    }
}
function getSafeInteger(value) {
    if (neo4j.integer.inSafeRange(value)) return value.toNumber();
    else return value.toString();
}

function createFlatProps(props) {
    Object.keys(props).forEach(key => {
        if (neo4j.isInt(props[key])) {
            props[key] = getSafeInteger(props[key])
        }
    })
    return props;
}

module.exports = resolvers;