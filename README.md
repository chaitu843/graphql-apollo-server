# graphql-apollo-server
A GraphQL server built upon Apollo connecting to Neo4j Database using neo4j-driver


=====================================================

Working Points

=====================================================

1. Can't get params work with session.run() --> es6 literals helped in accomplishing the task

2. Where to close the driver?

3. Wrote two different cypher queries with two resolvers for relational data fetching

4. Trying to write a nested query with a single resolver

5.Let's say Author is being queried --> books of author will only be queried if asked for. If we go with one resolver, every time author is queried for, books are also being queried from database.

6. So depending on the requirement, go with single or multi resolvers

7. When going with a single resolver, getting different nodes and forming a json is a bit tedious work. So better form json in the cypher query itself

8. Better to maintain two resolvers always, since it will help in nested queries.


FINAL CONCLUSION --> Write queries for all fields with resolvers. Don't go with nested cypher queries!

9. Whenvever returning a node from cypher query, use get('').properties, if you are returning an object instead, just use get('')

10. Resolver always takes those 4 arguments irrespective of a query of a mutation

11. Be Careful while forming cypher queries --> quotes needs to be given while appending string values

=========================================================

Thank You

==========================================================